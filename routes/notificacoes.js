// ================================
// ROTAS DE NOTIFICAÇÕES
// ================================

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// ================================
// OBTER NOTIFICAÇÕES DO USUÁRIO
// ================================

router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const { nao_lidas = true } = req.query;

    let query = 'SELECT * FROM notificacoes WHERE usuario_id = ?';
    const params = [usuario_id];

    if (nao_lidas === 'true') {
      query += ' AND lida = false';
    }

    query += ' ORDER BY data_notificacao DESC LIMIT 50';

    const connection = await pool.getConnection();

    try {
      const [notificacoes] = await connection.query(query, params);
      res.json(notificacoes);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao listar notificações:', error);
    res.status(500).json({ error: 'Erro ao listar notificações' });
  }
});

// ================================
// MARCAR NOTIFICAÇÃO COMO LIDA
// ================================

router.put('/:id/lida', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'UPDATE notificacoes SET lida = true WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Notificação não encontrada' });
      }

      res.json({ message: 'Notificação marcada como lida' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao marcar como lida:', error);
    res.status(500).json({ error: 'Erro ao marcar como lida' });
  }
});

// ================================
// CRIAR NOTIFICAÇÃO
// ================================

router.post('/', async (req, res) => {
  try {
    const { usuario_id, animal_id, tipo_notificacao, mensagem } = req.body;

    if (!usuario_id || !tipo_notificacao || !mensagem) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'INSERT INTO notificacoes (usuario_id, animal_id, tipo_notificacao, mensagem) VALUES (?, ?, ?, ?)',
        [usuario_id, animal_id, tipo_notificacao, mensagem]
      );

      res.status(201).json({
        message: 'Notificação criada com sucesso',
        notificacaoId: result.insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    res.status(500).json({ error: 'Erro ao criar notificação' });
  }
});

module.exports = router;
