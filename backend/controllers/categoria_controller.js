const categoriaService = require('../services/categoria_service');

exports.createCategory = async (req, res, next) => {
  const { nome, usuarioId } = req.body;
  try {
    const categoria = await categoriaService.criarCategoria(nome, usuarioId);
    res.status(201).json(categoria);
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;
  try {
    const categorias = await categoriaService.listarCategorias(usuarioId);
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  const categoriaId = req.params.id;
  try {
    const categoria = await categoriaService.obterCategoriaPorId(categoriaId);
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  const categoriaId = req.params.id;
  const { nome } = req.body;
  try {
    const categoriaAtualizada = await categoriaService.atualizarCategoria(categoriaId, nome);
    res.json(categoriaAtualizada);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoriaId = req.params.id;
  try {
    const response = await categoriaService.excluirCategoria(categoriaId);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
