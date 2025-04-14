const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefa_controller');

router.post('/', tarefaController.criar);
router.get('/:usuarioId', tarefaController.listar);
router.put('/:id', tarefaController.atualizar);
router.delete('/:id', tarefaController.excluir);

module.exports = router;
