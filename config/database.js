// ================================
// CONFIGURAÇÃO E GERENCIAMENTO DE BANCO DE DADOS
// ================================

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'animais_perdidos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

// Testar conexão ao iniciar
pool.getConnection().then(connection => {
  console.log('✅ Conectado ao banco de dados MySQL');
  connection.release();
}).catch(err => {
  console.error('❌ Erro ao conectar ao banco de dados:', err.message);
  process.exit(1);
});

module.exports = pool;
