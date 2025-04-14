const Usuario = require('../models/usuario_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (nome, email, senha) => {
  const senhaHash = await bcrypt.hash(senha, 10);
  return Usuario.create({ nome, email, senha: senhaHash });
};

const loginUsuario = async (email, senha) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado.');

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Senha incorreta.');

  const token = jwt.sign({ id: usuario.id }, 'segredoJwt', { expiresIn: '7d' });
  return { usuario, token };
};

module.exports = { cadastrarUsuario, loginUsuario };
