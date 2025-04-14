// controllers/autenticacao_controller.js
module.exports = {
  login: (req, res) => {
    res.json({ message: "Rota de login funcionando!" });
  },
  logout: (req, res) => {
    res.json({ message: "Rota de logout funcionando!" });
  },
  recoverPassword: (req, res) => {
    res.json({ message: "Rota de recuperação de senha funcionando!" });
  }
};
