// server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const vagasRoutes = require('./routes/vagas');
const app = express();

app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/albergue', { useNewUrlParser: true, useUnifiedTopology: true });

// Rotas
app.use('/api', authRoutes);
app.use('/api', vagasRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
