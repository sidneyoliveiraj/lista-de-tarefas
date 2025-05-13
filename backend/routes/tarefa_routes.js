// backend/routes/tarefa_routes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/tarefa_controller');

//  Criar tarefa
router.post('/', ctrl.criar);

//  Listar todas as tarefas de um usuário (opcionalmente filtradas por categoria)
router.get('/:usuarioId', ctrl.listar);

//  Visualizar tarefa por ID
router.get('/:usuarioId/:id', ctrl.visualizar);

//  Atualizar tarefa
router.put('/:id', ctrl.atualizar);

// Excluir tarefa
router.delete('/:id', ctrl.excluir);

// Notificações
router.get('/notificacoes/:usuarioId', ctrl.notificarTarefasVencidas);

module.exports = router;
