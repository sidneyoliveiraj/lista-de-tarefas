const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario_model');

const Categoria = sequelize.define('Categoria', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    tableName: 'categorias'
});

// Associação
Categoria.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Categoria, { foreignKey: 'usuarioId' });

module.exports = Categoria;
