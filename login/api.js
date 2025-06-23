const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://Maridodealuguel-api:93Sr8E3jP8ZS6I0w@maridodealuguel-api.qytwyl6.mongodb.net/?retryWrites=true&w=majority&appName=Maridodealuguel-api');

// Modelos
const Usuario = mongoose.model('Usuario', {
  name: String,
  email: String,
  password: String,
  image_url: String,
  phone: Number,
  cpf: String
});

const Prestador = mongoose.model('Prestador', {
  name: String,
  email: String,
  password: String,
  image_url: String,
  phone: Number,
  cnpj: String
});

// ROTAS - USUÁRIO
app.get('/usuario', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao buscar usuários' });
  }
});

app.post('/usuario', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.send(usuario);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao criar usuário' });
  }
});

app.put('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) {
      return res.status(404).send({ message: `Usuário com id ${req.params.id} não encontrado` });
    }
    res.send({
      message: `Usuário com id ${req.params.id} atualizado com sucesso`,
      usuario
    });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao atualizar usuário' });
  }
});

app.delete('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).send({ message: `Usuário com id ${req.params.id} não encontrado` });
    }
    res.send({ message: `Usuário com id ${req.params.id} deletado com sucesso` });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao deletar usuário' });
  }
});

// ROTAS - PRESTADOR
app.get('/prestador', async (req, res) => {
  try {
    const prestadores = await Prestador.find();
    res.send(prestadores);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao buscar prestadores' });
  }
});

app.post('/prestador', async (req, res) => {
  try {
    const prestador = new Prestador(req.body);
    await prestador.save();
    res.send(prestador);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao criar prestador' });
  }
});

app.put('/prestador/:id', async (req, res) => {
  try {
    const prestador = await Prestador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!prestador) {
      return res.status(404).send({ message: `Prestador com id ${req.params.id} não encontrado` });
    }
    res.send({
      message: `Prestador com id ${req.params.id} atualizado com sucesso`,
      prestador
    });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao atualizar prestador' });
  }
});

app.delete('/prestador/:id', async (req, res) => {
  try {
    const prestador = await Prestador.findByIdAndDelete(req.params.id);
    if (!prestador) {
      return res.status(404).send({ message: `Prestador com id ${req.params.id} não encontrado` });
    }
    res.send({ message: `Prestador com id ${req.params.id} deletado com sucesso` });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao deletar prestador' });
  }
});

// INICIAR SERVIDOR
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
