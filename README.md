# Roteiros Sustentáveis

## Descrição

**Roteiros Sustentáveis** é uma aplicação web de turismo sustentável que permite aos utilizadores descobrir, criar e gerir roteiros turísticos por diferentes cidades.

Atualmente, a aplicação inclui roteiros em destaque para **Braga** e **Lisboa**, permitindo também que cada utilizador crie os seus próprios percursos, organize pontos de interesse, consulte detalhes dos roteiros e guarde roteiros favoritos.

O objetivo do projeto é promover uma experiência de descoberta mais consciente, valorizando o turismo local, os percursos pedonais e a exploração de locais de interesse com menor impacto ambiental.

---

## ODS Associado

### ODS 8 — Trabalho Digno e Crescimento Económico

Este projeto contribui para o **ODS 8** ao incentivar o turismo local sustentável, promovendo a descoberta de cidades, pontos de interesse e experiências que valorizam os territórios, dinamizam a economia local e incentivam formas de turismo mais responsáveis.

---

## Funcionalidades

- Registo e login de utilizadores
- Visualização de roteiros disponíveis
- Consulta de detalhes de cada roteiro
- Criação de novos roteiros
- Edição de roteiros
- Eliminação de roteiros
- Adição de pontos de interesse a cada roteiro
- Organização de pontos de interesse
- Sistema de favoritos
- Separação entre frontend e backend
- Deploy do frontend e backend

---

## Tecnologias Utilizadas

### Frontend
- Angular
- TypeScript
- HTML
- CSS

### Backend
- Node.js
- Express
- TypeScript

### Base de Dados e Autenticação
- Supabase

### Testes e Deploy
- Vitest
- GitHub Actions (CI/CD)
- Vercel (Frontend)
- Render (Backend)

---

## Estrutura do Projeto

```bash
projeto_final_roteiros_sustentaveis/
│
├── frontend/        # Aplicação Angular
├── backend/         # API Node.js + Express
└── .github/         # Workflows de CI/CD
```

---

## Como correr o projeto localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/mafaldasampaiomoura-cmyk/projeto_final_roteiros_sustentaveis.git
cd projeto_final_roteiros_sustentaveis
```

### 2. Configurar e correr o backend

```bash
cd backend
npm install
npm run dev
```

O backend ficará disponível em:

```bash
http://localhost:3001
```

### 3. Criar o ficheiro `.env` no backend

Dentro da pasta `backend`, cria um ficheiro chamado `.env` com este conteúdo:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
ADMIN_EMAIL=your_admin_email
```

### 4. Configurar e correr o frontend

Abre outro terminal e executa:

```bash
cd frontend
npm install
ng serve
```

O frontend ficará disponível em:

```bash
http://localhost:4200
```

### 5. Configurar a ligação à API no frontend

No ficheiro de environment do frontend, a API deve apontar para:

```ts
apiUrl: 'http://localhost:3001/api'
```

---

## Endpoints principais da API

### Health Check

```http
GET /api/health
```

### Autenticação

```http
POST /api/auth/register
POST /api/auth/login
```

### Roteiros

```http
GET /api/routes
GET /api/routes/:id
POST /api/routes
PUT /api/routes/:id
DELETE /api/routes/:id
```

### Pontos de Interesse

```http
GET /api/route-points/:routeId
POST /api/route-points
DELETE /api/route-points/:id
```

### Favoritos

```http
GET /api/favourites/:userId
POST /api/favourites
DELETE /api/favourites/:id
```

---

## Deploy

O projeto encontra-se preparado para deploy separado:

- **Frontend:** Vercel
- **Backend:** Render

---

## Testes

O frontend inclui testes unitários com **Vitest**.

Para correr os testes no frontend:

```bash
cd frontend
npm run test
```

---

## Objetivo Académico

Este projeto foi desenvolvido no âmbito do **Projeto Final de Programação**, com o objetivo de aplicar conhecimentos de desenvolvimento frontend e backend, autenticação, bases de dados, organização de API, deploy e integração entre sistemas.

---

## Autora

**Mafalda Moura**