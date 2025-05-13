import axios from 'axios';

const API_URL = 'http://localhost:3001/api/categorias';

const getAll = async (usuarioId) => {
  const response = await axios.get(`${API_URL}/${usuarioId}`);
  return response.data;
};

const create = async ({ nome, usuarioId }) => {
  const response = await axios.post(API_URL, { nome, usuarioId });
  return response.data;
};

const CategoryService = { getAll, create };

export default CategoryService;
