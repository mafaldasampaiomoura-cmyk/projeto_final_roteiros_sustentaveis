# Cronograma Diário — Roteiros Sustentáveis

## Objetivo
Organizar o desenvolvimento do projeto de forma prática ao longo dos dias disponíveis, garantindo que o MVP fica funcional, sem atrasos e sem complexidade desnecessária.

O projeto terá como foco principal:
- perfis de utilizador;
- criação e listagem de roteiros;
- pontos de cada roteiro;
- autenticação;
- frontend básico para demonstração.

---

##  Dia 1 — Escolha do tema e organização inicial
### Objetivos
- escolher o tema do projeto;
- definir a ideia principal;
- começar a organizar a estrutura do trabalho.

### Tarefas
- escolha do tema **Roteiros Sustentáveis**;
- discussão da ideia principal da aplicação;
- definição inicial das funcionalidades do MVP;
- organização das pastas e documentos do projeto;
- análise de exemplos e estrutura de documentação;
- início da adaptação do projeto ao tema escolhido.

### Resultado esperado
Tema definido, estrutura inicial organizada e direção do projeto alinhada.

---

## Dia 2 — Planeamento final e base de dados
### Objetivos
- fechar a estrutura do projeto;
- definir a base de dados;
- começar a implementação técnica.

### Tarefas
- rever os ficheiros da pasta `docs`;
- fechar o esquema final das tabelas:
  - `profiles`
  - `routes`
  - `route_points`
- criar a base de dados;
- criar as tabelas principais;
- inserir alguns dados de teste;
- confirmar relações entre tabelas.

### Resultado esperado
Base de dados pronta e estrutura do projeto bem definida.

---

## Dia 3 — Estrutura inicial do backend
### Objetivos
- arrancar a parte do backend;
- preparar a API.

### Tarefas
- criar projeto Node.js + Express;
- configurar dependências principais;
- criar ficheiro `.env`;
- configurar ligação à base de dados;
- criar estrutura de pastas do backend;
- testar se o servidor responde corretamente.

### Resultado esperado
Servidor backend a correr localmente e ligado à base de dados.

---

## Dia 4 — Autenticação e perfis
### Objetivos
- implementar a autenticação de utilizadores;
- preparar a gestão de perfis.

### Tarefas
- criar endpoint de registo;
- criar endpoint de login;
- implementar ligação entre autenticação e `profiles`;
- testar criação de perfil;
- validar dados recebidos;
- testar tudo no Postman.

### Resultado esperado
Utilizador consegue registar-se e iniciar sessão.

---

## Dia 5 — CRUD de roteiros
### Objetivos
- implementar as operações principais dos roteiros.

### Tarefas
- criar endpoint para criar roteiro;
- criar endpoint para listar roteiros;
- criar endpoint para ver detalhe de um roteiro;
- criar endpoint para editar roteiro, se houver tempo;
- testar associação do roteiro ao utilizador.

### Resultado esperado
Backend já permite criar e consultar roteiros.

---

## Dia 6 — Pontos dos roteiros
### Objetivos
- implementar os pontos associados a cada roteiro.

### Tarefas
- criar endpoint para adicionar pontos a um roteiro;
- listar pontos de um roteiro;
- ordenar os pontos pelo campo `ordem`;
- validar se não existem ordens repetidas no mesmo roteiro;
- testar tudo no Postman.

### Resultado esperado
Cada roteiro já pode ter vários pontos organizados por sequência.

---

## Dia 7 — Estrutura inicial do frontend
### Objetivos
- começar a interface da aplicação.

### Tarefas
- criar projeto Angular;
- configurar router;
- criar páginas principais:
  - homepage
  - login
  - registo
  - lista de roteiros
  - detalhe do roteiro
- criar estrutura base de componentes e serviços.

### Resultado esperado
Frontend criado e organizado.

---

## Dia 8 — Ligação do frontend à API
### Objetivos
- mostrar dados reais no frontend.

### Tarefas
- consumir endpoint de listagem de roteiros;
- mostrar roteiros na interface;
- consumir endpoint de detalhe de roteiro;
- mostrar os pontos do roteiro;
- tratar erros e loading básicos.

### Resultado esperado
Fluxo principal já visível na aplicação.

---

## Dia 9 — Autenticação no frontend
### Objetivos
- ligar login e registo ao backend.

### Tarefas
- criar formulário de login;
- criar formulário de registo;
- guardar sessão/token;
- mostrar informação do utilizador autenticado;
- proteger páginas que exijam login, se houver tempo.

### Resultado esperado
Autenticação funcional entre frontend e backend.

---

## Dia 10 — Melhorias, correções e extras
### Objetivos
- melhorar a aplicação e corrigir problemas.

### Tarefas
- rever erros no backend;
- rever erros no frontend;
- melhorar layout e navegação;
- melhorar textos e apresentação;
- decidir se a tabela `favourites` será implementada;
- se houver tempo, adicionar favoritos.

### Resultado esperado
Aplicação mais estável e mais apresentável.

---

## Dia 11 — Testes finais e preparação da apresentação
### Objetivos
- fechar o MVP;
- preparar a entrega e a demonstração.

### Tarefas
- testar fluxo completo da aplicação;
- verificar base de dados, backend e frontend;
- rever a documentação;
- preparar explicação do projeto;
- preparar demonstração dos principais fluxos:
  - registo/login
  - criação de roteiro
  - listagem de roteiros
  - detalhe de roteiro
  - visualização dos pontos

### Resultado esperado
Projeto pronto para entrega e apresentação.

---

## Prioridade Real do Projeto
Se houver menos tempo do que o esperado, a prioridade deve ser:

1. base de dados  
2. backend  
3. autenticação  
4. criação e listagem de roteiros  
5. pontos dos roteiros  
6. frontend básico  
7. melhorias visuais  
8. favoritos apenas se sobrar tempo  

---

## Funcionalidades Essenciais do MVP
O MVP deve garantir, no mínimo:
- autenticação de utilizadores;
- criação de roteiros;
- listagem de roteiros;
- detalhe de roteiro;
- visualização dos pontos do roteiro por ordem.

---

## Funcionalidades Opcionais
Estas funcionalidades só devem ser feitas se o núcleo do projeto já estiver concluído:
- favoritos;
- edição avançada;
- filtros mais complexos;
- melhorias visuais extra;
- deploy.

---

## Conclusão
O cronograma foi definido para aproveitar os dias disponíveis de forma realista, começando pela base técnica e avançando depois para a interface.

A prioridade será sempre garantir que o núcleo do projeto fica funcional, estável e apresentável dentro do prazo.