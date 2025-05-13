import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../services/CategoryService';
import AuthService from '../services/AuthService';
import '../App.css';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const usuarioId = localStorage.getItem('usuarioId');
  const navigate = useNavigate();

  const fetchCategories = useCallback(async () => {
    const categorias = await CategoryService.getAll(usuarioId);
    setCategorias(categorias);
  }, [usuarioId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAddCategory = async () => {
    await CategoryService.create({ nome: novaCategoria, usuarioId });
    setNovaCategoria('');
    fetchCategories();
  };

  const logout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Lista de Tarefas</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <div className="search-add">
        <input
          type="text"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
        />
        <button onClick={handleAddCategory}>+</button>
      </div>

      <div className="lista-categorias">
        {categorias.map((cat) => (
          <div key={cat.id} className="categoria">
            <h2>{cat.nome}</h2>
            <ul>
              <li>Ainda não há tarefas.</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
