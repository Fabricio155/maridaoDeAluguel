const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



app.post('/login/prestador', async (req, res) => {
  const { email, password } = req.body;

  try {
    const prestador = await Prestador.findOne({ email });
    if (!prestador) {
      return res.status(400).send({ error: 'Prestador não encontrado' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, prestador.password);
    if (!isPasswordValid) {
      return res.status(400).send({ error: 'Senha incorreta' });
    }

    
    const token = jwt.sign({ id: prestador._id, email: prestador.email }, 'secreta123', { expiresIn: '1d' });

    res.send({ message: 'Login bem-sucedido', token });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao realizar login', detalhes: err.message });
  }
});
