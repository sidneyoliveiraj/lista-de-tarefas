const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario_model');
const Categoria = require('./categoria_model');

const Tarefa = sequelize.define('Tarefa', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dataVencimento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    prioridade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id'
        }
    }
}, {
    tableName: 'tarefas'
});

// Associações
Tarefa.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Tarefa, { foreignKey: 'usuarioId' });

Tarefa.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Tarefa, { foreignKey: 'categoriaId' });

module.exports = Tarefa;
