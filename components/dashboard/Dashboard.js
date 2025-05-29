class DashboardPreLogin extends HTMLElement {
    constructor() {
        super();
        this.loadContent();
    }

    async loadContent() {
        try {
            const response = await fetch('components/dashboard/Dashboard.html');
            this.innerHTML = await response.text();
            this.initPublicElements();
        } catch (error) {
            console.error('Erro ao carregar dashboard pré-login:', error);
        }
    }

    initPublicElements() {
        // Elementos específicos da versão pública
        const publicContent = document.createElement('div');
        publicContent.className = 'public-dashboard';
        publicContent.innerHTML = `
            <h2>Serviços Disponíveis</h2>
            <!-- Conteúdo público do dashboard -->
        `;
        this.appendChild(publicContent);
    }
}

customElements.define('app-dashboard-public', DashboardPreLogin); // Nome único