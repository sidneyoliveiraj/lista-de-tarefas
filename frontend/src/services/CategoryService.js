// frontend/src/services/CategoryService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/categorias';  // note a porta 3001, onde seu back está rodando

// buscar todas as categorias de um usuário
// rota GET /api/categorias/:usuarioId
const getAll = async (usuarioId) => {
  const response = await axios.get(`${API_URL}/${usuarioId}`);
  return response.data;
};

// criar nova categoria
// rota POST /api/categorias
const create = async ({ nome, usuarioId }) => {
  const response = await axios.post(API_URL, { nome, usuarioId });
  return response.data;
};

// deletar categoria
// rota DELETE /api/categorias/:id
const remove = async (categoriaId) => {
  const response = await axios.delete(`${API_URL}/${categoriaId}`);
  return response.data;
};

export default {
  getAll,
  create,
  remove,
};
