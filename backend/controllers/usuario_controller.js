const { cadastrarUsuario, loginUsuario, atualizarUsuario } = require('../services/usuario_service');

// Cadastro de novo usuário
exports.cadastro = async (req, res, next) => {
  const { nome, email, senha } = req.body;
  try {
    const usuario = await cadastrarUsuario(nome, email, senha);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

// Login de usuário
exports.login = async (req, res, next) => {
  const { email, senha } = req.body;
  try {
    const resposta = await loginUsuario(email, senha);
    res.json(resposta);
  } catch (error) {
    next(error);
  }
};

// Atualizar dados do usuário
exports.atualizarUsuario = async (req, res, next) => {
  const { nome, email, senhaAtual, novaSenha } = req.body;
  const usuarioId = req.params.id;  // Pega o ID do usuário a partir da URL

  try {
    const usuarioAtualizado = await atualizarUsuario(usuarioId, nome, email, senhaAtual, novaSenha);
    res.json({ message: 'Usuário atualizado com sucesso.', usuario: usuarioAtualizado });
  } catch (error) {
    next(error);
  }
};
