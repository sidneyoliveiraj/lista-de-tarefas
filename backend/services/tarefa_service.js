const { Op } = require('sequelize');
const Tarefa = require('../models/tarefa_model');
const Categoria = require('../models/categoria_model');

const criarTarefa = async ({ titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId }) => {
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');
  return Tarefa.create({ titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId });
};

const listarTarefas = (usuarioId, { categoriaId, prioridade }) => Tarefa.findAll({
  where: { usuarioId, ...(categoriaId && { categoriaId }), ...(prioridade && { prioridade }) },
  include: [{ model: Categoria, as: 'categoria', attributes: ['id', 'nome'] }],
});

const listarTarefaPorId = async (id, usuarioId) => {
  const tarefa = await Tarefa.findOne({ where: { id, usuarioId }, include: [{ model: Categoria, as: 'categoria', attributes: ['id', 'nome'] }] });
  if (!tarefa) throw new Error('Tarefa não encontrada.');
  return tarefa;
};

const atualizarTarefa = async (id, usuarioId, dados) => {
  await Tarefa.update(dados, { where: { id, usuarioId } });
  return Tarefa.findOne({ where: { id, usuarioId } });
};

const excluirTarefa = async (id, usuarioId) => {
  const tarefa = await Tarefa.findOne({ where: { id, usuarioId } });
  if (!tarefa) throw new Error('Tarefa não encontrada.');
  await tarefa.destroy();
};

const verificarTarefasVencidas = usuarioId => Tarefa.findAll({
  where: { usuarioId, dataVencimento: { [Op.lte]: new Date() } },
});

module.exports = {
  criarTarefa,
  listarTarefas,
  listarTarefaPorId,
  atualizarTarefa,
  excluirTarefa,
  verificarTarefasVencidas,
};
