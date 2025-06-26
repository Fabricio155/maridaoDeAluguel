document.getElementById('inscricao-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const prestador = {
        name: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        password: document.getElementById('senha').value, 
        cnpj: document.getElementById('cnpj').value,
        phone: document.getElementById('Telefone').value, 
        image_url: document.getElementById('imagem').value
    };

    try {
        const response = await fetch('http://localhost:3000/prestador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prestador)
        });

        if (response.ok) {
            alert('Prestador cadastrado com sucesso!');
            document.getElementById('inscricao-form').reset();
            document.getElementById('preview-img').src = 'https://via.placeholder.com/150';
        } else {
            alert('Erro ao cadastrar prestador.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});
