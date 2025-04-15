const tarefaService = require('../services/tarefa_service');

// Criar nova tarefa
exports.criar = async (req, res, next) => {
  try {
    const { titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId } = req.body;
    
    // Criar a tarefa com os dados fornecidos
    const tarefa = await tarefaService.criarTarefa({ 
      titulo, 
      descricao, 
      dataVencimento, 
      prioridade, 
      usuarioId, 
      categoriaId 
    });

    res.status(201).json(tarefa);  // Retorna a tarefa criada
  } catch (error) {
    next(error);  // Passa o erro para o middleware de erro
  }
};

// Listar todas as tarefas de um usuário
exports.listar = async (req, res, next) => {
  try {
    const tarefas = await tarefaService.listarTarefas(req.params.usuarioId);
    res.json(tarefas);  // Retorna todas as tarefas
  } catch (error) {
    next(error);
  }
};

// Atualizar uma tarefa
exports.atualizar = async (req, res, next) => {
  try {
    const { titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId } = req.body;
    const tarefaId = req.params.id;  // Pega o ID da tarefa a ser atualizada

    // Atualizar a tarefa com os novos dados
    const tarefaAtualizada = await tarefaService.atualizarTarefa(tarefaId, { 
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

// Excluir uma tarefa
exports.excluir = async (req, res, next) => {
  const { id } = req.params;
  const { confirmarExclusao } = req.body;

  // Verifica se a confirmação de exclusão foi enviada
  if (!confirmarExclusao) {
    return res.status(400).json({ message: 'Confirmação de exclusão necessária.' });
  }

  try {
    // Excluir a tarefa
    await tarefaService.excluirTarefa(id);
    res.json({ message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    next(error);
  }
};

// Verificar tarefas vencidas ou próximas do vencimento
exports.notificarTarefasVencidas = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;

  try {
    // Chama o serviço para verificar as tarefas vencidas
    const tarefasVencidas = await tarefaService.verificarTarefasVencidas(usuarioId);
    res.json({ tarefasVencidas });  // Retorna as tarefas vencidas ou próximas
  } catch (error) {
    next(error);
  }
};
