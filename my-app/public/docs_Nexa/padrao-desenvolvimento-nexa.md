# Padrao de Desenvolvimento Nexa

## Objetivo

Este documento define o padrao oficial de desenvolvimento da Nexa para projetos de software.

Ele deve ser consultado sempre que houver duvida sobre:

- como iniciar um projeto
- como conduzir a descoberta
- como validar requisitos
- como modelar a solucao
- como documentar
- como planejar a execucao
- como operar o desenvolvimento agil
- como validar entregas
- como implantar
- como conduzir pos-entrega

Este documento nao e uma referencia generica. Ele e o guia de trabalho oficial da Nexa.

## Como este guia deve ser usado

Este guia deve ser usado:

- pela diretoria e gestao para manter padrao de operacao
- pelo comercial para entender a transicao entre negociacao e execucao
- pela engenharia para conduzir analise, arquitetura e desenvolvimento
- pelo financeiro e administrativo para entender marcos e formalizacoes
- pelos colaboradores da empresa como referencia em caso de duvida

Sempre que a Nexa amadurecer seu processo, este documento deve ser atualizado.

## Principios do padrao Nexa

O padrao da Nexa deve seguir estes principios:

1. Entender antes de construir
   Nenhuma implementacao deve comecar sem clareza minima sobre problema, contexto e objetivo do cliente.

2. Modelar antes de acelerar
   Requisitos, dominio, fluxos e estrutura tecnica precisam ser organizados antes da codificacao principal.

3. Documentar o que orienta decisao
   A documentacao deve existir para orientar execucao e reduzir ambiguidade, nao para gerar burocracia vazia.

4. Executar com rastreabilidade
   O cliente e a equipe precisam conseguir entender em que etapa o projeto esta, o que ja foi feito e o que vem a seguir.

5. Validar continuamente
   Toda fase relevante deve gerar algum tipo de validacao: de negocio, tecnica, funcional ou operacional.

6. Entregar com confianca
   O padrao da Nexa nao termina na codificacao. Ele inclui homologacao, implantacao e transicao segura para uso.

## Visao geral do fluxo de desenvolvimento Nexa

O fluxo padrao da Nexa deve seguir esta sequencia:

1. Entrada e qualificacao comercial
2. Descoberta e validacao de requisitos
3. Modelagem de negocio e solucao
4. Documentacao orientadora
5. Planejamento e kickoff
6. Execucao agil
7. Validacao e homologacao
8. Implantacao e entrega
9. Acompanhamento pos-entrega

Essa sequencia existe para evitar dois riscos comuns:

- comecar a codar cedo demais
- terminar o desenvolvimento sem controle de qualidade, entrega e acompanhamento

## Etapa 1. Entrada e qualificacao comercial

### Objetivo

- receber a demanda
- identificar se ela faz sentido para a Nexa
- abrir o contexto comercial corretamente

### O que precisa ser feito

- registrar o lead
- registrar a origem da oportunidade
- registrar o briefing inicial
- marcar o responsavel comercial
- definir a proxima acao comercial
- agendar call ou visita quando necessario

### Como fazer

- ouvir o cliente sem tentar resolver tudo no primeiro contato
- entender qual e a dor principal
- entender qual resultado o cliente espera
- descobrir urgencia, contexto de negocio e expectativa de investimento
- registrar tudo no sistema de forma objetiva e organizada
- sair de cada contato com um proximo passo claro

### Perguntas minimas dessa etapa

- qual problema o cliente quer resolver
- quem vai usar a solucao
- o projeto e novo ou evolucao de algo existente
- existe prazo esperado
- existe contexto de integracao ou legado
- quem decide a contratacao

### Entregaveis da etapa

- lead cadastrado
- briefing inicial registrado
- status comercial atualizado
- proxima acao definida

### Criterios de qualidade

- o lead esta claro o suficiente para a equipe entender
- o problema do cliente foi registrado em linguagem objetiva
- o proximo passo esta explicito

### Erros que a Nexa deve evitar

- transformar lead em cliente cedo demais
- sair da reuniao sem proximo passo definido
- registrar informacoes vagas demais
- prometer solucao sem descoberta adequada

### Visibilidade no portal do cliente

- nao se aplica ainda, pois a relacao ainda nao esta formalizada

## Etapa 2. Descoberta e validacao de requisitos

### Objetivo

- transformar a necessidade inicial em entendimento confiavel

### O que precisa ser feito

- levantar contexto de negocio
- identificar usuarios e perfis
- levantar requisitos funcionais
- levantar requisitos nao funcionais
- identificar restricoes
- validar entendimento com o cliente

### Como fazer

- conduzir reuniao estruturada de descoberta
- separar problema, objetivo, restricao e desejo
- registrar fluxos principais do processo
- listar integracoes necessarias
- confirmar o que e prioridade real
- consolidar o entendimento e validar com o cliente

### O que precisa ser descoberto

- quais processos o sistema deve suportar
- quais dados precisam existir
- quais aprovacoes ou regras de negocio existem
- quais integracoes sao obrigatorias
- quais riscos tecnicos ou operacionais ja aparecem

### Entregaveis da etapa

- requisitos refinados
- lista de fluxos principais
- riscos iniciais mapeados
- entendimento validado com o cliente

### Criterios de qualidade

- a equipe entende o problema antes de desenhar solucao
- existe separacao entre essencial e desejavel
- as duvidas mais criticas foram respondidas

### Erros que a Nexa deve evitar

- confundir opiniao do cliente com requisito validado
- comecar arquitetura sem clareza funcional
- ignorar restricoes de operacao do cliente

### Visibilidade no portal do cliente

- quando ja houver contratacao, o portal pode mostrar que o projeto esta em descoberta ou refinamento

## Etapa 3. Modelagem de negocio e solucao

### Objetivo

- organizar a solucao antes da execucao

### O que precisa ser feito

- modelar entidades e relacionamentos
- definir modulos do sistema
- mapear fluxos principais
- definir responsabilidades das areas do produto
- estabelecer arquitetura inicial

### Como fazer

- transformar requisitos em dominio
- organizar entidades principais e seus vinculos
- separar corretamente area publica, backoffice e portal do cliente quando aplicavel
- decidir o que precisa existir no banco
- decidir o que precisa existir como modulo
- registrar decisoes tecnicas iniciais

### O que modelar no minimo

- entidades principais
- papeis de acesso
- fluxos de negocio
- integracoes
- regras criticas do dominio

### Entregaveis da etapa

- modelo funcional da solucao
- visao inicial de arquitetura
- estrutura de modulos
- base para banco e permissoes

### Criterios de qualidade

- a modelagem reflete o negocio real
- nao existem modulos misturados sem responsabilidade clara
- a equipe consegue explicar a solucao sem depender de improviso

### Erros que a Nexa deve evitar

- modelar com foco em tela, nao em negocio
- misturar portal do cliente com operacao interna
- pular a etapa de dominio e ir direto para CRUD

### Visibilidade no portal do cliente

- status do projeto em modelagem
- resumo executivo do que esta sendo estruturado

## Etapa 4. Documentacao orientadora

### Objetivo

- registrar o necessario para alinhar execucao

### O que precisa ser feito

- consolidar requisitos
- consolidar decisoes de arquitetura
- registrar escopo da primeira entrega
- registrar premissas, limites e dependencias
- preparar referencia consultavel para a equipe

### Como fazer

- documentar apenas o que orienta decisao e execucao
- preferir documentos claros, curtos e uteis
- manter o conteudo alinhado a realidade do projeto
- atualizar o documento quando houver mudanca importante

### Documentos tipicos da Nexa

- briefing refinado
- escopo funcional
- arquitetura inicial
- roadmap de entregas
- lista de decisoes tecnicas
- pendencias abertas

### Entregaveis da etapa

- documentacao base utilizavel pela equipe
- menor ambiguidade operacional
- alinhamento entre comercial, gestao e engenharia

### Criterios de qualidade

- a documentacao responde duvidas reais da equipe
- o escopo esta compreensivel
- as premissas estao registradas

### Erros que a Nexa deve evitar

- produzir documentacao que ninguem consulta
- registrar decisoes importantes apenas de forma verbal
- deixar requisitos mudarem sem atualizar base documental

### Visibilidade no portal do cliente

- documentos aprovados
- cronograma macro
- marcos principais

## Etapa 5. Planejamento e kickoff

### Objetivo

- transformar a solucao em plano operacional

### O que precisa ser feito

- abrir o projeto
- definir etapas
- preparar backlog inicial
- atribuir responsaveis
- alinhar prioridades
- preparar inicio da execucao

### Como fazer

- quebrar o projeto em fases claras
- criar backlog inicial por fluxo ou modulo
- atribuir ownership inicial
- definir criterios de pronto
- registrar data de inicio e marcos relevantes

### O que o kickoff precisa responder

- o que entra na primeira entrega
- quem faz o que
- qual etapa comeca primeiro
- quais dependencias existem
- como o cliente acompanhara o andamento

### Entregaveis da etapa

- projeto aberto no sistema
- etapas definidas
- backlog inicial estruturado
- responsaveis iniciais registrados

### Criterios de qualidade

- o projeto entrou em execucao com clareza
- cada responsavel sabe sua parte
- existe visao de curto prazo

### Erros que a Nexa deve evitar

- comecar sem backlog inicial
- nao registrar responsaveis
- tratar projeto complexo sem marcos claros

### Visibilidade no portal do cliente

- cronograma
- etapa atual
- proximos marcos

## Etapa 6. Execucao agil

### Objetivo

- construir com cadencia, feedback e visibilidade

### O que precisa ser feito

- desenvolver de forma incremental
- atualizar andamento do projeto
- manter backlog vivo
- registrar bloqueios
- revisar tecnicamente o que esta sendo feito

### Como fazer

- trabalhar por entregas pequenas e verificaveis
- atualizar tarefas e status com frequencia
- revisar o codigo e a solucao antes de empilhar mais complexidade
- registrar decisoes e desvios quando necessario
- manter a equipe alinhada sobre progresso e impedimentos

### O que deve acontecer durante a execucao

- refinamento continuo
- revisao tecnica
- organizacao de tarefas
- atualizacao de documentacao quando fizer diferenca
- comunicacao objetiva sobre o andamento

### Entregaveis da etapa

- incrementos funcionais
- historico de progresso
- backlog atualizado
- evidencia de evolucao real

### Criterios de qualidade

- o projeto avanca com visibilidade
- a execucao nao se desconecta da modelagem original
- a equipe sabe o que esta pronto, em andamento e bloqueado

### Erros que a Nexa deve evitar

- codar sem atualizar o andamento
- perder rastreabilidade das decisoes
- manter tarefas grandes demais e pouco claras

### Visibilidade no portal do cliente

- andamento por etapa
- entregas realizadas
- entregas em andamento
- comunicados relevantes

## Etapa 7. Validacao e homologacao

### Objetivo

- confirmar que o que foi construido atende ao esperado

### O que precisa ser feito

- validar qualidade tecnica
- validar funcionamento
- validar aderencia ao escopo
- homologar com cliente ou responsavel
- registrar pendencias finais

### Como fazer

- testar antes de apresentar
- revisar fluxos principais
- conferir integracao, permissoes e consistencia de dados
- organizar a homologacao em itens claros
- registrar correcoes necessarias antes da entrega final

### O que deve ser validado

- regras de negocio principais
- comportamento esperado do sistema
- experiencia minima de uso
- erros criticos
- criterios acordados com o cliente

### Entregaveis da etapa

- lista de ajustes finais
- validacao tecnica
- homologacao funcional
- aceite ou pendencias registradas

### Criterios de qualidade

- a equipe sabe o que foi validado e o que falta
- a homologacao nao acontece no improviso
- o cliente consegue entender o que esta aprovando

### Erros que a Nexa deve evitar

- levar para homologacao algo ainda instavel
- misturar bug critico com refinamento menor
- considerar entregue sem aceite claro

### Visibilidade no portal do cliente

- projeto em validacao
- pendencias de homologacao
- aprovacoes registradas

## Etapa 8. Implantacao e entrega

### Objetivo

- colocar a solucao em operacao com seguranca

### O que precisa ser feito

- preparar ambiente
- revisar acessos
- publicar versao
- validar operacao inicial
- formalizar a entrega

### Como fazer

- revisar configuracao antes da implantacao
- confirmar permissoes e credenciais
- publicar com checklist
- validar os fluxos principais apos subir
- registrar data e versao da entrega

### Checklist minimo de implantacao

- ambiente correto
- variaveis e integracoes revisadas
- acessos corretos
- backups ou precaucoes quando aplicavel
- validacao pos-publicacao

### Entregaveis da etapa

- solucao implantada
- entrega formalizada
- cliente orientado para uso

### Criterios de qualidade

- a entrega entrou em operacao sem surpresa evitavel
- existe registro de quando e como a implantacao foi feita
- o cliente sabe o que recebeu

### Erros que a Nexa deve evitar

- implantar sem checklist
- liberar acesso sem revisar permissoes
- considerar entrega concluida sem validacao inicial

### Visibilidade no portal do cliente

- data de implantacao
- versao entregue
- documentos de entrega

## Etapa 9. Acompanhamento pos-entrega

### Objetivo

- sustentar confianca depois da entrega

### O que precisa ser feito

- acompanhar a estabilizacao inicial
- registrar feedback
- corrigir ajustes finos
- identificar melhorias futuras
- decidir se entra nova fase, sustentacao ou evolucao

### Como fazer

- monitorar o inicio de uso
- abrir backlog de evolucao quando fizer sentido
- separar correcao de problema real de nova demanda
- manter comunicacao clara com o cliente

### Entregaveis da etapa

- projeto estabilizado
- backlog de evolucao
- transicao organizada para proxima fase

### Criterios de qualidade

- o cliente nao se sente abandonado apos a entrega
- a Nexa consegue distinguir estabilizacao de nova implementacao
- existe historico do que ficou para evolucao

### Erros que a Nexa deve evitar

- encerrar relacao logo apos publicar
- misturar correcao pos-entrega com novo escopo sem controle
- perder feedback relevante do cliente

### Visibilidade no portal do cliente

- historico de entregas
- proximos ciclos
- chamados ou evolucoes futuras

## Etapas padrao da Nexa para uso no sistema

Para o sistema refletir esse padrao, os projetos devem ter ao menos estas etapas estruturais:

1. Descoberta
2. Requisitos validados
3. Modelagem e arquitetura
4. Documentacao base
5. Planejamento e kickoff
6. Execucao agil
7. Validacao e homologacao
8. Implantacao
9. Pos-entrega

Cada etapa deve poder guardar:

- objetivo
- responsavel
- status
- tarefas
- documentos
- eventos de timeline
- observacoes
- entregaveis

## Como este padrao replica a forma de trabalho usada aqui

O metodo que estamos usando neste projeto ja e um modelo util para a Nexa:

1. entender o negocio antes de codar
2. modelar dominio e modulos
3. estruturar fundacao tecnica
4. implementar por fluxo de negocio
5. validar com build, lint e banco
6. documentar decisoes importantes
7. evoluir em camadas, sem pular contexto

Esse e o tipo de postura que a Nexa deve institucionalizar.

## O que o portal do cliente deve enxergar

O portal do cliente nao deve mostrar a operacao interna completa, mas precisa refletir o andamento real do projeto.

O cliente deve poder visualizar:

- etapa atual do projeto
- historico de progresso
- documentos compartilhaveis
- marcos concluidos
- proximos passos
- entregas realizadas
- pendencias de validacao
- informacoes financeiras e fiscais quando aplicavel

O portal deve traduzir a operacao interna em linguagem clara para o cliente.

## Colaboradores, setores e permissoes

Para esse padrao funcionar de forma escalavel, a Nexa precisa de uma camada interna de organizacao de equipe.

O sistema devera permitir:

- cadastrar colaboradores
- vincular colaboradores a setores
- definir papel principal e permissoes
- controlar acesso por area e por capacidade critica
- manter governanca auditavel de permissoes por papel, setor e usuario
- vincular colaboradores a projetos
- registrar responsaveis por etapas, tarefas e eventos

Estrutura conceitual recomendada:

- colaborador
- setor
- cargo ou funcao
- papel de acesso
- capacidade operacional
- override auditavel de capacidade
- vinculo em projeto

Setores iniciais recomendados:

- comercial
- engenharia
- produto
- financeiro
- administrativo
- diretoria ou gestao

## Regras de trabalho que a equipe Nexa deve seguir

Toda equipe da Nexa deve seguir estas regras:

1. nao iniciar codificacao estrutural sem descoberta minima
2. nao pular modelagem quando o projeto tiver complexidade relevante
3. nao deixar decisoes criticas fora da documentacao
4. nao perder rastreabilidade de andamento
5. nao entregar sem validacao
6. nao encerrar projeto sem transicao adequada

## Como isso se conecta ao sistema da Nexa

Este padrao precisa aparecer em quatro lugares da plataforma:

1. Comercial
   O lead entra, e qualificado e avanca para proposta.

2. Operacao interna
   O projeto e aberto com etapas, tarefas, responsaveis e historico.

3. Portal do cliente
   O cliente acompanha o reflexo do andamento do projeto.

4. Administracao
   A Nexa gerencia colaboradores, setores, permissoes e alocacao.

## Proximos desdobramentos recomendados

Depois deste documento, a implementacao deveria seguir esta ordem:

1. estruturar etapas padrao do projeto
2. estruturar tarefas e backlog operacional
3. cadastrar colaboradores da Nexa
4. criar setores e permissoes internas
5. atribuir colaboradores aos projetos
6. refletir andamento do projeto no portal do cliente

## Conclusao

O padrao de desenvolvimento da Nexa deve ser um ativo da empresa.

Ele precisa:

- organizar a operacao
- elevar a percepcao de confianca
- reduzir improviso
- permitir crescimento da equipe
- dar transparencia ao cliente

Este documento passa a ser a referencia oficial dessa forma de trabalhar.
