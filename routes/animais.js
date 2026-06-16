// ================================
// ROTAS DE ANIMAIS
// ================================

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// ================================
// CRIAR NOVO ANIMAL (CADASTRO)
// ================================

router.post('/cadastrar', async (req, res) => {
  try {
    const {
      usuario_id,
      categoria_id,
      tipo_registro,
      nome,
      descricao,
      raca,
      cor,
      idade,
      genero,
      tamanho,
      data_evento,
      local_evento,
      latitude,
      longitude,
      cidade,
      estado,
      telefone_contato,
      foto_url
    } = req.body;

    if (!usuario_id || !categoria_id || !tipo_registro || !descricao || !data_evento || !local_evento || !cidade) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        `INSERT INTO animais (usuario_id, categoria_id, tipo_registro, nome, descricao, raca, cor, idade, 
         genero, tamanho, data_evento, local_evento, latitude, longitude, cidade, estado, telefone_contato, foto_url, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ativo')`,
        [usuario_id, categoria_id, tipo_registro, nome, descricao, raca, cor, idade, genero, tamanho,
         data_evento, local_evento, latitude, longitude, cidade, estado, telefone_contato, foto_url]
      );

      res.status(201).json({
        message: 'Animal cadastrado com sucesso',
        animalId: result.insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
    res.status(500).json({ error: 'Erro ao cadastrar animal' });
  }
});

// ================================
// LISTAR ANIMAIS (COM FILTROS)
// ================================

router.get('/', async (req, res) => {
  try {
    const { tipo, cidade, categoria, status, page = 1, limit = 12 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM animais WHERE 1=1';
    const params = [];

    if (tipo) {
      query += ' AND tipo_registro = ?';
      params.push(tipo);
    }
    if (cidade) {
      query += ' AND cidade = ?';
      params.push(cidade);
    }
    if (categoria) {
      query += ' AND categoria_id = ?';
      params.push(categoria);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY data_cadastro DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const connection = await pool.getConnection();

    try {
      const [animais] = await connection.query(query, params);
      res.json(animais);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao listar animais:', error);
    res.status(500).json({ error: 'Erro ao listar animais' });
  }
});

// ================================
// OBTER DETALHES DO ANIMAL
// ================================

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();

    try {
      const [animais] = await connection.query(
        `SELECT a.*, c.nome as categoria_nome, u.nome as usuario_nome, u.telefone as usuario_telefone
         FROM animais a
         JOIN categorias c ON a.categoria_id = c.id
         JOIN usuarios u ON a.usuario_id = u.id
         WHERE a.id = ?`,
        [id]
      );

      if (animais.length === 0) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }

      // Incrementar visualizações
      await connection.query('UPDATE animais SET visualizacoes = visualizacoes + 1 WHERE id = ?', [id]);

      res.json(animais[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao buscar animal:', error);
    res.status(500).json({ error: 'Erro ao buscar animal' });
  }
});

// ================================
// BUSCA POR TEXTO (FULL TEXT SEARCH)
// ================================

router.get('/buscar/texto', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Termo de busca muito curto' });
    }

    const connection = await pool.getConnection();

    try {
      const [animais] = await connection.query(
        `SELECT * FROM animais 
         WHERE MATCH(descricao, nome, raca) AGAINST(? IN BOOLEAN MODE)
         ORDER BY data_cadastro DESC
         LIMIT 20`,
        [q]
      );

      res.json(animais);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao buscar:', error);
    res.status(500).json({ error: 'Erro ao buscar' });
  }
});

// ================================
// ATUALIZAR STATUS DO ANIMAL
// ================================

router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['ativo', 'encontrado', 'resolvido', 'inativo'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'UPDATE animais SET status = ? WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Animal não encontrado' });
      }

      res.json({ message: 'Status atualizado com sucesso' });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

// ================================
// ANIMAIS POR LOCALIZAÇÃO (MAPA)
// ================================

router.get('/localizacao/mapa', async (req, res) => {
  try {
    const { lat, lng, raio = 50 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude e longitude são obrigatórias' });
    }

    const connection = await pool.getConnection();

    try {
      // Calcular distância usando fórmula de Haversine (aprox. em km)
      const [animais] = await connection.query(
        `SELECT *,
         (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * 
          cos(radians(longitude) - radians(?)) + 
          sin(radians(?)) * sin(radians(latitude)))) AS distancia
         FROM animais
         WHERE tipo_registro IN ('perdido', 'encontrado')
         HAVING distancia < ?
         ORDER BY distancia ASC
         LIMIT 50`,
        [lat, lng, lat, raio]
      );

      res.json(animais);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Erro ao buscar por localização:', error);
    res.status(500).json({ error: 'Erro ao buscar por localização' });
  }
});

module.exports = router;
