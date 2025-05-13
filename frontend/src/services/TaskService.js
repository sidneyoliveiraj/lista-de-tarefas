// frontend/src/services/TaskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tarefas';

async function list(usuarioId, categoriaId = null) {
  const url = `${API_URL}/${usuarioId}`;
  const response = await axios.get(url, { params: { categoriaId } });
  return response.data;
}

async function create({ titulo, descricao = '', dataVencimento = null, prioridade = null, usuarioId, categoriaId }) {
  const response = await axios.post(API_URL, { titulo, descricao, dataVencimento, prioridade, usuarioId, categoriaId });
  return response.data;
}

async function update(id, usuarioId, updates) {
  const response = await axios.put(`${API_URL}/${id}`, { ...updates, usuarioId });
  return response.data;
}

async function remove(id) {
  const response = await axios.delete(`${API_URL}/${id}`, { data: { confirmarExclusao: true } });
  return response.data;
}

const TaskService = { list, create, update, remove };
export default TaskService;
