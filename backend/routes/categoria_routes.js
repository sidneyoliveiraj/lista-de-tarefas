// backend/routes/categoria_routes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria_controller');

// listar todas as categorias de um usuário
// GET /api/categorias/:usuarioId
router.get('/:usuarioId', categoriaController.getCategories);

// obter uma categoria específica por ID
// GET /api/categorias/:id
router.get('/detalhe/:id', categoriaController.getCategoryById);

// criar nova categoria
// POST /api/categorias
router.post('/', categoriaController.createCategory);

// atualizar uma categoria existente
// PUT /api/categorias/:id
router.put('/:id', categoriaController.updateCategory);

// excluir uma categoria
// DELETE /api/categorias/:id
router.delete('/:id', categoriaController.deleteCategory);

module.exports = router;
