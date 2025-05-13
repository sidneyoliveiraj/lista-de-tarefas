// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './Login.css'; // reaproveita o estilo do login

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await AuthService.register(nome, email, senha);
      // após cadastro bem-sucedido, redireciona para o login
      navigate('/login');
    } catch (err) {
      // exibe a mensagem de erro retornada pelo servidor
      setError(err.response?.data?.error || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <h1>Lista de Tarefas</h1>
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />

        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>

        <div className="links">
          <Link to="/login">← Voltar ao Login</Link>
        </div>
      </form>
    </div>
  );
}
