# 📚 Guia de Setup - Como Rodar o Projeto

## ✅ Passo 1: Verificar Pré-requisitos

Você precisa ter instalado:
- **Node.js** (versão 16 ou superior)
- **npm** (vem junto com Node.js)

### Para verificar se tem tudo instalado:

Abra o terminal/prompt de comando e digite:

```bash
node --version
npm --version
```

Se aparecerem versões, está OK! Se não, baixe em: https://nodejs.org/

---

## 🚀 Passo 2: Clonar o Repositório

```bash
git clone https://github.com/carlagrazieli/ProjetoIntegrador-II.git
cd ProjetoIntegrador-II
```

Ou se preferir, baixe o ZIP e extraia.

---

## 📦 Passo 3: Instalar Dependências

No terminal, na pasta do projeto, digite:

```bash
npm install
```

Isso vai:
- Ler o `package.json`
- Baixar React, Tailwind, Vite e outras bibliotecas
- Criar a pasta `node_modules/`

⏱️ **Isso pode levar 2-5 minutos** (depende da sua internet)

---

## 🎯 Passo 4: Rodar o Projeto

Ainda no terminal, digite:

```bash
npm run dev
```

Isso vai:
- Iniciar um servidor local
- Abrir o navegador automaticamente
- Mostrar algo como: `http://localhost:5173`

✨ **Pronto! Seu projeto está rodando!**

---

## 🔄 Durante o Desenvolvimento

Enquanto o comando `npm run dev` está rodando:
- **Edite os arquivos** em `src/`
- **Salve** (Ctrl+S ou Cmd+S)
- **O navegador atualiza automaticamente** (Hot Reload)

Para parar o servidor: **Ctrl+C** no terminal

---

## 🏗️ Passo 5: Preparar para Produção

Quando terminar de desenvolver:

```bash
npm run build
```

Isso cria uma pasta `dist/` com o projeto otimizado para produção.

---

## 📁 Estrutura de Arquivos Explicada

```
ProjetoIntegrador-II/
├── node_modules/          ← Dependências (criado pelo npm install)
├── src/
│   ├── components/        ← Componentes React
│   │   ├── Header.jsx
│   │   ├── ActionCards.jsx
│   │   ├── AnimalsGrid.jsx
│   │   ├── MapSection.jsx
│   │   ├── Footer.jsx
│   │   └── MainContent.jsx
│   ├── App.jsx           ← Componente principal
│   ├── main.jsx          ← Entrada React
│   └── index.css         ← Estilos Tailwind
├── index.html            ← HTML raiz
├── package.json          ← Dependências do projeto
├── vite.config.js        ← Configuração Vite
├── tailwind.config.js    ← Configuração Tailwind
└── postcss.config.js     ← Configuração PostCSS
```

---

## 🐛 Troubleshooting

### ❌ "npm command not found"
→ Node.js não está instalado. Baixe em https://nodejs.org/

### ❌ "Port 5173 already in use"
→ Outra aplicação está usando essa porta. Feche outras abas/terminals ou use:
```bash
npm run dev -- --port 3000
```

### ❌ "Cannot find module..."
→ Execute novamente:
```bash
npm install
```

### ❌ Arquivo não atualiza no navegador
→ Feche o terminal com Ctrl+C e rode `npm run dev` novamente

---

## 💡 Próximos Passos

1. **Customize as cores** em `tailwind.config.js`
2. **Adicione novas páginas** em `src/components/`
3. **Conecte com API** usando `axios`
4. **Deploy** na Vercel, Netlify ou GitHub Pages

---

## 📞 Dúvidas?

Se tiver problemas, verifique:
- [Documentação React](https://react.dev)
- [Documentação Tailwind](https://tailwindcss.com)
- [Documentação Vite](https://vitejs.dev)
