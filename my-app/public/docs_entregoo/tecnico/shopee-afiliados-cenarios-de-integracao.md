# Shopee Afiliados: Cenarios de Integracao

## Objetivo

Definir como o Entregoo deve tratar a integracao com a Shopee BR quando o operador e afiliado, e nao seller com loja propria na Open Platform.

Este documento existe para evitar um erro comum:

> assumir que "programa de afiliados" significa automaticamente "API oficial de catalogo pronta para importar produtos"

No caso da Shopee BR, isso precisa ser validado no painel real do afiliado.

---

## Resumo executivo

Para o Entregoo, existem dois cenarios possiveis:

### Cenario A

O afiliado da Shopee possui algum recurso oficial de integracao, como:

- API
- feed
- exportacao estruturada
- credenciais de desenvolvedor

Nesse caso, o Entregoo pode implementar um conector real de ingestao e sincronizacao.

### Cenario B

O afiliado da Shopee nao possui API/feed oficial acessivel.

Nesse caso, o Entregoo nao deve prometer "integracao oficial". O caminho seguro passa a ser:

- importacao assistida
- cadastro semiautomatico
- ingestao por planilha, feed manual ou links selecionados

---

## O que ja sabemos

Com base no material institucional da Shopee BR, o Programa de Afiliados e descrito como uma modalidade de divulgacao comissionada.

Isso valida o modelo de negocio do afiliado, mas nao prova por si so a existencia de uma API oficial liberada para importar catalogo em massa.

Referencias uteis:

- [Ajuda Shopee BR: O que e o Programa de Afiliados da Shopee](https://help.shopee.com.br/portal/10/article/124098-O-que-%C3%A9-o-Programa-de-Afiliados-da-Shopee?previousPage=secondary+category)
- [Afiliados e Catalogo Compartilhado](/j:/Projetos/entregoo/docs/tecnico/afiliados-e-catalogo-compartilhado.md)

Inferencia tecnica atual:

- o Entregoo ja suporta afiliado como tenant
- o Entregoo ja suporta `shared_catalog`
- o Entregoo ainda nao suporta ingestao real de produtos de marketplace

---

## Decisao de arquitetura

Para Shopee Afiliados, o modelo correto no Entregoo nao e `shared_catalog`.

`shared_catalog` serve para quando existe um operador de origem dentro da propria rede Entregoo.

Para Shopee Afiliados, o modelo correto e:

- catalogo externo sincronizado
- origem externa identificada
- leitura importada para o catalogo interno
- manutencao controlada por sincronizacao

Em outras palavras:

- `shared_catalog` = herdar de outro tenant interno
- `shopee_affiliate_sync` = importar de fonte externa

---

## Cenario A: Shopee com API ou feed oficial

### Resultado esperado

O afiliado conecta sua conta Shopee ao Entregoo e sincroniza produtos elegiveis para divulgacao.

### Fluxo alvo

1. afiliado abre `/dasboard/integracoes`
2. informa credenciais ou autoriza a conta
3. Entregoo busca produtos/ofertas na Shopee
4. payload externo e normalizado para o formato interno
5. usuario escolhe importar ou sincronizar
6. itens entram como catalogo externo somente leitura ou com regras controladas

### Campos novos recomendados

Cada item importado deveria carregar pelo menos:

- `externalSource = shopee_affiliate`
- `externalProductId`
- `externalOfferId`
- `externalSellerName`
- `externalUrl`
- `externalImageUrl`
- `externalCommissionRate`
- `lastExternalSyncAt`
- `syncMode`

### Regras de negocio recomendadas

- item importado da Shopee deve nascer como externo
- edicao local deve ser limitada ou auditada
- sync posterior nao pode destruir override local sem regra clara
- itens removidos da Shopee devem ser marcados como inativos, nao apagados cegamente

### Onde mexer

- [entregoo-web/src/app/dasboard/integracoes/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/integracoes/page.tsx)
- [entregoo-web/src/lib/catalog-api.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-api.ts)
- [entregoo-web/src/lib/catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)
- [entregoo-api/prisma/schema.prisma](/j:/Projetos/entregoo/entregoo-api/prisma/schema.prisma)
- [entregoo-api/src/services/catalog-items.service.ts](/j:/Projetos/entregoo/entregoo-api/src/services/catalog-items.service.ts)

### Componentes novos recomendados

- `shopee-affiliate-auth.service.ts`
- `shopee-affiliate-products.service.ts`
- `shopee-affiliate-normalizer.ts`
- endpoints `/api/integrations/shopee-affiliate/*`

### Plano de implementacao

1. adicionar estrutura de credenciais e sync no schema
2. criar servico backend de autenticacao e leitura
3. criar normalizador Shopee para `MenuItemDraft`
4. criar tela de conexao e sincronizacao
5. registrar origem externa no catalogo
6. bloquear edicao perigosa ou desenhar override controlado

---

## Cenario B: Shopee sem API/feed oficial acessivel

### Resultado esperado

O afiliado ainda consegue operar no Entregoo, mas por importacao assistida e nao por conector oficial.

### Opcoes seguras

- importar links e dados por formulario
- importar planilha CSV/XLSX
- colar lista de ofertas com parser interno
- cadastrar vitrine curada a partir de links de afiliado

### O que evitar

- prometer API oficial sem ela existir
- scraping fragil como base principal de negocio
- depender de HTML externo da Shopee para catalogo critico

### Modelo recomendado

O Entregoo pode ter um modo de "catalogo de afiliado externo", em que o usuario cadastra:

- titulo
- imagem
- preco exibido
- link de afiliado
- categoria
- tags
- observacoes comerciais

Nesse modo, o item continua sendo operavel no site, mas sem fingir que veio de uma integracao oficial.

### Plano de implementacao

1. criar tipo de item externo afiliado
2. criar tela de importacao manual em lote
3. permitir publicar esses itens no site
4. registrar origem como `manual_affiliate_import`
5. preparar o sistema para migrar para API real no futuro

---

## Checklist para validar no seu painel Shopee

Antes de codar a integracao, precisamos verificar se sua conta de afiliado mostra algum destes recursos:

1. `API`
2. `Open API`
3. `Developer`
4. `App ID`
5. `App Secret`
6. `Token`
7. `Feed de produtos`
8. `Exportar produtos`
9. `Exportar ofertas`
10. `Webhook`

Se qualquer um desses existir, o projeto entra no Cenario A.

Se nenhum existir, o projeto deve assumir Cenario B.

---

## Decisao pratica para o time

Enquanto nao houver prova de API/feed oficial no painel da Shopee Afiliados, a equipe deve tratar a integracao como pendente de validacao externa.

Ou seja:

- o programa de afiliados existe
- o modelo de negocio existe
- a integracao tecnica ainda depende do recurso real disponivel para a conta

---

## Como isso conversa com o codigo atual

Hoje o Entregoo ja permite:

- afiliado como tenant
- canal `marketplace`
- catalogo compartilhado entre tenants internos

Mas ainda nao permite:

- importar catalogo externo de marketplace
- sincronizar ofertas de afiliado
- manter metadados de origem externa por item

Essa diferenca precisa ficar explicita para nao misturar:

- rede interna Entregoo
- operador de origem interno
- marketplace externo

---

## Proximo passo recomendado

O melhor proximo passo e operacional, nao de codigo:

1. abrir o painel real da Shopee Afiliados
2. procurar por API, feed ou exportacao estruturada
3. capturar prints ou nomes exatos das opcoes
4. com isso, escolher oficialmente entre Cenario A e Cenario B

Depois dessa validacao, o Entregoo ja consegue implementar o caminho certo sem retrabalho.
