const { Router } = require('express');
const router = Router();

// importa o controller de categoria
const categoriaController = require('../controllers/categoria_controller');

// Rotas de categoria
router.get('/', categoriaController.getCategories); // Lista todas as categorias
router.get('/:id', categoriaController.getCategoryById); // Obter uma categoria pelo ID
router.post('/', categoriaController.createCategory); // Criar uma nova categoria
router.put('/:id', categoriaController.updateCategory); // Atualizar uma categoria
router.delete('/:id', categoriaController.deleteCategory); // Excluir uma categoria

module.exports = router;
