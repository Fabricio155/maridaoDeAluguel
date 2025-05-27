const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servindo o HTML do formulário
app.use(express.static('public'));

// Rota para receber a solicitação do serviço
app.post('/enviar-solicitacao', (req, res) => {
    const { nome, email, telefone, 'tipo-servico': tipoServico, descricao, 'data-preferencia': dataPreferencia } = req.body;

    // Aqui você pode processar os dados, como salvar em um banco de dados ou enviar um e-mail.
    console.log('Nova solicitação de serviço recebida:');
    console.log(`Nome: ${nome}`);
    console.log(`E-mail: ${email}`);
    console.log(`Telefone: ${telefone}`);
    console.log(`Tipo de Serviço: ${tipoServico}`);
    console.log(`Descrição: ${descricao}`);
    console.log(`Data Preferencial: ${dataPreferencia}`);

    // Resposta de sucesso
    res.send('<h1>Solicitação enviada com sucesso! Entraremos em contato em breve.</h1>');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na http://localhost:${port}`);
});