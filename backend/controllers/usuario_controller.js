const { cadastrarUsuario, loginUsuario, atualizarUsuario } = require('../services/usuario_service');

// cadastro de novo usuário
exports.cadastro = async (req, res, next) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await cadastrarUsuario(nome, email, senha);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

// login de usuário
exports.login = async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const resposta = await loginUsuario(email, senha);
    res.json(resposta);
  } catch (error) {
    next(error);
  }
};

// attdados do usuário
exports.atualizarUsuario = async (req, res, next) => {
  const { nome, email, senhaAtual, novaSenha } = req.body;
  const usuarioId = req.params.id;  

  try {
    const usuarioAtualizado = await atualizarUsuario(usuarioId, nome, email, senhaAtual, novaSenha);
    res.json({ message: 'Usuário atualizado com sucesso.', usuario: usuarioAtualizado });
  } catch (error) {
    next(error);
  }
};
