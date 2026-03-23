# Planeamento Estratégico — Roteiros Sustentáveis

## 1. Visão do Projeto
O projeto pretende criar uma plataforma digital de roteiros sustentáveis que ajude o utilizador a descobrir percursos e pontos de interesse com menor impacto ambiental, valorizando a mobilidade verde e os recursos locais.

A aplicação deverá ser simples, intuitiva e focada numa experiência clara de consulta e acompanhamento de roteiros.

## 2. Problema Estratégico
Atualmente, muitas soluções de turismo:
- apresentam informação genérica;
- não destacam práticas sustentáveis;
- não ajudam o utilizador a organizar o seu percurso;
- não promovem claramente meios de deslocação amigos do ambiente.

Existe espaço para uma aplicação que una turismo, sustentabilidade e organização pessoal da visita.

## 3. Proposta de Valor
A aplicação oferece ao utilizador:
- roteiros prontos a seguir;
- informação organizada por pontos de interesse;
- categorias temáticas;
- foco em mobilidade sustentável;
- possibilidade de guardar, concluir e acompanhar percursos.

## 4. Objetivo Geral
Desenvolver uma aplicação funcional com backend, base de dados e frontend, permitindo consultar e gerir roteiros sustentáveis de forma simples e escalável.

## 5. Objetivos Específicos
1. Definir uma estrutura sólida de base de dados.
2. Criar uma API REST organizada.
3. Implementar autenticação de utilizadores.
4. Permitir operações CRUD sobre roteiros.
5. Implementar favoritos e histórico de conclusão.
6. Criar um frontend claro e responsivo.
7. Garantir que o MVP está funcional e pronto para demonstração.

## 6. Estratégia de Desenvolvimento
O desenvolvimento será dividido em fases para reduzir risco e permitir validação progressiva.

### Fase 1 — Análise e Modelação
Objetivo:
- definir requisitos;
- definir entidades;
- desenhar base de dados;
- estabelecer relações entre tabelas.

Entregáveis:
- plano do projeto;
- esquema da base de dados;
- casos de uso principais.

### Fase 2 — Backend e API
Objetivo:
- criar servidor Express;
- ligar à base de dados;
- implementar endpoints principais;
- validar dados;
- testar com Postman.

Entregáveis:
- API funcional;
- documentação de endpoints;
- operações CRUD principais.

### Fase 3 — Frontend
Objetivo:
- criar interface Angular;
- apresentar roteiros;
- implementar páginas principais;
- consumir API.

Entregáveis:
- homepage;
- listagem de roteiros;
- detalhe do roteiro;
- favoritos;
- perfil do utilizador.

### Fase 4 — Integração e Testes
Objetivo:
- ligar frontend e backend;
- corrigir erros;
- validar fluxos;
- melhorar apresentação.

Entregáveis:
- aplicação funcional fim-a-fim;
- dados persistidos;
- fluxo completo demonstrável.

### Fase 5 — Apresentação Final
Objetivo:
- preparar demonstração;
- explicar arquitetura;
- justificar decisões técnicas;
- mostrar evolução do projeto.

Entregáveis:
- sistema estável;
- discurso de apresentação;
- documentação organizada.

## 7. Prioridades do MVP
Para evitar dispersão, o MVP deve focar-se em:
- utilizadores;
- roteiros;
- pontos de interesse;
- favoritos;
- roteiros concluídos.

Não é prioritário nesta fase:
- gamificação avançada;
- IA;
- integração com mapas em tempo real;
- sistema complexo de recomendações.

## 8. Casos de Uso Principais
### Utilizador não autenticado
- consultar roteiros públicos;
- visualizar detalhes básicos.

### Utilizador autenticado
- guardar roteiros favoritos;
- marcar roteiros como concluídos;
- consultar perfil e histórico.

### Administrador (opcional ou futuro)
- criar roteiros;
- editar roteiros;
- gerir pontos de interesse.

## 9. Riscos do Projeto
Os principais riscos são:
- tentar incluir funcionalidades a mais;
- atrasar backend por falta de modelação;
- problemas na ligação frontend-backend;
- autenticação demorar demasiado;
- dificuldades na gestão de relações entre tabelas.

## 10. Estratégia para Reduzir Risco
Para reduzir risco:
- começar pela base de dados;
- implementar primeiro os endpoints principais;
- testar com Postman antes do frontend;
- só depois construir interface;
- deixar extras para o fim.

## 11. Escalabilidade Futura
O projeto pode crescer para incluir:
- check-ins em locais turísticos;
- badges e recompensas;
- ranking de utilizadores;
- integração com mapas;
- sugestões automáticas por localização;
- parceria com negócios locais;
- métricas de sustentabilidade.

## 12. Conclusão
A estratégia do projeto baseia-se em construir primeiro uma base técnica sólida e só depois expandir a experiência do utilizador. Esta abordagem aumenta a probabilidade de entrega bem-sucedida do MVP e facilita futuras evoluções.