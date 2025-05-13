const Categoria = require('../models/categoria_model');

const criarCategoria = async (nome, usuarioId) => {
  const categoriaExistente = await Categoria.findOne({ where: { nome, usuarioId } });
  if (categoriaExistente) throw new Error('Categoria já existe.');
  const categoria = await Categoria.create({ nome, usuarioId });
  return categoria;
};

const listarCategorias = async (usuarioId) => {
  const categorias = await Categoria.findAll({ where: { usuarioId } });
  return categorias;
};

const obterCategoriaPorId = async (categoriaId) => {
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');
  return categoria;
};

const atualizarCategoria = async (categoriaId, nome) => {
  const categoria = await Categoria.findByPk(categoriaId);
  if (!categoria) throw new Error('Categoria não encontrada.');
  categoria.nome = nome;
  await categoria.save();
  return categoria;
};

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
  excluirCategoria,
};
