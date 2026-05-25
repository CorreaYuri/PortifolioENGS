# Guia de Criacao de Assinantes

## Objetivo
Este documento serve como referencia operacional para criar assinantes no Entregoo com consistencia, respeitando:

- isolamento entre empresas
- tipo de operacao do cliente
- estrutura correta de catalogo ou cardapio
- modulos ativos por assinante
- uso de sublojas
- uso de afiliados
- integracoes com canais externos e marketplaces

---

## 1. Regra principal de isolamento

Cada assinante e um tenant.

Isso significa:

- o assinante A nao pode ver dados do assinante B
- usuarios do cliente so enxergam dados da propria empresa
- sublojas pertencem a mesma empresa
- afiliados nao sao sublojas
- o portal `/entregoo` e exclusivo do time interno da Entregoo

Resumo:

- `Portal Entregoo`: uso interno da Entregoo
- `Dashboard do sistema`: uso do assinante

---

## 2. Quando criar um assinante

Crie um assinante quando existir uma empresa, operacao ou entidade comercial que precise de ambiente proprio.

Exemplos:

- uma pizzaria
- uma loja de roupas
- uma operacao automotiva
- uma empresa que recebe pedidos de marketplace
- um afiliado com operacao propria

Nao criar como assinante:

- uma unidade da mesma empresa que deve compartilhar tenant
- uma subloja operacional da mesma empresa

Nesses casos, use subloja.

---

## 3. Tipos de assinante

### 3.1 Operador
Use quando a empresa opera o proprio fluxo.

Exemplos:

- restaurante
- loja com estoque proprio
- centro de separacao
- operacao de producao e entrega

Quando escolher:

- a empresa produz, separa, despacha ou entrega
- o pedido pertence operacionalmente a ela

### 3.2 Afiliado
Use quando a empresa atua como revendedora ou parte de uma rede comercial.

Exemplos:

- revendedor
- parceiro comercial
- franquia com catalogo vindo de operador principal

Quando escolher:

- a empresa depende de outro operador para catalogo ou execucao
- existe relacionamento comercial entre empresas distintas

Importante:

- afiliado e outro tenant
- afiliado nao e subloja

### 3.3 Hibrido
Use quando a empresa opera e tambem atua como rede ou afiliada em alguns cenarios.

Exemplos:

- empresa que vende por conta propria e revende produtos de outra
- operador com expansão comercial em canais mistos

### 3.4 Interno
Reservado para usos internos da Entregoo.

---

## 4. Estrutura de catalogo

### 4.1 Cardapio
Use para food service e operacoes parecidas com cozinha.

Indicado para:

- pizzas
- hamburgueres
- marmitas
- combos com sabores, tamanhos e adicionais

Caracteristicas:

- sabores
- tamanhos
- adicionais
- regras de preparo

### 4.2 Catalogo
Use para produtos genericos.

Indicado para:

- roupas
- autopecas
- cosmeticos
- itens industriais
- produtos de varejo

Caracteristicas:

- categoria
- marca
- modelo
- referencia
- cores
- tamanhos
- atributos
- variantes
- SKU
- estoque

### 4.3 Catalogo compartilhado
Use quando a empresa utiliza uma base de produtos herdada de outra empresa.

Indicado para:

- afiliados
- redes de revenda
- operacoes com origem centralizada de catalogo

---

## 5. Segmento do negocio

Escolha o segmento pensando no tipo real da operacao.

Segmentos hoje preparados:

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

Impacto do segmento:

- orienta a experiencia do catalogo
- ajusta labels
- ajuda no modelo operacional
- prepara atributos de produto mais adequados

Exemplos:

- pizzaria: `food_service`
- moda: `apparel`
- autopecas: `automotive`
- operador logistico: `logistics`

---

## 6. Workflow operacional

Escolha o template operacional que mais combina com a rotina do cliente.

Modelos atuais:

- `kitchen`
- `apparel`
- `automotive`
- `generic_production`
- `generic_delivery`
- `generic_service`

Uso recomendado:

- cozinha: `kitchen`
- confeccao: `apparel`
- oficina/pecas: `automotive`
- separacao e producao variada: `generic_production`
- entregas sem preparo complexo: `generic_delivery`
- servico com etapas: `generic_service`

---

## 7. Modulos do assinante

Os modulos definem o que aparece e o que o sistema libera para aquele tenant.

Modulos base:

- `menu`
- `catalog`
- `kitchenKds`
- `conference`
- `masseiro`
- `dispatch`
- `delivery`

### Regras importantes

- se o assinante usa `Cardapio`, normalmente usa `menu`
- se o assinante usa `Catalogo`, normalmente usa `catalog`
- `kitchenKds`, `conference` e `masseiro` fazem sentido principalmente em operacao de cozinha
- `dispatch` e `delivery` fazem sentido para operacoes com expedicao e entrega

### Exemplos de combinacao

#### Restaurante delivery

- `menu`
- `kitchenKds`
- `conference`
- `dispatch`
- `delivery`

#### Loja de roupas

- `catalog`
- `dispatch`
- `delivery`

#### Autopecas com retirada e envio

- `catalog`
- `conference`
- `dispatch`
- `delivery`

#### Revendedor afiliado sem operacao completa

- `catalog`
- `dispatch`

---

## 8. Sublojas

Sublojas sao unidades da mesma empresa.

Use subloja quando:

- a empresa tem varias unidades
- todas pertencem ao mesmo tenant
- a operacao pode herdar configuracao da loja principal

Caracteristicas:

- mesma empresa
- mesmo tenant
- mesma base principal
- pode herdar configuracoes da loja pai
- pode ser ajustada depois

Nao usar subloja para:

- franquias independentes
- afiliados
- revendedores externos

Esses casos devem ser outro assinante.

---

## 9. Afiliados e rede comercial

Afiliado e uma empresa separada.

Use afiliado quando:

- existe revenda
- existe relacao comercial com operador pai
- o catalogo pode vir de outra empresa

Estrutura correta:

- operador principal
- afiliado vinculado
- catalogo proprio ou compartilhado
- canal comercial proprio

Importante:

- afiliado nao pode enxergar dados operacionais do operador
- o vinculo e comercial, nao de tenant

---

## 10. Canais externos e marketplace

Canais externos representam a origem comercial ou tecnica do pedido.

Exemplos:

- Shopify
- WooCommerce
- marketplace
- API parceira
- manual

Canal externo nao e empresa.

Canal externo serve para:

- importar catalogo
- receber pedidos
- devolver status
- sincronizar estoque

### Quando vender produtos vindos de marketplace

Recomendacao:

- criar assinante como `Operador`
- usar `Catalogo`
- escolher segmento mais proximo do negocio
- habilitar `Catalogo`, `Despacho` e `Entregas` conforme necessidade
- cadastrar canal externo como `Marketplace` ou `API parceira`

Fluxo ideal:

1. importar produtos da API
2. mapear categorias e atributos
3. receber pedidos pelo canal
4. operar pedido no Entregoo
5. devolver status ao marketplace

---

## 11. Processo recomendado para criar um assinante

### Etapa 1. Identificar o tipo

Perguntas:

- e uma empresa que opera por conta propria?
- e um afiliado?
- e um modelo misto?

Escolha:

- `Operador`
- `Afiliado`
- `Hibrido`

### Etapa 2. Definir a estrutura de produto

Perguntas:

- trabalha com sabores, tamanhos e adicionais?
- ou com SKU, variacoes, categorias e atributos?

Escolha:

- `Cardapio`
- `Catalogo`
- `Catalogo compartilhado`

### Etapa 3. Definir segmento e workflow

Perguntas:

- qual o mercado?
- qual o fluxo operacional?

Escolha:

- segmento
- template operacional

### Etapa 4. Definir modulos

Perguntas:

- precisa de KDS?
- precisa de conferencia?
- precisa de despacho?
- precisa de entrega?

Ative somente o necessario.

### Etapa 5. Definir se tera sublojas

Perguntas:

- a empresa tem mais de uma unidade?
- essas unidades devem compartilhar tenant?

Se sim:

- criar sublojas no portal

### Etapa 6. Definir se ha integracao externa

Perguntas:

- o pedido vira de marketplace?
- o catalogo vira de API?

Se sim:

- cadastrar canais externos

---

## 12. Exemplos prontos

### Exemplo A. Pizzaria

- Tipo: `Operador`
- Estrutura: `Cardapio`
- Segmento: `food_service`
- Workflow: `kitchen`
- Modulos:
  - `menu`
  - `kitchenKds`
  - `conference`
  - `dispatch`
  - `delivery`

### Exemplo B. Loja de roupas

- Tipo: `Operador`
- Estrutura: `Catalogo`
- Segmento: `apparel`
- Workflow: `apparel`
- Modulos:
  - `catalog`
  - `dispatch`
  - `delivery`

### Exemplo C. Autopecas

- Tipo: `Operador`
- Estrutura: `Catalogo`
- Segmento: `automotive`
- Workflow: `automotive`
- Modulos:
  - `catalog`
  - `conference`
  - `dispatch`
  - `delivery`

### Exemplo D. Revendedor afiliado

- Tipo: `Afiliado`
- Estrutura: `Catalogo compartilhado`
- Segmento: `retail`
- Workflow: `generic_delivery`
- Modulos:
  - `catalog`
  - `dispatch`

### Exemplo E. Loja vendendo produtos vindos de marketplace

- Tipo: `Operador`
- Estrutura: `Catalogo`
- Segmento: conforme negocio real
- Workflow: `generic_delivery` ou `generic_production`
- Modulos:
  - `catalog`
  - `dispatch`
  - `delivery`

Canal externo:

- `Marketplace`
ou
- `API parceira`

---

## 13. Checklist rapido antes de salvar

- o tipo de assinante esta correto?
- o modo de catalogo esta correto?
- o segmento faz sentido?
- o workflow faz sentido?
- os modulos estao coerentes com a operacao?
- a empresa precisa de sublojas?
- a empresa e afiliada ou e operador principal?
- ha canal externo a cadastrar?

Se alguma dessas respostas estiver errada, o tenant nasce com estrutura confusa.

---

## 14. Regras para o time Entregoo

- nao misturar afiliado com subloja
- nao liberar modulos de cozinha para operacao que nao seja cozinha sem necessidade
- nao usar `Cardapio` para operacao que e claramente `Catalogo`
- nao cadastrar canal externo como se fosse empresa
- nao permitir que um assinante visualize dados de outro

---

## 15. Caminho recomendado de maturidade

### Fase 1

- criar assinante corretamente
- configurar modulos
- ajustar sublojas

### Fase 2

- cadastrar catalogo ou cardapio
- configurar usuarios da empresa
- configurar impressao e operacao

### Fase 3

- integrar canais externos
- importar produtos
- receber pedidos por API

### Fase 4

- sincronizar estoque
- devolver status
- operar afiliados e catalogo compartilhado

---

## 16. Resumo executivo

Para criar um assinante da forma correta:

1. defina se e `Operador`, `Afiliado` ou `Hibrido`
2. defina se usa `Cardapio`, `Catalogo` ou `Catalogo compartilhado`
3. escolha o segmento
4. escolha o workflow operacional
5. ligue apenas os modulos necessarios
6. crie sublojas se forem unidades da mesma empresa
7. crie afiliados como outros assinantes, nunca como sublojas
8. cadastre canais externos para marketplace, Shopify, API parceira e similares

---

## Arquivo

Documento gerado para uso interno do projeto Entregoo.
