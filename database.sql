-- ================================
-- CRIAÇÃO DO BANCO DE DADOS
-- ================================

CREATE DATABASE IF NOT EXISTS animais_perdidos;
USE animais_perdidos;

-- ================================
-- TABELA: USUÁRIOS
-- ================================

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  endereco VARCHAR(255),
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_cidade (cidade)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================
-- TABELA: CATEGORIAS DE ANIMAIS
-- ================================

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) UNIQUE NOT NULL,
  descricao VARCHAR(255),
  icone VARCHAR(50),
  INDEX idx_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir categorias padrão
INSERT INTO categorias (nome, descricao, icone) VALUES
('Cachorro', 'Cães perdidos e encontrados', 'fas fa-dog'),
('Gato', 'Gatos perdidos e encontrados', 'fas fa-cat'),
('Pássaro', 'Pássaros perdidos e encontrados', 'fas fa-dove'),
('Coelho', 'Coelhos perdidos e encontrados', 'fas fa-rabbit'),
('Outro', 'Outros animais de estimação', 'fas fa-paw');

-- ================================
-- TABELA: ANIMAIS (Principal)
-- ================================

CREATE TABLE animais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  categoria_id INT NOT NULL,
  tipo_registro ENUM('perdido', 'encontrado') NOT NULL,
  nome VARCHAR(100),
  descricao LONGTEXT NOT NULL,
  raca VARCHAR(100),
  cor VARCHAR(100),
  idade VARCHAR(50),
  genero ENUM('macho', 'femea', 'indefinido') DEFAULT 'indefinido',
  tamanho ENUM('pequeno', 'medio', 'grande') DEFAULT 'medio',
  foto_url VARCHAR(500),
  data_evento DATE NOT NULL,
  local_evento VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(2),
  telefone_contato VARCHAR(20),
  status ENUM('ativo', 'encontrado', 'resolvido', 'inativo') DEFAULT 'ativo',
  visualizacoes INT DEFAULT 0,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id),
  INDEX idx_tipo (tipo_registro),
  INDEX idx_status (status),
  INDEX idx_cidade (cidade),
  INDEX idx_data_cadastro (data_cadastro),
  INDEX idx_coordenadas (latitude, longitude),
  FULLTEXT INDEX ft_descricao (descricao, nome, raca)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================
-- TABELA: COMENTÁRIOS/RESPOSTAS
-- ================================

CREATE TABLE comentarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL,
  usuario_id INT NOT NULL,
  comentario LONGTEXT NOT NULL,
  data_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_animal (animal_id),
  INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================
-- TABELA: HISTÓRICO DE ATUALIZAÇÕES
-- ================================

CREATE TABLE historico_atualizacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL,
  usuario_id INT,
  tipo_atualizacao VARCHAR(100),
  descricao VARCHAR(255),
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_animal (animal_id),
  INDEX idx_data (data_atualizacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================
-- TABELA: NOTIFICAÇÕES
-- ================================

CREATE TABLE notificacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  animal_id INT,
  tipo_notificacao VARCHAR(100),
  mensagem LONGTEXT,
  lida BOOLEAN DEFAULT FALSE,
  data_notificacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE SET NULL,
  INDEX idx_usuario (usuario_id),
  INDEX idx_lida (lida)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================
-- TABELA: FAVORITOS
-- ================================

CREATE TABLE favoritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  animal_id INT NOT NULL,
  data_favorito TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorito (usuario_id, animal_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
  INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ================================
-- TRIGGERS
-- ================================

-- Atualizar histórico quando animal é atualizado
DELIMITER //
CREATE TRIGGER trigger_atualizar_historico
AFTER UPDATE ON animais
FOR EACH ROW
BEGIN
  INSERT INTO historico_atualizacoes (animal_id, tipo_atualizacao, descricao)
  VALUES (NEW.id, 'atualizacao', CONCAT('Animal atualizado: ', NEW.nome));
END //
DELIMITER ;

-- Criar notificação quando novo animal perdido é cadastrado
DELIMITER //
CREATE TRIGGER trigger_notificar_novo_animal
AFTER INSERT ON animais
FOR EACH ROW
BEGIN
  IF NEW.tipo_registro = 'perdido' THEN
    INSERT INTO notificacoes (usuario_id, animal_id, tipo_notificacao, mensagem)
    SELECT usuarios.id, NEW.id, 'novo_animal_perdido', 
           CONCAT('Novo animal perdido: ', NEW.nome, ' em ', NEW.cidade)
    FROM usuarios WHERE usuarios.cidade = NEW.cidade;
  END IF;
END //
DELIMITER ;
