# Documentação da API (v1) - Plataforma de Roteiros Sustentáveis

## Nota de Arquitetura

Atualmente, os endpoints protegidos utilizam autenticação através de token JWT enviado no cabeçalho `Authorization`.

Os dados dos roteiros são associados ao utilizador autenticado com base no identificador extraído do token.
Numa fase futura, a API poderá ser expandida com funcionalidades adicionais como pontos de roteiro, favoritos e pesquisa avançada.

---

## 1. Health Check

Permite verificar se a API está operacional.

### GET /api/health
Retorna o estado da API.

---

## 2. Autenticação e Perfis

Responsável pela gestão de utilizadores.

### POST /api/auth/register
Cria um novo utilizador.

### POST /api/auth/login
Autentica um utilizador e devolve um token JWT.

### GET /api/auth/me
Retorna os dados do utilizador autenticado com base no token.

---

## 3. Gestão de Roteiros (Core CRUD)

Este é o núcleo principal da aplicação, permitindo criar e gerir roteiros turísticos.

### GET /api/routes
Lista todos os roteiros disponíveis.

### GET /api/routes/:id
Retorna os detalhes de um roteiro específico.

### POST /api/routes
Cria um novo roteiro associado ao utilizador autenticado.

Campos principais:
- titulo
- descricao
- duracao
- dificuldade
- cidade
- categoria

### PUT /api/routes/:id
Atualiza um roteiro existente.

Regras:
- Apenas o utilizador dono do roteiro pode editar
- Todos os campos podem ser atualizados

### DELETE /api/routes/:id
Remove um roteiro.

Regras:
- Apenas o utilizador dono do roteiro pode eliminar

---

## 4. Segurança e Autorização

- Os endpoints protegidos requerem autenticação via JWT.
- O token deve ser enviado no cabeçalho:

Authorization: Bearer <token>

- O backend valida o token e identifica o utilizador.
- As operações de edição e remoção são restritas ao proprietário do recurso.

---

## 5. Estrutura de Dados (Resumo)

### Roteiro
- id
- user_id
- titulo
- descricao
- duracao
- dificuldade
- cidade
- categoria
- created_at

---

## 6. Melhorias Futuras

Funcionalidades planeadas para fases seguintes:

- Gestão de pontos do roteiro (route_points)
- Sistema de favoritos
- Upload de imagens
- Filtros avançados (cidade, categoria, duração)
- Integração com frontend