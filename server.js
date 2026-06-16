// ================================
// SERVIDOR EXPRESS - CONFIGURAÇÃO PRINCIPAL
// ================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mysql = require('mysql2/promise');

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname)));

// ================================
// POOL DE CONEXÃO COM BANCO DE DADOS
// ================================

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'animais_perdidos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportar pool para uso em outros módulos
module.exports.pool = pool;

// ================================
// IMPORTAR ROTAS
// ================================

const usuariosRoutes = require('./routes/usuarios');
const animaisRoutes = require('./routes/animais');
const comentariosRoutes = require('./routes/comentarios');
const notificacoesRoutes = require('./routes/notificacoes');
const favoritosRoutes = require('./routes/favoritos');

// ================================
// USAR ROTAS
// ================================

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/animais', animaisRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/notificacoes', notificacoesRoutes);
app.use('/api/favoritos', favoritosRoutes);

// ================================
// ROTA DE TESTE
// ================================

app.get('/api/status', (req, res) => {
  res.json({ status: 'Servidor está rodando', timestamp: new Date() });
});

// ================================
// TRATAMENTO DE ERROS
// ================================

app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
    status: err.status || 500
  });
});

// ================================
// INICIAR SERVIDOR
// ================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Banco de dados: ${process.env.DB_NAME || 'animais_perdidos'}`);
});
