const { Op } = require('sequelize');
const Tarefa = require('../models/tarefa_model');
const Categoria = require('../models/categoria_model');  // Adicionando a importação

// Função para criar uma nova tarefa
const criarTarefa = async ({ titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId }) => {
  // Verificar se a categoria existe antes de associá-la
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');

  // Criando uma nova tarefa com todos os dados passados
  const tarefa = await Tarefa.create({ 
    titulo, 
    descricao, 
    dataVencimento, 
    prioridade, 
    usuarioId, 
    categoriaId 
  });

  return tarefa;  // Retorna a tarefa criada
};

// Função para listar todas as tarefas de um usuário
const listarTarefas = async (usuarioId) => {
  // Busca todas as tarefas de um usuário com a associação da categoria
  const tarefas = await Tarefa.findAll({
    where: { usuarioId },
    include: [{
      model: Categoria,
      as: 'categoria',
      attributes: ['id', 'nome'], // Inclui a categoria junto com as tarefas
    }],
  });

  return tarefas;
};

// Função para atualizar uma tarefa
const atualizarTarefa = async (id, usuarioId, dados) => {
  // Atualiza a tarefa com os dados fornecidos
  await Tarefa.update(dados, { where: { id, usuarioId } });

  // Retorna a tarefa atualizada
  const tarefaAtualizada = await Tarefa.findOne({ where: { id, usuarioId } });
  return tarefaAtualizada;
};

// Função para excluir uma tarefa
const excluirTarefa = async (id, usuarioId) => {
  // Exclui a tarefa
  await Tarefa.destroy({ where: { id, usuarioId } });

  return { message: 'Tarefa excluída com sucesso!' };  // Retorna mensagem de sucesso
};

// Função para verificar tarefas vencidas ou próximas ao vencimento
const verificarTarefasVencidas = async (usuarioId) => {
  const tarefasVencidas = await Tarefa.findAll({
    where: {
      usuarioId,
      dataVencimento: {
        [Op.lte]: new Date(),  // Verifica se a data de vencimento é anterior ou igual a data atual
      },
    },
  });

  return tarefasVencidas;  // Retorna as tarefas vencidas ou próximas
};

module.exports = { 
  criarTarefa, 
  listarTarefas, 
  atualizarTarefa, 
  excluirTarefa, 
  verificarTarefasVencidas 
};
