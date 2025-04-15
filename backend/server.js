require('dotenv').config();  

const express = require('express');
const app = express();

// Importa Sequelize
const sequelize = require('./config/database');

// tratamento de erros
const errorMiddleware = require('./middleware/error_middleware');

// Importa as rotas
const autenticacaoRoutes = require('./routes/autenticacao_routes');
const usuarioRoutes = require('./routes/usuario_routes');
const categoriaRoutes = require('./routes/categoria_routes');
const tarefaRoutes = require('./routes/tarefa_routes');

// Middlewares para interpretar JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas 
app.use('/api/autenticacao', autenticacaoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/tarefas', tarefaRoutes);

// erros
app.use(errorMiddleware);

// Inicia o servidor
sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Servidor rodando na porta 3000 e tabelas sincronizadas com sucesso.');
    });
}).catch((error) => {
    console.error('Erro ao sincronizar com o banco de dados:', error);
});
