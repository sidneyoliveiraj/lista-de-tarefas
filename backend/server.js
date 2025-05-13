require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// importa conexão Sequelize
const sequelize = require('./config/database');
// importa middleware de erro
const errorMiddleware = require('./middleware/error_middleware');

// importa rotas
const autenticacaoRoutes = require('./routes/autenticacao_routes');
const usuarioRoutes       = require('./routes/usuario_routes');
const categoriaRoutes     = require('./routes/categoria_routes');
const tarefaRoutes        = require('./routes/tarefa_routes');

// middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // libera o React
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
app.use('/api/autenticacao', autenticacaoRoutes);
app.use('/api/usuarios',       usuarioRoutes);
app.use('/api/categorias',     categoriaRoutes);
app.use('/api/tarefas',        tarefaRoutes);

// tratamento de erros
app.use(errorMiddleware);

// sincroniza e inicia o servidor
const PORT = process.env.PORT || 3001;
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao sincronizar:', err));
