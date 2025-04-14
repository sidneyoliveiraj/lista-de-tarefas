const { Op } = require('sequelize');
const Tarefa = require('../models/tarefa');

const criarTarefa = (tarefa) => Tarefa.create(tarefa);

const listarTarefas = (usuarioId) => Tarefa.findAll({ where: { usuarioId } });

const atualizarTarefa = (id, usuarioId, dados) =>
  Tarefa.update(dados, { where: { id, usuarioId } });

const excluirTarefa = (id, usuarioId) =>
  Tarefa.destroy({ where: { id, usuarioId } });

// Função para verificar tarefas vencidas ou próximas ao vencimento
const verificarTarefasVencidas = async (usuarioId) => {
  const tarefas = await Tarefa.findAll({
    where: {
      usuarioId: usuarioId,
      dataVencimento: {
        [Op.lte]: new Date()  // Verifica se a tarefa passou da data de vencimento
      }
    }
  });

  return tarefas;
};

module.exports = { criarTarefa, listarTarefas, atualizarTarefa, excluirTarefa, verificarTarefasVencidas };
