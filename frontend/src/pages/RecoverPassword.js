// src/pages/RecoverPassword.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function RecoverPassword() {
  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', textAlign: 'center' }}>
      <h2>Recuperar senha</h2>
      <p>A rota ainda não está implementada, mas você poderá inserir seu e-mail aqui para receber instruções.</p>
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label>E-mail</label><br/>
          <input type="email" required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit">Enviar instruções</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        <Link to="/login">← Voltar ao Login</Link>
      </p>
    </div>
  );
}
