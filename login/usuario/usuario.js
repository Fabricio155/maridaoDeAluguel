

document.getElementById('inscricao-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const usuario = {
        name: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        password: document.getElementById('senha').value,
        cpf: document.getElementById('cpf').value,
        phone: document.getElementById('celular').value,
        image_url: document.getElementById('imagem').value
    };

    try {
        const response = await fetch('http://localhost:3000/usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            document.getElementById('inscricao-form').reset();
            document.getElementById('preview-img').src = 'https://via.placeholder.com/150';
        } else {
            alert('Erro ao cadastrar usuário.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }

    
});
