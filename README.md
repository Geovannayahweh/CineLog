# CineLog

Aplicação web para explorar um catálogo de filmes com destaque na página inicial, busca por título e filtro por gênero.

Projeto desenvolvido em React para apresentação da disciplina de Web Development: Framework.

## Preview das funcionalidades

- Catálogo de filmes com cards visuais
- Busca por título em tempo real
- Filtro por gênero
- Seção de equipe com links reais do GitHub e LinkedIn
- Layout responsivo com identidade visual própria

## Tecnologias utilizadas

- React
- React Router DOM
- CSS (arquivos por componente/página)
- Create React App (react-scripts)

## Como rodar localmente

Pré-requisito: Node.js e npm instalados.

1. Entre na pasta do projeto

2. Instale as dependências

	npm install

3. Rode em modo de desenvolvimento

	npm start

4. Acesse no navegador

	http://localhost:3000

## Scripts disponíveis

- Iniciar em desenvolvimento:

	npm start

- Rodar testes:

	npm test -- --watchAll=false

- Gerar build de produção:

	npm run build

## Estrutura resumida

src/
- components/ -> Header, Footer, Layout, MovieCard, TeamMember
- data/ -> base local de filmes
- pages/ -> Home, Movies, Equipe
- styles/ -> estilos globais

public/
- index.html
- manifest.json

## Equipe

- Delrick Ramos
  - GitHub: https://github.com/delrickramos
  - LinkedIn: https://www.linkedin.com/in/delrickramos/
- Clara Amazonas
  - GitHub: https://github.com/claraamz
  - LinkedIn: https://www.linkedin.com/in/clara-amazonas-pereira-da-costa-79445635a/
- Geovanna Soto
  - GitHub: https://github.com/Geovannayahweh
  - LinkedIn: https://www.linkedin.com/in/geovanna-soto-4aaa9b233/

## Status do projeto

Pronto para demonstração acadêmica, com build e testes básicos validados.
