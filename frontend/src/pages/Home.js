// frontend/src/pages/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../services/CategoryService';
import TaskService from '../services/TaskService';
import AuthService from '../services/AuthService';
import '../App.css';

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaTarefa, setNovaTarefa] = useState({});         // para criação
  const [editando, setEditando] = useState({});             // { [tarefaId]: texto }
  const [filtro, setFiltro] = useState('');
  const usuarioId = localStorage.getItem('usuarioId');
  const navigate = useNavigate();

  // busca categorias + tarefas
  const fetchCategories = useCallback(async () => {
    const cats = await CategoryService.getAll(usuarioId);
    const withTasks = await Promise.all(
      cats.map(async cat => {
        const tasks = await TaskService.list(usuarioId, cat.id);
        return { ...cat, tarefas: tasks };
      })
    );
    setCategorias(withTasks);
  }, [usuarioId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // logout
  const logout = () => {
    AuthService.logout();
    navigate('/login');
  };

  // adicionar categoria
  const handleAddCategory = async () => {
    if (!novaCategoria.trim()) return;
    await CategoryService.create({ nome: novaCategoria, usuarioId });
    setNovaCategoria('');
    fetchCategories();
  };

  // adicionar tarefa
  const handleAddTask = async categoriaId => {
    const titulo = (novaTarefa[categoriaId] || '').trim();
    if (!titulo) return;
    await TaskService.create({ titulo, usuarioId, categoriaId });
    setNovaTarefa(prev => ({ ...prev, [categoriaId]: '' }));
    fetchCategories();
  };

  // toggle de concluído
  const toggleDone = async tarefa => {
    await TaskService.update(tarefa.id, usuarioId, { status: !tarefa.status });
    fetchCategories();
  };

  // excluir tarefa
  const deleteTask = async tarefaId => {
    await TaskService.remove(tarefaId);
    fetchCategories();
  };

  // iniciar edição
  const startEdit = (tarefa) => {
    setEditando(prev => ({ ...prev, [tarefa.id]: tarefa.titulo }));
  };
  // cancelar edição
  const cancelEdit = (tarefaId) => {
    setEditando(prev => {
      const next = { ...prev };
      delete next[tarefaId];
      return next;
    });
  };
  // salvar edição
  const saveEdit = async (tarefa) => {
    const novoTitulo = (editando[tarefa.id] || '').trim();
    if (!novoTitulo) return;
    await TaskService.update(tarefa.id, usuarioId, { titulo: novoTitulo });
    setEditando(prev => {
      const next = { ...prev };
      delete next[tarefa.id];
      return next;
    });
    fetchCategories();
  };

  // filtro em memória
  const categoriasFiltradas = categorias.filter(cat =>
    cat.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="header">
        <h1>Lista de Tarefas</h1>
        <button onClick={logout}>Sair</button>
      </header>

      {/* criar nova categoria */}
      <div className="form-add-category">
        <input
          type="text"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={e => setNovaCategoria(e.target.value)}
        />
        <button onClick={handleAddCategory}>Adicionar Categoria</button>
      </div>

      {/* busca de categorias */}
      <div className="search-add" style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Buscar categoria..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
      </div>

      {/* listagem */}
      <div className="lista-categorias">
        {categoriasFiltradas.map(cat => (
          <div key={cat.id} className="categoria">
            <h2>{cat.nome}</h2>

            {/* nova tarefa */}
            <div className="search-add">
              <input
                type="text"
                placeholder="Nova tarefa"
                value={novaTarefa[cat.id] || ''}
                onChange={e =>
                  setNovaTarefa(prev => ({ ...prev, [cat.id]: e.target.value }))
                }
              />
              <button onClick={() => handleAddTask(cat.id)}>+</button>
            </div>

            {/* tarefas */}
            <ul>
              {cat.tarefas.map(task => (
                <li key={task.id} style={{ display: 'flex', alignItems: 'center' }}>
                  {/* checkbox */}
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => toggleDone(task)}
                  />

                  {/* se estiver editando, mostra input + botões */}
                  {editando[task.id] != null ? (
                    <>
                      <input
                        type="text"
                        value={editando[task.id]}
                        onChange={e =>
                          setEditando(prev => ({ ...prev, [task.id]: e.target.value }))
                        }
                        style={{ marginLeft: 8, flexGrow: 1 }}
                      />
                      <button onClick={() => saveEdit(task)}>Salvar</button>
                      <button onClick={() => cancelEdit(task.id)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          marginLeft: 8,
                          textDecoration: task.status ? 'line-through' : 'none',
                          flexGrow: 1
                        }}
                      >
                        {task.titulo}
                      </span>
                      <button onClick={() => startEdit(task)}>✏️</button>
                      <button onClick={() => deleteTask(task.id)}>🗑️</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
