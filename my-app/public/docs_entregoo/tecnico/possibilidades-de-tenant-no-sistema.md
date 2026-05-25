# Possibilidades de Tenant No Sistema

## Objetivo

Documentar, de forma pratica, quais tipos de tenant o Entregoo suporta hoje e como pensar cada possibilidade de modelagem.

Este documento existe para responder:

> "Que tipos de empresa ou operacao podem existir como tenant no Entregoo?"

---

## 1. Regra principal

No Entregoo, tenant e o contexto isolado de uma empresa.

Ou seja:

- tenant nao e tela
- tenant nao e usuario
- tenant nao e canal
- tenant nao e subloja

Tenant e a unidade de isolamento de negocio e dados.

---

## 2. Tipos de tenant suportados

Pelo modelo atual do sistema, os tipos de tenant sao:

- `operator`
- `affiliate`
- `hybrid`
- `internal`

Tipo definido em:

- [saas.ts](/j:/Projetos/entregoo/entregoo-web/src/types/saas.ts)

---

## 3. Tenant do tipo `operator`

### Quando usar

Use `operator` quando a empresa executa a operacao principal.

Exemplos:

- restaurante
- loja com estoque proprio
- oficina
- autopecas
- farmacia
- loja de roupas
- operacao de separacao e entrega

### Leitura de negocio

O pedido pertence operacionalmente a esse tenant.

Esse tenant normalmente:

- mantem seu proprio catalogo ou cardapio
- possui usuarios proprios
- possui caixa proprio
- controla sua operacao

### Exemplo ficticio

#### Casa Aurora Bistro

- `tenantType`: `operator`
- `catalogMode`: `menu`
- `segment`: `food_service`
- `workflowTemplate`: `kitchen`

Uso ideal:

- cardapio proprio
- pedidos internos
- preparo
- conferencia
- entrega

---

## 4. Tenant do tipo `affiliate`

### Quando usar

Use `affiliate` quando a empresa tem operacao comercial propria, mas depende de outro operador para parte do catalogo, execucao ou relacao comercial.

Exemplos:

- revendedor
- parceiro comercial
- afiliado com site proprio
- empresa que divulga produtos de outro operador

### Leitura de negocio

Afiliado e outro tenant.

Ele nao deve ser modelado como subloja.

### Formas possiveis de operar

#### 1. Com `shared_catalog`

Quando o afiliado herda o catalogo de outro tenant interno.

Exemplo:

- operador principal controla produtos
- afiliado vende com tenant proprio
- afiliado nao edita itens herdados

#### 2. Com catalogo externo manual

Quando o afiliado vende produtos de marketplace sem API oficial.

Exemplo:

- afiliado Shopee BR
- itens cadastrados como vitrine afiliada
- clique abre link externo

### Exemplo ficticio

#### Aurora Deals

- `tenantType`: `affiliate`
- `catalogMode`: `shared_catalog`
- `segment`: `retail`
- `workflowTemplate`: `generic_delivery`

Uso ideal:

- afiliado ligado a operador principal
- tenant proprio
- catalogo herdado
- sem edicao local do catalogo

---

## 5. Tenant do tipo `hybrid`

### Quando usar

Use `hybrid` quando a empresa opera por conta propria, mas tambem participa de uma rede comercial ou combina varias formas de operacao.

Exemplos:

- empresa que vende itens proprios e tambem itens de terceiros
- operador com frente varejista e frente de distribuicao
- marca que possui loja propria e parceiros comerciais

### Leitura de negocio

Esse tipo existe para cenarios mistos.

Ele ajuda quando a empresa nao cabe totalmente em:

- operador puro
- afiliado puro

### Exemplo ficticio

#### Nexus Mobility Parts

- `tenantType`: `hybrid`
- `catalogMode`: `catalog`
- `segment`: `automotive`
- `workflowTemplate`: `automotive`

Uso ideal:

- catalogo proprio de autopecas
- distribuicao para parceiros
- operacao propria e relacoes comerciais paralelas

---

## 6. Tenant do tipo `internal`

### Quando usar

Use `internal` apenas para contexto da propria Entregoo.

Exemplos:

- portal interno
- operacao comercial da Entregoo
- base administrativa da equipe interna

### Leitura de negocio

Esse tipo nao e para cliente final.

Serve para separar:

- ambiente interno da Entregoo
- ambiente operacional dos assinantes

### Exemplo ficticio

#### Entregoo Operacoes Internas

- `tenantType`: `internal`
- `catalogMode`: `catalog`
- `segment`: `services`
- `workflowTemplate`: `generic_service`

Uso ideal:

- onboarding
- comercial
- tarefas internas
- gestao da carteira de assinantes

---

## 7. Possibilidades de catalogo por tenant

Cada tenant tambem pode operar em um destes modos de catalogo:

- `menu`
- `catalog`
- `shared_catalog`

### `menu`

Use quando o tenant vende itens com logica de food service.

Exemplos:

- pizza
- hamburguer
- pratos
- marmita

### `catalog`

Use quando o tenant vende produtos genericos.

Exemplos:

- roupas
- autopecas
- cosmeticos
- eletronicos

### `shared_catalog`

Use quando o tenant le o catalogo a partir de outro tenant interno.

Exemplo:

- afiliado interno da rede

Importante:

`shared_catalog` nao e a mesma coisa que marketplace externo.

---

## 8. Possibilidades de segmento

O sistema hoje ja admite tenants em varios segmentos:

- `food_service`
- `apparel`
- `automotive`
- `beauty`
- `health`
- `retail`
- `industrial`
- `services`
- `logistics`
- `other`

Isso significa que o Entregoo nao esta limitado a cozinha.

---

## 9. Exemplos de combinacoes validas

### Exemplo 1. Restaurante delivery

- `tenantType`: `operator`
- `catalogMode`: `menu`
- `segment`: `food_service`
- `workflowTemplate`: `kitchen`

### Exemplo 2. Loja de roupas

- `tenantType`: `operator`
- `catalogMode`: `catalog`
- `segment`: `apparel`
- `workflowTemplate`: `apparel`

### Exemplo 3. Autopecas com expedicao

- `tenantType`: `operator`
- `catalogMode`: `catalog`
- `segment`: `automotive`
- `workflowTemplate`: `automotive`

### Exemplo 4. Afiliado interno com catalogo herdado

- `tenantType`: `affiliate`
- `catalogMode`: `shared_catalog`
- `segment`: `retail`
- `workflowTemplate`: `generic_delivery`

### Exemplo 5. Afiliado Shopee sem API oficial

- `tenantType`: `affiliate`
- `catalogMode`: `catalog`
- `segment`: `retail`
- `workflowTemplate`: `generic_delivery`

Observacao:

Nesse caso, os itens podem ser tratados como catalogo afiliado externo manual, e nao como `shared_catalog`.

### Exemplo 6. Operacao interna da Entregoo

- `tenantType`: `internal`
- `catalogMode`: `catalog`
- `segment`: `services`
- `workflowTemplate`: `generic_service`

---

## 10. Quando nao criar outro tenant

Nao criar outro tenant quando o caso for:

- matriz e filial da mesma empresa
- unidade operacional da mesma empresa
- loja principal e unidade secundaria sob o mesmo negocio
- variacao local que deve compartilhar dados

Nesses casos, usar subloja.

---

## 11. Exemplo completo de tenant ficticio

### Tenant

- nome fantasia: `Casa Aurora Bistro`
- razao social: `Casa Aurora Bistro Ltda`
- documento: `47.382.915/0001-62`
- status: `ativo`
- `tenantType`: `operator`
- `catalogMode`: `menu`
- `segment`: `food_service`
- `workflowTemplate`: `kitchen`

### Contato

- email contato: `contato@casaaurora.local`
- email acesso: `marina@casaaurora.local`
- senha inicial: `Aurora@2026!`
- telefone: `(11) 98765-4321`

### Unidade principal

- nome: `Casa Aurora Matriz`
- tipo: principal
- cidade: `Sao Paulo`
- estado: `SP`

### Modulos

- `menu`: `true`
- `catalog`: `false`
- `kitchenKds`: `true`
- `conference`: `true`
- `masseiro`: `false`
- `dispatch`: `true`
- `delivery`: `true`

### Leitura de negocio

Esse tenant representa uma empresa que:

- opera o proprio cardapio
- recebe pedidos no proprio tenant
- produz
- confere
- entrega
- usa caixa proprio

---

## 12. Regra de decisao rapida

Se surgir duvida sobre criar tenant, use esta ordem:

1. e outra empresa ou a mesma empresa?
2. precisa de isolamento proprio?
3. o pedido pertence operacionalmente a essa entidade?
4. compartilha tenant ou precisa de tenant proprio?
5. e subloja, afiliado ou operador?

Se a resposta ainda estiver confusa, revisar:

- [Conceitos Centrais do Sistema](/j:/Projetos/entregoo/docs/conceitos-centrais-do-sistema.md)
- [Guia de Criacao de Assinantes](/j:/Projetos/entregoo/docs/guia-criacao-de-assinantes.md)

---

## 13. Conclusao

Hoje o Entregoo ja suporta possibilidades reais de tenant para:

- operadores
- afiliados
- operacoes hibridas
- uso interno da Entregoo

Com isso, o sistema pode atender:

- food service
- varejo
- moda
- autopecas
- servicos
- logistica
- afiliacao comercial

O ponto mais importante e modelar corretamente:

- tenant
- subloja
- afiliado
- canal externo

Quando essa modelagem fica correta, o resto do sistema fica muito mais coerente.
