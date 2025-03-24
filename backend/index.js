require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('rodando com sucesso 🚀');
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco estabelecida com sucesso!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco:', err);
  });
