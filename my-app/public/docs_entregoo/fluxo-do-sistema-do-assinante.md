# Fluxo do Sistema do Assinante

## Objetivo
Este documento descreve como o sistema do assinante deve ser entendido do ponto de vista operacional.

Ele existe para:

- explicar a funcao do dashboard do cliente
- mostrar como os modulos se conectam
- registrar o fluxo basico do pedido e da operacao
- orientar evolucoes futuras sem quebrar a coerencia do produto

O foco aqui e o ambiente do cliente, nao o Portal Entregoo.

---

## 1. O que e o sistema do assinante

O sistema do assinante e o ambiente operacional do cliente dentro do Entregoo.

E nele que o tenant do cliente executa sua rotina.

### Exemplos de uso

- receber pedidos
- montar itens
- operar producao
- conferir pedidos
- despachar
- entregar
- operar caixa
- gerir clientes
- gerir catalogo ou cardapio
- ajustar configuracoes

### Regra central

Cada assinante opera apenas o proprio contexto.

O dashboard do cliente nao deve carregar dados de outro assinante.

---

## 2. Estrutura geral do fluxo

O sistema do assinante pode ser entendido em cinco blocos.

### 2.1 Entrada comercial

Onde o pedido nasce.

Exemplos:

- gestor
- site
- app
- canal externo
- marketplace
- API parceira

### 2.2 Estrutura de produto

Onde a empresa define o que vende.

Isso pode ser:

- cardapio
- catalogo
- catalogo compartilhado

### 2.3 Operacao interna

Onde o pedido anda dentro da empresa.

Exemplos:

- preparo
- masseiro
- conferencia
- despacho
- entrega

### 2.4 Controle administrativo e financeiro

Onde a empresa acompanha o funcionamento da operacao.

Exemplos:

- caixa
- clientes
- usuarios
- configuracoes
- relatorios

### 2.5 Contexto de unidade

Quando a empresa tem sublojas, a operacao pode mudar por unidade, ainda dentro do mesmo tenant.

---

## 3. Entrada do pedido

O pedido e a entidade central da operacao do assinante.

### O pedido pode nascer por

- atendimento manual no gestor
- canal proprio do cliente
- storefront
- app
- canal externo
- integracao

### O pedido carrega

- cliente
- itens
- valores
- canal
- status operacional
- pagamento
- observacoes

### Importancia

Como varias telas dependem dele, o pedido deve ser tratado como um eixo transversal do sistema.

---

## 4. Estrutura do produto no sistema do assinante

O sistema pode operar com dois modelos principais.

### 4.1 Cardapio

Voltado para food service e logica de preparo.

Caracteristicas:

- sabores
- tamanhos
- adicionais
- composicao culinaria

### 4.2 Catalogo

Voltado para produto generico.

Caracteristicas:

- categoria
- atributos
- marca
- modelo
- SKU
- variantes
- estoque

### 4.3 Papel do assinante

O comportamento do sistema depende de:

- `catalogMode`
- `segment`
- modulos ativados

Por isso, nem todo tenant usa a mesma experiencia.

---

## 5. Modulos operacionais

O sistema do assinante e modular.

Isso significa que cada tenant pode ter uma combinacao diferente de telas e comportamentos.

### Modulos mais comuns

- `menu`
- `catalog`
- `kitchenKds`
- `conference`
- `masseiro`
- `dispatch`
- `delivery`

### Regra

O tenant deve ver apenas os modulos coerentes com sua operacao.

---

## 6. Fluxo operacional de pedido

O fluxo do pedido tende a seguir esta logica geral:

1. pedido entra
2. pedido e validado/aceito
3. pedido segue para preparo ou montagem
4. pedido pode passar por conferencia
5. pedido segue para despacho
6. pedido e entregue, retirado ou concluido
7. pedido entra em leitura financeira e relatorios

Nem todo tenant usa todas as etapas.

O fluxo depende do modelo operacional configurado.

---

## 7. Fluxo de cozinha e producao

Em operacoes food service ou similares, o fluxo pode incluir:

- preparo
- masseiro
- conferencia

### Preparo

Organiza a fila da producao.

### Masseiro

Atende uma camada especifica de operacao da cozinha quando esse modulo faz sentido.

### Conferencia

Funciona como validação final antes do despacho ou conclusao.

### Regra

Esses modulos nao devem ser expostos a tenants que operam apenas catalogo generico, salvo excecao muito justificada.

---

## 8. Fluxo de despacho e entrega

Quando a operacao trabalha com envio, o sistema pode passar por:

- despacho
- entrega

### Despacho

Organiza:

- fila de saida
- prioridade
- associacao com entregador
- contexto logistico

### Entrega

Representa a etapa em que o pedido esta com o entregador ou em conclusao externa.

### Relacao com o tenant

Dispatch e entrega devem sempre respeitar:

- assinante certo
- unidade certa, quando houver subloja

---

## 9. Caixa

O caixa e a camada financeira operacional do assinante.

### O que ele controla

- sessao de caixa
- abertura
- fechamento
- valor esperado
- valor contado
- sangria
- suprimento
- confirmacoes financeiras dos pedidos

### Papel do caixa no fluxo

O caixa transforma movimento operacional em leitura financeira do turno ou da sessao.

---

## 10. Clientes

O sistema do assinante tambem funciona como base de relacionamento.

### O modulo de clientes ajuda a

- consolidar perfis
- acompanhar historico de pedidos
- registrar observacoes
- apoiar CRM
- identificar inatividade e oportunidades

### Regra

Clientes pertencem ao tenant do assinante.

Nao podem cruzar entre empresas por acidente.

---

## 11. Usuarios do assinante

O sistema do assinante possui sua propria base de usuarios operacionais.

### Esses usuarios existem para operar

- atendimento
- preparo
- caixa
- entregas
- administracao local

### Regra

Usuario do assinante nao e usuario Entregoo.

Essa separacao e obrigatoria.

---

## 12. Configuracoes

Cada tenant pode ajustar seu proprio comportamento operacional.

### Exemplos

- meios de pagamento
- configuracoes de caixa
- impressao
- vias
- modulos da operacao
- preferencias do ambiente

### Papel das configuracoes

Permitir que o sistema se adapte ao assinante sem perder a estrutura comum da plataforma.

---

## 13. Relatorios

Os relatorios sao a camada de leitura gerencial da operacao.

### Eles dependem de

- pedidos
- caixa
- clientes
- catalogo
- comportamento financeiro

### Exemplo de leituras

- financeiro
- mix de produtos
- status da operacao
- desempenho por canal

### Regra

Como relatorio agrega muitos dados, ele so e confiavel quando os modulos-base estao bem isolados por tenant.

---

## 14. Dashboard principal do assinante

O dashboard principal funciona como resumo da operacao.

### Ele tende a responder

- como esta a fila?
- quanto entrou?
- quais clientes pedem atencao?
- como esta o catalogo?
- quais pedidos estao recentes?
- como esta a saude do caixa?

### Papel

Ser um painel de leitura rapida e nao um acumulador confuso de informacoes soltas.

---

## 15. Sublojas no fluxo do assinante

Quando a empresa tem mais de uma unidade, o sistema do assinante pode operar por subloja.

### Isso influencia

- leitura do catalogo
- leitura dos pedidos
- operacao da unidade ativa
- usuarios liberados por unidade
- configuracao operacional local

### Regra

Subloja continua dentro do mesmo tenant, mas pode representar um recorte operacional real.

---

## 16. Catalogo x cardapio dentro do fluxo

Essa diferenca muda a experiencia do sistema.

### Se o tenant usa cardapio

Faz sentido:

- sabores
- tamanhos
- adicionais
- linguagem de cozinha
- eventualmente preparo mais forte

### Se o tenant usa catalogo

Faz sentido:

- SKU
- variantes
- cor
- tamanho
- atributos
- estoque por variante
- logica comercial e logistica mais generica

### Regra de produto

O sistema do assinante precisa adaptar a interface ao modelo do tenant, e nao forcar toda empresa a parecer uma operacao de pizza.

---

## 17. Fluxo de um pedido no tenant

### Cenário simples

1. pedido entra
2. pedido e montado
3. pagamento e confirmado
4. pedido e concluido

### Cenario com cozinha

1. pedido entra
2. vai para preparo
3. passa por conferencia
4. segue para despacho ou retirada
5. pagamento e confirmado
6. pedido e finalizado

### Cenario de catalogo generico

1. pedido entra
2. item e separado
3. pedido passa por conferencia, se aplicavel
4. segue para despacho e entrega
5. caixa e leitura financeira acompanham a conclusao

---

## 18. Fluxo do assinante versus Portal Entregoo

Essa separacao precisa ficar sempre clara.

### No Portal Entregoo

- cria e configura a conta
- acompanha implantacao
- gere equipe interna
- administra a carteira

### No sistema do assinante

- opera a empresa
- vende
- produz
- confere
- entrega
- controla caixa
- acompanha clientes

### Regra

O portal administra a plataforma.
O dashboard do assinante opera o negocio do cliente.

---

## 19. O que o sistema do assinante nao deve virar

Para manter a clareza do produto, o sistema do assinante nao deve virar:

- extensao do portal interno
- lugar de configuracao de rede comercial da Entregoo
- painel de administracao da carteira
- mistura de varios tenants

### O foco deve continuar sendo

- operacao do cliente
- leitura do proprio negocio
- contexto isolado do tenant

---

## 20. Regras operacionais do fluxo do assinante

### Regra 1

Cada tenant opera apenas o proprio contexto.

### Regra 2

As telas e modulos devem respeitar o modelo do assinante.

### Regra 3

Pedido, clientes, caixa e catalogo precisam nascer e terminar no tenant correto.

### Regra 4

Subloja e unidade da mesma empresa, nao outro assinante.

### Regra 5

Canal externo representa origem comercial, nao empresa.

---

## 21. Leitura recomendada do fluxo

Se alguem quiser entender o sistema do assinante rapidamente, deve pensar assim:

### Primeiro

Como a empresa vende?

### Depois

Que tipo de produto ela opera?

### Depois

Quais modulos ela precisa?

### Depois

Como o pedido anda internamente?

### Depois

Como ela controla clientes, caixa e configuracoes?

Essa ordem ajuda a manter o sistema coerente.

---

## 22. Resumo executivo

O sistema do assinante e o ambiente operacional do cliente no Entregoo.

Ele deve ser entendido como uma combinacao de:

- entrada comercial
- estrutura de produto
- modulos ativados
- fluxo operacional
- controle administrativo e financeiro

Tudo isso dentro de um tenant isolado.

Em uma frase:

> o sistema do assinante e a camada onde o cliente opera seu negocio dentro da plataforma, com comportamento adaptado ao seu modelo de operacao, mas sempre respeitando a fronteira do proprio tenant.

