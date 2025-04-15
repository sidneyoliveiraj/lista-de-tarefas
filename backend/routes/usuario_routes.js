const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

// cadastro de usuário
router.post('/cadastro', usuarioController.cadastro);

// login de usuário
router.post('/login', usuarioController.login);

// atualização dos dados do usuário
router.put('/:id', usuarioController.atualizarUsuario);

module.exports = router;
