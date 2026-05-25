# Afiliados e Catalogo Compartilhado

## Objetivo

Documentar o comportamento atual do modo de afiliado com `shared_catalog`, o que ja funciona, os limites do MVP e os pontos do codigo que controlam essa regra.

---

## Resumo executivo

Hoje o Entregoo ja suporta um fluxo basico de afiliado que herda catalogo de um operador de origem.

O que isso significa na pratica:

- o afiliado pode existir como tenant proprio
- ele pode ficar vinculado a um operador pai
- ele pode operar com `catalogMode = shared_catalog`
- a leitura do catalogo passa a ser feita a partir do operador de origem
- a edicao local do catalogo fica bloqueada no afiliado

Isso resolve o caso de "vender no site proprio com catalogo herdado", mas ainda nao resolve uma integracao real com marketplace externo.

---

## O que esta implementado

### 1. Estrutura de tenancy para afiliado

O sistema ja possui base estrutural para:

- `tenantType = affiliate`
- relacionamento entre empresas
- configuracao de fonte de catalogo
- canal de vendas do tipo `marketplace`

Arquivos mais relevantes:

- [entregoo-api/prisma/schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)
- [entregoo-api/src/services/entregoo-companies.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/entregoo-companies.service.ts)
- [entregoo-web/src/components/marketing/EntregooBackofficePage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/marketing/EntregooBackofficePage.tsx)

### 2. Leitura herdada do catalogo

Quando um assinante esta em `shared_catalog`, a leitura de itens deixa de usar o proprio `storeId` como fonte principal e tenta resolver o operador de origem.

Regra atual:

1. carregar a loja atual
2. confirmar se `catalogMode` esta em `SHARED_CATALOG`
3. buscar relacionamento ativo em que a loja atual e o alvo
4. usar `catalogSourceCompanyId` ou `sourceCompanyId` como loja de leitura
5. listar ou buscar itens usando a loja de origem

Arquivo principal:

- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)

Funcoes-chave:

- `resolveSharedCatalogSourceStoreId`
- `resolveCatalogReadContext`
- `listCatalogItemsService`
- `getCatalogItemByIdService`

### 3. Bloqueio de escrita no afiliado

No modo compartilhado, o afiliado nao pode editar, apagar ou replicar itens localmente.

Isso vale para:

- salvar item
- apagar item
- replicar itens da loja principal para outra subloja

No backend isso e validado por:

- `ensureCatalogWriteAllowed`

No frontend isso aparece como:

- botoes desabilitados
- edicao somente leitura
- mensagens explicando que a manutencao deve ser feita no operador de origem

Arquivos principais:

- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)
- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)
- [entregoo-web/src/app/dasboard/cardapio/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/page.tsx)
- [entregoo-web/src/lib/subscriber-modules.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/subscriber-modules.ts)

---

## Fluxo operacional atual

### Criacao

O operador Entregoo pode cadastrar um assinante afiliado e informar seu contexto de operacao.

### Relacionamento

O afiliado precisa ficar associado a uma empresa de origem que servira como fonte do catalogo.

### Operacao no dashboard

Quando o afiliado entra no gestor:

- a listagem de itens mostra o catalogo herdado
- a tela de item abre em modo somente leitura
- a manutencao real continua centralizada no operador de origem

### Operacao no site

Como a leitura do catalogo passa a respeitar a fonte herdada, o afiliado consegue usar esse catalogo como base para venda nos canais que leem os itens publicados.

---

## Limites do MVP atual

### 1. Marketplace ainda nao e integracao real

O canal `marketplace` hoje representa cadastro estrutural do canal, nao ingestao automatica de produtos.

Em outras palavras:

- da para modelar a existencia do canal
- nao da para sincronizar automaticamente produtos de um marketplace externo

### 2. Subloja herdada ainda e simples

Na leitura do catalogo compartilhado, o backend tenta resolver a subloja no operador de origem.

Se o `substoreId` recebido nao existir na loja de origem, o comportamento atual cai para a subloja principal do operador.

Isso e aceitavel para o MVP, mas precisa evoluir se quisermos mapear sublojas equivalentes entre operador e afiliado.

### 3. Edicao descentralizada nao existe

O afiliado nao consegue:

- ajustar item localmente
- sobrescrever preco localmente
- alterar canal localmente
- manter uma copia divergente do operador

Se isso passar a ser necessario, sera preciso desenhar uma camada de override por afiliado.

---

## Onde mexer quando esse fluxo quebrar

### Se o afiliado estiver vendo o catalogo errado

- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)
- [entregoo-web/src/lib/subscriber-modules.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/subscriber-modules.ts)
- [entregoo-api/prisma/schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)

### Se o afiliado ainda conseguir editar item

- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)
- [entregoo-web/src/app/dasboard/cardapio/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/page.tsx)
- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)

### Se o operador mudar algo e o afiliado nao refletir

- [entregoo-web/src/lib/catalog-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-api.ts)
- [entregoo-web/src/lib/catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)
- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)

---

## Regra de negocio atual

Enquanto o tenant estiver em `shared_catalog`, o catalogo pertence operacionalmente ao operador de origem, nao ao afiliado.

O afiliado pode vender em cima do catalogo herdado, mas nao pode manter esse catalogo como base autoritativa local.

---

## Proximos passos naturais

Se quisermos evoluir essa frente, a ordem mais segura e:

1. mapear formalmente operador de origem e sublojas equivalentes
2. criar overrides locais controlados por afiliado
3. integrar ingestao real de produtos de marketplace
4. separar catalogo herdado de catalogo publicado por canal
