class SectionTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Título da Seção';
    
    this.shadowRoot.innerHTML = `
      <style>
        h2 {
          background-image: -webkit-linear-gradient(
            233deg,
            #1c2496,
            #1c2496,
            lightgreen
          );
          margin: 13px auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-align: center;
          font-family: "Montserrat", sans-serif;
          font-size: 20px;
          font-weight: 600;
        }
      </style>
      
      <h2>${title}</h2>
    `;
  }
}

customElements.define('section-title', SectionTitle);
