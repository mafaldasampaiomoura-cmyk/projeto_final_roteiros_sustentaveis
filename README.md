# API - Plataforma de Roteiros Sustentáveis

## Descrição

Esta API permite a gestão de utilizadores, roteiros turísticos e pontos de interesse associados a cada roteiro.

O objetivo é suportar uma aplicação de turismo interativo, onde cada utilizador pode criar e gerir os seus próprios roteiros com vários pontos organizados.

---

## Tecnologias Utilizadas

* Node.js
* Express
* Supabase (Base de Dados + Autenticação)
* TypeScript

---

## Como correr o projeto

1. Clonar o repositório

```bash
git clone <url-do-repositorio>
```

2. Instalar dependências

```bash
npm install
```

3. Criar ficheiro `.env` com as variáveis necessárias

Exemplo:

```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
PORT=3000
```

4. Iniciar o servidor

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3000
```

---

## Estrutura da API

Base URL:

```
/api
```

---

## Endpoints

### Health Check

```
GET /api/db-health
```

Verifica se a API e ligação à base de dados estão funcionais.

---

### Profiles

```
GET /api/profiles
POST /api/profiles
```

Permite obter e criar perfis de utilizador.

---

### Routes

```
GET /api/routes
POST /api/routes
```

Permite obter e criar roteiros.

---

### Route Points

```
GET /api/route-points
POST /api/route-points
```

Permite obter e criar pontos dentro de um roteiro.

---

## Autenticação

A autenticação é gerida através do Supabase.

Atualmente, algumas rotas podem requerer um token JWT enviado no header:

```
Authorization: Bearer <token>
```

Nota: Em fase de desenvolvimento, algumas rotas podem aceitar dados diretamente (ex: user_id).

---

## Estado Atual do Projeto

* Estrutura base da API implementada
* Integração com Supabase funcional
* Tabelas principais criadas: profiles, routes, route_points
* Endpoints básicos disponíveis
* Testes realizados via Postman

---

## Melhorias Futuras

* Sistema completo de autenticação e autorização
* Validação de dados
* Paginação e filtros
* Upload de imagens
* Sistema de favoritos e avaliações

---

## Autor

Projeto desenvolvido no âmbito de trabalho académico.
