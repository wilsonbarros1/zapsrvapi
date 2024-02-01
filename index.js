// index.js
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./src/routes/webhookRoutes');

// Carrega as variáveis de ambiente do arquivo .env

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    //console.log(`Requisição recebida em ${new Date()}: ${req.method} ${req.url}`);
    //console.log('Corpo da solicitação:', req.body);
    next();
});

// Configuração de rotas
app.use('/', webhookRoutes);

app.listen(PORT, () => {
    console.log(`API em modo run`);
});
