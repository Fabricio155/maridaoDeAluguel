class Dashboard extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }

  async initialize() {
    await this.loadContent();
    this.initFirebase();
    this.checkAuth();
  }

  async loadContent() {
    const response = await fetch('components/dashboard/Dashboard.html');
    this.innerHTML = await response.text();
  }

  initFirebase() {
    this.auth = firebase.auth();
  }

  checkAuth() {
    this.auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = '/login/index.html';
      } else {
        this.displayUserInfo(user);
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
}

customElements.define('app-dashboard', Dashboard);