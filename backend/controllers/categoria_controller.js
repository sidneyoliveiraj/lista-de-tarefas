// controllers/categoria_controller.js
module.exports = {
  getCategories: (req, res) => {
    res.json({ message: "Lista de categorias" });
  },
  getCategoryById: (req, res) => {
    res.json({ message: "Categoria por ID" });
  },
  createCategory: (req, res) => {
    res.json({ message: "Categoria criada com sucesso!" });
  },
  updateCategory: (req, res) => {
    res.json({ message: "Categoria atualizada com sucesso!" });
  },
  deleteCategory: (req, res) => {
    res.json({ message: "Categoria deletada com sucesso!" });
  }
};
