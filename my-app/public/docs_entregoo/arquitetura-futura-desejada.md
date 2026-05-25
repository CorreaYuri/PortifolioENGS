# Arquitetura Futura Desejada do Entregoo

## Objetivo
Este documento descreve a arquitetura que o Entregoo deve buscar como estado de maturidade.

Ele nao representa o sistema exatamente como ele esta hoje.

Ele representa:

- o desenho-alvo
- a direcao de consolidacao
- o que queremos preservar
- o que queremos reduzir
- o que nao deve voltar a acontecer

Este documento deve ser lido em conjunto com:

- [Arquitetura Atual do Sistema](/j:/Projetos/entregoo/docs/arquitetura-atual-do-sistema.md)
- [Plano de Estabilizacao do Sistema](/j:/Projetos/entregoo/docs/plano-de-estabilizacao-do-sistema.md)
- [Matriz API-First e Transicao de Dados](/j:/Projetos/entregoo/docs/tecnico/matriz-api-first-e-transicao.md)

---

## 1. Visao de destino

O estado desejado do Entregoo e:

> uma plataforma operacional multitenant, modular por segmento, com backend como fonte principal, frontend API-first e separacao clara entre portal interno e sistema do assinante.

Essa definicao carrega seis pilares:

- multitenancy rigoroso
- backend como centro da verdade
- frontend como camada de experiencia, nao como dono da regra
- modularidade por tenant
- adaptacao por segmento
- crescimento controlado de integracoes e rede comercial

---

## 2. Como o Entregoo deve se parecer quando estiver maduro

### 2.1 Portal Entregoo

Deve funcionar como um sistema interno de governanca da plataforma.

Papel esperado:

- administrar assinantes
- administrar sublojas
- administrar afiliados e relacoes comerciais
- gerir equipe interna
- acompanhar implantacao
- operar carteira, riscos e historico interno
- centralizar configuracao de canais externos

### 2.2 Sistema do assinante

Deve funcionar como sistema operacional do cliente.

Papel esperado:

- operar pedidos
- operar fluxo interno
- operar caixa
- gerir clientes
- gerir usuarios do assinante
- manter catalogo ou cardapio
- gerar relatorios do proprio tenant

### 2.3 Backend

Deve ser a fonte principal de dados e a espinha da regra operacional.

### 2.4 Banco

Deve concentrar a persistencia oficial dos modulos sensiveis.

### 2.5 Frontend

Deve ser API-first, tenant-aware e cada vez menos dependente de `localStorage`.

---

## 3. Estado desejado por camada

### Frontend

O frontend desejado deve:

- ler da API como regra
- usar estado em memoria como camada principal de interface
- usar cache local apenas quando houver motivo claro
- respeitar tenant em toda leitura e escrita
- congelar contexto quando o fluxo exigir sessao propria

O frontend nao deve:

- ser dono da regra de negocio critica
- disparar sincronizacao em toda leitura pura
- depender de chaves globais que ignorem tenant
- carregar logica demais em adaptadores temporarios por tempo indefinido

### Backend

O backend desejado deve:

- concentrar persistencia real
- validar contexto do tenant
- receber `storeId` e `substoreId` de maneira consistente
- centralizar regras operacionais mais sensiveis
- evoluir para camadas de permissao mais firmes

O backend nao deve:

- ser apenas uma ponte fina para o banco
- deixar regra critica dispersa entre varias telas

### Banco

O banco desejado deve:

- refletir os conceitos centrais do produto
- ter modelos coerentes por tenant
- sustentar modulos operacionais principais
- permitir crescimento de rede comercial e canais externos

O banco nao deve:

- ficar atras do modelo real do produto
- depender de convencoes soltas que so vivem no frontend

---

## 4. Fonte principal de dados desejada

O estado-alvo e simples:

- PostgreSQL como fonte oficial
- API Express como camada de acesso e regra
- frontend consumindo API-first

### Isso implica

Os modulos mais importantes devem deixar de depender do navegador como centro de persistencia.

### Modulos que devem estar consolidados no backend

- assinantes
- sublojas
- usuarios Entregoo
- usuarios do assinante
- catalogo ou cardapio
- pedidos
- clientes
- caixa
- configuracoes
- dispatch
- tarefas operacionais
- relatorios baseados em dados persistidos

---

## 5. Estado desejado do frontend

O frontend futuro do Entregoo deve operar em um modelo mais limpo:

### 5.1 Leitura

- captura contexto do tenant
- chama API
- popula estado local da tela
- usa cache apenas como apoio controlado

### 5.2 Escrita

- envia dados para a API
- atualiza a interface local como reflexo
- evita gravar “verdades paralelas” no navegador

### 5.3 Sincronizacao

- fica centralizada
- nao gera loops
- nao depende de leitura pura
- nao regrava storage de forma barulhenta

### 5.4 Rascunhos

Rascunhos temporarios so devem existir quando realmente melhorarem a experiencia.

Mesmo assim, devem ser:

- tenant-aware
- limitados
- descartaveis

---

## 6. Estado desejado do backend

O backend futuro deve sair de “conjunto de endpoints” para “camada central da plataforma”.

### Isso significa

- mais modulos com services fortes
- mais consolidacao da regra em services
- menos dependencia de adapters do frontend
- validacao mais clara por contexto de tenant
- melhor separacao entre administracao interna e operacao do cliente

### Evolucoes desejadas

- autorizacao mais explicita por perfil e contexto
- padrao mais firme de rotas por modulo
- historico mais controlado das mudancas de schema
- contratos mais previsiveis entre web e API

---

## 7. Estado desejado do banco

O banco deve refletir a plataforma como estrutura viva.

### O que ele precisa sustentar bem

- multitenancy
- sublojas
- tipos de assinante
- modos de catalogo
- segmento
- workflow
- relacoes entre empresas
- canais externos
- estoque
- pedidos
- clientes
- financeiro operacional

### Evolucao desejada

Com o tempo, o schema deve ficar cada vez menos “reativo a tela” e mais “coerente com o modelo de negocio”.

---

## 8. Modularidade desejada

O Entregoo deve operar como plataforma modular.

### Isso significa

Cada tenant nao precisa usar tudo.

O sistema deve conseguir ativar ou desativar, por tenant:

- menu
- catalogo
- preparo
- conference
- masseiro
- dispatch
- delivery
- modulos futuros

### Regra do estado maduro

O tenant ve apenas o que faz sentido para sua operacao.

---

## 9. Segmentacao desejada

O Entregoo deve continuar se afastando de uma dependencia conceitual exclusiva de cozinha.

### Estado desejado

O sistema deve tratar `segment` e `catalogMode` como definidores reais da experiencia.

### Resultado esperado

- food service usa experiencia de cardapio
- moda usa experiencia de catalogo com variacoes de cor e tamanho
- automotivo usa compatibilidade e atributos de modelo
- logistica usa dimensoes, peso e fluxo de expedicao

### Regra

O coracao da plataforma deve ser operacional e adaptavel, nao uma camada de pizza com nomes reaproveitados.

---

## 10. Rede comercial desejada

O Entregoo deve ser capaz de suportar:

- operador
- afiliado
- hibrido
- catalogo compartilhado
- canais externos

### Estado desejado

Essas relacoes precisam existir sem quebrar multitenancy.

### Isso quer dizer

- afiliado continua sendo outro tenant
- subloja continua sendo mesma empresa
- canal continua sendo integracao
- compartilhamento comercial continua sendo explicito, nunca acidental

---

## 11. Integracoes desejadas

No futuro maduro, o Entregoo deve ser um hub operacional preparado para integrar:

- marketplaces
- Shopify
- WooCommerce
- APIs parceiras
- canais proprios

### O desenho desejado

Cada tenant deve conseguir:

- cadastrar canal
- configurar credenciais
- importar catalogo
- receber pedidos
- devolver status
- sincronizar estoque quando fizer sentido

### Regra

Canal e integracao, nao empresa.

---

## 12. Estado desejado da operacao financeira

O financeiro operacional deve amadurecer para uma camada menos acoplada ao pedido bruto.

### Hoje

Parte da leitura financeira ainda deriva do payload do pedido.

### Futuro desejado

O sistema deve ter mais clareza entre:

- pedido
- confirmacao financeira
- sessao de caixa
- movimentos de caixa
- relatorio financeiro

### Resultado esperado

Relatorios financeiros mais consistentes e menos dependentes de inferencia espalhada.

---

## 13. Estado desejado dos relatorios

Relatorios maduros do Entregoo devem ser construidos sobre base consolidada.

### Isso significa

- pedidos confiaveis no backend
- clientes confiaveis no backend
- caixa mais estruturado
- catalogo persistido

### Resultado

Relatorios deixam de ser “montagem de tela” e passam a ser leitura gerencial do sistema.

---

## 14. Estado desejado da documentacao

A documentacao futura do Entregoo deve funcionar como camada oficial de memoria do sistema.

### Ela deve cobrir

- conceitos
- multitenancy
- arquitetura atual
- arquitetura desejada
- operacao do portal
- fluxo do assinante
- matriz de migracao
- regras de negocio estruturais

### Regra

Mudanca estrutural relevante deve deixar rastros em `docs`.

---

## 15. O que nao queremos carregar para a arquitetura futura

O futuro desejado do Entregoo nao deve manter por muito tempo:

- dependencia excessiva de `localStorage`
- regra critica espalhada em varias telas
- relatorios dependentes de dados instaveis
- chaves globais sem tenant
- leitura e escrita implicitas por tenant ativo
- mistura entre subloja, afiliado e canal

---

## 16. Principios da arquitetura futura

### Principio 1

Tenant e fronteira sagrada.

### Principio 2

Backend e a fonte principal.

### Principio 3

Frontend serve a experiencia, nao a verdade do negocio.

### Principio 4

Segmento e catalogMode adaptam o sistema sem deformar seu nucleo.

### Principio 5

Portal Entregoo e governanca interna, nao dashboard do cliente.

### Principio 6

Crescimento de integracao so vem depois de fundacao consolidada.

---

## 17. Etapas para chegar no estado desejado

### Etapa 1

Concluir isolamento por tenant.

### Etapa 2

Consolidar modulos-base no backend.

### Etapa 3

Reduzir espelho local para papel realmente auxiliar.

### Etapa 4

Fortalecer configuracoes e usuarios do assinante no backend.

### Etapa 5

Refinar financeiro, relatorios e governanca.

### Etapa 6

Expandir rede comercial e integracoes em base firme.

---

## 18. Como reconhecer que a arquitetura amadureceu

Sinais de maturidade esperados:

- troca de tenant sem susto
- menos congelamento por sync
- menos comportamento estranho entre abas
- menos dependencia de storage local
- mais previsibilidade de relatorios
- portal mais forte como governanca interna
- dashboard do assinante mais coerente com seu modelo operacional

---

## 19. Resumo executivo

A arquitetura futura desejada do Entregoo e a de uma plataforma operacional multitenant de verdade.

Isso significa:

- tenants bem isolados
- backend como verdade
- frontend API-first
- modulos adaptados por tenant
- segmentos tratados com seriedade
- portal Entregoo consolidado como centro interno
- sistema do assinante consolidado como ambiente de operacao

Em uma frase:

> o futuro desejado do Entregoo e deixar de ser um sistema em transicao e se tornar uma plataforma operacional madura, previsivel e expansivel sem perder isolamento, clareza e controle.

