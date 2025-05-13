const { Router } = require('express');
const categoriaController = require('../controllers/categoria_controller');
const router = Router();

router.get('/', categoriaController.getCategories);
router.get('/:id', categoriaController.getCategoryById);
router.post('/', categoriaController.createCategory);
router.put('/:id', categoriaController.updateCategory);
router.delete('/:id', categoriaController.deleteCategory);

module.exports = router;
