import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../services/CategoryService';
import TaskService    from '../services/TaskService';
import AuthService    from '../services/AuthService';
import '../App.css';

export default function Home() {
  const [categorias,    setCategorias]    = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaTarefa,    setNovaTarefa]    = useState({});
  const [editando,      setEditando]      = useState({});
  const [filtroCat,     setFiltroCat]     = useState('');
  const usuarioId = localStorage.getItem('usuarioId');
  const navigate  = useNavigate();

  // Busca categorias + tarefas
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

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  // Logout
  const logout = () => {
    AuthService.logout();
    navigate('/login');
  };

  // Adicionar categoria
  const handleAddCategory = async () => {
    if (!novaCategoria.trim()) return;
    await CategoryService.create({ nome: novaCategoria, usuarioId });
    setNovaCategoria('');
    fetchCategories();
  };

  // Deletar categoria (sem restrição)
  const handleDeleteCategory = async categoriaId => {
    await CategoryService.remove(categoriaId);
    fetchCategories();
  };

  // Adicionar tarefa
  const handleAddTask = async categoriaId => {
    const titulo = (novaTarefa[categoriaId] || '').trim();
    if (!titulo) return;
    await TaskService.create({ titulo, usuarioId, categoriaId });
    setNovaTarefa(prev => ({ ...prev, [categoriaId]: '' }));
    fetchCategories();
  };

  // Marcar/desmarcar concluído
  const toggleDone = async task => {
    await TaskService.update(task.id, usuarioId, { status: !task.status });
    fetchCategories();
  };

  // Excluir tarefa
  const deleteTask = async tarefaId => {
    await TaskService.remove(tarefaId);
    fetchCategories();
  };

  // Edição inline
  const startEdit = task => {
    setEditando(prev => ({ ...prev, [task.id]: task.titulo }));
  };
  const cancelEdit = taskId => {
    setEditando(prev => {
      const copy = { ...prev }; delete copy[taskId]; return copy;
    });
  };
  const saveEdit = async task => {
    const novo = (editando[task.id] || '').trim();
    if (!novo) return;
    await TaskService.update(task.id, usuarioId, { titulo: novo });
    cancelEdit(task.id);
    fetchCategories();
  };

  // Filtrar categorias pelo nome
  const catsFiltradas = categorias.filter(cat =>
    cat.nome.toLowerCase().includes(filtroCat.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="header">
        <h1>Lista de Tarefas</h1>
        <button onClick={logout}>Sair</button>
      </header>

      {/* Nova categoria */}
      <div className="form-add-category">
        <input
          type="text"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={e => setNovaCategoria(e.target.value)}
        />
        <button onClick={handleAddCategory}>Adicionar Categoria</button>
      </div>

      {/* Busca */}
      <div className="form-search-category">
        <input
          type="text"
          placeholder="Buscar categoria"
          value={filtroCat}
          onChange={e => setFiltroCat(e.target.value)}
        />
      </div>

      {/* Listagem */}
      <div className="lista-categorias">
        {catsFiltradas.map(cat => (
          <div key={cat.id} className="categoria">
            <h2>
              {cat.nome}
              <button onClick={() => handleDeleteCategory(cat.id)}>🗑️</button>
            </h2>

            <div className="form-add-task">
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

            <ul className="task-list">
              {cat.tarefas.map(task => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => toggleDone(task)}
                  />

                  {editando[task.id] != null ? (
                    <>
                      <input
                        className="edit-input"
                        value={editando[task.id]}
                        onChange={e =>
                          setEditando(prev => ({ ...prev, [task.id]: e.target.value }))
                        }
                      />
                      <button onClick={() => saveEdit(task)}>Salvar</button>
                      <button onClick={() => cancelEdit(task.id)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <span
                        className="task-title"
                        style={{
                          textDecoration: task.status ? 'line-through' : 'none'
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
