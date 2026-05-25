# Catalogo Afiliado Manual

## Objetivo

Documentar o MVP de operacao para afiliados sem API oficial de marketplace, com foco no caso da Shopee Afiliados BR.

---

## Resumo

Quando o afiliado nao possui API ou feed oficial para importar produtos, o Entregoo passa a operar com cadastro manual de itens afiliados.

Nesse modelo:

- o item e cadastrado dentro do catalogo normal
- o item recebe metadados de origem externa
- o site exibe nome, imagem, categoria e preco base
- o clique do cliente abre o link afiliado externo
- o item nao entra no fluxo de pedido interno do Entregoo

---

## Como funciona no sistema

### No dashboard

O operador cadastra um item normalmente em:

- [entregoo-web/src/app/dasboard/cardapio/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/page.tsx)

Depois marca:

- `Tratar este item como produto afiliado externo`

E informa:

- plataforma afiliada
- loja ou vendedor de origem
- link afiliado do produto
- ID externo do produto
- ID externo da oferta

### Na listagem do catalogo

O item aparece com indicacao visual de afiliado em:

- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)

Essa tela tambem passou a aceitar importacao em lote por colagem de planilha.

### No site

Quando o item esta marcado como afiliado externo e possui link, o botao do produto deixa de abrir a montagem de pedido e passa a abrir a oferta externa em nova aba.

Arquivo principal:

- [entregoo-web/src/components/storefront/StorefrontPage.tsx](/j:/Projetos/entregoo/entregoo-web/src/components/storefront/StorefrontPage.tsx)

Mapeamento do catalogo para a vitrine:

- [entregoo-web/src/lib/catalog-to-menu.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-to-menu.ts)

---

## Metadados usados no item

O item do catalogo agora pode carregar:

- `isExternalAffiliate`
- `externalAffiliatePlatform`
- `externalAffiliateUrl`
- `externalAffiliateSellerName`
- `externalAffiliateProductId`
- `externalAffiliateOfferId`

Tipo principal:

- [entregoo-web/src/types/catalog.ts](/j:/Projetos/entregoo/entregoo-web/src/types/catalog.ts)

Normalizacao e persistencia local/API:

- [entregoo-web/src/lib/catalog-storage.ts](/j:/Projetos/entregoo/entregoo-web/src/lib/catalog-storage.ts)

---

## Regra de negocio

Item afiliado externo nao deve ser tratado como item de pedido interno.

Na pratica:

- serve para vitrine
- serve para SEO e navegacao no site
- serve para clique no link afiliado
- nao serve para checkout interno

---

## Limites do MVP

Este MVP ainda nao faz:

- atualizacao automatica de preco
- sincronizacao automatica de imagem
- leitura automatica de estoque
- rastreamento nativo de conversao da Shopee

Esse modelo e manual por design.

---

## Importacao em lote

### Onde usar

Na tela:

- [entregoo-web/src/app/dasboard/cardapio/itens/page.tsx](/j:/Projetos/entregoo/entregoo-web/src/app/dasboard/cardapio/itens/page.tsx)

### Como funciona

O operador pode copiar linhas de uma planilha e colar no bloco de importacao afiliada.

Formatos aceitos:

- separado por `;`
- separado por `,`
- separado por tab

### Cabecalho esperado

Use estes nomes de coluna:

- `name`
- `category`
- `price`
- `affiliate_url`
- `image_url`
- `description`
- `tags`
- `platform`
- `seller_name`
- `external_product_id`
- `external_offer_id`

### Exemplo

```text
name;category;price;affiliate_url;image_url;description;tags;platform;seller_name;external_product_id;external_offer_id
Fone Bluetooth;Eletronicos;129,90;https://shopee.com/...;https://img...;Fone sem fio com estojo;destaque|audio;Shopee BR;Loja XPTO;123;456
Mouse Gamer;Informatica;89,90;https://shopee.com/...;https://img...;Mouse com RGB;gamer|oferta;Shopee BR;Loja ABC;789;012
```

### Regras da importacao

- a linha precisa ter pelo menos `name` e `affiliate_url`
- itens importados nascem com canal `site` ativo
- itens importados nascem marcados como afiliado externo
- o clique no site abre a oferta externa em nova aba

---

## Quando usar

Use este fluxo quando:

- o afiliado nao possui API oficial
- o objetivo e montar uma vitrine externa
- o clique final precisa levar para a Shopee ou outro marketplace

Nao use este fluxo quando:

- o produto precisa entrar em pedido interno do Entregoo
- existe operador de origem interno para `shared_catalog`
- ha integracao oficial disponivel e aprovada

---

## Proximos passos naturais

Se essa frente crescer, a evolucao mais util e:

1. importacao em lote por planilha
2. duplicacao rapida de itens afiliados
3. landing page ou secao especifica para itens externos
4. relatorio de cliques por item afiliado
