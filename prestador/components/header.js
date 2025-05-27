class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const currentPage = this.getAttribute('current-page') || 'painel';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        header {
          display: flex;
          justify-content: space-around;
          background-image: -webkit-linear-gradient(
            144deg,
            lightgreen,
            #020a7d,
            #101983b4
          );
          height: 8vw;
          max-width: 100%;
          align-items: center;
          background-size: 200%;
        }
        
        .user-image {
          height: 7vw;
          width: 7vw;
          background-image: -webkit-linear-gradient(
            233deg,
            lightgreen,
            #1c2496,
            #333b99a4
          );    
          clip-path: circle();
          background-size: 100%;
          animation: border 3s infinite forwards alternate ease-in-out;
          box-shadow: 0px 0px 1px #e5ebe3;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        
        .user-image img {
          height: 93%;
          width: 93%;
          clip-path: circle();
          object-fit: cover;
        }
        
        .user-ola {
          margin: 13px;
          width: 12%;
          text-align: center;
          border-right: #1c2496 solid 3px;
          padding: 13px;
          border-radius: 10%;
        }
        
        .user-ola p {
          color: aliceblue;
          margin: 0;
          font-family: "Montserrat", sans-serif;
        }
        
        .serviços {
          width: 72vw;
          display: flex;
          justify-content: space-around;
          padding: 0;
          margin: 0;
        }
        
        .serviços li {
          list-style: none;
          color: aliceblue;
          font-size: 1.2vw;
          font-family: "Montserrat", sans-serif;
          cursor: pointer;
        }
        
        .serviços li:hover {
          color: lightgreen;
          transition: .5s;
          border-bottom: #09e9bc solid 1px;
          font-size: 1.22vw;
        }
        
        .serviços li.active {
          color: lightgreen;
          border-bottom: #09e9bc solid 1px;
        }
        
        .mobileBtn {
          background: transparent;
          border: none;
          cursor: pointer;
        }
        
        .mobileBtn:hover {
          background-color: #020a7d59;
          width: 4.9vw;
          height: 4.9vw;
          clip-path: circle();
          display: flex;
          justify-content: center;
          align-items: center;
          transition: .5s;
        }
        
        .header-content {
          display: flex;
          background-image: -webkit-linear-gradient(
            233deg,
            #0e156f,
            #0e156f,
            #333b99a4
          );
          height: 7.5vw;
          width: 99.7%;
          align-items: center;
          transition: .5s;
          border-radius: 33px;
        }
        
        .hidden {
          opacity: 0;
        }
        
        @keyframes border {
          0% {
            background-size: 100%;
          }
          100% {
            background-size: 500%;
          }
        }
        
        @media screen and (min-width: 374px) and (max-width: 900px) {
          header {
            height: 32vw;
            width: 100%;
            position: relative;
            background-image: -webkit-linear-gradient(
              233deg,
              #0e146fd3,
              #050a4ce6,
              #141b6ce1
            );   
            background-size: cover;  
            animation: none;
            display: flex;
          }
          
          .mobileBtn {
            opacity: 1;
            width: 25vw;
            position: absolute;
            right: -1%;
            background: transparent;
            border: none;
          }
          
          .mobileBtn:hover {
            opacity: 1;
            width: 25vw;
            position: absolute;
            right: -1%;
            background: transparent;
            border: none;
            clip-path: none;
          }
          
          .header-content {
            background-color: #096ae9;
            height: 82vh;
            width: 50vw;
            position: absolute;
            left: 50%;
            top: 100%;
            border-radius: 3px;
            z-index: 1;
          }
          
          .header-content li {
            background-color: #020a7d;
            padding: 13px;
          }
          
          .user-image img {
            height: 28vw;
            width: 28vw;
          }
          
          .user-image {
            position: absolute;
            left: -33%;
            top: 3%;
            height: 30vw;
            width: 100vw;
          }
          
          .user-ola {
            position: absolute;
            right: 22%;
            top: -7.9%;
            height: 30vw;
            width: 40vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 33%;
          }
          
          .serviços {
            flex-direction: column;
            height: 50vh;
            width: 30vw;
            position: absolute;
            top: 7%;
            right: 10%;
            justify-content: space-around;
            align-items: center;
          }
          
          .serviços li {
            font-size: 5vw;
            border-bottom: #096ae9 solid 1px;
            padding: 3px;
            border-radius: 10%;
            justify-content: center;
          }
          
          .serviços li:hover {
            font-size: 5.5vw;
          }
        }
      </style>
      
      <header>
        <div class="user-image">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Foto do usuário">
        </div>
        <div class="user-ola">
          <p>Olá,</p>
          <p>Carlos</p>
        </div>
        <ul class="serviços">
          <li class="${currentPage === 'painel' ? 'active' : ''}" data-page="painel">Painel</li>
          <li class="${currentPage === 'servicos' ? 'active' : ''}" data-page="servicos">Serviços</li>
          <li class="${currentPage === 'agendamentos' ? 'active' : ''}" data-page="agendamentos">Agendamentos</li>
          <li class="${currentPage === 'clientes' ? 'active' : ''}" data-page="clientes">Clientes</li>
          <li class="${currentPage === 'calendario' ? 'active' : ''}" data-page="calendario">Calendário</li>
          <li class="${currentPage === 'perfil' ? 'active' : ''}" data-page="perfil">Perfil</li>
        </ul>
        <button class="mobileBtn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="header-content hidden">
          <!-- Conteúdo do menu mobile -->
        </div>
      </header>
    `;
    
    // Adicionar event listeners
    this.shadowRoot.querySelectorAll('.serviços li').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        window.location.href = `${page}.html`;
      });
    });
    
    // Adicionar event listener para a foto do usuário (acesso rápido ao perfil)
    this.shadowRoot.querySelector('.user-image').addEventListener('click', () => {
      window.location.href = 'perfil.html';
    });
    
    this.shadowRoot.querySelector('.mobileBtn').addEventListener('click', () => {
      this.shadowRoot.querySelector('.header-content').classList.toggle('hidden');
    });
  }
}

customElements.define('app-header', Header);
