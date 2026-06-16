# Site de Animais Perdidos - Backend

## 📋 Visão Geral

Backend Node.js/Express para a plataforma de animais perdidos e encontrados, com integração MySQL.

## 🚀 Inicialização

### 1. Instalação de Dependências

```bash
npm install
```

### 2. Configuração do Banco de Dados

1. Crie o banco de dados executando o arquivo `database.sql`:

```bash
mysql -u root -p < database.sql
```

2. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais MySQL:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=animais_perdidos
PORT=3000
```

### 3. Iniciar o Servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Endpoints da API

### Usuários

**Registrar novo usuário**
- `POST /api/usuarios/registrar`
- Body:
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "(11) 9999-9999",
  "endereco": "Rua A, 123",
  "cidade": "São Paulo",
  "estado": "SP"
}
```

**Obter usuário**
- `GET /api/usuarios/:id`

**Atualizar usuário**
- `PUT /api/usuarios/:id`

**Listar usuários**
- `GET /api/usuarios`

### Animais

**Cadastrar novo animal**
- `POST /api/animais/cadastrar`
- Body:
```json
{
  "usuario_id": 1,
  "categoria_id": 1,
  "tipo_registro": "perdido",
  "nome": "Rex",
  "descricao": "Cachorro preto e branco, desapareceu em SP",
  "raca": "Vira-lata",
  "cor": "Preto e branco",
  "idade": "3 anos",
  "genero": "macho",
  "tamanho": "medio",
  "data_evento": "2026-06-16",
  "local_evento": "Rua A, 123",
  "latitude": "-23.5505",
  "longitude": "-46.6333",
  "cidade": "São Paulo",
  "estado": "SP",
  "telefone_contato": "(11) 9999-9999"
}
```

**Listar animais com filtros**
- `GET /api/animais?tipo=perdido&cidade=São Paulo&page=1&limit=12`

**Obter detalhes do animal**
- `GET /api/animais/:id`

**Busca por texto (Full Text Search)**
- `GET /api/animais/buscar/texto?q=cachorro preto`

**Atualizar status**
- `PUT /api/animais/:id/status`
- Body: `{ "status": "encontrado" }`

**Buscar por localização (Mapa)**
- `GET /api/animais/localizacao/mapa?lat=-23.5505&lng=-46.6333&raio=50`

### Comentários

**Adicionar comentário**
- `POST /api/comentarios`
- Body:
```json
{
  "animal_id": 1,
  "usuario_id": 2,
  "comentario": "Vi esse cachorro na região ontem!"
}
```

**Listar comentários**
- `GET /api/comentarios/animal/:animal_id`

**Deletar comentário**
- `DELETE /api/comentarios/:id`

### Notificações

**Obter notificações**
- `GET /api/notificacoes/usuario/:usuario_id`

**Marcar como lida**
- `PUT /api/notificacoes/:id/lida`

**Criar notificação**
- `POST /api/notificacoes`

### Favoritos

**Adicionar aos favoritos**
- `POST /api/favoritos`
- Body: `{ "usuario_id": 1, "animal_id": 5 }`

**Listar favoritos**
- `GET /api/favoritos/usuario/:usuario_id`

**Remover dos favoritos**
- `DELETE /api/favoritos`
- Body: `{ "usuario_id": 1, "animal_id": 5 }`

## 📁 Estrutura de Diretórios

```
├── server.js                 # Arquivo principal
├── package.json              # Dependências
├── .env                      # Variáveis de ambiente
├── database.sql              # Schema do banco de dados
├── config/
│   └── database.js          # Configuração MySQL
├── routes/
│   ├── usuarios.js          # Rotas de usuários
│   ├── animais.js           # Rotas de animais
│   ├── comentarios.js       # Rotas de comentários
│   ├── notificacoes.js      # Rotas de notificações
│   └── favoritos.js         # Rotas de favoritos
└── utils/
    └── validacao.js         # Funções de validação
```

## 🔒 Segurança

- ✅ Validação de entrada em todas as rotas
- ✅ CORS habilitado
- ✅ Prepared statements contra SQL Injection
- ⚠️ TODO: Implementar autenticação JWT
- ⚠️ TODO: Implementar rate limiting
- ⚠️ TODO: Implementar HTTPS em produção

## 🗄️ Banco de Dados

Tabelas principais:
- `usuarios` - Dados dos usuários
- `animais` - Registros de animais perdidos/encontrados
- `categorias` - Tipos de animais
- `comentarios` - Comentários sobre animais
- `notificacoes` - Alertas para usuários
- `favoritos` - Animais favoritos dos usuários
- `historico_atualizacoes` - Histórico de mudanças

## 📝 Exemplo de Uso com cURL

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/usuarios/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "(11) 9999-9999",
    "cidade": "São Paulo",
    "estado": "SP"
  }'

# Listar animais perdidos em São Paulo
curl http://localhost:3000/api/animais?tipo=perdido\&cidade=São%20Paulo

# Obter detalhes de um animal
curl http://localhost:3000/api/animais/1
```

## 🚀 Próximas Melhorias

- [ ] Autenticação JWT
- [ ] Upload de imagens (S3/Firebase)
- [ ] Integração com Google Maps
- [ ] Sistema de reputação de usuários
- [ ] Notificações em tempo real (WebSocket)
- [ ] Integração com redes sociais
- [ ] Dashboard de administrador
- [ ] Testes automatizados

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
