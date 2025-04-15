// controllers/autenticacao_controller.js
const { loginUsuario } = require('../services/usuario_service');

module.exports = {
  login: async (req, res, next) => {
    const { email, senha } = req.body;
    try {
      const { usuario, token } = await loginUsuario(email, senha); // Chama o serviço para fazer o login
      res.json({ usuario, token }); // Retorna o usuário e o token
    } catch (error) {
      next(error); 
    }
  },
  
  logout: (req, res) => {
    
    res.json({ message: "Usuário deslogado com sucesso!" });
  },
  
  recoverPassword: (req, res) => {
    res.json({ message: "Rota de recuperação de senha funcionando!" });
  }
};
