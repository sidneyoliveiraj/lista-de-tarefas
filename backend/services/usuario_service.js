const Usuario = require('../models/usuario_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  

//cadastrar um novo usuário
const cadastrarUsuario = async (nome, email, senha) => {
  // Verificar se o email já está cadastrado
  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) throw new Error('Email já cadastrado.');

  // criptografar a senha
  const senhaHash = await bcrypt.hash(senha, 10);

  // criar novo usuário no banco de dados
  const usuario = await Usuario.create({ nome, email, senha: senhaHash });

  return usuario;
};

// login de usuário
const loginUsuario = async (email, senha) => {
  // Buscar o usuário pelo email
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Email ou senha incorretos.');

  // Comparar a senha fornecida com a senha do banco
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('Email ou senha incorretos.');

  // Gerar um token 
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { usuario, token };  
};

// atualizar os dados do usuário
const atualizarUsuario = async (usuarioId, nome, email, senhaAtual, novaSenha) => {
  // Encontrar o usuário pelo ID
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario) throw new Error('Usuário não encontrado.');

  // Verificar  senha atual esta correta
  const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
  if (!senhaValida) throw new Error('Senha atual incorreta.');

  // atualize a senha
  const senhaHash = novaSenha ? await bcrypt.hash(novaSenha, 10) : usuario.senha;

  // Atualizando os dados do usuário
  usuario.nome = nome;
  usuario.email = email;
  usuario.senha = senhaHash;

  // salvar as alterações
  await usuario.save();

  return usuario;
};

module.exports = { cadastrarUsuario, loginUsuario, atualizarUsuario };
