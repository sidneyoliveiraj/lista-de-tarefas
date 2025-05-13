const tarefaService = require('../services/tarefa_service');

// criar nova tarefa
exports.criar = async (req, res, next) => {
  try {
    const { titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId } = req.body;
    const tarefa = await tarefaService.criarTarefa({ 
      titulo, 
      descricao, 
      dataVencimento, 
      prioridade, 
      usuarioId, 
      categoriaId 
    });
    res.status(201).json(tarefa); // Retorna a tarefa criada
  } catch (error) {
    next(error);
  }
};

// listar todas as tarefas de um usuário
exports.listar = async (req, res, next) => {
  try {
    const { categoriaId, prioridade } = req.query;  // Pegando categoriaId e prioridade da query
    const tarefas = await tarefaService.listarTarefas(req.params.usuarioId, { categoriaId, prioridade });
    res.json(tarefas); // Retorna todas as tarefas
  } catch (error) {
    next(error);
  }
};

// Visualizar uma tarefa por ID
exports.visualizar = async (req, res, next) => {
  const tarefaId = req.params.id;
  const usuarioId = req.params.usuarioId; 

  try {
    const tarefa = await tarefaService.listarTarefaPorId(tarefaId, usuarioId); 
    res.json(tarefa); // Retorna a tarefa encontrada
  } catch (error) {
    next(error);
  }
};

// atualizar uma tarefa
exports.atualizar = async (req, res, next) => {
  try {
    const { titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId } = req.body;
    const tarefaId = req.params.id;

    const tarefaAtualizada = await tarefaService.atualizarTarefa(tarefaId, usuarioId, { 
      titulo, 
      descricao, 
      dataVencimento, 
      prioridade, 
      usuarioId, 
      categoriaId 
    });

    res.json({ message: 'Tarefa atualizada com sucesso.', tarefa: tarefaAtualizada });
  } catch (error) {
    next(error);
  }
};

// exxcluir uma tarefa
exports.excluir = async (req, res, next) => {
  const { id } = req.params;
  const { confirmarExclusao } = req.body;

  if (!confirmarExclusao) {
    return res.status(400).json({ message: 'Confirmação de exclusão necessária.' });
  }

  try {
    await tarefaService.excluirTarefa(id);
    res.json({ message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    next(error);
  }
};

// Verificar tarefas vencidas ou próximas do vencimento TENHO QUE VER ISSO DEPOIS
exports.notificarTarefasVencidas = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;

  try {
    const tarefasVencidas = await tarefaService.verificarTarefasVencidas(usuarioId);
    res.json({ tarefasVencidas });
  } catch (error) {
    next(error);
  }
};
