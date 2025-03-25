const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Categoria = require('./categoria');

const Tarefa = sequelize.define('Tarefa', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  data_vencimento: {
    type: DataTypes.DATE
  },
  prioridade: {
    type: DataTypes.STRING
  },
  concluida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  atualizado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'tarefa',
  timestamps: false
});


Tarefa.belongsTo(Usuario, { foreignKey: 'user_id', as: 'usuario' });

Tarefa.belongsTo(Categoria, { foreignKey: 'category_id', as: 'categoria' });

module.exports = Tarefa;
