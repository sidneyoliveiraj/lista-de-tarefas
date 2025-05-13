import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, senha);
      navigate('/home');
    } catch (err) {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1>Lista de Tarefas</h1>
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Usuário:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className="links">
          <Link to="/cadastro">Cadastra-se</Link>
          <Link to="/recuperar-senha">Recuperar senha</Link>
        </div>
      </form>
    </div>
  );
}
