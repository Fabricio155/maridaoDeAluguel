class ClienteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const nome = this.getAttribute('nome') || 'Nome do Cliente';
    const telefone = this.getAttribute('telefone') || '(00) 00000-0000';
    const email = this.getAttribute('email') || 'email@exemplo.com';
    const endereco = this.getAttribute('endereco') || 'Endereço do cliente';
    const foto = this.getAttribute('foto') || 'https://randomuser.me/api/portraits/men/75.jpg';
    const status = this.getAttribute('status') || 'ativo'; // ativo ou inativo
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .cliente-card {
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
          position: relative;
          font-family: "Montserrat", sans-serif;
          height: 100%;
        }
        
        .cliente-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cliente-status {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .cliente-status.ativo {
          background-color: lightgreen;
        }
        
        .cliente-status.inativo {
          background-color: #ccc;
        }
        
        .cliente-foto {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin: 0 auto 15px;
          overflow: hidden;
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .cliente-foto img {
          width: 93%;
          height: 93%;
          object-fit: cover;
          border-radius: 50%;
        }
        
        .cliente-nome {
          text-align: center;
          font-weight: 600;
          color: #1c2496;
          margin-bottom: 5px;
        }
        
        .cliente-info {
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }
        
        .cliente-info svg {
          margin-right: 8px;
          min-width: 16px;
        }
        
        .cliente-acoes {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
        }
        
        .cliente-btn {
          background-color: #f5f5f5;
          border: none;
          border-radius: 5px;
          padding: 8px 12px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          font-family: "Montserrat", sans-serif;
        }
        
        .cliente-btn svg {
          margin-right: 5px;
        }
        
        .cliente-btn:hover {
          background-color: #e0e0e0;
        }
        
        .cliente-btn.agendar {
          background-color: #e3f2fd;
          color: #1c2496;
        }
        
        .cliente-btn.historico {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
      </style>
      
      <div class="cliente-card">
        <div class="cliente-status ${status}"></div>
        <div class="cliente-foto">
          <img src="${foto}" alt="${nome}">
        </div>
        <div class="cliente-nome">${nome}</div>
        <div class="cliente-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.96 19.96 21.96C16.4223 21.96 13.0081 20.5471 10.3616 18.1184C7.93106 15.8949 6.06309 13.0691 4.88 9.92C3.43994 7.2195 2.05498 3.73785 2.04 0.16C2.03981 -0.390285 2.25057 -0.919443 2.62604 -1.29491C3.00151 -1.67038 3.53067 -1.88114 4.08 -1.88H7.08C8.08141 -1.88 8.9294 -1.14185 9.08 -0.16C9.23974 0.8555 9.52988 1.84734 9.94 2.78C10.2718 3.5208 10.1038 4.3929 9.52 4.98L8.2 6.3C9.29545 9.04194 11.5181 11.2646 14.26 12.36L15.58 11.04C16.1671 10.4562 17.0392 10.2882 17.78 10.62C18.7127 11.0301 19.7045 11.3203 20.72 11.48C21.7249 11.6336 22.4601 12.5096 22.46 13.52L22 16.92Z" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${telefone}
        </div>
        <div class="cliente-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${email}
        </div>
        <div class="cliente-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${endereco}
        </div>
        <div class="cliente-acoes">
          <button class="cliente-btn agendar" data-action="agendar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#1c2496" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 2V6" stroke="#1c2496" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 2V6" stroke="#1c2496" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 10H21" stroke="#1c2496" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Agendar
          </button>
          <button class="cliente-btn historico" data-action="historico">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.05 11C3.27151 8.68261 4.51919 6.56428 6.48114 5.13446C8.44309 3.70464 10.9422 3.07123 13.3551 3.37074C15.768 3.67025 17.9331 4.87574 19.3936 6.74888C20.854 8.62202 21.4957 11.0077 21.1759 13.3698C20.8561 15.7319 19.6043 17.8608 17.7055 19.2962C15.8066 20.7317 13.4149 21.3605 11.0504 21.0219C8.68599 20.6832 6.5644 19.4075 5.1371 17.4778C3.7098 15.5481 3.0511 13.0558 3.27 10.64" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Histórico
          </button>
        </div>
      </div>
    `;
    
    // Adicionar event listeners para os botões
    this.shadowRoot.querySelectorAll('.cliente-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.closest('.cliente-btn').getAttribute('data-action');
        const event = new CustomEvent('cliente-action', {
          bubbles: true,
          composed: true,
          detail: {
            action,
            nome,
            telefone,
            email,
            endereco
          }
        });
        this.dispatchEvent(event);
      });
    });
  }
}

customElements.define('cliente-card', ClienteCard);
