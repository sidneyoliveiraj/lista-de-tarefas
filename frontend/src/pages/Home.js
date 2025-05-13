// frontend/src/pages/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import CategoryService from '../services/CategoryService';
import './Home.css';   // crie este CSS conforme abaixo

export default function Home() {
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuarioId');

  // estados
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState('');
  const [modoAddCat, setModoAddCat] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState('');

  // função para carregar as categorias do back
  const fetchCategories = useCallback(async () => {
    try {
      const data = await CategoryService.getAll(usuarioId);
      setCategorias(data);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
    }
  }, [usuarioId]);

  // ao montar, busca as categorias
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // adicionar categoria
  const handleAddCategory = async () => {
    if (!novaCategoria.trim()) return;
    try {
      await CategoryService.create({ nome: novaCategoria.trim(), usuarioId });
      setNovaCategoria('');
      setModoAddCat(false);
      fetchCategories();
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
    }
  };

  // deletar categoria
  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta categoria?')) return;
    try {
      await CategoryService.remove(id);
      fetchCategories();
    } catch (err) {
      console.error('Erro ao deletar categoria:', err);
    }
  };

  // logout
  const logout = () => {
    AuthService.logout();
    navigate('/login');
  };

  // filtro local de busca
  const categoriasFiltradas = categorias.filter(cat =>
    cat.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="header">
        <h1>Lista de Tarefas</h1>
        <button onClick={logout}>Sair</button>
      </header>

      <div className="search-add">
        <button className="btn-circle" onClick={() => setModoAddCat(!modoAddCat)}>＋</button>
        <input
          type="text"
          placeholder="Buscar categoria..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      {modoAddCat && (
        <div className="form-add-category">
          <input
            type="text"
            placeholder="Nova categoria"
            value={novaCategoria}
            onChange={e => setNovaCategoria(e.target.value)}
          />
          <button onClick={handleAddCategory}>Adicionar</button>
        </div>
      )}

      <div className="lista-categorias">
        {categoriasFiltradas.map(cat => (
          <div key={cat.id} className="categoria">
            <h2>
              {cat.nome}
              <button
                className="btn-delete"
                onClick={() => handleDeleteCategory(cat.id)}
                title="Excluir categoria"
              >
                🗑
              </button>
            </h2>
            {/* Aqui virá a listagem de tarefas de cada categoria, mais à frente */}
          </div>
        ))}

        {categoriasFiltradas.length === 0 && (
          <p>Nenhuma categoria encontrada.</p>
        )}
      </div>
    </div>
  );
}
