const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

mongoose.connect('mongodb+srv://Maridodealuguel-api:FIyT3CQnRtN5IzC9@maridodealuguel-api.qytwyl6.mongodb.net/?retryWrites=true&w=majority&appName=Maridodealuguel-api')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

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

function autenticarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ error: 'Token não informado' });

  jwt.verify(token, 'secreta123', (err, decoded) => {
    if (err) return res.status(403).send({ error: 'Token inválido' });

    req.usuarioId = decoded.id;
    next();
  });
}

// Rotas Usuário
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
    const { name, email, password, cpf, phone, image_url } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      name,
      email,
      password: hashedPassword,
      cpf,
      phone,
      image_url
    });

    await usuario.save();
    res.status(201).send(usuario);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao criar usuário', detalhes: err.message });
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

// Rotas Prestador
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
    const { name, email, password, cnpj, phone, image_url } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const prestador = new Prestador({
      name,
      email,
      password: hashedPassword,
      cnpj,
      phone,
      image_url
    });

    await prestador.save();
    res.status(201).send(prestador);
  } catch (err) {
    res.status(500).send({ error: 'Erro ao criar prestador', detalhes: err.message });
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

// Login Prestador
app.post('/login/prestador', async (req, res) => {
  const { email, password } = req.body;

  try {
    const prestador = await Prestador.findOne({ email });
    if (!prestador) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const isMatch = await bcrypt.compare(password, prestador.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ id: prestador._id }, 'secreta123', { expiresIn: '1h' });

    return res.json({ message: 'Login realizado com sucesso', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Login Usuário
app.post('/login/usuario', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario._id }, 'secreta123', { expiresIn: '1h' });

    return res.json({ message: 'Login realizado com sucesso', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota protegida
app.get('/perfil', autenticarToken, (req, res) => {
  res.send('Bem-vindo ao perfil protegido!');
});

// Inicialização
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
