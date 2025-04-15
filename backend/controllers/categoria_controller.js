const categoriaService = require('../services/categoria_service');

// Criar nova categoria
exports.createCategory = async (req, res, next) => {
  const { nome, usuarioId } = req.body;
  try {
    const categoria = await categoriaService.criarCategoria(nome, usuarioId);
    res.status(201).json(categoria); // Categoria criada com sucesso
  } catch (error) {
    next(error); // Passa para o middleware de erro
  }
};

// Listar todas as categorias de um usuário
exports.getCategories = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;
  try {
    const categorias = await categoriaService.listarCategorias(usuarioId);
    res.json(categorias); // Retorna todas as categorias do usuário
  } catch (error) {
    next(error);
  }
};

// Obter uma categoria específica por ID
exports.getCategoryById = async (req, res, next) => {
  const categoriaId = req.params.id;
  try {
    const categoria = await categoriaService.obterCategoriaPorId(categoriaId);
    res.json(categoria); // Retorna a categoria encontrada
  } catch (error) {
    next(error);
  }
};

// Atualizar uma categoria
exports.updateCategory = async (req, res, next) => {
  const categoriaId = req.params.id;
  const { nome } = req.body;
  try {
    const categoriaAtualizada = await categoriaService.atualizarCategoria(categoriaId, nome);
    res.json(categoriaAtualizada); // Retorna a categoria atualizada
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
