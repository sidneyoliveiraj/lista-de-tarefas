// frontend/src/services/TaskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tarefas';

// 1️⃣ Listar todas as tarefas de um usuário (filtro opcional por categoria)
async function list(usuarioId, categoriaId = null) {
  const response = await axios.get(`${API_URL}/${usuarioId}`, {
    params: { categoriaId }
  });
  return response.data;
}

// 2️⃣ Criar nova tarefa
async function create({ titulo, usuarioId, categoriaId }) {
  const response = await axios.post(API_URL, { titulo, usuarioId, categoriaId });
  return response.data;
}

// 3️⃣ Atualizar qualquer campo da tarefa 
async function update(id, usuarioId, updates) {
  const response = await axios.put(`${API_URL}/${id}`, { usuarioId, ...updates });
  return response.data;
}

// 4️⃣ Excluir tarefa 
async function remove(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

export default { list, create, update, remove };
