// routes/categoria_routes.js
const { Router } = require('express');
const router = Router();

// Importa o controller de categoria
const categoriaController = require('../controllers/categoria_controller');

// Rotas de categoria
router.get('/', categoriaController.getCategories);
router.get('/:id', categoriaController.getCategoryById);
router.post('/', categoriaController.createCategory);
router.put('/:id', categoriaController.updateCategory);
router.delete('/:id', categoriaController.deleteCategory);

module.exports = router;
