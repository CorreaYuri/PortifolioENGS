# Guia de Projetos Nexa

## Objetivo

Este documento explica como a Nexa deve usar o modulo de projetos no dia a dia.

Ele existe para alinhar:

- gestao
- engenharia
- operacao
- acompanhamento do cliente

## Papel do modulo

O modulo de projetos e o lugar onde a proposta aprovada vira execucao real.

Ele deve responder:

- o que esta sendo feito
- em que etapa estamos
- quem esta responsavel
- o que esta bloqueado
- o que o cliente pode acompanhar

## Fluxo operacional do projeto

1. proposta aprovada
2. abertura do projeto
3. etapas padrao da Nexa
4. tarefas e backlog
5. squad e responsabilidades
6. timeline operacional
7. documentos e aprovacoes
8. acompanhamento no portal

## Como usar

### Abertura do projeto

1. abrir o projeto a partir da proposta aprovada
2. revisar nome, descricao e datas macro
3. confirmar o cliente vinculado
4. validar se as etapas padrao fazem sentido para o caso
5. na tela `/app/projetos`, usar o card "Proxima acao" para priorizar bloqueios, backlog e projetos sem etapa

### Etapas

1. usar as etapas como estrutura oficial do metodo Nexa
2. ajustar nomes e datas quando o projeto exigir
3. manter apenas uma leitura coerente do andamento
4. nao marcar etapa como concluida sem evidencias reais

### Tarefas

1. criar tarefas pequenas e objetivas
2. sempre ligar a tarefa a uma etapa quando ja houver contexto
3. usar backlog apenas para itens ainda sem etapa definida
4. atualizar status sempre que houver mudanca real
5. atribuir responsavel sempre que possivel

### Squad do projeto

1. vincular colaboradores da Nexa ao projeto
2. definir funcao de cada membro no contexto daquele projeto
3. revisar alocacao quando a equipe mudar

### Timeline

1. registrar fatos importantes
2. separar o que e interno e o que pode ser visivel ao cliente
3. usar a timeline para criar continuidade operacional

### Documentos

1. cadastrar documentos no contexto correto do projeto
2. definir se o documento e interno ou do cliente
3. criar nova versao quando houver alteracao real
4. usar aprovacao formal quando precisar de aceite do cliente

### Documentos e assinaturas na pratica

O fluxo documental deve ser tratado como a referencia formal do projeto.

Fluxo interno recomendado:

1. abrir o projeto e entrar na area de documentos
2. cadastrar o documento com nome, tipo, visibilidade e ficheiro real
3. revisar a previa para confirmar que o arquivo certo foi anexado
4. baixar o arquivo quando precisar validar o original fora da tela
5. subir nova versao sempre que houver mudanca real de conteudo
6. solicitar aprovacao ao cliente apenas quando a versao estiver pronta
7. acompanhar a auditoria documental para saber quem enviou, alterou, aprovou, leu ou removeu

Assinatura interna:

1. cadastrar a assinatura visual do colaborador na ficha de acesso do usuario
2. voltar ao documento desejado no projeto
3. escolher o preset de assinatura mais adequado ou manter o modo automatico
4. se necessario, ajustar pagina, posicao `X` e `Y`
5. usar a previa ao vivo para validar o ponto do carimbo antes de salvar
6. assinar o documento
7. abrir a previa assinada ou baixar o PDF assinado para conferencia

Assinatura no portal do cliente:

1. o cliente entra em `/portal`
2. acessa o projeto vinculado ao proprio login
3. cadastra a assinatura visual quando ainda nao existir
4. abre o documento compartilhado
5. visualiza a previa, baixa se quiser revisar localmente e assina quando estiver de acordo
6. o sistema registra a assinatura, a leitura e os eventos na trilha documental

Diretrizes operacionais:

- a assinatura visual interna pode ser aplicada em qualquer documento da empresa que esteja dentro do fluxo documental
- assinatura do cliente acontece apenas em documento compartilhado com aquele acesso
- PDF assinado pode ser gerado com carimbo direto no proprio arquivo
- quando o arquivo nao permitir carimbo PDF direto, o sistema mantem a visualizacao formal assinada
- alterar preset ou posicao de assinatura tambem gera rastreabilidade

Auditoria e exportacao:

1. usar o historico documental para investigar mudancas
2. filtrar por documento ou tipo de evento quando precisar de leitura rapida
3. exportar CSV ou PDF quando a Nexa precisar de auditoria formal ou envio executivo

### Riscos

1. registrar risco assim que ele for identificado
2. definir severidade e dono
3. manter mitigacao atualizada
4. encerrar apenas quando o risco estiver realmente controlado

## Como a equipe deve pensar

- etapa mostra momento macro
- tarefa mostra execucao
- timeline mostra historico
- documento mostra evidencia
- risco mostra atencao

Essas camadas nao competem. Elas se complementam.

## O que aparece no portal do cliente

Hoje o portal pode refletir:

- etapa atual
- progresso do projeto
- proximos passos
- documentos liberados
- historico visivel ao cliente
- aprovacoes e confirmacoes quando aplicavel
- previa, download e assinatura de documentos compartilhados

Regra importante:

- o portal depende da disciplina da equipe interna
- se a equipe nao atualiza o projeto, o cliente perde transparencia
- a experiencia documental do cliente deve refletir apenas o que ja foi validado internamente

## Boas praticas

1. nao deixar tarefa sem dono por muito tempo
2. nao usar timeline como chat solto
3. nao marcar progresso por percepcao, e sim por mudanca real
4. nao compartilhar documento com cliente antes de revisar visibilidade
5. nao ignorar risco recorrente sem registro
6. nao assinar documento sem conferir a versao ativa e a previa final
7. nao trocar ficheiro sem subir nova versao formal

## Performance da listagem de projetos

Para a rota `/app/projetos`, a busca e o filtro agora sao executados no banco.

Padrao aplicado:

1. filtro por `status` e `q` direto na consulta
2. ordenacao (`recent`, `name`, `deadline`) direto na consulta
3. limite de resultado (`10`, `20`, `50` ate maximo `100`) aplicado no banco
4. listagem com carga leve (sem incluir relacionamentos pesados de detalhe)

Resultado esperado:

- menor consumo de memoria no servidor
- menor latencia quando a base crescer
- pagina mais estavel em cenarios de carga

## Sinais de uso incorreto

- projeto sem etapa ativa clara
- backlog crescendo sem organizacao
- tarefa parada sem bloqueio registrado
- documento relevante fora do projeto
- documento sem ficheiro real anexado quando deveria ser evidencial
- documento assinado fora da versao correta
- cliente sem visibilidade porque o time nao atualizou a operacao

## Fechamento

O modulo de projetos e a espinha da entrega da Nexa.

Quando a operacao de projetos e conduzida com disciplina, a Nexa transmite organizacao, confianca e maturidade operacional ao cliente.
