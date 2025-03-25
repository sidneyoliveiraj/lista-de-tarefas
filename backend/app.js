// app.js
const express = require('express');
const app = express();
const sequelize = require('./config/database');

// Importa o model
const Usuario = require('./models/usuario');

app.use(express.json());

// criar o usuario
app.post('/users', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoUsuario = await Usuario.create({ nome, email, senha });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Listas os usuarios
app.get('/users', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// ler usuraaio
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// atualizar usuario
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuario.nome = nome ?? usuario.nome;
    usuario.email = email ?? usuario.email;
    usuario.senha = senha ?? usuario.senha;

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// excluir usuario
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

// Sinc o models com o banco
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => console.error('Erro ao sincronizar modelos:', err));
