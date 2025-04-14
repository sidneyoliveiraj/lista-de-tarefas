const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario_controller');

router.post('/cadastro', usuarioController.cadastro);
router.post('/login', usuarioController.login);

module.exports = router;
