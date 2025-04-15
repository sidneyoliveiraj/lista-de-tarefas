const categoriaService = require('../services/categoria_service');

// criar nova categoria
exports.createCategory = async (req, res, next) => {
  const { nome, usuarioId } = req.body;
  try {
    const categoria = await categoriaService.criarCategoria(nome, usuarioId);
    res.status(201).json(categoria); 
  } catch (error) {
    next(error); 
  }
};

// listar todas as categorias de um usuário
exports.getCategories = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;
  try {
    const categorias = await categoriaService.listarCategorias(usuarioId);
    res.json(categorias); 
  } catch (error) {
    next(error);
  }
};

// categoria específica por ID
exports.getCategoryById = async (req, res, next) => {
  const categoriaId = req.params.id;
  try {
    const categoria = await categoriaService.obterCategoriaPorId(categoriaId);
    res.json(categoria); 
  } catch (error) {
    next(error);
  }
};

// att uma categoria
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

// Excluir uma categoria
exports.deleteCategory = async (req, res, next) => {
  const categoriaId = req.params.id;
  try {
    const response = await categoriaService.excluirCategoria(categoriaId);
    res.json(response); // Confirma a exclusão
  } catch (error) {
    next(error);
  }
};
