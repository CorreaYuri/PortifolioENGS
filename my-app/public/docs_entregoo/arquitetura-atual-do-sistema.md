# Arquitetura Atual do Sistema Entregoo

## Objetivo
Este documento registra a arquitetura atual do Entregoo no momento presente.

Ele existe para responder, de forma objetiva e útil:

- como o sistema esta organizado
- quais camadas existem
- como frontend, backend e banco se relacionam
- qual e a separacao entre portal interno e sistema do assinante
- quais modulos ja estao no PostgreSQL
- quais partes ainda estao em transicao

Este documento nao e um desenho teorico de arquitetura ideal.

Ele descreve a arquitetura real do projeto hoje, com seus acertos, transicoes e direcao desejada.

---

## 1. Visao geral

O Entregoo esta estruturado como um monorepo com duas aplicacoes principais:

- `entregoo-api`
- `entregoo-web`

Na pratica:

- `entregoo-api` concentra backend, regras de persistencia e acesso ao PostgreSQL
- `entregoo-web` concentra a interface web do portal Entregoo e do sistema do assinante

Na raiz do projeto tambem existem scripts operacionais para:

- desenvolvimento
- backup do projeto
- backup do banco

Arquivos importantes da raiz:

- [package.json](/j:/Projetos/entregoo/package.json)
- [README.md](/j:/Projetos/entregoo/README.md)

---

## 2. Estrutura macro da arquitetura

Hoje o Entregoo opera em quatro grandes camadas:

### 2.1 Interface web

Implementada em Next.js dentro de [entregoo-web](/j:/Projetos/entregoo/entregoo-web).

Responsavel por:

- portal interno da Entregoo
- sistema do assinante
- storefront e fluxos publicos
- assinatura publica de contratos comerciais
- navegacao
- experiencia visual
- leitura e escrita via rotas internas do Next

### 2.2 Proxies internos do Next

Implementados nas rotas de [src/app/api](/j:/Projetos/entregoo/entregoo-web/src/app/api).

Responsaveis por:

- receber chamadas do frontend
- encaminhar para a API Express
- reduzir acoplamento direto do browser com a API
- evitar problemas de CORS
- centralizar resposta e tratamento de indisponibilidade da API

### 2.3 API Express

Implementada em [entregoo-api/src](/j:/Projetos/entregoo/entregoo-api/src).

Responsavel por:

- expor endpoints
- validar payloads
- aplicar regras de persistencia
- integrar com Prisma
- consolidar a fonte principal de dados

### 2.4 Banco PostgreSQL

Acessado via Prisma.

Responsavel por:

- persistencia real
- isolamento por tenant
- estruturacao dos modelos operacionais
- consolidacao progressiva dos modulos que antes viviam no navegador

---

## 3. Monorepo

### Raiz do projeto

O monorepo concentra:

- app web
- app API
- scripts operacionais
- documentacao
- backups

### Scripts de orquestracao

Hoje a raiz ja permite:

- subir web + API juntas
- buildar web e API separadamente
- gerar backup do projeto
- gerar backup do banco

Scripts relevantes em [package.json](/j:/Projetos/entregoo/package.json):

- `npm run dev`
- `npm run dev:api`
- `npm run dev:web`
- `npm run backup`
- `npm run build:api`
- `npm run build:web`

---

## 4. Arquitetura do frontend

O frontend vive em [entregoo-web/src](/j:/Projetos/entregoo/entregoo-web/src) e esta organizado em camadas relativamente claras.

### 4.1 `app`

Contem as rotas da aplicacao.

Exemplos:

- portal Entregoo
- login
- dashboard do assinante
- area do cliente
- contrato publico por token
- pedidos
- clientes
- caixa
- configuracoes
- relatorios
- storefront

Essa camada e onde a experiencia da aplicacao se organiza.

### 4.2 `components`

Contem componentes reutilizaveis e blocos de interface.

Exemplos:

- componentes do dashboard
- componentes do portal Entregoo
- componentes do fluxo de pedidos
- componentes de auth
- componentes do storefront

### 4.3 `lib`

E uma das camadas mais importantes do sistema atual.

Ela concentra:

- storages locais
- clientes de API
- adaptadores
- helpers de contexto do tenant
- sincronizacao e leitura `API-first`

Na fase atual do projeto, boa parte da transicao arquitetural passa por essa pasta.

### 4.4 `hooks`

Contem hooks de comportamento.

Exemplos:

- menu por canal
- construcao do pedido
- leitura derivada de catalogo

### 4.5 `types`

Centraliza contratos tipados do frontend.

Exemplos:

- pedidos
- usuarios
- caixa
- configuracoes
- catalogo
- staff Entregoo
- assinantes SaaS

### 4.6 `data`

Guarda dados locais e estruturas auxiliares usadas pela interface.

---

## 5. Arquitetura do backend

O backend vive em [entregoo-api/src](/j:/Projetos/entregoo/entregoo-api/src).

Hoje ele segue uma estrutura simples e funcional:

- `routes`
- `controllers`
- `services`
- `prismaClient.ts`
- `server.ts`

### 5.1 `routes`

Definem os endpoints agrupados por modulo.

Exemplos de grupos atuais:

- autenticacao
- stores e substores
- catalogo
- pedidos
- delivery dispatch
- masseiro tasks
- CRM de clientes
- caixa
- usuarios do assinante
- configuracoes do dashboard
- billing do assinante
- equipe Entregoo
- empresas e relacoes comerciais
- operacao interna do portal
- propostas, onboarding e assinatura publica de contrato

### 5.2 `controllers`

Recebem request e response, validam entrada e delegam para services.

Eles sao a borda HTTP da aplicacao.

### 5.3 `services`

Concentram a regra de persistencia e a integracao com Prisma.

Na pratica, esta e a camada mais importante do backend hoje, porque ela esta se tornando o centro da fonte principal de dados.

Nos ultimos ciclos, essa camada passou a concentrar tambem:

- usuarios do assinante
- configuracoes do dashboard
- billing do assinante
- confirmacoes financeiras
- funil comercial do portal
- onboarding do cliente
- propostas comerciais e contratos assinaveis

---

## 6. Portal Entregoo hoje

O portal interno da Entregoo deixou de ser apenas uma camada administrativa simples.

Hoje ele ja concentra operacao real de:

- base de assinantes consultada direto do backend
- equipe interna Entregoo
- saude da carteira e cockpit executivo
- funil comercial
- onboarding
- propostas comerciais
- contratos editaveis e compartilhaveis
- workflow operacional por tenant e por subloja

No frontend, esse bloco vive principalmente em:

- [entregoo-web/src/components/marketing](/j:/Projetos/entregoo/entregoo-web/src/components/marketing)

No backend, ele se apoia principalmente em:

- [entregoo-api/src/routes/entregoo-portal-ops.routes.ts](/j:/Projetos/entregoo/entregoo-api/src/routes/entregoo-portal-ops.routes.ts)
- [entregoo-api/src/controllers/entregoo-portal-ops.controller.ts](/j:/Projetos/entregoo/entregoo-api/src/controllers/entregoo-portal-ops.controller.ts)
- [entregoo-api/src/services/entregoo-portal-ops.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/entregoo-portal-ops.service.ts)

---

## 7. Contratos comerciais

O sistema agora ja suporta um fluxo comercial completo com contrato editavel e assinatura publica.

Esse fluxo funciona assim:

1. a proposta nasce no portal comercial
2. o texto do contrato pode ser editado e versionado
3. o portal gera um `shareToken`
4. o cliente recebe um link publico
5. o cliente acessa `/contrato/[token]` e assina digitalmente
6. o portal, a base de assinantes e a area do cliente conseguem visualizar o contrato assinado

Arquivos centrais:

- [entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooSalesPipelinePage.tsx)
- [entregoo-web/src/app/contrato/[token]/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/contrato/[token]/page.tsx)
- [entregoo-web/src/lib/portal-contracts.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/portal-contracts.ts)
- [entregoo-api/prisma/schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)

---

## 8. Contexto por URL em telas publicas e semi-publicas

Uma evolucao importante recente foi endurecer o isolamento de contexto em telas abertas em outra aba.

Hoje:

- `/loja`
- `/mesa`
- `/area-cliente`

podem receber `subscriberId` por URL.

Isso reduz acoplamento com o `ACTIVE_SUBSCRIBER_KEY` global do navegador e evita que a abertura de uma vitrine ou area do cliente derrube ou contamine o dashboard do assinante em outra aba.

Esse endurecimento foi aplicado principalmente em:

- [entregoo-web/src/components/storefront/StorefrontPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/storefront/StorefrontPage.tsx)
- [entregoo-web/src/hooks/use-channel-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/hooks/use-channel-menu.ts)
- [entregoo-web/src/app/loja/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/loja/page.tsx)
- [entregoo-web/src/app/mesa/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/mesa/page.tsx)
- [entregoo-web/src/app/area-cliente/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/area-cliente/page.tsx)

### 5.4 `prismaClient.ts`

Centraliza a instancia do Prisma Client usada pela API.

### 5.5 `server.ts`

Sobe a aplicacao Express e configura o servidor HTTP.

---

## 6. Camada de banco e persistencia

O banco e PostgreSQL, com Prisma como camada de modelagem e acesso.

Arquivo central:

- [schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)

### Papel do Prisma no projeto hoje

O Prisma esta sendo usado como:

- modelador do banco
- client tipado para a API
- mecanismo de sincronizacao de schema

### Observacao importante

Neste momento do projeto, parte da evolucao recente foi consolidada via `db push`, nao apenas por migration formal.

Isso significa que a estrutura real esta sendo mantida e sincronizada, mas a governanca historica de migrations ainda precisa amadurecer mais no futuro.

Ao mesmo tempo, o banco ja se tornou fonte principal para modulos relevantes que antes viviam no navegador:

- catalogo
- pedidos consolidados
- dispatch
- masseiro
- CRM
- caixa
- usuarios do assinante
- configuracoes
- billing do assinante
- confirmacoes financeiras

---

## 7. Separacao funcional do produto

A arquitetura do Entregoo hoje reflete duas grandes frentes de produto.

### 7.1 Portal Entregoo

Uso interno.

Responsavel por:

- cadastro e gestao de assinantes
- criacao e gestao de sublojas
- equipe Entregoo
- operacao comercial e de implantacao
- relacionamento entre empresas
- canais externos
- visao da carteira

### 7.2 Sistema do assinante

Uso do cliente final.

Responsavel por:

- pedidos
- catalogo ou cardapio
- preparo
- conferencia
- entregas
- caixa
- clientes
- configuracoes
- usuarios
- relatorios

### Fronteira importante

Essa separacao e estrutural.

O portal Entregoo nao e um dashboard premium do assinante.
E o sistema interno da propria Entregoo.

---

## 8. Arquitetura multitenant

O Entregoo esta sendo consolidado como SaaS multitenant.

### Fronteira de tenant

A fronteira principal do tenant e o assinante.

Dentro dele, existem:

- usuarios do assinante
- catalogo ou cardapio
- pedidos
- clientes
- caixa
- configuracoes
- sublojas da mesma empresa

### Implicacao arquitetural

Quase todo modulo sensivel precisa aceitar ou derivar corretamente:

- `subscriberId`
- `substoreId`, quando aplicavel

### Onde isso aparece

- storages do frontend
- clientes de API
- wrappers de leitura `API-first`
- services do backend
- modelos do banco

### Estado atual

Essa camada foi bastante reforcada recentemente, mas continua sendo a area mais critica da arquitetura.

Um endurecimento importante desta fase foi parar de tratar ausencia de assinante como tenant valido por fallback silencioso no frontend.

Agora, quando o contexto esperado nao existe mais, a direcao arquitetural passou a ser:

- ausencia explicita de contexto
- estado vazio ou bloqueio controlado na interface
- nova selecao de assinante quando necessario

Esse endurecimento ja alcanca tambem a restauracao de sessao no frontend:

- sessao de sistema nao deve reativar um assinante inexistente
- sessao interna da Entregoo pode existir sem forcar tenant invalido

---

## 9. Fluxo de dados atual

O fluxo tipico hoje tende a seguir este desenho:

1. a tela do Next abre
2. a pagina le o contexto do tenant
3. a camada `lib` tenta responder com cache local rapido
4. em seguida dispara leitura `API-first`
5. a rota interna do Next recebe a chamada
6. o proxy encaminha para a API Express
7. a API consulta o PostgreSQL via Prisma
8. a resposta volta para o frontend
9. o frontend atualiza o estado e, quando necessario, o espelho local

### Vantagem

Esse modelo permitiu migrar o sistema de maneira progressiva sem quebrar a operacao inteira.

### Risco

Se mal controlado, esse mesmo modelo pode gerar:

- loops de sincronizacao
- congelamento
- mistura de fontes
- divergencia entre cache e banco

Por isso existe hoje a diretriz de reduzir sync automatico em leituras puras.

---

## 10. Estado atual da transicao de dados

O Entregoo esta em uma fase de arquitetura hibrida controlada.

### Ja migrados para backend ou em forte consolidacao

- catalogo
- pedidos enviados
- delivery dispatch
- masseiro tasks
- CRM de clientes
- sessoes e movimentos de caixa
- confirmacoes financeiras
- portal interno Entregoo
- staff Entregoo
- empresas, relacoes e canais do portal

### Ainda em transicao relevante

- configuracoes do dashboard
- usuarios do assinante
- trechos da camada financeira ainda derivados do pedido por compatibilidade
- algumas leituras agregadas de relatorios e dashboard

### Referencia complementar

Para detalhes mais finos dessa transicao:

- [Matriz API-First e Transicao de Dados](/j:/Projetos/entregoo/docs/tecnico/matriz-api-first-e-transicao.md)

---

## 11. Modulos estruturais mais importantes hoje

### 11.1 Assinantes e sublojas

A base de tenant e unidade ja esta refletida em banco e portal.

Esse e o pilar da arquitetura multitenant.

### 11.2 Catalogo e cardapio

O sistema ja consegue operar dois mundos:

- `menu` para operacoes de cozinha
- `catalog` para produtos genericos

Isso e uma das mudancas mais importantes da arquitetura do produto.

### 11.3 Pedidos

O pedido continua sendo o centro da operacao transversal.

Ele conecta:

- atendimento
- preparo
- conferencia
- entregas
- caixa
- relatorios
- CRM

### 11.4 Portal Entregoo

O portal deixou de ser tela solta e passou a ser uma camada real de administracao interna.

### 11.5 Contexto tenant-aware

O sistema esta assumindo cada vez mais explicitamente que toda operacao sensivel precisa nascer e terminar no tenant certo.

---

## 12. Frontend em transicao arquitetural

O frontend hoje tem dois papeis simultaneos:

### 12.1 Interface de produto

Responsavel por:

- experiencia visual
- fluxo do usuario
- navegacao
- interacao

### 12.2 Camada de transicao

Responsavel por:

- cache local
- adaptacao de payload
- compatibilidade entre legados
- sincronizacao gradual com a API

### Consequencia

Boa parte da complexidade atual esta no frontend porque ele ainda segura essa funcao de ponte entre o passado local e o futuro consolidado no backend.

---

## 13. Backend em consolidacao

O backend esta saindo de “API de apoio” para “centro da verdade”.

### Sinais disso

- mais modulos sendo persistidos no PostgreSQL
- services ficando mais importantes
- rotas por contexto de tenant
- portal interno ja apoiado em CRUD real

### O que ainda falta amadurecer

- consolidacao de mais modulos do dashboard
- maior governanca historica das migrations
- eventual camada mais explicita de autorizacao por tenant e papel

---

## 14. Banco em crescimento de responsabilidade

O PostgreSQL deixou de ser apenas suporte de cadastro basico.

Hoje ele ja comeca a sustentar:

- tenants
- sublojas
- catalogo
- pedidos enviados
- dispatch
- tarefas do masseiro
- CRM
- caixa
- confirmacoes financeiras
- operacao interna do portal

Isso muda completamente o nivel de maturidade do sistema.

---

## 15. Relacao entre arquitetura e produto

No Entregoo, a arquitetura nao esta separada da estrategia de produto.

Isso acontece porque o produto depende diretamente de:

- multitenancy
- segmentacao por negocio
- modulos configuraveis
- separacao entre portal e dashboard
- diferenca entre cardapio e catalogo
- relacoes entre operador, afiliado e canal externo

Se a arquitetura errar nesses pontos, o produto inteiro perde coerencia.

---

## 16. Principais tensoes arquiteturais hoje

### 16.1 Backend consolidado x espelho local

O sistema ja avancou bastante para o banco, mas ainda convive com espelhos locais.

### 16.2 Crescimento de feature x consolidacao de fundacao

O projeto tem capacidade de crescer, mas precisa evitar empilhar funcionalidade antes de consolidar as bases.

### 16.3 Produto de cozinha x plataforma multissegmento

O Entregoo ja nasceu em food service, mas esta se reorganizando para atender outros segmentos.

Isso exige muito cuidado para nao deixar o codigo central preso a conceitos de cozinha.

---

## 17. Direcao arquitetural recomendada

O movimento recomendado continua sendo:

### 1. Consolidar isolamento por tenant

Especialmente em leitura e escrita operacionais.

### 2. Consolidar backend como fonte principal

Reduzindo o papel do `localStorage`.

### 3. Estabilizar modulos-base

- pedidos
- catalogo
- clientes
- caixa
- configuracoes
- usuarios do assinante

### 4. Depois expandir com seguranca

- afiliados
- catalogo compartilhado
- marketplaces
- APIs parceiras

---

## 18. O que esta funcionando bem na arquitetura

Hoje, alguns pontos merecem destaque positivo:

- monorepo simples e compreensivel
- separacao clara entre web e API
- uso de Prisma para acelerar consolidacao de banco
- portal Entregoo ja com papel real
- transicao gradual, sem ruptura brusca do produto
- reforco recente de tenant-awareness no frontend

---

## 19. O que ainda precisa amadurecer

### Governanca de persistencia

Ainda ha modulos em fase hibrida demais.

### Governanca historica do banco

No futuro, o ideal e fortalecer o historico formal das mudancas de schema.

### Permissoes e autorizacao fina

Ja existe caminho inicial, e modulos mais novos como confirmacao financeira ja passaram a validar melhor `storeId`, `substoreId`, `pedido` e `sessao`, mas a plataforma vai exigir cada vez mais rigidez de autorizacao.

### Reducao de acoplamento do frontend

Quanto menos a regra viver em adapters e storages locais, mais previsivel o sistema fica.

---

## 20. Resumo executivo

A arquitetura atual do Entregoo pode ser resumida assim:

- monorepo com Next.js + Express + Prisma + PostgreSQL
- portal interno separado do sistema do assinante
- multitenancy como regra estrutural
- frontend em fase de transicao de cache local para API-first
- backend se tornando a fonte principal dos dados
- banco ganhando papel central na operacao

Em uma frase:

> o Entregoo ja tem arquitetura de plataforma em formacao, e o trabalho atual e transformar essa formacao em consolidacao controlada.
