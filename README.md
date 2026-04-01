# API - Plataforma de Roteiros Sustentáveis

## Descrição

Esta API permite a gestão de utilizadores, roteiros turísticos e pontos de interesse associados a cada roteiro.

O objetivo é suportar uma aplicação de turismo interativo, onde cada utilizador pode criar e gerir os seus próprios roteiros com vários pontos organizados.

---

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Supabase (Base de Dados + Autenticação)
- GitHub Actions (CI)

---

## Como correr o projeto

1. Clonar o repositório

git clone <url-do-repositorio>

2. Entrar na pasta do backend

cd backend

3. Instalar dependências

npm install

4. Criar ficheiro `.env`

SUPABASE_URL=your_url  
SUPABASE_KEY=your_key  
PORT=3000  

5. Iniciar o servidor

npm run dev

Servidor disponível em:

http://localhost:3000

---

## Estrutura da API

Base URL:

/api

---

## Endpoints

### Health Check

GET /api/health

---

### Auth

POST /api/auth/register  
POST /api/auth/login  

---

### Routes

GET /api/routes  
GET /api/routes/:id  
POST /api/routes  
PUT /api/routes/:id  
DELETE /api/routes/:id  

- GET lista roteiros  
- GET by id devolve roteiro + pontos  
- POST cria roteiro  
- PUT atualiza roteiro  
- DELETE elimina roteiro  

Regras:
- requer autenticação (exceto GET)  
- só o dono pode editar/eliminar  

---

### Route Points

GET /api/route-points  
POST /api/route-points  
DELETE /api/route-points/:id  

- GET lista pontos  
- POST cria ponto  
- DELETE elimina ponto  

Regras:
- requer autenticação (POST, DELETE)  
- só podes mexer nos teus roteiros  

---

## Autenticação

Header obrigatório nas rotas protegidas:

Authorization: Bearer <token>

---

## Base de Dados

Tabelas principais:

- profiles  
- routes  
- route_points  

### Relações

- 1 user → N routes  
- 1 route → N points  

---

## Estado Atual

- API funcional  
- autenticação implementada  
- CRUD de routes completo  
- endpoints de route_points funcionais  
- permissões implementadas  
- CI configurado  
- testes via Postman  

---

## Melhorias Futuras

- validação avançada  
- paginação e filtros  
- imagens  
- favoritos  
- reviews  
- Docker  
- frontend  

---

## Autor

Projeto académico.