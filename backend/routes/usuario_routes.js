const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

// Rota para cadastro de usuário
router.post('/cadastro', usuarioController.cadastro);

// Rota para login de usuário
router.post('/login', usuarioController.login);

// Rota para atualização dos dados do usuário
router.put('/:id', usuarioController.atualizarUsuario);

module.exports = router;
