// backend/controllers/tarefa_controller.js
const tarefaService = require('../services/tarefa_service');

// Criar nova tarefa
exports.criar = async (req, res, next) => {
  try {
    const tarefa = await tarefaService.criarTarefa(req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    next(error);
  }
};

// Listar todas as tarefas de um usuário
exports.listar = async (req, res, next) => {
  try {
    const usuarioId = req.params.usuarioId;
    const filtros   = { categoriaId: req.query.categoriaId, prioridade: req.query.prioridade };
    const tarefas   = await tarefaService.listarTarefas(usuarioId, filtros);
    res.json(tarefas);
  } catch (error) {
    next(error);
  }
};

//  Visualizar uma tarefa por ID
exports.visualizar = async (req, res, next) => {
  try {
    const tarefa = await tarefaService.listarTarefaPorId(req.params.id, req.params.usuarioId);
    res.json(tarefa);
  } catch (error) {
    next(error);
  }
};

// Atualizar qualquer campo de uma tarefa
exports.atualizar = async (req, res, next) => {
  try {
    const tarefaAtualizada = await tarefaService.atualizarTarefa(
      req.params.id,
      req.body.usuarioId,
      req.body
    );
    res.json({ message: 'Tarefa atualizada com sucesso.', tarefa: tarefaAtualizada });
  } catch (error) {
    next(error);
  }
};

// Excluir uma tarefa
exports.excluir = async (req, res, next) => {
  try {
    await tarefaService.excluirTarefa(req.params.id);
    res.json({ message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    next(error);
  }
};

// Notificar tarefas vencidas
exports.notificarTarefasVencidas = async (req, res, next) => {
  try {
    const tarefas = await tarefaService.verificarTarefasVencidas(req.params.usuarioId);
    res.json({ tarefasVencidas: tarefas });
  } catch (error) {
    next(error);
  }
};
