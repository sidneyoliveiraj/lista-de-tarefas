const { cadastrarUsuario, loginUsuario } = require('../services/usuario_service');

exports.cadastro = async (req, res, next) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await cadastrarUsuario(nome, email, senha);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const resposta = await loginUsuario(email, senha);
    res.json(resposta);
  } catch (error) {
    next(error);
  }
};
