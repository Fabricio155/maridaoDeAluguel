class DashboardPosLogin extends HTMLElement {
    constructor() {
        super();
        this.auth = null;
        this.initialize();
    }

    async initialize() {
        await this.loadContent();
        this.initFirebase();
        this.checkAuth();
    }

    async loadContent() {
        try {
            const response = await fetch('components_PG/dashboard/Dashboard.html');
            this.innerHTML = await response.text();
        } catch (error) {
            console.error('Erro ao carregar dashboard pós-login:', error);
        }
    }

    initFirebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyAtICp8XY7GIvSD_8-FM7HvzfwzidoC0pk",
                authDomain: "loginusuariomaridao.firebaseapp.com",
                projectId: "loginusuariomaridao",
                storageBucket: "loginusuariomaridao.appspot.com",
                messagingSenderId: "210600981632",
                appId: "1:210600981632:web:01efef88f9669faa25a265"
            });
        }
        this.auth = firebase.auth();
    }

    checkAuth() {
        this.auth.onAuthStateChanged((user) => {
            if (!user) {
                window.location.href = '/login/index.html';
            } else {
                this.displayUserInfo(user);
                this.loadPrivateContent();
            }
        });
    }

    displayUserInfo(user) {
        const userInfoContainer = document.createElement('div');
        userInfoContainer.className = 'user-info';
        userInfoContainer.innerHTML = `
            <p>Bem-vindo, ${user.email}</p>
            <button id="logout-btn">Sair</button>
        `;
        this.prepend(userInfoContainer);
        this.setupLogout();
    }

    setupLogout() {
        const logoutBtn = this.querySelector('#logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.auth.signOut()
                    .then(() => window.location.href = '/login/index.html')
                    .catch(error => console.error('Erro ao deslogar:', error));
            });
        }
    }

    loadPrivateContent() {
        // Carrega conteúdo específico para usuários logados
        const privateSection = document.createElement('div');
        privateSection.className = 'private-content';
        privateSection.innerHTML = `
            <h2>Meus Serviços</h2>
            <!-- Conteúdo privado do dashboard -->
        `;
        this.appendChild(privateSection);
    }
}

customElements.define('app-dashboard-private', DashboardPosLogin); // Nome único