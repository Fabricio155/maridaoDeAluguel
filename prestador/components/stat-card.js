class StatCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const label = this.getAttribute('label') || 'Estatística';
    const value = this.getAttribute('value') || '0';
    const sublabel = this.getAttribute('sublabel') || '';
    const icon = this.getAttribute('icon') || '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .stat-card {
          background-image: -webkit-linear-gradient(
            233deg,
            #f5f5f5,
            #ffffff,
            #f0f8f0
          );
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          text-align: center;
          font-family: "Montserrat", sans-serif;
          height: 100%;
        }
        
        .stat-label {
          color: #666;
          font-size: 1rem;
          margin-bottom: 10px;
        }
        
        .stat-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1c2496;
          margin: 10px 0;
        }
        
        .stat-sublabel {
          color: #666;
          font-size: 0.9rem;
        }
        
        .stat-icon {
          color: gold;
          display: inline-block;
        }
      </style>
      
      <div class="stat-card">
        <div class="stat-label">${label}</div>
        <div class="stat-value">${value}${icon ? `<span class="stat-icon">${icon}</span>` : ''}</div>
        <div class="stat-sublabel">${sublabel}</div>
      </div>
    `;
  }
}

customElements.define('stat-card', StatCard);
