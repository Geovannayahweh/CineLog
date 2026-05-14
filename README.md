# CineLog

Aplicação web para explorar um catálogo de filmes com destaque na página inicial, busca por título, filtro por gênero, sistema de comentários e avaliações da comunidade.

Projeto desenvolvido em React para apresentação da disciplina de Web Development: Framework.

## Funcionalidades

### Etapa 1 (RA1)
- Catálogo de filmes com cards visuais
- Busca por título em tempo real
- Filtro por gênero
- Seção de equipe com links reais do GitHub e LinkedIn
- Layout responsivo com identidade visual própria

### Etapa 2 (RA2) — Interatividade e Integração
- **Página de detalhes do filme** acessível ao clicar em qualquer card
- **Sistema de comentários e avaliações** (nota de 0 a 10) por filme
- **Cadastro e login** de usuários (autenticação para comentar; navegação livre sem login)
- **Senhas com hash SHA-256** (Web Crypto API nativa, sem dependências)
- **Consumo de API REST externa** (TMDB) para exibir filmes em alta na Home
- **Camada de services** estruturada com Promises assíncronas (`authService`, `commentsService`, `tmdbService`)
- **Gerenciamento de estado global** via Context API (`AuthContext`)
- **Hook customizado** de formulários (`useForm`) com validação reutilizável
- **Validações de formulário** com feedback visual de erros (campos tocados, mensagens contextuais)
- **Estados de loading e erro** em todas as requisições
- Persistência de usuários e comentários no `localStorage` via wrapper seguro

## Tecnologias utilizadas

- React 19
- React Router DOM 7 (com rota dinâmica `/filmes/:id`)
- Context API + Custom Hooks (gerenciamento de estado)
- Fetch API (chamadas HTTP)
- Web Crypto API (hash de senha)
- CSS por componente/página (sem libs externas)
- Create React App (react-scripts)

## Como rodar localmente

Pré-requisito: Node.js e npm instalados.

1. Instale as dependências

   ```
   npm install
   ```

2. Rode em modo de desenvolvimento

   ```
   npm start
   ```

3. Acesse no navegador

   ```
   http://localhost:3000
   ```

## Scripts disponíveis

- Iniciar em desenvolvimento: `npm start`
- Rodar testes: `npm test -- --watchAll=false`
- Gerar build de produção: `npm run build`

## Estrutura do projeto

```
src/
├── components/          → Componentes reutilizáveis de UI
│   ├── Header, Footer, Layout, MovieCard, TeamMember
│   ├── Modal, AuthModal           (RA2 — modal genérico e auth)
│   ├── CommentsSection            (RA2 — feedback dos filmes)
│   └── TrendingSection            (RA2 — consumo TMDB)
├── context/
│   └── AuthContext.js             (RA2 — estado global de auth)
├── hooks/
│   └── useForm.js                 (RA2 — hook de formulários)
├── services/                      (RA2 — camada de serviços)
│   ├── authService.js             → simula API REST de auth
│   ├── commentsService.js         → simula API REST de comentários
│   └── tmdbService.js             → consome API pública TMDB
├── utils/                         (RA2 — utilitários)
│   ├── hash.js                    → SHA-256 nativo
│   ├── storage.js                 → wrapper de localStorage
│   └── validators.js              → validações de formulário
├── data/                          → catálogo local de filmes
├── pages/                         → Home, Movies, MovieDetail, Equipe
└── styles/                        → estilos globais
```

## Arquitetura: como cada exigência do RA2 é cumprida

| Exigência | Onde está implementado |
|---|---|
| Formulários e manipulação de dados | `AuthModal.js`, `CommentsSection.js` + hook `useForm.js` |
| Gerenciamento de estado | Context API em `AuthContext.js` + `useState`/`useEffect` em componentes |
| Consumo de APIs (HTTP) | `tmdbService.js` usa `fetch` real contra `api.themoviedb.org` |
| Estruturação de serviços | Pasta `services/` com 3 services isolados, retornando Promises |
| Usabilidade | Loading states, mensagens de erro inline, validação em tempo real, feedback de sucesso, confirmações |
| Responsividade | Media queries em todos os componentes (`@media (max-width: 768px)` etc.) |

## Equipe

- Delrick Ramos — [GitHub](https://github.com/delrickramos) · [LinkedIn](https://www.linkedin.com/in/delrickramos/)
- Clara Amazonas — [GitHub](https://github.com/claraamz) · [LinkedIn](https://www.linkedin.com/in/clara-amazonas-pereira-da-costa-79445635a/)
- Geovanna Soto — [GitHub](https://github.com/Geovannayahweh) · [LinkedIn](https://www.linkedin.com/in/geovanna-soto-4aaa9b233/)

## Status do projeto

Etapa 2 concluída. Build de produção compila sem warnings.
