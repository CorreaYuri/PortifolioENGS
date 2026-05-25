# CRM Comercial e Automacoes Nexa

## Objetivo

Este documento explica como a frente comercial da Nexa funciona hoje dentro da plataforma.

Ele cobre:

- o que cada tela do CRM faz
- como a equipe deve usar o modulo no dia a dia
- quais automacoes ja acontecem no sistema
- o que cada automacao altera no fluxo comercial

## Visao geral do fluxo

Hoje o comercial da Nexa segue esta logica:

1. a demanda entra como `lead`
2. o comercial registra contexto, contatos, reunioes e proximos passos
3. a descoberta evolui para `proposta`
4. a proposta pode ser enviada, aprovada, rejeitada ou expirada
5. quando faz sentido, o sistema consolida o cliente e prepara a entrada na operacao

Regra importante:

- `lead` nao e `cliente`
- `cliente` so deve nascer quando a relacao comercial ja estiver formalizada
- `proposta aprovada` e o principal gatilho de transicao para a operacao

## Telas do CRM

### `/app/crm`

Papel da tela:

- servir como painel executivo do comercial
- mostrar saude do funil
- apontar prioridades automaticas

O que a tela mostra:

- quantidade de leads ativos
- leads qualificados
- propostas pendentes
- follow-ups agendados
- follow-ups atrasados
- taxa de conversao
- alertas automaticos
- agenda resumida
- propostas prontas para virar projeto
- conversao por origem
- distribuicao por etapa
- card de "Proxima acao" para atacar automaticamente o maior gargalo do momento

Quando usar:

- na abertura do dia
- em reunioes de acompanhamento comercial
- para leitura gerencial da operacao
- para decidir rapidamente qual fila atacar primeiro sem navegar por varios blocos

### `/app/crm/agenda`

Papel da tela:

- concentrar tudo que exige acao comercial ou transicao para operacao

O que a tela mostra:

- reunioes agendadas
- follow-ups programados
- propostas enviadas aguardando retorno
- kickoffs pendentes
- leads sem contato recente

Quando usar:

- na rotina diaria do comercial
- antes de encerrar o dia
- em alinhamento entre comercial e operacao

### `/app/crm/pipeline`

Papel da tela:

- mostrar o funil comercial por etapa

O que a tela mostra:

- novos
- em contato
- reuniao agendada
- descoberta
- proposta pendente
- ganhos

Quando usar:

- para leitura rapida do funil
- para identificar gargalos por etapa

### `/app/leads/[id]`

Papel da tela:

- ser a ficha operacional do lead

O que a equipe faz aqui:

- atualiza status comercial
- agenda reuniao
- define proxima acao
- registra interacoes
- cria proposta
- converte o lead quando necessario

## Rotina recomendada de uso

### Inicio do dia

1. abrir `/app/crm`
2. revisar alertas automaticos
3. abrir `/app/crm/agenda`
4. tratar follow-ups vencidos primeiro
5. revisar reunioes do dia
6. revisar propostas enviadas sem retorno

### Durante o atendimento

1. abrir a ficha do lead
2. registrar a interacao logo apos a call, visita ou troca importante
3. definir a proxima acao
4. preencher a data da proxima acao
5. atualizar o status se a etapa mudou de verdade

### Quando a descoberta estiver madura

1. criar a proposta vinculada ao lead
2. registrar escopo e valor com clareza
3. definir o status inicial correto
4. acompanhar a resposta do cliente pelo CRM

### Quando a proposta for aprovada

1. validar se o contexto comercial esta correto
2. abrir o modulo de propostas
3. revisar a proposta aprovada
4. abrir o projeto no momento certo

## Automacoes atuais

## 1. Follow-up automatico ao enviar proposta

Quando acontece:

- quando uma proposta nasce ou muda para o status `SENT`

O que o sistema faz:

- mantem o lead como `PROPOSAL_PENDING`
- grava a proxima acao como follow-up da proposta
- agenda automaticamente o follow-up para 3 dias depois
- registra o contexto para o CRM e agenda

Por que isso existe:

- para o comercial nao esquecer proposta enviada
- para padronizar a disciplina de acompanhamento

## 2. Conversao comercial ao aprovar proposta

Quando acontece:

- quando uma proposta muda para `APPROVED`

O que o sistema faz:

- marca o lead como `WON`
- consolida ou cria o cliente quando ainda nao existir
- vincula o cliente na proposta
- atualiza briefings ligados ao lead
- define a proxima acao como kickoff e abertura de projeto
- agenda essa proxima acao para curto prazo
- registra evento na timeline comercial

Por que isso existe:

- para evitar que uma proposta aprovada fique solta
- para preparar a passagem do comercial para a operacao

## 3. Alertas automaticos no painel do CRM

O que o painel identifica:

- follow-ups vencidos
- leads sem contato recente
- propostas sem retorno
- propostas aprovadas aguardando abertura de projeto

Como usar:

- tratar esses alertas como fila de prioridade
- evitar comecar o dia por tarefas novas enquanto ha pendencias criticas na lista

## 4. Agenda integrada comercial + operacao

O que a agenda cruza:

- reunioes com leads
- proximas acoes comerciais
- propostas aguardando retorno
- kickoffs pendentes

Por que isso importa:

- a equipe para de olhar apenas o lead isolado
- o comercial passa a enxergar a ponte completa ate a operacao

## O que cada automacao nao faz

Para evitar entendimento errado:

- o sistema nao substitui a decisao humana sobre estrategia comercial
- o sistema nao abre projeto sozinho
- o sistema nao dispensa registro de interacao
- o sistema nao elimina a necessidade de revisar dados antes da conversao

As automacoes ajudam a equipe. Elas nao devem virar desculpa para operar no piloto automatico.

## Instrucao pratica por papel

### Comercial

Deve:

- manter lead atualizado
- registrar interacoes
- respeitar os alertas automaticos
- usar a agenda como fila de trabalho
- tratar proposta aprovada como transicao para operacao

### Gestao

Deve:

- usar `/app/crm` para acompanhar saude do funil
- cobrar follow-up de propostas enviadas
- observar canais com melhor conversao
- monitorar kickoffs pendentes

### Operacao

Deve:

- acompanhar propostas aprovadas aguardando projeto
- alinhar kickoff assim que a aprovacao se consolidar

## Boas praticas

1. toda interacao relevante deve ser registrada no lead
2. toda oportunidade precisa de proxima acao e data
3. proposta enviada sem follow-up e risco comercial
4. proposta aprovada deve ser tratada como fila de entrada na operacao
5. alertas do CRM devem ser trabalhados antes de demandas menos urgentes

## Sinais de uso incorreto

Estes sinais mostram desvio de processo:

- lead sem proxima acao
- lead em descoberta sem historico
- proposta enviada sem retorno por varios dias
- proposta aprovada sem cliente consolidado
- proposta aprovada sem plano de abertura de projeto

## Fechamento

Este documento deve ser consultado sempre que houver duvida sobre a operacao comercial da Nexa.

Se o processo comercial amadurecer, este material deve ser atualizado junto com o sistema.
