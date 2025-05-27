class ProfileForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const nome = this.getAttribute('nome') || 'Carlos Silva';
    const email = this.getAttribute('email') || 'carlos.silva@email.com';
    const telefone = this.getAttribute('telefone') || '(11) 98765-4321';
    const endereco = this.getAttribute('endereco') || 'Av. Paulista, 1000';
    const foto = this.getAttribute('foto') || 'https://randomuser.me/api/portraits/men/75.jpg';
    const especialidade = this.getAttribute('especialidade') || 'Manutenção Geral';
    const descricao = this.getAttribute('descricao') || 'Profissional com mais de 10 anos de experiência em manutenção residencial e comercial.';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .profile-form {
          font-family: "Montserrat", sans-serif;
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .profile-photo-container {
          position: relative;
          margin-right: 30px;
        }
        
        .profile-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
          display: flex;
          justify-content: center;
          align-items: center;
          animation: border 3s infinite forwards alternate ease-in-out;
        }
        
        .profile-photo img {
          width: 93%;
          height: 93%;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .photo-edit-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .profile-info {
          flex: 1;
        }
        
        .profile-name {
          font-size: 24px;
          font-weight: 600;
          color: #1c2496;
          margin-bottom: 5px;
        }
        
        .profile-role {
          color: #666;
          font-size: 16px;
        }
        
        .form-section {
          margin-bottom: 30px;
        }
        
        .form-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1c2496;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
        }
        
        .form-row {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
          gap: 20px;
        }
        
        .form-group {
          flex: 1;
          min-width: 250px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          font-family: "Montserrat", sans-serif;
          transition: border-color 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #1c2496;
        }
        
        .form-textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          font-family: "Montserrat", sans-serif;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.3s ease;
        }
        
        .form-textarea:focus {
          outline: none;
          border-color: #1c2496;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 30px;
        }
        
        .btn {
          padding: 12px 25px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          font-family: "Montserrat", sans-serif;
          transition: transform 0.3s ease;
          border: none;
        }
        
        .btn:hover {
          transform: translateY(-2px);
        }
        
        .btn-cancel {
          background-color: #f5f5f5;
          color: #666;
        }
        
        .btn-save {
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );
          color: white;
        }
        
        @keyframes border {
          0% {
            background-size: 100%;
          }
          100% {
            background-size: 500%;
          }
        }
        
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .profile-photo-container {
            margin-right: 0;
            margin-bottom: 20px;
          }
          
          .form-row {
            flex-direction: column;
            gap: 15px;
          }
          
          .form-group {
            min-width: 100%;
          }
        }
      </style>
      
      <div class="profile-form">
        <div class="profile-header">
          <div class="profile-photo-container">
            <div class="profile-photo">
              <img src="${foto}" alt="Foto de perfil">
            </div>
            <button class="photo-edit-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L16 12L12 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 12H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="profile-info">
            <div class="profile-name">${nome}</div>
            <div class="profile-role">Prestador de Serviços - ${especialidade}</div>
          </div>
        </div>
        
        <div class="form-section">
          <div class="form-section-title">Informações Pessoais</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nome Completo</label>
              <input type="text" class="form-input" value="${nome}" id="nome">
            </div>
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input type="email" class="form-input" value="${email}" id="email">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input type="tel" class="form-input" value="${telefone}" id="telefone">
            </div>
            <div class="form-group">
              <label class="form-label">Endereço</label>
              <input type="text" class="form-input" value="${endereco}" id="endereco">
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <div class="form-section-title">Informações Profissionais</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Especialidade</label>
              <input type="text" class="form-input" value="${especialidade}" id="especialidade">
            </div>
            <div class="form-group">
              <label class="form-label">Anos de Experiência</label>
              <input type="number" class="form-input" value="10" id="experiencia">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" style="flex: 100%;">
              <label class="form-label">Descrição Profissional</label>
              <textarea class="form-textarea" id="descricao">${descricao}</textarea>
            </div>
          </div>
        </div>
        
        <div class="form-section">
          <div class="form-section-title">Configurações da Conta</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nova Senha</label>
              <input type="password" class="form-input" placeholder="Digite a nova senha" id="senha">
            </div>
            <div class="form-group">
              <label class="form-label">Confirmar Senha</label>
              <input type="password" class="form-input" placeholder="Confirme a nova senha" id="confirmar-senha">
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button class="btn btn-cancel" id="btn-cancel">Cancelar</button>
          <button class="btn btn-save" id="btn-save">Salvar Alterações</button>
        </div>
      </div>
    `;
    
    // Adicionar event listeners
    this.shadowRoot.querySelector('#btn-save').addEventListener('click', () => {
      const formData = {
        nome: this.shadowRoot.querySelector('#nome').value,
        email: this.shadowRoot.querySelector('#email').value,
        telefone: this.shadowRoot.querySelector('#telefone').value,
        endereco: this.shadowRoot.querySelector('#endereco').value,
        especialidade: this.shadowRoot.querySelector('#especialidade').value,
        experiencia: this.shadowRoot.querySelector('#experiencia').value,
        descricao: this.shadowRoot.querySelector('#descricao').value,
        senha: this.shadowRoot.querySelector('#senha').value,
        confirmarSenha: this.shadowRoot.querySelector('#confirmar-senha').value
      };
      
      const event = new CustomEvent('profile-save', {
        bubbles: true,
        composed: true,
        detail: formData
      });
      this.dispatchEvent(event);
    });
    
    this.shadowRoot.querySelector('#btn-cancel').addEventListener('click', () => {
      const event = new CustomEvent('profile-cancel', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
    
    this.shadowRoot.querySelector('.photo-edit-btn').addEventListener('click', () => {
      const event = new CustomEvent('profile-photo-change', {
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    });
  }
}

customElements.define('profile-form', ProfileForm);
