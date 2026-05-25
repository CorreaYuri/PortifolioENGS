# Guia Operacional dos Modulos Nexa

## Objetivo

Este documento explica como usar os modulos ja implementados na plataforma Nexa.

Ele deve servir como referencia pratica para:

- diretoria
- gestao
- comercial
- engenharia
- financeiro
- administrativo
- RH

O foco aqui nao e explicar arquitetura. O foco e orientar a operacao.

## Regra geral de uso

Antes de usar qualquer modulo, a equipe deve seguir estas regras:

1. registrar informacoes no modulo correto
2. evitar duplicidade de cadastro
3. sempre relacionar o registro ao contexto certo quando houver essa opcao
4. usar descricoes e observacoes objetivas
5. atualizar status quando houver mudanca real

Ponto de partida recomendado:

- iniciar o dia em `/app/rotina-diaria` para abrir os checklists consolidados por trilha
- depois entrar nos modulos especificos conforme prioridade da Central de pendencias

## Matriz de acesso interno

Regra atual:

- colaborador da Nexa acessa a area interna em `/app`
- cliente autenticado acessa apenas `/portal`
- navegacao continua organizada por modulo
- as mutacoes mais sensiveis agora exigem capacidade explicita no servidor

Como a regra funciona hoje:

1. `ADMIN` e `GESTOR` possuem acesso interno amplo
2. `COMERCIAL` ou setor comercial operam `crm.manage`, `proposals.manage` e as capacidades comerciais de clientes
3. `ENGENHARIA` ou setor engenharia operam `clients.manage` e `projects.manage`
4. setor `RH` opera `collaborators.manage`, `rh.manage` e `rh.approve`
5. `FINANCEIRO` ou setores administrativos relacionados operam `administrative.manage`
6. usuarios internos seguem com acesso a `Dashboard`, `Padroes` e `Meu RH`
7. todos os usuarios internos possuem a area `Pessoal` em `/app/pessoal` para acoes de perfil e autosservico interno

Observacao operacional:

- a sessao interna e revalidada contra o banco nas leituras e actions protegidas
- mudar papel, setor ou status do usuario passa a refletir no servidor sem depender apenas de novo login
- a governanca de excecoes agora pode ser feita em `/app/permissoes`, com override auditavel por papel, setor e usuario
- quando houver conflito entre override de papel, setor e usuario, o sistema aplica a regra mais segura: bloqueio explicito vence liberacao
- para a matriz detalhada de capacidades, consulte [Seguranca e Permissoes](/j:/Projetos/Nexa/my-app/docs/seguranca-e-permissoes.md)

## Comercial

Visao geral:

- o comercial da Nexa agora opera com `CRM`, `Leads`, `Orcamentos` e `Propostas`
- a visao executiva fica em `/app/crm`
- a fila diaria fica em `/app/crm/agenda`
- o acompanhamento por etapa fica em `/app/crm/pipeline`

### CRM

Quando usar:

- no inicio do dia
- em reunioes comerciais
- para leitura gerencial da saude do funil

Como usar:

1. abrir `/app/crm`
2. revisar os indicadores principais
3. observar os alertas automaticos
4. abrir a agenda integrada quando houver itens criticos
5. usar a conversao por origem para leitura de performance comercial
6. seguir o card "Proxima acao" para atacar primeiro follow-ups vencidos, leads parados ou kickoffs pendentes

Boa pratica:

- tratar os alertas como fila de prioridade
- usar o painel para gestao e nao apenas para consulta passiva

### Agenda comercial

Quando usar:

- diariamente pelo comercial
- antes de iniciar novos contatos
- para alinhar comercial e operacao

Como usar:

1. abrir `/app/crm/agenda`
2. revisar reunioes do dia
3. tratar follow-ups vencidos ou proximos
4. revisar propostas enviadas sem retorno
5. observar kickoffs pendentes para passagem a operacao
6. revisar leads sem contato recente

Boa pratica:

- follow-up vencido deve ser tratado antes de abrir novas frentes menos urgentes
- proposta aprovada aguardando projeto nao deve ficar parada na agenda

### Leads

Quando usar:

- quando uma oportunidade entra na Nexa
- quando um pedido de orcamento chega pelo site
- quando houver indicacao ou contato comercial direto

Como usar:

1. registrar o lead com dados claros
2. preencher contexto inicial e mensagem
3. atualizar status conforme a evolucao comercial
4. registrar interacoes importantes no historico

Boa pratica:

- todo contato relevante deve virar interacao registrada
- cada lead deve ter um proximo passo claro

### Orcamentos

Quando usar:

- quando a entrada veio como briefing inicial
- quando a equipe precisa tratar a demanda recebida pelo site

Como usar:

1. receber a solicitacao publica
2. revisar internamente
3. usar o lead como contexto comercial principal
4. nao converter em cliente cedo demais
5. usar a fila de revisao comercial em `/app/orcamentos` para tratar primeiro os itens de prioridade alta

Triagem automatica atual:

- o modulo calcula score por status, recencia, qualidade do briefing e sinais de urgencia
- os filtros "prioridade alta", "media" e "baixa" ajudam a organizar a rotina diaria do comercial
- cada registro exibe "proxima acao recomendada" para reduzir atraso de resposta
- cada card agora permite "criar tarefa comercial" para registrar follow-up no lead com prazo inicial de 2 horas

Conexao com rotina diaria:

- a pagina `/app/rotina-diaria` mostra o bloco "Radar comercial imediato" com os orcamentos de prioridade alta
- o comercial pode abrir a fila alta de orcamentos ou entrar direto no lead a partir desse radar

Boa pratica:

- orcamento e entrada de demanda, nao cliente fechado

Protecao operacional atual:

- formulario publico com campo honeypot para reduzir envio automatizado
- limite de tentativas por janela de tempo no backend para evitar spam recorrente
- descricao minima obrigatoria para melhorar a qualidade do briefing inicial

### Propostas

Quando usar:

- quando a descoberta ja trouxe clareza suficiente para ofertar escopo, prazo e valor

Como usar:

1. criar a proposta vinculada ao lead ou cliente
2. registrar escopo e preco
3. acompanhar status da proposta
4. quando aprovada, abrir projeto

Performance e navegacao:

1. a listagem em `/app/propostas` agora usa paginacao real no banco (`page`, `limit`, `skip`)
2. filtros de busca e status sao preservados ao trocar de pagina
3. ordenacao por colunas de uso diario:
   - data (`Mais recentes`)
   - status
   - valor (`Maior valor` e `Menor valor`)

Boa pratica:

- proposta deve nascer com contexto comercial suficiente

Automacoes atuais:

1. proposta enviada agenda follow-up automatico em 3 dias no lead
2. proposta aprovada consolida cliente quando necessario
3. proposta aprovada prepara a passagem para kickoff e abertura de projeto

Regra importante:

- automacao ajuda a disciplina comercial, mas nao substitui revisao humana de contexto

## Clientes

Quando usar:

- quando a relacao comercial foi formalizada
- quando a Nexa precisa gerenciar o cliente como entidade ativa

Como usar:

1. cadastrar empresa e dados principais
2. manter observacoes importantes
3. usar o detalhe do cliente como ponto de consulta
4. vincular depois acessos, projetos, cobrancas e documentos
5. na home de `/app/clientes`, seguir o card "Proxima acao" para priorizar renovacao, cobranca em aberto e acessos de portal

Boa pratica:

- nao cadastrar lead como cliente sem fechamento real

Performance e paginação:

1. a listagem em `/app/clientes` agora usa paginacao real no banco (`page`, `limit`, `skip`)
2. busca por `q` continua ativa e e preservada ao navegar entre paginas
3. os cards de resumo da carteira respeitam o filtro atual

Mesma diretriz aplicada:

- `/app/leads`
- `/app/colaboradores`

## Projetos

Estado atual:

- projetos ja podem nascer da aprovacao da proposta
- o modulo interno de projetos esta operacional de ponta a ponta
- o portal do cliente ja reflete etapa atual, progresso, proximos passos e historico recente

Como a equipe deve pensar:

1. proposta aprovada abre projeto
2. projeto ja recebe etapas padrao da Nexa
3. cada etapa deve ser mantida atualizada para refletir andamento real no portal

Como usar no dia a dia:

1. abrir o projeto a partir da proposta aprovada
2. revisar o nome do projeto, contexto inicial e datas macro
3. conferir as etapas padrao criadas automaticamente
4. ajustar nome e datas das etapas quando o caso real pedir
5. cadastrar tarefas dentro da etapa correta ou no backlog geral
6. atualizar status de etapa e tarefa sempre que houver mudanca real
7. reordenar etapas quando a ordem operacional mudar
8. mover tarefas entre etapas quando o planejamento evoluir
9. excluir tarefas ou etapas apenas quando o contexto nao fizer mais sentido
10. acompanhar a timeline do projeto para manter rastreabilidade

Boas praticas:

- nao usar a descricao da tarefa como deposito de texto solto
- manter tarefas pequenas e objetivas
- usar backlog geral apenas para itens ainda sem etapa definida
- nao excluir etapa com tarefa pendente; primeiro reorganizar o trabalho
- lembrar que o portal do cliente depende da disciplina de atualizacao interna

O que o portal do cliente enxerga hoje:

- etapa atual do projeto
- progresso de etapas e tarefas
- proximos passos
- documentos liberados ao cliente
- historico recente do projeto

Operacao documental do projeto:

1. entrar em `/app/projetos/[id]/documentos`
2. cadastrar documento com ficheiro, tipo e visibilidade correta
3. usar a previa para validar o arquivo antes de compartilhar
4. baixar o original quando precisar de conferencia externa
5. subir nova versao no mesmo documento para manter historico
6. pedir aprovacao ao cliente quando houver aceite formal
7. acompanhar o historico documental e exportar CSV ou PDF quando necessario

Leitura operacional:

- o documento ativo deve representar a versao oficial em uso
- o historico documental deve ser a fonte de consulta para mudancas e decisoes
- a exportacao deve ser usada quando a Nexa precisar consolidar evidencia formal

Checklist diario no submodulo:

1. revisar versao oficial de cada documento ativo
2. tratar solicitacoes de aprovacao pendentes
3. validar experiencia de previa, download e assinatura no portal do cliente

Assinaturas documentais:

1. colaborador interno cadastra sua assinatura na propria ficha de acesso
2. cliente cadastra a assinatura no portal antes do primeiro aceite
3. documentos podem ser assinados no interno e no portal, conforme a visibilidade e o papel do usuario
4. documentos PDF assinados podem receber carimbo visual direto no arquivo
5. o ponto da assinatura pode usar preset automatico, preset manual ou ajuste fino com previa ao vivo

Padrao recomendado:

- usar preset automatico quando o documento seguir o comportamento esperado do tipo
- usar preset manual quando houver exigencia recorrente do cliente ou do processo
- usar ajuste fino apenas quando houver necessidade real de posicionamento especial

Cuidados de uso:

- documento de cliente so deve ser compartilhado depois da revisao de visibilidade
- assinatura nao substitui a escolha correta da versao
- quando houver alteracao no conteudo, subir nova versao antes de pedir nova assinatura ou aprovacao
- usar a auditoria documental como fonte oficial de rastreabilidade
- evitar compartilhar arquivo sem previa validada pela equipe interna

## Padroes

Quando usar:

- sempre que houver duvida sobre como a Nexa conduz projetos

Como usar:

1. consultar o guia antes de iniciar fases importantes
2. usar o documento como base de onboarding
3. revisar em reunioes internas quando o time precisar alinhar processo

Boa pratica:

- o modulo de padroes e referencia oficial da empresa

## Colaboradores

Quando usar:

- quando um colaborador precisa ser registrado oficialmente na Nexa

Como usar:

1. cadastrar colaborador vinculado ao usuario correto
2. definir setor, funcao, tipo de contrato, perfil de carga e carga horaria semanal
3. registrar foto de perfil para a area autenticada
4. anexar documentos desde entrevista, curriculo e admissao ate atestados e exames
5. manter dados basicos, jornada e observacoes atualizados

Boa pratica:

- usar colaboradores como base oficial de RH, alocacao e controles internos
- nao separar documento de RH do cadastro do colaborador

## Setores

Quando usar:

- para organizar a estrutura interna da Nexa

Como usar:

1. cadastrar os setores oficiais
2. vincular colaboradores aos setores corretos
3. usar setores como apoio para centros de custo e governanca interna

## RH

### Registro de ponto

Quando usar:

- para registrar jornada ou apontamentos relevantes do colaborador

Como usar:

1. lancar entrada e saida pelo RH central ou pela ficha do colaborador
2. deixar o registro como rascunho ou submetido enquanto ainda estiver em conferencia
3. aprovar ou ajustar o ponto na fila de revisao do RH
4. usar observacoes para justificar divergencias, correcoes ou contexto do dia

Regra importante:

- ponto so entra no banco de horas quando estiver aprovado ou ajustado

### Banco de horas

Como funciona hoje:

1. o calculo considera a competencia mensal atual
2. a base diaria nasce da carga horaria semanal dividida em 5 dias uteis
3. feriados nao opcionais retiram carga esperada do dia
4. ausencias aprovadas justificam o dia e retiram carga esperada
5. pontos em rascunho ou submetidos nao entram no saldo final

O que o colaborador enxerga em `Meu RH`:

- saldo atual do banco
- horas trabalhadas validadas
- base esperada do mes
- dias justificados
- leitura diaria do periodo
- historico recente de pontos

Boa pratica:

- nao usar o banco de horas sem passar pela aprovacao formal dos pontos
- registrar feriados e ausencias antes do fechamento da competencia

### Feriados e ausencias

Quando usar:

- feriado para datas corporativas que impactam a carga do banco
- ausencia para ferias, afastamento medico, compensacao, treinamento ou outra justificativa

Como usar:

1. registrar feriado com nome e data
2. marcar se ele e opcional ou se deve abater a carga esperada
3. registrar ausencia vinculada ao colaborador e periodo correto
4. marcar como aprovada quando ela deve entrar no calculo oficial

Boa pratica:

- ausencia nao substitui ponto por improviso; ela deve refletir um evento real de RH
- feriado opcional nao deve ser usado para zerar carga de toda a equipe sem decisao formal

### Fechamento de competencia e espelho de ponto

Quando usar:

- ao encerrar o mes ou o periodo que precisa ser congelado para conferencia

Como usar:

1. fechar a competencia do colaborador no RH
2. revisar o snapshot salvo de horas trabalhadas, base esperada, saldo, justificativas e pendencias
3. aprovar formalmente o espelho quando a conferencia estiver concluida
4. baixar o PDF do espelho para arquivo ou envio
5. registrar a ciencia do colaborador apos aprovacao

Regra importante:

- o PDF nasce do snapshot salvo no fechamento, nao do calculo ao vivo
- isso evita mudanca retroativa do espelho por lancamentos tardios

Boa pratica:

- nao aprovar competencia com ponto pendente sem decisao clara
- se houver divergencia depois do fechamento, reabrir a competencia em vez de mascarar o historico

### Documentos de RH

Quando usar:

- para arquivos admissionais, contratuais, medicos ou internos
- para documentos que exigem assinatura individual do colaborador (ex.: espelho, contracheque e termos)

Como usar:

1. anexar no contexto do colaborador (preferencialmente com ficheiro interno)
2. classificar por categoria
3. marcar "solicitar assinatura" quando houver obrigacao formal de aceite
4. manter datas quando fizer sentido
5. acompanhar no painel RH os estados "pendente", "assinado" e "vencendo"
6. validar o retorno no "Meu RH / Documentos" do colaborador
7. usar a Central de pendencias para priorizar assinaturas documentais em aberto
8. acompanhar notificacao operacional quando o colaborador concluir a assinatura
9. abrir "Auditoria" no documento para consultar linha do tempo completa do registro
10. quando houver demanda massiva (ex.: contracheques), usar o bloco "Acao em lote" na propria listagem para solicitar assinatura de varios documentos visiveis
11. quando a rotina for mensal, usar o filtro por competencia no lote para selecionar apenas os elegiveis daquele periodo
12. apos assinatura do colaborador, registrar o parecer de aprovacao do RH na tela de auditoria do documento
13. para reduzir friccao visual, operar o fluxo em sessoes no RH Documentos: `1. Envio`, `2. Acompanhamento`, `3. Aprovacao RH`

Boa pratica:

- documentos de RH devem ficar centralizados no colaborador, nao espalhados
- quando exigir assinatura, evitar link externo e usar upload interno para manter trilha auditavel

Checklist diario no submodulo:

1. abrir pendentes de assinatura primeiro
2. acompanhar confirmacoes de assinatura na central de pendencias
3. revisar auditoria do documento quando houver duvida operacional ou de compliance
4. usar o indicador de SLA no card do documento para priorizar D+7 antes de D+3
5. nao encerrar o fluxo no "assinado"; concluir com aprovacao ou rejeicao formal do RH

Lembretes automaticos de assinatura:

1. D+1: lembrete informativo para reforco ao colaborador
2. D+3: item entra em risco de atraso na Central de pendencias
3. D+7: escalonamento critico para tratamento de gestor

Referencia completa do modulo:

- consultar [Modulo de Lembretes de Assinatura](/j:/Projetos/Nexa/my-app/docs/modulo-lembretes-assinatura-nexa.md)

Execucao tecnica:

- alem da sincronizacao na Central de pendencias, a Nexa pode agendar a rota interna `GET/POST /api/internal/signature-reminders` com token de cron

Filtro recomendado na central:

- abrir `/app/pendencias` e usar os filtros de notificacao "RH / Lembretes de assinatura" e "Projetos / Lembretes de assinatura"

## Centros de custo

Quando usar:

- antes de organizar compras, despesas, ativos e estoque de forma madura

Como usar:

1. criar centros macro da Nexa
2. vincular setor ou projeto quando necessario
3. usar o centro de custo como classificacao gerencial dos gastos

Boa pratica:

- tudo que gerar custo relevante deve, quando possivel, apontar para um centro de custo

## Compras

Quando usar:

- quando a Nexa solicitar ou registrar aquisicoes

Como usar:

1. cadastrar fornecedor
2. registrar pedido com titulo, valor, datas e itens
3. vincular centro de custo quando houver
4. depois decidir o desdobramento do pedido

Desdobramentos possiveis:

- receber item no estoque
- transformar item em ativo
- lancar compra no financeiro como despesa

Boa pratica:

- compra deve ser a origem administrativa do processo
- nao registrar a mesma compra manualmente em varios modulos sem usar as pontes do sistema

## Estoque

Quando usar:

- para itens controlados por quantidade

Como usar:

1. cadastrar item com unidade, saldo inicial e estoque minimo
2. registrar movimentacoes de entrada, saida, devolucao ou perda
3. vincular contexto de centro de custo, projeto ou colaborador quando houver
4. na home de `/app/estoque`, usar o card "Proxima acao" para atacar itens abaixo do minimo e lacunas de rastreabilidade

Boa pratica:

- o saldo do estoque deve nascer das movimentacoes
- nao ajustar quantidade informalmente fora do historico

## Ativos

Quando usar:

- para bens patrimoniais individualizados

Como usar:

1. cadastrar manualmente ou converter item de compra em ativo
2. preencher tag, serial, categoria e condicao
3. vincular centro de custo
4. alocar a colaborador, projeto ou area quando necessario

Boa pratica:

- ativo nao e item de estoque
- ativo precisa de identidade propria e rastreabilidade

## Financeiro

### Despesas

Quando usar:

- para saidas financeiras da empresa

Como usar:

1. registrar titulo, valor, data e status
2. vincular centro de custo quando houver
3. usar descricao objetiva

Boa pratica:

- compra com valor definido pode virar despesa a partir do modulo de compras

### Cobrancas

Quando usar:

- para valores a receber de clientes

Como usar:

1. registrar cliente
2. vincular projeto quando aplicavel
3. informar valor, vencimento e status

### Pagamentos

Quando usar:

- quando a Nexa receber um valor referente a uma cobranca

Como usar:

1. selecionar a cobranca correta
2. registrar valor recebido
3. informar data e metodo
4. confirmar status

Boa pratica:

- o pagamento atualiza o contexto da cobranca
- nao alterar cobranca manualmente quando o evento correto e registrar pagamento

### Boletos e negociacoes

Como usar:

1. `/app/financeiro/boletos` para emitir boleto com previa e dados de recebimento PIX/bancarios
2. opcionalmente gerar nota fiscal junto no momento da emissao
3. `/app/financeiro/negociacoes` para consolidar debitos por cliente e formalizar parcelamentos
4. no `/portal/financeiro`, cliente anexa comprovante e informa pagamento do boleto
5. financeiro confere comprovante em `/app/financeiro/boletos` e confirma baixa do recebivel

### Fluxo de caixa

Como interpretar:

- entradas confirmadas representam o que efetivamente entrou
- saidas representam despesas lancadas
- saldo mensal ajuda a leitura gerencial, nao substitui conciliacao contabil

### Fiscal

Quando usar:

- para formalizar documentalmente cobrancas e recebimentos

Como usar:

1. abrir `/app/fiscal` e revisar os indicadores de rascunho, emitidas e canceladas
2. usar o card "Proxima acao" para priorizar emissao pendente e vinculo de cobrancas sem nota
3. manter coerencia entre valor fiscal, cliente, projeto e cobranca

## Portal do cliente

### Financeiro do portal

O que o cliente deve ver:

- cobrancas
- valores em aberto
- pagamentos confirmados
- documentos financeiros relacionados

### Projetos do portal

O que o cliente deve ver:

- projetos vinculados ao seu acesso
- etapa atual
- progresso operacional
- proximos passos
- documentos compartilhados
- historico recente
- previa, download e assinatura dos documentos liberados

Regra de uso:

- o portal deve mostrar apenas o que pertence ao cliente autenticado
- a linguagem deve ser clara e sem excesso de jargao interno
- o cliente so pode agir em documentos realmente compartilhados e ligados aos seus vinculos
- previa, download e assinatura no portal devem ser tratados como extensao controlada da operacao interna

## Ordem pratica recomendada de uso entre modulos

### Fluxo comercial e operacional

1. lead
2. orcamento
3. proposta
4. cliente
5. projeto

### Fluxo administrativo

1. centro de custo
2. fornecedor
3. compra
4. estoque ou ativo
5. despesa

### Fluxo financeiro com cliente

1. cliente
2. cobranca
3. pagamento
4. portal financeiro

### Observabilidade

1. correlacao por `x-request-id` em `/app`, `/portal` e `/api`
2. latencia de resposta por `x-response-time-ms`
3. endpoint interno `/api/internal/observability-health` para leitura consolidada de sinais
4. guia tecnico em `docs/observabilidade-nexa.md`
5. automacoes manuais e agendadas em `/app/configuracoes/operacao` para executar health-check de conectores, lembretes RH, readiness de banco, snapshot de observabilidade e simulacao de retencao de storage

## Regras de ouro da Nexa

1. lead nao e cliente
2. compra nao e estoque
3. compra nao e ativo
4. pagamento nao e cobranca
5. modulo certo reduz retrabalho e aumenta confianca no sistema

## Fechamento

Sempre que surgir duvida de uso:

1. verificar este guia
2. verificar o padrao de desenvolvimento da Nexa
3. atualizar a documentacao se o processo da empresa amadurecer
4. usar a Biblioteca Operacional para varredura de completude por modulo (checklist, guia e pendencias)
5. usar a Rotina diaria Nexa para execucao cotidiana por trilhas operacionais (`/app/rotina-diaria`)

Este documento deve crescer junto com a operacao da Nexa.
