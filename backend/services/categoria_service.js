const Categoria = require('../models/categoria_model');

// Função para criar uma nova categoria
const criarCategoria = async (nome, usuarioId) => {
  // Verifica se a categoria já existe para o usuário
  const categoriaExistente = await Categoria.findOne({ where: { nome, usuarioId } });
  if (categoriaExistente) throw new Error('Categoria já existe.');

  // Cria a categoria
  const categoria = await Categoria.create({ nome, usuarioId });

  console.log('Categoria criada:', categoria); // Log para verificar se a criação foi bem-sucedida.

  return categoria;
};

// Função para listar todas as categorias de um usuário
const listarCategorias = async (usuarioId) => {
  const categorias = await Categoria.findAll({ where: { usuarioId } });
  return categorias;
};

// Função para obter uma categoria específica por ID
const obterCategoriaPorId = async (categoriaId) => {
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');
  return categoria;
};

// Função para atualizar uma categoria
const atualizarCategoria = async (categoriaId, nome) => {
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');

  categoria.nome = nome;

  await categoria.save();
  return categoria;
};

// Função para excluir uma categoria
const excluirCategoria = async (categoriaId) => {
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');

  await categoria.destroy();
  return { message: 'Categoria deletada com sucesso!' };
};

module.exports = {
  criarCategoria,
  listarCategorias,
  obterCategoriaPorId,
  atualizarCategoria,
  excluirCategoria
};
