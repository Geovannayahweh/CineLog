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
- TMDB API (catálogo externo)
- Firebase Realtime Database (persistência NoSQL)

## Integração externa e persistência

O projeto busca o catálogo principal da TMDB API e, ao clicar em "Salvar no banco", persiste filmes no Firebase Realtime Database.

Se a TMDB não estiver configurada, o sistema usa automaticamente a base local (`src/data/movies.js`) como fallback.

### Configuração rápida

1. Crie um arquivo `.env` na raiz do projeto.
2. Preencha:

	REACT_APP_TMDB_TOKEN=seu_token_tmdb
	REACT_APP_FIREBASE_DB_URL=https://seu-projeto-default-rtdb.firebaseio.com

## Configuração detalhada

O passo a passo abaixo foi feito para quem nunca integrou API externa nem usou Firebase.

### 1. Criar conta e pegar token da TMDB

1. Acesse: https://www.themoviedb.org/
2. Crie uma conta e confirme seu email.
3. Vá em perfil > Settings > API.
4. Copie o **Read Access Token (v4 auth)**.
5. Guarde esse valor, ele será usado como `REACT_APP_TMDB_TOKEN`.

### 2. Criar projeto no Firebase e habilitar Realtime Database

1. Acesse: https://console.firebase.google.com/
2. Clique em **Create a project** e finalize o assistente.
3. No menu lateral, abra **Build > Realtime Database**.
4. Clique em **Create Database**.
5. Escolha a região e inicie em **test mode** para desenvolvimento.
6. Copie a URL do banco, por exemplo:

	https://seu-projeto-default-rtdb.firebaseio.com

7. Esse valor será usado como `REACT_APP_FIREBASE_DB_URL`.

### 3. Criar arquivo `.env` no projeto

1. Na raiz do projeto (mesmo nível do `package.json`), crie um arquivo chamado `.env`.
2. Cole exatamente:

	REACT_APP_TMDB_TOKEN=COLE_AQUI_O_TOKEN_DA_TMDB
	REACT_APP_FIREBASE_DB_URL=https://seu-projeto-default-rtdb.firebaseio.com

3. Salve o arquivo.

### 4. Rodar o projeto

1. Instale dependências:

	npm install

2. Inicie a aplicação:

	npm start

3. Abra no navegador:

	http://localhost:3000

### 5. Como testar se deu certo

1. Abra a página de filmes.
2. Verifique se aparece **Fonte de dados: TMDB API**.
3. Clique em **Salvar no banco** em qualquer card.
4. No Firebase Realtime Database, confira se foi criado um registro em `favorites`.

### 6. Problemas comuns

- Se aparecer fallback local, o token da TMDB está ausente ou inválido.
- Se falhar ao salvar no banco, a URL do Firebase está errada ou as regras estão bloqueando escrita.
- Sempre reinicie o `npm start` após alterar o `.env`.

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
