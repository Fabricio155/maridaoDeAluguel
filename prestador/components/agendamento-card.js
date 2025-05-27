class AgendamentoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const nome = this.getAttribute('nome') || 'Nome do Cliente';
    const servico = this.getAttribute('servico') || 'Tipo de Serviço';
    const horario = this.getAttribute('horario') || '00:00';
    const status = this.getAttribute('status') || 'pendente'; // pendente, confirmado, concluido, cancelado
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .agendamento-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #eee;
          border-left: 4px solid #1c2496;
          margin-bottom: 15px;
          font-family: "Montserrat", sans-serif;
        }
        
        .agendamento-item.confirmado {
          border-left-color: #2e7d32;
        }
        
        .agendamento-item.concluido {
          border-left-color: lightgreen;
        }
        
        .agendamento-item.cancelado {
          border-left-color: #ff6b6b;
        }
        
        .agendamento-info h3 {
          color: #1c2496;
          margin-bottom: 5px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .agendamento-info p {
          color: #666;
          margin: 0;
        }
        
        .agendamento-hora {
          font-weight: bold;
          color: #1c2496;
          font-size: 16px;
        }
        
        .status-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
          margin-left: 10px;
        }
        
        .status-badge.pendente {
          background-color: #e3f2fd;
          color: #1c2496;
        }
        
        .status-badge.confirmado {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
        
        .status-badge.concluido {
          background-color: #e0f2f1;
          color: #00796b;
        }
        
        .status-badge.cancelado {
          background-color: #ffebee;
          color: #d32f2f;
        }
        
        .agendamento-acoes {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        
        .acao-btn {
          background-color: #f5f5f5;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: "Montserrat", sans-serif;
        }
        
        .acao-btn:hover {
          background-color: #e0e0e0;
        }
        
        .acao-btn.confirmar {
          background-color: #e3f2fd;
          color: #1c2496;
        }
        
        .acao-btn.reagendar {
          background-color: #fff8e1;
          color: #ffa000;
        }
        
        .acao-btn.cancelar {
          background-color: #ffebee;
          color: #d32f2f;
        }
      </style>
      
      <div class="agendamento-item ${status}">
        <div class="agendamento-info">
          <h3>${nome} <span class="status-badge ${status}">${this.getStatusText(status)}</span></h3>
          <p>${servico}</p>
        </div>
        <div class="agendamento-hora">${horario}</div>
        <div class="agendamento-acoes">
          ${this.renderButtons(status)}
        </div>
      </div>
    `;
    
    // Adicionar event listeners para os botões
    this.shadowRoot.querySelectorAll('.acao-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        const event = new CustomEvent('agendamento-action', {
          bubbles: true,
          composed: true,
          detail: {
            action,
            nome,
            servico,
            horario,
            status
          }
        });
        this.dispatchEvent(event);
      });
    });
  }
  
  getStatusText(status) {
    const statusMap = {
      'pendente': 'Pendente',
      'confirmado': 'Confirmado',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado'
    };
    return statusMap[status] || 'Pendente';
  }
  
  renderButtons(status) {
    if (status === 'pendente') {
      return `
        <button class="acao-btn confirmar" data-action="confirmar">Confirmar</button>
        <button class="acao-btn reagendar" data-action="reagendar">Reagendar</button>
        <button class="acao-btn cancelar" data-action="cancelar">Cancelar</button>
      `;
    } else if (status === 'confirmado') {
      return `
        <button class="acao-btn confirmar" data-action="iniciar">Iniciar Serviço</button>
        <button class="acao-btn reagendar" data-action="reagendar">Reagendar</button>
        <button class="acao-btn cancelar" data-action="cancelar">Cancelar</button>
      `;
    } else if (status === 'concluido') {
      return `
        <button class="acao-btn reagendar" data-action="agendar-novo">Agendar Novo</button>
      `;
    } else if (status === 'cancelado') {
      return `
        <button class="acao-btn reagendar" data-action="reagendar">Reagendar</button>
      `;
    }
    return '';
  }
}

customElements.define('agendamento-card', AgendamentoCard);
