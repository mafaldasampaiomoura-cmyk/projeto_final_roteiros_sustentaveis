````md
# Esquema da Base de Dados (v1) - Plataforma de Roteiros Sustentáveis

## Nota de Arquitetura

A aplicação utiliza o Supabase como base de dados relacional e serviço de autenticação.

Na implementação atual, o identificador do utilizador autenticado é utilizado diretamente como chave primária da tabela `profiles` e como chave estrangeira em entidades associadas, como `routes`.

Este modelo garante uma ligação direta entre autenticação e dados de domínio, simplificando a gestão de perfis e a associação de roteiros ao seu respetivo proprietário.

O sistema já inclui suporte para pontos de interesse dentro dos roteiros (`route_points`), permitindo estruturar cada roteiro como uma sequência ordenada de locais.

---

## 1. Tabela profiles

Armazena os dados básicos do utilizador autenticado.

Campos:
- id - identificador único do perfil (UUID do utilizador autenticado)
- name - nome do utilizador
- email - email do utilizador
- created_at - data de criação

Regras:
- id é chave primária
- email é único
- name e email são obrigatórios

SQL:
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
````

---

## 2. Tabela routes

Armazena os roteiros criados pelos utilizadores.

Campos:

* id - identificador único do roteiro
* user_id - identificador do utilizador (FK)
* titulo - título do roteiro
* descricao - descrição do roteiro
* duracao - duração estimada
* dificuldade - nível de dificuldade

Regras:

* user_id é chave estrangeira para profiles(id)
* todos os campos são obrigatórios
* um utilizador pode ter vários roteiros
* ao eliminar um utilizador, os seus roteiros são eliminados

SQL:

```sql
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  duracao TEXT NOT NULL,
  dificuldade TEXT NOT NULL
);
```

---

## 3. Tabela route_points

Armazena os pontos de interesse associados a cada roteiro.

Campos:

* id - identificador único do ponto
* route_id - identificador do roteiro (FK)
* name - nome do ponto de interesse
* descricao - descrição do ponto
* morada - localização do ponto
* ordem - posição do ponto no roteiro

Regras:

* route_id é chave estrangeira para routes(id)
* um roteiro pode ter vários pontos
* os pontos devem ter uma ordem definida
* ao eliminar um roteiro, os seus pontos devem ser eliminados

SQL:

```sql
CREATE TABLE route_points (
  id SERIAL PRIMARY KEY,
  route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  descricao TEXT,
  morada TEXT,
  ordem INTEGER NOT NULL
);
```

---

## 4. Relações

* profiles (1) --- (N) routes
* routes (1) --- (N) route_points

Descrição:

* um perfil pode ter vários roteiros
* cada roteiro pertence a um perfil
* um roteiro pode ter vários pontos de interesse

---

## 5. Regras de Integridade

* não pode existir um roteiro sem utilizador associado
* não pode existir um ponto sem roteiro associado
* não pode existir um perfil sem nome e email
* os pontos de um roteiro devem ter ordem definida
* o email deve ser único

---

## 6. Expansão Futura

O modelo poderá ser expandido com novas tabelas:

* favorites
* reviews
* images

```
```
