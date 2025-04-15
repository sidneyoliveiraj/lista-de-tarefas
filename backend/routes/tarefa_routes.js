const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefa_controller');

// Criar uma tarefa
router.post('/', tarefaController.criar);

// Listar todas as tarefas de um usuário
router.get('/:usuarioId', tarefaController.listar);

// Atualizar uma tarefa
router.put('/:id', tarefaController.atualizar);

// Excluir uma tarefa
router.delete('/:id', tarefaController.excluir);

module.exports = router;
