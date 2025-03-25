// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tarefasdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexão com o PostgreSQL estabelecida com sucesso!'))
  .catch(err => console.error('Erro ao conectar com o PostgreSQL:', err));

module.exports = sequelize;
