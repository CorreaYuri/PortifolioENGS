# Conceitos Centrais do Sistema Entregoo

## Objetivo
Este documento existe para fixar a linguagem oficial do Entregoo.

Ele define:

- os conceitos estruturais do sistema
- o significado de cada entidade principal
- a fronteira entre conceitos parecidos
- as regras de decisao que evitam modelagem errada

Este documento deve ser lido como referencia de produto, operacao e arquitetura.

Quando surgir uma duvida do tipo:

- “isso e assinante ou subloja?”
- “isso e afiliado ou canal?”
- “isso e cardapio ou catalogo?”
- “isso fica no portal Entregoo ou no sistema do assinante?”

o ponto de partida deve ser este arquivo.

---

## 1. Visao geral do Entregoo

O Entregoo nao deve mais ser pensado apenas como um sistema de cozinha.

Hoje, o conceito central do produto e:

> uma plataforma de operacao por tenant, unidade, modulo e canal, adaptavel por segmento.

Essa definicao tem implicacoes importantes:

- o sistema nao e exclusivo de food service
- o sistema pode operar diferentes segmentos
- o comportamento do tenant pode mudar conforme o modelo operacional
- o portal interno e diferente do sistema usado pelo assinante
- a estrutura precisa respeitar multitenancy de forma rigorosa

---

## 2. Camadas do sistema

O Entregoo hoje se divide em duas camadas principais de uso.

### 2.1 Portal Entregoo

E a camada interna da propria Entregoo.

Serve para:

- gerir assinantes
- gerir equipe interna
- controlar implantacao
- acompanhar operacao da carteira
- cadastrar sublojas
- configurar relacoes comerciais
- preparar canais externos

Nao e o ambiente operacional do cliente.

### 2.2 Sistema do assinante

E o ambiente usado pela empresa cliente.

Serve para:

- pedidos
- operacao
- preparo
- conferencia
- entregas
- caixa
- clientes
- usuarios
- catalogo ou cardapio
- configuracoes da propria operacao

Regra fundamental:

> O portal Entregoo e exclusivo do time interno da Entregoo.
> O assinante nao usa o portal; ele usa o sistema operacional do proprio tenant.

---

## 3. Tenant

### Definicao

Tenant e o contexto isolado de dados e operacao de uma empresa no Entregoo.

Na pratica, tenant e o isolamento logico que garante que:

- um assinante nao veja dados de outro
- usuarios de uma empresa so operem no proprio contexto
- pedidos, catalogo, clientes, caixa e configuracoes nao vazem entre empresas

### Regra operacional

Sempre que um modulo for sensivel, ele deve saber explicitamente:

- qual e o `subscriberId`
- e, quando aplicavel, qual e o `substoreId`

### Implicacao tecnica

No frontend e no backend, tenant nao pode ser tratado como inferencia vaga.

Tenant precisa ser:

- capturado
- propagado
- respeitado

---

## 4. Assinante

### Definicao

Assinante e a empresa cadastrada na plataforma como cliente ou entidade operacional.

O assinante e a representacao de negocio mais importante do sistema.

### O que um assinante possui

Em geral, o assinante concentra:

- tenant proprio
- usuarios proprios
- configuracoes proprias
- catalogo ou cardapio
- pedidos
- clientes
- caixa
- operacao
- possiveis sublojas
- possiveis canais externos

### Quando criar um assinante

Criar um assinante quando existir:

- uma empresa com operacao propria
- uma entidade comercial que precisa de contexto isolado
- um afiliado que precisa ser outro tenant
- uma operacao distinta que nao deve compartilhar dados com outra

### Quando nao criar um assinante

Nao criar assinante quando o caso for:

- apenas uma unidade da mesma empresa
- uma extensao operacional da mesma organizacao
- uma filial que deve compartilhar o mesmo tenant

Nesses casos, usar subloja.

---

## 5. Tipos de assinante

O tipo do assinante define o papel estrutural da empresa dentro da plataforma.

### 5.1 Operador

Empresa que executa a operacao principal.

Exemplos:

- restaurante
- loja com estoque proprio
- oficina com expedicao
- centro logistico
- operacao que produz, separa, despacha ou entrega

### 5.2 Afiliado

Empresa separada, com tenant proprio, que participa de uma rede comercial.

Exemplos:

- revendedor
- parceiro comercial
- afiliado que usa catalogo de outro operador
- rede de distribuicao comercial

Importante:

- afiliado e outra empresa
- afiliado nao e subloja

### 5.3 Hibrido

Empresa que opera e tambem participa de rede comercial.

Exemplos:

- empresa que vende por conta propria e tambem redistribui
- operacao com frente comercial e execucao propria

### 5.4 Interno

Tipo reservado para contexto da propria Entregoo, nao para assinantes comuns.

---

## 6. Subloja

### Definicao

Subloja e uma unidade operacional da mesma empresa, dentro do mesmo tenant.

Ela existe para representar:

- matriz
- filial
- hub
- unidade operacional

### O que a subloja compartilha

Como regra geral, a subloja compartilha com a loja pai:

- o tenant
- a base principal da empresa
- a identidade de empresa
- a fronteira de isolamento contra outros assinantes

### O que a subloja pode ter

Mesmo sendo da mesma empresa, a subloja pode:

- herdar configuracoes da loja principal
- receber snapshot de configuracao
- ter overrides depois
- operar como unidade distinta no dia a dia

### O que subloja nao e

Subloja nao e:

- afiliado
- franquia independente
- parceiro comercial externo
- outro assinante

### Regra de ouro

> Se precisa ser outra empresa com isolamento proprio, nao e subloja.
> Se e a mesma empresa com varias unidades, entao e subloja.

---

## 7. Afiliado

### Definicao

Afiliado e uma empresa distinta, com tenant proprio, ligada comercialmente a outra empresa.

### O que caracteriza um afiliado

- e outra empresa
- tem seu proprio tenant
- nao deve enxergar operacao interna do operador pai
- pode receber catalogo de outro tenant
- pode atuar como canal comercial, revendedor ou rede

### Diferenca entre afiliado e subloja

#### Subloja

- mesma empresa
- mesmo tenant
- variacao operacional interna

#### Afiliado

- outra empresa
- outro tenant
- vinculacao comercial

### Regra de decisao

Se o caso for:

- revenda
- relacionamento comercial
- catalogo vindo de outro operador
- parceiro externo

entao o modelo tende a ser afiliado, nao subloja.

---

## 8. Canal externo

### Definicao

Canal externo e a porta comercial ou tecnica por onde um tenant vende, recebe pedidos ou integra dados.

Exemplos:

- Shopify
- WooCommerce
- marketplace
- API parceira
- operacao manual de entrada de pedidos

### O que canal externo nao e

Canal externo nao e:

- assinante
- empresa
- afiliado
- subloja

### Papel do canal externo

O canal externo existe para:

- importar catalogo
- receber pedido
- sincronizar status
- sincronizar estoque
- integrar operacao comercial externa com a operacao do Entregoo

### Diferenca entre canal externo e afiliado

#### Afiliado

- e empresa
- tem tenant proprio
- participa da rede comercial

#### Canal externo

- nao e empresa
- nao e tenant
- e apenas uma origem/destino de integracao

---

## 9. Segmento

### Definicao

Segmento e a classificacao do tipo de negocio atendido pelo tenant.

Ele existe para orientar:

- linguagem da interface
- atributos de catalogo
- presets operacionais
- experiencias especificas por mercado

### Exemplos de segmento

- food service
- apparel
- automotive
- beauty
- health
- retail
- industrial
- services
- logistics
- other

### O que o segmento nao define sozinho

Segmento nao define por si so:

- quais modulos estao ativos
- se a empresa e operador ou afiliado
- se usa cardapio ou catalogo

Segmento e contexto de negocio, nao modelo completo.

---

## 10. Workflow operacional

### Definicao

Workflow operacional e o template de fluxo que representa como a operacao anda.

Ele ajuda a organizar o comportamento do sistema conforme a natureza da empresa.

### Exemplos

- kitchen
- apparel
- automotive
- generic_production
- generic_delivery
- generic_service

### Papel real do workflow

O workflow influencia:

- etapas do processo
- linguagem da operacao
- visao de producao
- experiencia de acompanhamento

### O que o workflow nao substitui

Workflow nao substitui:

- segmento
- modulos
- tenantType
- catalogMode

Ele trabalha em conjunto com esses outros conceitos.

---

## 11. Modulos

### Definicao

Modulos sao os blocos funcionais ativados ou desativados por assinante.

Eles controlam o que o tenant realmente usa.

### Exemplos

- menu
- catalog
- kitchenKds
- conference
- masseiro
- dispatch
- delivery

### Papel dos modulos

Os modulos existem para:

- adequar o sistema ao contexto do assinante
- impedir excesso de telas desnecessarias
- habilitar apenas o fluxo coerente com a operacao

### Regra central

Nem todo tenant deve ver tudo.

Se um tenant e de catalogo generico, nao faz sentido expor a experiencia completa de cozinha.

Se um tenant nao trabalha com entrega, nao faz sentido liberar modulo de entregas.

---

## 12. Cardapio

### Definicao

Cardapio e a estrutura de produto voltada para operacoes food service ou similares.

### Caracteristicas tipicas

- sabores
- tamanhos
- adicionais
- regras de montagem
- variacoes ligadas a preparo

### Quando usar

Usar cardapio quando a natureza do item for parecida com:

- pizza
- hamburguer
- marmita
- combo alimentar
- item com logica de montagem culinaria

### Quando nao usar

Nao usar cardapio para operacoes em que o item real e:

- SKU de varejo
- produto de moda
- autopeca
- item logistico
- produto industrial

Nesses casos, usar catalogo.

---

## 13. Catalogo

### Definicao

Catalogo e a estrutura de produto generico do Entregoo.

### Caracteristicas tipicas

- categoria
- marca
- modelo
- referencia
- atributos
- variantes
- SKU
- estoque
- cor
- tamanho
- compatibilidade
- dimensoes

### Quando usar

Usar catalogo quando a operacao trabalha com produto mais proximo de:

- varejo
- moda
- autopecas
- cosmeticos
- logistica
- industria

### Papel estrategico

O catalogo e uma das chaves para o Entregoo nao ficar preso ao food service.

---

## 14. Catalogo compartilhado

### Definicao

Catalogo compartilhado e um modelo em que o tenant utiliza uma base de produtos originada de outra empresa ou estrutura.

### Quando faz sentido

- afiliado recebendo base de um operador
- rede comercial com catalogo central
- cenario de distribuicao padronizada

### O que ele representa

Catalogo compartilhado nao significa falta de isolamento.

Significa:

- origem comercial compartilhada
- tenant ainda isolado
- possibilidade de heranca e adaptacao posterior

---

## 15. Cliente

### Definicao

Cliente e a entidade de consumo ou relacionamento comercial do assinante.

### No contexto do Entregoo

Cliente pode concentrar:

- dados basicos
- historico de pedidos
- perfil
- automacoes de CRM
- cupons
- timeline de relacionamento

### Regra importante

Cliente pertence ao tenant do assinante.

Cliente de um assinante nao pode atravessar para outro sem uma modelagem futura e intencional de rede, nunca por acidente.

---

## 16. Pedido

### Definicao

Pedido e a unidade principal da operacao comercial e operacional do sistema.

### O que o pedido concentra

- origem do canal
- itens
- valores
- cliente
- status operacional
- confirmacao financeira
- despacho
- entrega

### Papel do pedido

O pedido atravessa varias areas:

- atendimento
- preparo
- conferencia
- entregas
- caixa
- relatorios
- CRM

Por isso, ele e um dos elementos mais sensiveis para multitenancy.

---

## 17. Caixa

### Definicao

Caixa e o modulo operacional-financeiro que registra a sessao de operacao financeira do tenant.

### Elementos principais

- sessao de caixa
- abertura
- fechamento
- valor esperado
- valor contado
- sangria
- suprimento
- confirmacoes de pedidos

### Papel do caixa

O caixa ajuda a transformar o pedido em leitura financeira operacional do turno ou da sessao.

### Importancia estrutural

Historicamente, esse tipo de modulo nao pode depender apenas do navegador.

Por isso, ele entrou na rota de migracao para o backend.

---

## 18. Fonte principal de dados

### Definicao

Fonte principal e o lugar que deve ser considerado verdade oficial do sistema.

### Diretriz do Entregoo

O destino arquitetural do Entregoo e:

- backend como fonte principal
- PostgreSQL como persistencia oficial

### O que isso significa para o frontend

O frontend pode usar:

- estado em memoria
- cache
- fallback local

Mas nao deve mandar na regra de negocio.

---

## 19. Espelho local

### Definicao

Espelho local e uma copia do dado no navegador, usada durante a transicao.

### Quando ele e aceitavel

- resposta rapida de interface
- fallback temporario
- compatibilidade durante migracao

### Quando ele vira risco

Quando passa a agir como verdade de negocio.

Sinais de risco:

- dado reaparecendo depois de excluir
- tenant misturando informacoes
- loop de sync
- comportamento diferente por aba

---

## 20. API-first

### Definicao

E o modelo em que a tela busca a API logo na abertura e trata o backend como fonte principal, mesmo que ainda use cache para resposta rapida.

### No Entregoo

Esse e o modelo-alvo de consolidacao do sistema.

### Porque isso importa

Sem API-first, o sistema fica mais suscetivel a:

- divergencia de navegador
- perda de rastreabilidade
- comportamento inconsistente entre operadores

---

## 21. Tenant-aware

### Definicao

Tenant-aware e o comportamento tecnico que respeita explicitamente o contexto do tenant.

### Regra minima

Leitura e escrita devem considerar:

- `subscriberId`
- `substoreId`, quando aplicavel

### Porque isso e indispensavel

Sem tenant-awareness:

- a plataforma perde isolamento
- o sistema mistura dados
- o produto deixa de ser confiavel como SaaS multitenant

---

## 22. Fronteiras que nunca devem ser misturadas

### Assinante x Subloja

- assinante = empresa com tenant proprio
- subloja = unidade da mesma empresa

### Afiliado x Subloja

- afiliado = outra empresa
- subloja = mesma empresa

### Afiliado x Canal externo

- afiliado = empresa
- canal = integracao

### Cardapio x Catalogo

- cardapio = produto com logica de food/preparo
- catalogo = produto generico por SKU/atributos

### Portal Entregoo x Sistema do assinante

- portal = uso interno da Entregoo
- sistema do assinante = operacao do cliente

---

## 23. Perguntas de decisao rapida

### Isso e um assinante ou uma subloja?

Pergunte:

- e a mesma empresa?
- deve compartilhar tenant?

Se sim, tende a ser subloja.
Se nao, tende a ser assinante.

### Isso e um afiliado ou so um canal?

Pergunte:

- existe outra empresa com contexto proprio?

Se sim, afiliado.
Se nao, provavelmente e canal.

### Isso e cardapio ou catalogo?

Pergunte:

- o item se comporta como produto de cozinha ou como SKU/variacao?

Se cozinha, cardapio.
Se SKU/atributo, catalogo.

### Isso fica no portal ou no dashboard?

Pergunte:

- isso e administracao interna da Entregoo?

Se sim, portal.
Se e operacao do cliente, dashboard do assinante.

---

## 24. Regras de trabalho para o time

Toda evolucao relevante no Entregoo deve respeitar estas perguntas:

1. Qual conceito esta sendo alterado?
2. Esse conceito ja esta documentado?
3. Isso cria nova ambiguidade com outro conceito?
4. Isso respeita tenant?
5. Isso reforca ou enfraquece a fonte principal de dados?

Se a resposta nao estiver clara, o trabalho deve parar na camada conceitual antes de crescer no codigo.

---

## 25. Resumo executivo

O Entregoo hoje depende de alguns conceitos centrais para nao virar um sistema confuso:

- tenant
- assinante
- subloja
- afiliado
- canal externo
- segmento
- workflow
- modulos
- cardapio
- catalogo
- portal Entregoo
- sistema do assinante

Se esses conceitos forem respeitados, o sistema cresce como plataforma.

Se eles forem misturados, o sistema cresce com retrabalho e risco estrutural.

Em resumo:

> a consistencia conceitual do Entregoo e parte da propria arquitetura.

