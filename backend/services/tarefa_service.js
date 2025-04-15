const { Op } = require('sequelize');
const Tarefa = require('../models/tarefa_model');
const Categoria = require('../models/categoria_model');

// criar uma nova tarefa
const criarTarefa = async ({ titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId }) => {
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');

  const tarefa = await Tarefa.create({ 
    titulo, 
    descricao, 
    dataVencimento, 
    prioridade, 
    usuarioId, 
    categoriaId 
  });

  return tarefa;
};

// listar todas as tarefas de um usuário
const listarTarefas = async (usuarioId, { categoriaId, prioridade }) => {
  const filter = { usuarioId };

  if (categoriaId) filter.categoriaId = categoriaId;
  if (prioridade) filter.prioridade = prioridade;

  const tarefas = await Tarefa.findAll({
    where: filter,
    include: [{
      model: Categoria,
      as: 'categoria',
      attributes: ['id', 'nome'],
    }],
  });

  return tarefas;
};

// visualizar uma tarefa por ID
const listarTarefaPorId = async (id, usuarioId) => {
  const tarefa = await Tarefa.findOne({
    where: { id, usuarioId },
    include: [{
      model: Categoria,
      as: 'categoria',
      attributes: ['id', 'nome'],
    }],
  });

  if (!tarefa) throw new Error('Tarefa não encontrada ou não pertence ao usuário.');

  return tarefa;
};

// atualizar uma tarefa
const atualizarTarefa = async (id, usuarioId, dados) => {
  await Tarefa.update(dados, { where: { id, usuarioId } });
  const tarefaAtualizada = await Tarefa.findOne({ where: { id, usuarioId } });
  return tarefaAtualizada;
};

// excluir uma tarefa
const excluirTarefa = async (id, usuarioId) => {
  await Tarefa.destroy({ where: { id, usuarioId } });
  return { message: 'Tarefa excluída com sucesso!' };
};

// verificar tarefas vencidas ou próximas ao vencimento TENHO QUE VERIFICAR ISSO
const verificarTarefasVencidas = async (usuarioId) => {
  const tarefasVencidas = await Tarefa.findAll({
    where: {
      usuarioId,
      dataVencimento: {
        [Op.lte]: new Date(),
      },
    },
  });

  return tarefasVencidas;
};

module.exports = { 
  criarTarefa, 
  listarTarefas, 
  listarTarefaPorId, 
  atualizarTarefa, 
  excluirTarefa, 
  verificarTarefasVencidas 
};
