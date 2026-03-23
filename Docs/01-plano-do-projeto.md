# Plano do Projeto — Roteiros Sustentáveis

## 1. Nome do Projeto
**Roteiros Sustentáveis**

## 2. Tema
Aplicação web/mobile-oriented para descoberta de roteiros turísticos sustentáveis, com foco em mobilidade verde, pontos de interesse locais e incentivo a práticas de turismo responsável.

## 3. Descrição do Problema
Muitas aplicações de turismo mostram locais para visitar, mas não ajudam o utilizador a fazer escolhas mais sustentáveis. Normalmente não existe foco em:
- percursos a pé, bicicleta ou transportes públicos;
- promoção de negócios locais;
- redução do impacto ambiental da visita;
- organização de roteiros temáticos e conscientes.

Como resultado, o utilizador recebe informação turística genérica, sem orientação sobre como explorar uma cidade de forma mais sustentável.

## 4. Solução Proposta
A aplicação **Roteiros Sustentáveis** permitirá ao utilizador descobrir e consultar roteiros turísticos com preocupação ambiental e social.

Cada roteiro poderá incluir:
- título e descrição;
- localização e pontos de paragem;
- categoria (histórico, natureza, gastronomia local, cultural, etc.);
- modo de deslocação recomendado;
- nível de sustentabilidade;
- duração estimada;
- distância;
- lista de pontos de interesse;
- possibilidade de guardar como favorito;
- possibilidade de marcar como concluído.

A aplicação pretende transformar a experiência turística numa experiência:
- mais organizada;
- mais educativa;
- mais sustentável;
- mais centrada na realidade local.

## 5. Objetivos do Projeto
Os principais objetivos são:
1. Permitir ao utilizador consultar roteiros sustentáveis.
2. Organizar pontos de interesse por categorias e localização.
3. Promover meios de mobilidade sustentáveis.
4. Permitir guardar roteiros favoritos.
5. Permitir acompanhar roteiros concluídos.
6. Criar uma base técnica escalável para futuras funcionalidades.

## 6. Público-Alvo
O projeto é direcionado para:
- turistas que visitam cidades e querem experiências mais conscientes;
- utilizadores locais que querem explorar a sua cidade de forma diferente;
- estudantes e jovens adultos interessados em mobilidade sustentável;
- pessoas que preferem experiências a pé, bicicleta ou transportes públicos.

## 7. Funcionalidades Principais
### MVP
- registo e autenticação de utilizador;
- listagem de roteiros;
- pesquisa e filtragem por categoria;
- detalhe de um roteiro;
- visualização dos pontos de interesse de cada roteiro;
- guardar roteiros nos favoritos;
- marcar roteiros como concluídos;
- perfil do utilizador com histórico básico.

### Funcionalidades Futuras
- mapa interativo;
- check-in em pontos de interesse;
- gamificação com badges;
- comentários e avaliações;
- recomendação personalizada;
- cálculo estimado de impacto ambiental evitado;
- integração com transportes públicos.

## 8. Requisitos Funcionais
O sistema deverá permitir:
- criar conta e iniciar sessão;
- consultar roteiros disponíveis;
- ver detalhe completo de cada roteiro;
- visualizar pontos de interesse associados;
- filtrar roteiros por categoria ou tipo de mobilidade;
- guardar e remover favoritos;
- marcar um roteiro como concluído;
- consultar histórico pessoal de roteiros concluídos.

## 9. Requisitos Não Funcionais
O sistema deverá:
- ter interface simples e intuitiva;
- ser responsivo;
- garantir integridade dos dados;
- validar dados no frontend e no backend;
- permitir futura escalabilidade;
- ter API organizada e consistente;
- manter boa separação entre frontend, backend e base de dados.

## 10. Arquitetura Tecnológica
### Frontend
- Angular

### Backend
- Node.js
- Express.js

### Base de Dados
- PostgreSQL / Supabase

### Ferramentas de apoio
- Postman para testes da API
- Git e GitHub para controlo de versões
- Render / Railway / Vercel para deploy

## 11. Estrutura Geral do Sistema
O sistema será composto por três camadas principais:
1. **Frontend** — interface do utilizador.
2. **Backend** — API e lógica de negócio.
3. **Base de Dados** — armazenamento de utilizadores, roteiros, pontos de interesse, favoritos e progresso.

## 12. Entidades Principais
As entidades principais do projeto serão:
- users
- routes
- points_of_interest
- route_stops
- categories
- sustainability_tags
- favorites
- completed_routes
- reviews

## 13. Valor Acrescentado do Projeto
O diferencial do projeto está em combinar:
- turismo;
- sustentabilidade;
- descoberta local;
- organização digital do percurso;
- acompanhamento da experiência do utilizador.

Em vez de apenas mostrar locais, a aplicação orienta o utilizador para uma visita mais responsável e estruturada.

## 14. MVP a Entregar
A versão mínima viável deverá incluir:
- autenticação;
- listagem de roteiros;
- página de detalhe do roteiro;
- pontos de interesse;
- favoritos;
- roteiros concluídos;
- ligação a base de dados real;
- API funcional;
- frontend navegável.

## 15. Conclusão
O projeto **Roteiros Sustentáveis** responde a uma necessidade atual de turismo mais consciente e digital. A aplicação propõe uma solução prática, escalável e alinhada com tendências de mobilidade verde e valorização do território local.