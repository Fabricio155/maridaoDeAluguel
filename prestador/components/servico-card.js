class ServicoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const titulo = this.getAttribute('titulo') || 'Título do Serviço';
    const descricao = this.getAttribute('descricao') || 'Descrição do serviço';
    const preco = this.getAttribute('preco') || '0,00';
    const duracao = this.getAttribute('duracao') || '1 hora';
    const icone = this.getAttribute('icone') || '🔧';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .servico-card {
          background-image: -webkit-linear-gradient(
            233deg,
            #f5f5f5,
            #ffffff,
            #f0f8f0
          );
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          padding: 20px;
          transition: transform 0.3s ease;
          font-family: "Montserrat", sans-serif;
          height: 100%;
        }
        
        .servico-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .servico-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .servico-icon {
          width: 50px;
          height: 50px;
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: white;
          font-size: 24px;
        }
        
        .servico-titulo {
          color: #1c2496;
          font-size: 18px;
          font-weight: 600;
        }
        
        .servico-descricao {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .servico-preco {
          font-weight: bold;
          color: #1c2496;
          font-size: 18px;
        }
        
        .servico-duracao {
          color: #666;
          font-size: 14px;
          margin-top: 5px;
        }
      </style>
      
      <div class="servico-card">
        <div class="servico-header">
          <div class="servico-icon">${icone}</div>
          <div class="servico-titulo">${titulo}</div>
        </div>
        <div class="servico-descricao">${descricao}</div>
        <div class="servico-preco">R$ ${preco}</div>
        <div class="servico-duracao">Duração média: ${duracao}</div>
      </div>
    `;
  }
}

customElements.define('servico-card', ServicoCard);
