const express = require('express');
const app = express();

// Importa a instância do Sequelize
const sequelize = require('./config/database');

// Middleware de tratamento de erros
const errorMiddleware = require('./middleware/error_middleware');

// Importa as rotas
const autenticacaoRoutes = require('./routes/autenticacao_routes');
const usuarioRoutes = require('./routes/usuario_routes');
const categoriaRoutes = require('./routes/categoria_routes');
const tarefaRoutes = require('./routes/tarefa_routes');

// Middlewares para interpretar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rotas com seus caminhos base
app.use('/api/autenticacao', autenticacaoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/tarefas', tarefaRoutes);

// tratamento de erros
app.use(errorMiddleware);

// inicia o servidor
sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Servidor rodando na porta 3000 e tabelas sincronizadas com sucesso.');
    });
}).catch((error) => {
    console.error('Erro ao sincronizar com o banco de dados:', error);
});
