# Esquema Base de Dados — Roteiros Sustentáveis

## 1. Objetivo
A base de dados foi desenhada para suportar a versão inicial da aplicação **Roteiros Sustentáveis**, permitindo:

- guardar os perfis dos utilizadores;
- criar roteiros;
- associar pontos a cada roteiro;
- opcionalmente guardar roteiros favoritos.

O objetivo nesta fase é manter uma estrutura simples, clara e fácil de implementar, para garantir que o MVP fica funcional sem complexidade desnecessária.

---

## 2. Tabelas Principais

As tabelas definidas para o projeto são:

- `profiles`
- `routes`
- `route_points`
- `favourites` *(opcional)*

---

## 3. Descrição das Tabelas

### 3.1 `profiles`
A tabela `profiles` guarda a informação principal de cada utilizador da aplicação.

#### Campos
- `id`
- `nome`
- `email`
- `auth_user_id`
- `created_at`

#### Descrição dos campos
- `id`: identificador único do perfil;
- `nome`: nome do utilizador;
- `email`: email do utilizador;
- `auth_user_id`: ligação ao utilizador autenticado no sistema;
- `created_at`: data de criação do perfil.

---

### 3.2 `routes`
A tabela `routes` guarda os roteiros criados pelos utilizadores.

#### Campos
- `id`
- `user_id`
- `titulo`
- `descricao`
- `duracao`
- `dificuldade`
- `cidade`
- `categoria`
- `created_at`

#### Descrição dos campos
- `id`: identificador único do roteiro;
- `user_id`: utilizador que criou o roteiro;
- `titulo`: nome do roteiro;
- `descricao`: descrição geral do percurso;
- `duracao`: duração estimada do roteiro;
- `dificuldade`: nível de dificuldade do percurso;
- `cidade`: cidade onde o roteiro decorre;
- `categoria`: tipo de roteiro;
- `created_at`: data de criação do roteiro.

---

### 3.3 `route_points`
A tabela `route_points` guarda os pontos associados a cada roteiro.

Cada roteiro pode ter vários pontos, e estes devem aparecer numa ordem definida.

#### Campos
- `id`
- `route_id`
- `nome`
- `descricao`
- `morada`
- `ordem`

#### Descrição dos campos
- `id`: identificador único do ponto;
- `route_id`: identificador do roteiro ao qual o ponto pertence;
- `nome`: nome do ponto do roteiro;
- `descricao`: descrição do ponto;
- `morada`: localização ou morada do ponto;
- `ordem`: posição do ponto dentro do roteiro.

---

### 3.4 `favourites` *(opcional)*
A tabela `favourites` serve para guardar roteiros favoritos de cada utilizador.

Esta tabela é opcional no MVP e pode ser implementada apenas se houver tempo suficiente.

#### Campos
- `id`
- `user_id`
- `route_id`

#### Descrição dos campos
- `id`: identificador único do favorito;
- `user_id`: utilizador que marcou o roteiro como favorito;
- `route_id`: roteiro guardado como favorito.

---

## 4. Relações Principais

### `profiles` → `routes`
Um utilizador pode criar vários roteiros.

Relação:
- um `profile` pode ter vários `routes`;
- cada `route` pertence a um único `profile`.

Tipo de relação:
- `profiles` 1:N `routes`

---

### `routes` → `route_points`
Um roteiro pode ter vários pontos associados.

Relação:
- um `route` pode ter vários `route_points`;
- cada `route_point` pertence a um único `route`.

Tipo de relação:
- `routes` 1:N `route_points`

---

### `profiles` ↔ `routes` através de `favourites` *(opcional)*
Se a funcionalidade de favoritos for implementada:

- um utilizador pode guardar vários roteiros como favoritos;
- um roteiro pode estar nos favoritos de vários utilizadores.

Tipo de relação:
- `profiles` N:M `routes` através de `favourites`

---

## 5. Modelo Relacional Resumido

- `profiles` 1:N `routes`
- `routes` 1:N `route_points`
- `profiles` N:M `routes` via `favourites` *(opcional)*

---

## 6. Regras de Integridade

1. Um perfil deve ter nome, email e ligação ao utilizador autenticado.
2. Um roteiro deve ter utilizador associado, título, descrição, duração, dificuldade, cidade e categoria.
3. Um ponto do roteiro deve estar sempre associado a um roteiro existente.
4. O campo `ordem` em `route_points` deve indicar a sequência correta dos pontos dentro do roteiro.
5. Não deve ser possível ter dois pontos com a mesma ordem no mesmo roteiro.
6. Se a tabela `favourites` for usada, o mesmo utilizador não deve poder guardar o mesmo roteiro duas vezes.

---

## 7. Decisões Técnicas

As principais decisões tomadas para este modelo foram:

- separar `profiles` da autenticação para guardar os dados do utilizador;
- associar cada roteiro ao utilizador que o criou;
- guardar os pontos de cada roteiro numa tabela própria;
- manter `categoria` e `dificuldade` como texto simples nesta fase;
- deixar `favourites` como funcionalidade opcional para não atrasar o MVP.

Esta abordagem torna o projeto mais simples de implementar e mais adequado ao tempo disponível.

---

## 8. Estrutura SQL

### Tabela `profiles`

```sql
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  auth_user_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);