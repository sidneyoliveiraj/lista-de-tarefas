// frontend/src/services/TaskService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/tarefas';

async function listar(usuarioId, categoriaId) {
  const response = await axios.get(`${API_URL}/${usuarioId}`, {
    params: { categoriaId },
  });
  return response.data;
}

export default { listar };
