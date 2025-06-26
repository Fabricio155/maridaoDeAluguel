
const jwt = require('jsonwebtoken');


// ROTA - LOGIN USUÁRIO
app.post('/login/usuario', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).send({ error: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Senha incorreta' });
    }

    // Gerar o token 
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, 'secreta123', { expiresIn: '1d' });

    res.send({ message: 'Login bem-sucedido', token });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao realizar login', detalhes: err.message });
  }
});


