const express = require('express');
const router = express.Router();
const controllerProfissionais = require('./controllers/controllerProfissionais');
const { calcularCusto } = require('../controllers/servicoController');
const { cadastrarUsuario } = require('../controllers/cadastroController');
const { validarLogin } = require('../controllers/loginController');
const { cadastrarServico } = require('../controllers/servicoController');


router.post('/calcular', calcularCusto);

router.post('/cadastrar', cadastrarUsuario);

router.post('/login', validarLogin);

router.post('/cadastrarServico', cadastrarServico);

router.get('/profissionais/servico/:servicoId', controllerProfissionais.filterService);

router.get('/profissionais/avaliacoes', controllerProfissionais.filterAvaliation);

module.exports = router;