// controllers/autenticacao_controller.js
const { loginUsuario } = require('../services/usuario_service');

module.exports = {
  login: async (req, res, next) => {
    const { email, senha } = req.body;
    try {
      const { usuario, token } = await loginUsuario(email, senha); // Chama o serviço para fazer o login
      res.json({ usuario, token }); // Retorna o usuário e o token
    } catch (error) {
      next(error); // Passa o erro para o middleware de erro
    }
  },
  
  logout: (req, res) => {
    // A ação de logout geralmente envolve invalidar o token do lado do cliente,
    // mas o token JWT pode ser mantido no frontend e removido no lado do cliente.
    res.json({ message: "Usuário deslogado com sucesso!" });
  },
  
  recoverPassword: (req, res) => {
    res.json({ message: "Rota de recuperação de senha funcionando!" });
  }
};
