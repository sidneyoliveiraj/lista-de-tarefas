const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

//  cadastro de usuário
router.post('/cadastro', usuarioController.cadastro);

//  login de usuário
router.post('/login', usuarioController.login);

module.exports = router;
