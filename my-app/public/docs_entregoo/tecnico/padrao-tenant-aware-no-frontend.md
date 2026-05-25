# Padrao Tenant-Aware no Frontend

Este documento registra o padrao que o frontend do Entregoo deve seguir para evitar mistura de dados entre assinantes.

## 1. Regra principal

Toda leitura ou gravacao sensivel deve usar o `subscriberId` correto da operacao.

Nao e seguro depender apenas do "tenant ativo no momento" dentro de:

- respostas assincronas
- eventos de `storage`
- timers
- fluxos em varias etapas
- telas abertas em paralelo

## 2. O que deve ser evitado

Evitar padroes como:

- chamar `readSubmittedOrders()` sem capturar contexto antes
- chamar `updateSubmittedOrder(...)` assumindo que o tenant ativo nao mudou
- montar um fluxo `novo -> finalizar` usando chave global no `localStorage`
- fazer sync com API resolvendo o tenant so no retorno da promise

## 3. Padrao recomendado

Ao abrir a tela:

1. capturar o tenant atual
2. guardar esse valor em estado local ou variavel do ciclo
3. usar esse mesmo valor em toda leitura e gravacao daquela rodada

Exemplo conceitual:

```ts
const [subscriberId, setSubscriberId] = useState<string | undefined>(
  () => readActiveSaasSubscriberId() || undefined
);

function refreshData(targetSubscriberId = subscriberId) {
  const orders = readSubmittedOrders(targetSubscriberId);
  const settings = readDashboardSettings(targetSubscriberId);
}
```

## 3.1 Contexto por URL

Quando a tela pode ser aberta em outra aba ou compartilhada por link, o ideal e preferir contexto explicito por URL.

Exemplos recentes no Entregoo:

- `/loja?subscriberId=...&substoreId=...`
- `/mesa?subscriberId=...&substoreId=...`
- `/area-cliente?subscriberId=...`

Esse padrao reduz dependencia do tenant ativo global no navegador.

## 3.2 Regra de ausencia de tenant

Se a tela esperava um `subscriberId` e ele nao existe mais:

- nao inventar um tenant default
- nao cair silenciosamente em uma loja fake
- nao continuar a operacao como se o contexto estivesse valido

O comportamento correto e um destes:

- estado vazio
- bloqueio controlado da tela
- redirecionamento para escolher o assinante novamente

Essa regra endurece a fronteira de multitenancy e evita mascarar falhas de contexto.

## 4. Quando reagir a troca de assinante

Telas do dashboard e do portal devem reagir a mudanca de:

- `ACTIVE_SUBSCRIBER_KEY`

Quando essa chave mudar:

- atualizar o `subscriberId` local
- recarregar dados da tela no novo contexto

Na camada de sessao:

- sessao de sistema so deve restaurar o `subscriberId` se ele ainda existir
- sessao interna da Entregoo nao deve empurrar tenant invalido para o navegador

## 5. Quando NAO reagir a troca de assinante

Fluxos que pertencem a uma sessao local devem congelar o tenant da propria tela.

Exemplos:

- storefront
- area do cliente aberta por URL explicita
- checkout em andamento
- edicao de pedido em curso

Nesses casos, a pagina nao deve trocar de tenant no meio do fluxo so porque outra aba mudou o assinante ativo.

## 6. Fluxos que ja foram ajustados

Ate aqui, este padrao foi aplicado em:

- dashboard principal
- relatorios
- preparo
- conferencia
- entregas
- caixa
- configuracoes
- clientes
- usuarios
- integracoes
- pedidos
- storefront
- area do cliente
- links publicos e semi-publicos por `subscriberId`

## 7. Rascunhos locais

Qualquer storage temporario de fluxo deve ser tenant-aware.

Exemplo:

- `pending checkout`
- caches locais de pedidos
- caches locais de catalogo
- sessao de cliente da vitrine
- autenticacao local da vitrine

Se a chave for global, um rascunho de um assinante pode aparecer em outro.

Por isso, sessoes da vitrine passaram a usar escopo derivado de:

- `subscriberId`
- `substoreId`

## 8. Checklist para novas features

Antes de concluir uma tela nova, validar:

- esta leitura respeita `subscriberId`?
- esta gravacao respeita `subscriberId`?
- existe timer, polling ou evento de `storage`?
- o tenant foi capturado no inicio do fluxo?
- existe algum rascunho local global que deveria ser por tenant?
- a tela deve reagir a troca de assinante ou congelar contexto?

## 9. Regra de ouro

Se a operacao nasceu no assinante A, ela deve terminar no assinante A.
