import axios from 'axios';

const API_URL = 'http://localhost:3001/api/autenticacao';

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

const AuthService = { login, logout };
export default AuthService;
