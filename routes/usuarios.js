// ================================
// ROTAS DE USUÁRIOS
// ================================

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { validarEmail, hashSenha, compararSenha } = require('../utils/validacao');

// ================================
// CRIAR NOVO USUÁRIO
// ================================

router.post('/registrar', async (req, res) => {
  try {
    const { nome, email, telefone, endereco, cidade, estado } = req.body;

    // Validar dados obrigatórios
    if (!nome || !email || !telefone || !cidade) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    // Validar email
    if (!validarEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const connection = await pool.getConnection();

    try {
      // Verificar se email já existe
      const [usuarios] = await connection.query(
        'SELECT id FROM usuarios WHERE email = ?',
        [email]
      );

      if (usuarios.length > 0) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      // Inserir novo usuário
      const [result] = await connection.query(
        'INSERT INTO usuarios (nome, email, telefone, endereco, cidade, estado) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, email, telefone, endereco, cidade, estado]
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        userId: result.insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// ================================
// OBTER INFORMAÇÕES DO USUÁRIO
// ================================

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [usuarios] = await connection.query(
        'SELECT id, nome, email, telefone, endereco, cidade, estado, data_cadastro FROM usuarios WHERE id = ?',
        [id]
      );

      if (usuarios.length === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(usuarios[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// ================================
// ATUALIZAR USUÁRIO
// ================================

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, endereco, cidade, estado } = req.body;

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'UPDATE usuarios SET nome = ?, telefone = ?, endereco = ?, cidade = ?, estado = ? WHERE id = ?',
        [nome, telefone, endereco, cidade, estado, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({ message: 'Usuário atualizado com sucesso' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// ================================
// LISTAR TODOS OS USUÁRIOS
// ================================

router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    try {
      const [usuarios] = await connection.query(
        'SELECT id, nome, email, cidade, data_cadastro FROM usuarios LIMIT 50'
      );

      res.json(usuarios);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

module.exports = router;
