# Regras de Multitenancy do Entregoo

## Objetivo
Este documento define as regras oficiais de multitenancy do Entregoo.

Ele existe para garantir que o sistema continue evoluindo como SaaS operacional sem comprometer:

- isolamento entre assinantes
- confiabilidade de dados
- seguranca de operacao
- coerencia entre portal interno e sistema do assinante

Este documento deve ser tratado como regra estrutural, nao como sugestao.

---

## 1. O que multitenancy significa no Entregoo

No Entregoo, multitenancy significa que varias empresas podem existir na mesma plataforma, mas cada uma opera em contexto isolado.

Na pratica, isso quer dizer:

- cada assinante tem seu proprio contexto de dados
- um assinante nao pode visualizar ou alterar dados de outro
- as regras de operacao de uma empresa nao podem “vazar” para outra
- unidades da mesma empresa podem compartilhar tenant, mas nao com empresas distintas

O tenant, portanto, e uma fronteira de seguranca, produto e arquitetura.

---

## 2. Regra principal

### Regra de ouro

> O assinante A nao pode ver, alterar, herdar ou operar dados do assinante B, exceto quando uma regra especifica e intencional de rede comercial tiver sido modelada para isso.

Mesmo nesses casos especiais:

- o isolamento operacional continua valendo
- o compartilhamento precisa ser explicitamente controlado
- nada deve acontecer por acidente ou inferencia solta

---

## 3. Fronteira oficial de tenant

### O que define a fronteira

A fronteira oficial de tenant do Entregoo e o assinante.

Isso significa que cada assinante concentra, como regra:

- pedidos
- catalogo ou cardapio
- clientes
- usuarios do sistema do cliente
- caixa
- configuracoes
- operacao
- relatorios
- sublojas da mesma empresa

### O que nao atravessa tenant

Nao podem atravessar de um tenant para outro sem modelagem intencional:

- pedidos
- clientes
- historico financeiro
- usuarios do assinante
- configuracoes operacionais
- caixa
- rascunhos de fluxo
- estados operacionais de preparo, conferencia e entrega

---

## 4. O que pertence ao mesmo tenant

Pertencem ao mesmo tenant:

- matriz
- filiais
- hubs
- unidades operacionais da mesma empresa
- sublojas

Essas estruturas podem compartilhar:

- base principal da empresa
- identidade do tenant
- configuracoes herdadas
- operacao integrada

### Regra

Se e a mesma empresa e deve compartilhar contexto principal, o modelo tende a ser `subloja`, nao novo assinante.

---

## 5. O que deve ser outro tenant

Devem ser outros tenants:

- empresas distintas
- franquias independentes
- afiliados
- parceiros comerciais com contexto proprio
- revendedores com operacao separada
- qualquer entidade que nao deva compartilhar a base operacional da empresa principal

### Regra

Se precisa de isolamento proprio, nao e subloja.

---

## 6. Diferenca entre subloja, afiliado e canal externo

### Subloja

- mesma empresa
- mesmo tenant
- variacao operacional interna

### Afiliado

- outra empresa
- outro tenant
- relacao comercial ou de rede

### Canal externo

- nao e empresa
- nao e tenant
- apenas meio tecnico/comercial de entrada e saida

### Regra de protecao

Nunca misturar esses tres conceitos.

Se forem misturados:

- a modelagem comercial fica confusa
- o isolamento quebra
- o sistema perde previsibilidade

---

## 7. Portal Entregoo versus sistema do assinante

### Portal Entregoo

O portal `/entregoo` e exclusivo do time interno da Entregoo.

Ele existe para:

- criar assinantes
- criar sublojas
- gerir equipe interna
- acompanhar implantacao
- configurar relacoes comerciais
- administrar canais e operacao da carteira

### Sistema do assinante

O dashboard operacional e o ambiente do cliente.

Ele existe para:

- operacao do pedido
- fluxo operacional
- caixa
- clientes
- usuarios
- catalogo ou cardapio
- configuracoes da empresa

### Regra

O assinante nao usa o portal Entregoo.

O portal e da Entregoo.
O dashboard e do cliente.

---

## 8. Regras de leitura

Toda leitura sensivel deve respeitar tenant.

### Leitura sensivel inclui

- pedidos
- catalogo
- clientes
- caixa
- usuarios
- configuracoes
- relatorios
- tarefas operacionais
- estados de despacho
- rascunhos de checkout

### Regra tecnica

A leitura deve usar:

- `subscriberId` explicito
- `substoreId`, quando aplicavel

### O que nao pode acontecer

Nao pode:

- ler pelo “tenant ativo do momento” em operacao assincrona tardia
- resolver contexto so no retorno da promise
- usar chave global que ignore tenant
- depender de `storage events` para reconstituir contexto de forma implicita

---

## 9. Regras de escrita

### Regra complementar de resolucao de contexto

Se o `subscriberId` esperado nao existir mais, o sistema deve:

- falhar de forma segura
- mostrar estado vazio ou contexto ausente
- pedir nova selecao de assinante quando fizer sentido

O sistema nao deve:

- inventar um assinante valido
- cair automaticamente em uma loja fake
- mascarar erro de contexto com fallback estrutural invisivel

Toda escrita sensivel deve nascer e terminar no mesmo tenant.

### Escritas sensiveis incluem

- criar pedido
- atualizar pedido
- confirmar pagamento
- registrar caixa
- registrar sangria e suprimento
- salvar clientes
- salvar configuracoes
- assumir tarefas
- concluir tarefas
- sincronizar sublojas
- gravar usuarios

### Regra de ouro da escrita

> Se a operacao nasceu no assinante A, ela deve terminar no assinante A.

### O que nao pode acontecer

Nao pode:

- iniciar uma acao no tenant A e concluir no tenant B
- resolver o tenant so no final da acao
- gravar em storage global compartilhado
- assumir que trocar de assinante entre abas nao impacta o fluxo

---

## 10. Regras para frontend

O frontend precisa ser `tenant-aware`.

### Isso significa

- capturar `subscriberId` no inicio do fluxo
- manter esse contexto durante a leitura e escrita daquela rodada
- usar `substoreId` quando o modulo depender da unidade
- reagir corretamente a troca de assinante
- congelar tenant em fluxos que pertencem a sessao local da pagina
- tratar `subscriberId` ausente como ausencia real de contexto, nao como contexto padrao

### Exemplos de telas que devem congelar contexto

- storefront
- checkout em andamento
- area do cliente
- fluxo de finalizacao de pedido

### Exemplos de telas que devem reagir a troca de assinante

- dashboard principal
- relatorios
- clientes
- usuarios
- configuracoes
- entregas
- preparo
- conferencia

### Regra complementar

Leitura pura nao deve disparar sync de forma barulhenta.

Caso contrario, surgem:

- loops
- congelamento
- storage events em cascata
- comportamento inconsistente

---

## 11. Regras para backend

O backend deve caminhar para ser a fonte principal dos dados.

### Isso implica

- rotas sensiveis identificando `storeId`
- rotas por unidade usando `substoreId` quando necessario
- validacao de contexto antes de listar ou gravar
- persistencia real no PostgreSQL

### Regra do backend

Nenhum dado operacional critico deve depender exclusivamente do navegador como dono da verdade.

### Caminho recomendado

Os modulos mais sensiveis devem migrar primeiro:

- pedidos
- catalogo
- clientes
- caixa
- estados operacionais
- usuarios do assinante
- configuracoes

---

## 12. Regras para cache local e espelho local

O `localStorage` pode existir no Entregoo apenas como apoio controlado.

### Usos aceitaveis

- resposta rapida de interface
- fallback temporario
- compatibilidade durante transicao

### Usos proibidos como regra de produto

- verdade principal de negocio
- compartilhamento implicito entre tenants
- rascunhos globais sem `subscriberId`
- sincronizacao silenciosa em toda leitura

### Regra pratica

Se existir espelho local, ele precisa ser:

- tenant-aware
- subordinado ao backend
- atualizado como reflexo, nao como dono da informacao

---

## 13. Regras para dados compartilhados entre empresas

O Entregoo pode evoluir para cenarios com:

- afiliados
- catalogo compartilhado
- rede comercial
- operador pai e empresas vinculadas

Mas isso nao elimina multitenancy.

### Regra

Compartilhar nao significa misturar.

Mesmo em cenarios de rede:

- a origem do compartilhamento precisa ser explicita
- o tipo de relacionamento precisa estar modelado
- o tenant operacional continua isolado

### Exemplo

Um afiliado pode usar um catalogo originado de outro operador.

Mas isso nao significa que:

- ele pode ver pedidos internos do operador
- ele pode ver clientes do operador
- ele compartilha caixa do operador
- ele virou subloja do operador

---

## 14. Regras para usuarios

### Usuario do assinante

So deve operar dentro do proprio tenant.

Se houver acesso a varias unidades, isso continua:

- dentro da mesma empresa
- dentro do mesmo tenant

### Usuario Entregoo

Usuario interno da Entregoo pode operar o portal e atuar sobre varios assinantes, porque faz parte da administracao da plataforma.

### Regra

Jamais tratar usuario interno da Entregoo e usuario do assinante como a mesma categoria de acesso.

---

## 15. Regras para relatorios

Relatorios sao particularmente sensiveis em multitenancy porque agregam dados de varias areas.

### Regra

Nenhum relatorio do assinante pode:

- usar pedidos de outro tenant
- somar clientes de outro tenant
- considerar caixa de outro tenant
- usar catalogo de outro tenant por engano

### Consequencia

Antes de confiar em relatorios, os modulos-base precisam estar tenant-aware e, idealmente, mais consolidados no backend.

---

## 16. Sinais de violacao de multitenancy

Se algum destes sintomas aparecer, considerar falha estrutural:

- pedido de outro assinante aparecendo
- cliente de outra loja surgindo na tela
- configuracao herdada sem intencao
- catalogo errado depois de trocar de assinante
- rascunho de checkout cruzando tenant
- caixa exibindo sessao de outra operacao
- relatorio somando base alheia

Esses sintomas nao sao “detalhes”.
Eles sao sinais de quebra de fronteira.

---

## 17. Checklist de validacao para novas features

Antes de concluir qualquer feature nova, validar:

1. Qual e o tenant dessa operacao?
2. Existe `subscriberId` explicito?
3. Existe `substoreId` quando a unidade importa?
4. O dado e lido do tenant correto?
5. O dado e gravado no tenant correto?
6. Ha algum cache local global?
7. A tela deve reagir ou congelar contexto?
8. A feature mistura portal Entregoo com dashboard do assinante?
9. O conceito correto esta sendo usado: assinante, subloja, afiliado ou canal?

Se uma dessas respostas nao estiver clara, a feature nao esta pronta.

---

## 18. Regra de implementacao recomendada

### Produto

Definir primeiro:

- qual entidade esta sendo afetada
- qual tenant ela pertence
- se o caso e empresa, subloja, afiliado ou canal

### Frontend

Implementar com contexto explicito e comportamento tenant-aware.

### Backend

Persistir com `storeId` e, quando fizer sentido, `substoreId`.

### Documentacao

Registrar a regra no `docs` sempre que a mudanca for estrutural.

---

## 19. Estado desejado de maturidade

O objetivo do Entregoo e operar com este nivel de maturidade:

- backend como fonte principal
- frontend API-first
- espelho local controlado
- tenant explicito em toda operacao critica
- separacao clara entre portal interno e sistema do assinante
- separacao clara entre subloja, afiliado e canal externo

---

## 20. Resumo executivo

Multitenancy no Entregoo nao e apenas uma decisao tecnica.

Ele e:

- regra de produto
- regra de seguranca
- regra de operacao
- regra de arquitetura

Se essa camada falhar, a plataforma perde confiabilidade.

Se essa camada for respeitada, o Entregoo ganha base para crescer com:

- mais segmentos
- mais tenants
- mais unidades
- mais afiliados
- mais integracoes

sem perder consistencia.
