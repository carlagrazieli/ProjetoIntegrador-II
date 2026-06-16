# 🐾 Site de Animais Perdidos

Plataforma moderna e responsiva para ajudar na localização e cuidado de animais perdidos, desenvolvida com **React 18**, **Tailwind CSS** e **Vite**.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Sobre o Projeto

Este projeto é uma **plataforma web** para conectar pessoas que perderam seus animais de estimação com aquelas que encontraram animais perdidos. A interface foi completamente reformulada com componentes React modernos e estilos Tailwind CSS para proporcionar uma experiência do usuário superior.

### ✨ Características Principais

- ✅ **Interface Responsiva** - Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Componentes Reutilizáveis** - Arquitetura React bem organizada
- ✅ **Design Moderno** - Tailwind CSS com cores vibrantes e intuitivas
- ✅ **Ícones de Qualidade** - Lucide React para ícones SVG escaláveis
- ✅ **Performance** - Otimizado com Vite para desenvolvimento e produção rápidos
- ✅ **Hot Reload** - Atualizações instantâneas durante desenvolvimento
- ✅ **SEO Friendly** - Meta tags e estrutura HTML semântica

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **React** | 18.2.0 | Biblioteca JavaScript para UI |
| **Tailwind CSS** | 3.3.0 | Framework CSS utilitário |
| **Vite** | 4.0+ | Build tool e dev server |
| **Lucide React** | 0.263.1 | Ícones SVG modernos |
| **Axios** | 1.6.0 | Cliente HTTP |
| **JavaScript (JSX)** | ES6+ | Linguagem de programação |

---

## 🚀 Como Começar

### ✅ Pré-requisitos

- **Node.js** 16+ ([Baixar](https://nodejs.org/))
- **npm** (vem com Node.js)
- Git (opcional, para clonar)

### 📥 Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/carlagrazieli/ProjetoIntegrador-II.git
cd ProjetoIntegrador-II

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm run dev

# 4. Abra no navegador
# http://localhost:5173
```

📖 **Para instruções detalhadas**, veja [SETUP.md](SETUP.md)

---

## 📦 Scripts Disponíveis

```bash
# 🚀 Inicia servidor de desenvolvimento
npm run dev

# 🏗️ Cria build otimizado para produção
npm run build

# 👀 Visualiza o build de produção localmente
npm run preview
```

---

## 📁 Estrutura do Projeto

```
ProjetoIntegrador-II/
│
├── 📂 src/
│   ├── components/
│   │   ├── Header.jsx           # 🎯 Cabeçalho com navegação
│   │   ├── MainContent.jsx      # 📄 Conteúdo principal (layout)
│   │   ├── ActionCards.jsx      # 💳 Cards "Perdi" e "Encontrei"
│   │   ├── AnimalsGrid.jsx      # 🐾 Grid de animais
│   │   ├── MapSection.jsx       # 🗺️ Mapa e filtros
│   │   └── Footer.jsx           # 📍 Rodapé com links
│   │
│   ├── App.jsx                  # 🎨 Componente raiz
│   ├── main.jsx                 # ⚙️ Ponto de entrada React
│   └── index.css                # 🎨 Estilos Tailwind
│
├── index.html                   # 📝 Template HTML
├── package.json                 # 📦 Dependências
├── vite.config.js              # ⚡ Configuração Vite
├── tailwind.config.js          # 🎨 Configuração Tailwind
├── postcss.config.js           # 🔧 Configuração PostCSS
├── .gitignore                  # 🚫 Arquivos ignorados
├── README.md                   # 📖 Este arquivo
└── SETUP.md                    # 📚 Guia de setup
```

---

## 🎨 Componentes Principais

### 🎯 **Header.jsx**
Cabeçalho responsivo com:
- Logo da plataforma
- Navegação desktop/mobile
- Menu hamburger para celular

### 💳 **ActionCards.jsx**
Dois cards de ação principais:
- "Perdi um Animal" - Cadastrar pet perdido
- "Encontrei um Animal" - Denunciar achado

### 🐾 **AnimalsGrid.jsx**
Grid responsivo exibindo:
- Animais perdidos com badge vermelho
- Animais encontrados com badge azul
- Imagem, nome e localização
- Botão para ver detalhes

### 🗺️ **MapSection.jsx**
Seção de mapa com:
- Filtros por tipo, localização e data
- Placeholder para Google Maps/Leaflet
- Legenda com cores de marcadores
- Botões de alerta e compartilhamento

### 📍 **Footer.jsx**
Rodapé completo com:
- Links rápidos
- Informações de contato
- Ícones de redes sociais
- Copyright

---

## 📱 Design Responsivo

O projeto utiliza **Tailwind CSS** para responsividade:

| Breakpoint | Tamanho | Uso |
|-----------|--------|-----|
| **Mobile** | < 640px | Layout em coluna única |
| **Tablet** | 640px - 1024px | 2 colunas |
| **Desktop** | > 1024px | 3 colunas com mapa sticky |

```html
<!-- Exemplo Tailwind -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 coluna mobile, 2 tablet, 3 desktop -->
</div>
```

---

## 🔄 Fluxo de Desenvolvimento

```
┌─────────────────────┐
│  Editar arquivo     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Salvar (Ctrl+S)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Vite detecta       │
│  mudança            │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Hot Module Reload  │
│  (HMR)              │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Navegador atualiza │
│  instantaneamente ✨│
└─────────────────────┘
```

---

## 🚀 Deploy

### **Vercel** (Recomendado - Melhor para React)

```bash
# 1. Faça push para GitHub
git push origin main

# 2. Acesse https://vercel.com
# 3. Conecte seu repositório GitHub
# 4. Deploy automático na próxima mudança!
```

### **Netlify**

```bash
# 1. Crie build
npm run build

# 2. Arraste pasta 'dist/' para Netlify
# ou use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### **GitHub Pages**

```bash
# 1. Crie build
npm run build

# 2. Faça upload da pasta 'dist/'
# Configure em: Settings > Pages > Deploy from branch
```

---

## 🔗 Próximas Melhorias

- [ ] 🗺️ Integração com Google Maps API
- [ ] 🔐 Sistema de autenticação (Firebase/Auth0)
- [ ] 📸 Upload de imagens (Cloudinary/AWS S3)
- [ ] 💬 Chat em tempo real entre usuários
- [ ] 🔔 Notificações push para novos animais
- [ ] 🗄️ Backend com API REST (Node.js/Express)
- [ ] 📊 Dashboard administrativo
- [ ] 🌍 Múltiplos idiomas (i18n)

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| `npm: command not found` | Instale [Node.js](https://nodejs.org/) |
| Port 5173 em uso | `npm run dev -- --port 3000` |
| Módulos não encontrados | Execute `npm install` novamente |
| Estilos não aparecem | Limpe cache: **Ctrl+Shift+R** (Windows/Linux) ou **Cmd+Shift+R** (Mac) |
| Componentes não atualizam | Reinicie: **Ctrl+C** no terminal e rode `npm run dev` |
| Build gera erro | Delete `node_modules/` e `package-lock.json`, depois `npm install` |

Veja [SETUP.md](SETUP.md) para troubleshooting mais detalhado.

---

## 📚 Documentação Útil

- 📖 [Documentação React](https://react.dev)
- 🎨 [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- ⚡ [Documentação Vite](https://vitejs.dev/guide/)
- 🎯 [Lucide React Icons](https://lucide.dev)
- 📦 [Axios Documentation](https://axios-http.com/)

---

## 📝 Licença

Este projeto está sob licença **MIT**. Você é livre para usar, modificar e distribuir este código.

```
MIT License - Copiar, modificar e usar livremente!
```

---

## 👨‍💻 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feature/MinhaFeature
   ```
3. **Commit** suas mudanças:
   ```bash
   git commit -m 'Adicionar MinhaFeature'
   ```
4. **Push** para a branch:
   ```bash
   git push origin feature/MinhaFeature
   ```
5. **Abra um Pull Request**

---

## 📞 Contato e Suporte

- 📧 **Email**: contato@animaispa.com
- 📱 **Telefone**: (11) 9999-9999
- 🐛 **Reportar Bug**: [Abrir Issue](https://github.com/carlagrazieli/ProjetoIntegrador-II/issues)
- 💡 **Sugerir Feature**: [Discussões](https://github.com/carlagrazieli/ProjetoIntegrador-II/discussions)

---

## 🙏 Agradecimentos

Obrigado por usar este projeto! Agradecimentos especiais a:

- ⚛️ **React.js** - Melhor biblioteca para construir UIs
- 🎨 **Tailwind CSS** - Estilização rápida e eficiente
- ⚡ **Vite** - Build tool revolucionário
- 🎯 **Lucide React** - Ícones lindos e escaláveis

---

## 📊 Estatísticas do Projeto

- **Linguagens**: HTML, CSS, JavaScript (JSX)
- **Componentes**: 6 componentes React
- **Linhas de Código**: ~1000+
- **Dependências**: 6 principais
- **Tempo de Build**: < 500ms

---

<div align="center">

### **Made with ❤️ for lost animals** 🐾

**Ajudando a reunir famílias com seus animais de estimação**

[⬆ Voltar ao Topo](#-site-de-animais-perdidos) | [SETUP.md](SETUP.md) | [Issues](https://github.com/carlagrazieli/ProjetoIntegrador-II/issues)

---

⭐ Se este projeto foi útil para você, considere dar uma **estrela**! ⭐

</div>
