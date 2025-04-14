const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tarefasdb', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco PostgreSQL realizada com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL:', error);
    }
})();

module.exports = sequelize;
