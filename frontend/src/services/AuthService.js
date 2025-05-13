// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/autenticacao'; 
// (confirme se seu backend está na porta 3001)

const login = async (email, senha) => {
  const response = await axios.post(`${API_URL}/login`, { email, senha });
  const { usuario, token } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('usuarioId', usuario.id);
  return usuario;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuarioId');
};

const register = (nome, email, senha) => {
  // invoca POST /api/autenticacao/cadastro
  return axios.post(`${API_URL}/cadastro`, { nome, email, senha });
};

export default { login, logout, register };
