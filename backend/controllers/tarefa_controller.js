const tarefaService = require('../services/tarefa_service');

exports.criar = async (req, res, next) => {
  try {
    const tarefa = await tarefaService.criarTarefa({ ...req.body, usuarioId: req.body.usuarioId });
    res.status(201).json(tarefa);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const tarefas = await tarefaService.listarTarefas(req.params.usuarioId);
    res.json(tarefas);
  } catch (error) {
    next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    await tarefaService.atualizarTarefa(req.params.id, req.body.usuarioId, req.body);
    res.json({ message: 'Tarefa atualizada.' });
  } catch (error) {
    next(error);
  }
};

exports.excluir = async (req, res, next) => {
  const { id } = req.params;
  const { confirmarExclusao } = req.body;

  if (!confirmarExclusao) {
    return res.status(400).json({ message: 'Confirmação de exclusão necessária.' });
  }

  try {
    await tarefaService.excluirTarefa(id, req.body.usuarioId);
    res.json({ message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    next(error);
  }
};

// Nova função para verificar tarefas vencidas ou próximas do vencimento
exports.notificarTarefasVencidas = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;

  try {
    const tarefasVencidas = await tarefaService.verificarTarefasVencidas(usuarioId);
    res.json({ tarefasVencidas });
  } catch (error) {
    next(error);
  }
};
