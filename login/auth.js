// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAtICp8XY7GIvSD_8-FM7HvzfwzidoC0pk",
  authDomain: "loginusuariomaridao.firebaseapp.com",
  projectId: "loginusuariomaridao",
  storageBucket: "loginusuariomaridao.appspot.com",
  messagingSenderId: "210600981632",
  appId: "1:210600981632:web:01efef88f9669faa25a265"
};

// Inicialização do Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Referência para auth
const auth = firebase.auth();

// Função de Login
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// Função de Cadastro
function signUp(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        await login(email, password);
        window.location.href = '../pg.html';
      } catch (error) {
        console.error("Erro no login:", error);
        alert(error.message);
      }
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('new-email').value;
      const password = document.getElementById('new-password').value;
      
      try {
        await signUp(email, password);
        window.location.href = '../pg.html';
      } catch (error) {
        console.error("Erro no cadastro:", error);
        alert(error.message);
      }
    });
  }
});