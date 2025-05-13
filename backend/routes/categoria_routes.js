// backend/routes/categoria_routes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria_controller');

// Obter uma categoria específica por ID (para um dado usuário)
// GET /api/categorias/:usuarioId/:id
router.get('/:usuarioId/:id', categoriaController.getCategoryById);

// Listar todas as categorias de um usuário
// GET /api/categorias/:usuarioId
router.get('/:usuarioId', categoriaController.getCategories);

// Criar nova categoria
// POST /api/categorias
router.post('/', categoriaController.createCategory);

// Atualizar uma categoria existente
// PUT /api/categorias/:id
router.put('/:id', categoriaController.updateCategory);

// Excluir uma categoria
// DELETE /api/categorias/:id
router.delete('/:id', categoriaController.deleteCategory);

module.exports = router;
