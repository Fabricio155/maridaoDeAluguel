const apiUrl = 'http://localhost:3000'; 

//  cadastro
document.getElementById('inscricao-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('senha').value,
    image_url: document.getElementById('imagem').value,
    phone: document.getElementById('phone').value,
    cpf: document.getElementById('cpf').value,
  };

  const response = await fetch(apiUrl + '/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  });

  const data = await response.json();
  alert('Usuário cadastrado!');
  document.getElementById('cadastro-form').reset();
  listarUsuarios();
});

// Listar 
document.getElementById('menu-listar').addEventListener('click', listarUsuarios);

async function listarUsuarios() {
  const res = await fetch(apiUrl + '/');
  const usuarios = await res.json();

  const container = document.getElementById('usuarios-container');
  container.innerHTML = '';

  usuarios.forEach((usuario) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>Nome:</strong> ${usuario.name}</p>
      <p><strong>Email:</strong> ${usuario.email}</p>
      <p><strong>Telefone:</strong> ${usuario.phone}</p>
      <p><strong>CPF:</strong> ${usuario.cpf}</p>
      <button onclick="preencherEdicao('${usuario._id}')">Editar</button>
      <button onclick="deletarUsuario('${usuario._id}')">Excluir</button>
      <hr>
    `;
    container.appendChild(div);
  });

  mostrarSecao('listagem-section');
}

// Deletar 
async function deletarUsuario(id) {
  const confirmacao = confirm('Tem certeza que deseja excluir este usuário?');
  if (!confirmacao) return;

  const res = await fetch(apiUrl + '/' + id, { method: 'DELETE' });
  const result = await res.json();
  alert(result.message);
  listarUsuarios();
}

// Preencher formulário
window.preencherEdicao = async function (id) {
  const res = await fetch(apiUrl + '/');
  const usuarios = await res.json();
  const usuario = usuarios.find(u => u._id === id);

  document.getElementById('edit-id').value = usuario._id;
  document.getElementById('edit-name').value = usuario.name;
  document.getElementById('edit-email').value = usuario.email;
  document.getElementById('edit-password').value = usuario.password;
  document.getElementById('edit-image_url').value = usuario.image_url;
  document.getElementById('edit-phone').value = usuario.phone;
  document.getElementById('edit-cpf').value = usuario.cpf;

  mostrarSecao('edicao-section');
};

// Atualizar 
document.getElementById('edicao-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('edit-id').value;
  const usuarioAtualizado = {
    name: document.getElementById('edit-name').value,
    email: document.getElementById('edit-email').value,
    password: document.getElementById('edit-password').value,
    image_url: document.getElementById('edit-image_url').value,
    phone: document.getElementById('edit-phone').value,
    cpf: document.getElementById('edit-cpf').value,
  };

  const res = await fetch(apiUrl + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuarioAtualizado),
  });

  const result = await res.json();
  alert(result.message);
  listarUsuarios();
});

// Cancelar 
document.getElementById('cancel-edit-btn').addEventListener('click', () => {
  mostrarSecao('listagem-section');
});


function mostrarSecao(id) {
  document.querySelectorAll('main section').forEach(secao => secao.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}