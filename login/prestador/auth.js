// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAk2mqVRmeZ47Y4WPOkgdzYFvV83FB_lJ8",
  authDomain: "loginprestadormaridao.firebaseapp.com",
  projectId: "loginprestadormaridao",
  storageBucket: "loginprestadormaridao.firebasestorage.app",
  messagingSenderId: "717113731396",
  appId: "1:717113731396:web:7f8d7d7839d537c9580f11",
  measurementId: "G-FPQPJHZKVE"
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
        window.location.href = '../../prestador/painel.html';
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
        window.location.href = '../../prestador/painel.html';
      } catch (error) {
        console.error("Erro no cadastro:", error);
        alert(error.message);
      }
    });
  }
});