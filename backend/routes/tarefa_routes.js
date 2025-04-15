const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefa_controller');

// criar uma tarefa
router.post('/', tarefaController.criar);

// listar todas as tarefas de um usuário
router.get('/:usuarioId', tarefaController.listar);  // Agora inclui filtro de categoria e prioridade via query params

// visualizar tarefa por ID
router.get('/:usuarioId/:id', tarefaController.visualizar);

// att uma tarefa
router.put('/:id', tarefaController.atualizar);

// excluir uma tarefa
router.delete('/:id', tarefaController.excluir);

module.exports = router;
