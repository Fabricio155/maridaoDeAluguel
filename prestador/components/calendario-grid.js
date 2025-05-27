class CalendarioGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const mes = this.getAttribute('mes') || 'Maio';
    const ano = this.getAttribute('ano') || '2025';
    const eventos = JSON.parse(this.getAttribute('eventos') || '[]');
    const diaAtual = parseInt(this.getAttribute('dia-atual') || '27');
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .calendario-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-family: "Montserrat", sans-serif;
        }
        
        .calendario-titulo {
          font-size: 20px;
          font-weight: 600;
          color: #1c2496;
        }
        
        .calendario-navegacao {
          display: flex;
          gap: 10px;
        }
        
        .calendario-btn {
          background-color: #f5f5f5;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .calendario-btn:hover {
          background-color: #e0e0e0;
        }
        
        .calendario-visualizacao {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .visualizacao-btn {
          background-image: -webkit-linear-gradient(
            233deg,
            #f5f5f5,
            #ffffff,
            #f0f8f0
          );
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 8px 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Montserrat", sans-serif;
        }
        
        .visualizacao-btn.active {
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
          color: white;
          border-color: transparent;
        }
        
        .calendario-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          font-family: "Montserrat", sans-serif;
        }
        
        .calendario-dia-semana {
          text-align: center;
          font-weight: 600;
          color: #1c2496;
          padding: 10px;
        }
        
        .calendario-dia {
          background-image: -webkit-linear-gradient(
            233deg,
            #f5f5f5,
            #ffffff,
            #f0f8f0
          );
          border-radius: 10px;
          padding: 10px;
          min-height: 100px;
          transition: transform 0.3s ease;
          position: relative;
        }
        
        .calendario-dia:hover {
          transform: scale(1.02);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .calendario-dia.outro-mes {
          opacity: 0.5;
        }
        
        .calendario-dia.hoje {
          border: 2px solid #1c2496;
        }
        
        .dia-numero {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .dia-evento {
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
          color: white;
          padding: 3px 6px;
          border-radius: 3px;
          font-size: 11px;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .dia-evento.cancelado {
          background-image: -webkit-linear-gradient(
            233deg,
            #ff6b6b,
            #d32f2f,
            #b71c1c
          );
        }
        
        .legenda {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          justify-content: center;
          font-family: "Montserrat", sans-serif;
        }
        
        .legenda-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #666;
        }
        
        .legenda-cor {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          margin-right: 5px;
        }
        
        .legenda-cor.confirmado {
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
        }
        
        .legenda-cor.cancelado {
          background-image: -webkit-linear-gradient(
            233deg,
            #ff6b6b,
            #d32f2f,
            #b71c1c
          );
        }
        
        .legenda-cor.hoje {
          border: 2px solid #1c2496;
          background-color: transparent;
        }
      </style>
      
      <div class="calendario-container">
        <div class="calendario-header">
          <div class="calendario-titulo">${mes} ${ano}</div>
          <div class="calendario-navegacao">
            <button class="calendario-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="calendario-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="calendario-visualizacao">
          <button class="visualizacao-btn">Dia</button>
          <button class="visualizacao-btn">Semana</button>
          <button class="visualizacao-btn active">Mês</button>
        </div>
        
        <div class="calendario-grid">
          <div class="calendario-dia-semana">Dom</div>
          <div class="calendario-dia-semana">Seg</div>
          <div class="calendario-dia-semana">Ter</div>
          <div class="calendario-dia-semana">Qua</div>
          <div class="calendario-dia-semana">Qui</div>
          <div class="calendario-dia-semana">Sex</div>
          <div class="calendario-dia-semana">Sáb</div>
          
          ${this.renderCalendario(diaAtual, eventos)}
        </div>
        
        <div class="legenda">
          <div class="legenda-item">
            <div class="legenda-cor confirmado"></div>
            <span>Agendamento Confirmado</span>
          </div>
          <div class="legenda-item">
            <div class="legenda-cor cancelado"></div>
            <span>Agendamento Cancelado</span>
          </div>
          <div class="legenda-item">
            <div class="legenda-cor hoje"></div>
            <span>Hoje</span>
          </div>
        </div>
      </div>
    `;
    
    // Adicionar event listeners
    this.shadowRoot.querySelectorAll('.visualizacao-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.shadowRoot.querySelectorAll('.visualizacao-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const event = new CustomEvent('calendario-view-change', {
          bubbles: true,
          composed: true,
          detail: {
            view: btn.textContent.toLowerCase()
          }
        });
        this.dispatchEvent(event);
      });
    });
    
    this.shadowRoot.querySelectorAll('.calendario-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const direction = index === 0 ? 'prev' : 'next';
        const event = new CustomEvent('calendario-month-change', {
          bubbles: true,
          composed: true,
          detail: { direction }
        });
        this.dispatchEvent(event);
      });
    });
    
    this.shadowRoot.querySelectorAll('.dia-evento').forEach(evento => {
      evento.addEventListener('click', (e) => {
        const event = new CustomEvent('calendario-evento-click', {
          bubbles: true,
          composed: true,
          detail: {
            id: e.target.getAttribute('data-id'),
            texto: e.target.textContent
          }
        });
        this.dispatchEvent(event);
      });
    });
  }
  
  renderCalendario(diaAtual, eventos) {
    // Simulação de um calendário de maio de 2025
    const diasMesAnterior = [27, 28, 29, 30];
    const diasMesAtual = Array.from({length: 31}, (_, i) => i + 1);
    const diasProximoMes = [1, 2, 3, 4, 5, 6, 7];
    
    // Mapear eventos por dia
    const eventosPorDia = {};
    eventos.forEach(evento => {
      if (!eventosPorDia[evento.dia]) {
        eventosPorDia[evento.dia] = [];
      }
      eventosPorDia[evento.dia].push(evento);
    });
    
    // Renderizar dias do mês anterior
    let html = diasMesAnterior.map(dia => `
      <div class="calendario-dia outro-mes">
        <div class="dia-numero">${dia}</div>
      </div>
    `).join('');
    
    // Renderizar dias do mês atual
    html += diasMesAtual.map(dia => {
      const diaEventos = eventosPorDia[dia] || [];
      const eventoHtml = diaEventos.map(evento => `
        <div class="dia-evento ${evento.cancelado ? 'cancelado' : ''}" data-id="${evento.id}">
          ${evento.texto}
        </div>
      `).join('');
      
      return `
        <div class="calendario-dia ${dia === diaAtual ? 'hoje' : ''}">
          <div class="dia-numero">${dia}</div>
          ${eventoHtml}
        </div>
      `;
    }).join('');
    
    // Renderizar dias do próximo mês
    html += diasProximoMes.map(dia => `
      <div class="calendario-dia outro-mes">
        <div class="dia-numero">${dia}</div>
      </div>
    `).join('');
    
    return html;
  }
}

customElements.define('calendario-grid', CalendarioGrid);
