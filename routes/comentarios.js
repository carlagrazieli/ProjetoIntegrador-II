// ================================
// ROTAS DE COMENTÁRIOS
// ================================

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// ================================
// ADICIONAR COMENTÁRIO
// ================================

router.post('/', async (req, res) => {
  try {
    const { animal_id, usuario_id, comentario } = req.body;

    if (!animal_id || !usuario_id || !comentario) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'INSERT INTO comentarios (animal_id, usuario_id, comentario) VALUES (?, ?, ?)',
        [animal_id, usuario_id, comentario]
      );

      res.status(201).json({
        message: 'Comentário adicionado com sucesso',
        comentarioId: result.insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
});

// ================================
// LISTAR COMENTÁRIOS DE UM ANIMAL
// ================================

router.get('/animal/:animal_id', async (req, res) => {
  try {
    const { animal_id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [comentarios] = await connection.query(
        `SELECT c.id, c.comentario, c.data_comentario, u.nome as usuario_nome
         FROM comentarios c
         JOIN usuarios u ON c.usuario_id = u.id
         WHERE c.animal_id = ?
         ORDER BY c.data_comentario DESC`,
        [animal_id]
      );

      res.json(comentarios);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    res.status(500).json({ error: 'Erro ao listar comentários' });
  }
});

// ================================
// DELETAR COMENTÁRIO
// ================================

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'DELETE FROM comentarios WHERE id = ?',
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Comentário não encontrado' });
      }

      res.json({ message: 'Comentário deletado com sucesso' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    res.status(500).json({ error: 'Erro ao deletar comentário' });
  }
});

module.exports = router;
