// ================================
// ROTAS DE FAVORITOS
// ================================

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// ================================
// ADICIONAR AOS FAVORITOS
// ================================

router.post('/', async (req, res) => {
  try {
    const { usuario_id, animal_id } = req.body;

    if (!usuario_id || !animal_id) {
      return res.status(400).json({ error: 'usuario_id e animal_id são obrigatórios' });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'INSERT INTO favoritos (usuario_id, animal_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE animal_id = animal_id',
        [usuario_id, animal_id]
      );

      res.status(201).json({
        message: 'Adicionado aos favoritos com sucesso',
        favoritoId: result.insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Este animal já está nos favoritos' });
    }
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
});

// ================================
// LISTAR FAVORITOS DO USUÁRIO
// ================================

router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [favoritos] = await connection.query(
        `SELECT a.* FROM animais a
         JOIN favoritos f ON a.id = f.animal_id
         WHERE f.usuario_id = ?
         ORDER BY f.data_favorito DESC`,
        [usuario_id]
      );

      res.json(favoritos);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
    res.status(500).json({ error: 'Erro ao listar favoritos' });
  }
});

// ================================
// REMOVER DOS FAVORITOS
// ================================

router.delete('/', async (req, res) => {
  try {
    const { usuario_id, animal_id } = req.body;

    if (!usuario_id || !animal_id) {
      return res.status(400).json({ error: 'usuario_id e animal_id são obrigatórios' });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'DELETE FROM favoritos WHERE usuario_id = ? AND animal_id = ?',
        [usuario_id, animal_id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Favorito não encontrado' });
      }

      res.json({ message: 'Removido dos favoritos com sucesso' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
});

module.exports = router;
