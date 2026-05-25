# Arquitetura da Plataforma Nexa

## Objetivo

Este documento define a visao de produto, a arquitetura funcional e a ordem de implementacao do sistema da Nexa.

O objetivo nao e criar apenas um site institucional, mas uma plataforma central de operacao da empresa, capaz de:

- captar oportunidades comerciais
- registrar e gerenciar clientes
- acompanhar projetos em execucao
- oferecer portal para clientes
- dar suporte a equipe interna
- controlar financas
- integrar fiscal e notas fiscais
- futuramente se integrar ao sistema de chamados 1400

Este documento existe para evitar decisoes isoladas e retrabalho. Toda implementacao relevante deve se apoiar nesta estrutura.

## Visao do produto

A plataforma Nexa deve transmitir tres qualidades ao mercado e ao cliente:

- confianca
- organizacao
- capacidade tecnica

Do ponto de vista do negocio, a plataforma deve funcionar como o sistema operacional da empresa.

Em vez de termos ferramentas soltas para comercial, atendimento, projetos e financas, a Nexa deve concentrar suas operacoes em uma base propria, adaptada a forma como a empresa trabalha.

## Pilares estrategicos

Os pilares do sistema sao:

1. Experiencia institucional forte
   O site precisa comunicar sofisticacao, clareza e credibilidade.

2. Operacao comercial organizada
   Todo orcamento deve poder virar lead, cliente, proposta, projeto e historico operacional.

3. Portal do cliente com transparencia
   O cliente deve enxergar progresso, arquivos, documentos, informacoes financeiras e relacionamento com a Nexa.

4. Backoffice interno eficiente
   A equipe precisa ter acesso rapido a clientes, projetos, informacoes operacionais e contexto do trabalho.

5. Base administrativa escalavel
   Financeiro, fiscal, permissoes e integracoes devem nascer com arquitetura seria.

## Estrutura macro do sistema

A plataforma deve ser separada em quatro grandes areas.

### 1. Area publica

Responsavel pela presenca institucional e entrada de demanda.

Inclui:

- home
- sobre a Nexa
- contato
- orcamento
- paginas institucionais futuras

### 2. Area operacional interna

Responsavel pela rotina da empresa.

Inclui:

- gestao de clientes
- gestao de orcamentos
- propostas comerciais
- projetos
- equipe
- documentos
- historico operacional

### 3. Portal do cliente

Responsavel pela experiencia do cliente apos a contratacao.

Inclui:

- dashboard do cliente
- acompanhamento de projetos
- arquivos e documentos
- historico de andamento
- cobrancas
- notas fiscais
- integracoes futuras com chamados

### 4. Area administrativa

Responsavel por governanca e suporte da empresa.

Inclui:

- financeiro
- fiscal
- usuarios
- permissoes
- configuracoes
- integracoes

## Modulos do sistema

Observacao importante:

os modulos abaixo ja nao sao apenas conceituais. Boa parte deles ja possui implementacao funcional na plataforma, com uso operacional real. O guia pratico de uso esta em [Guia Operacional dos Modulos](/j:/Projetos/Nexa/my-app/docs/guia-operacional-modulos.md).

### Modulo institucional

Funcao:

- apresentar a empresa
- comunicar autoridade
- gerar demanda

Principais telas:

- home
- sobre
- contato
- orcamento

### Modulo comercial

Funcao:

- receber leads
- registrar orcamentos
- acompanhar negociacao
- converter oportunidade em cliente

Principais entidades:

- lead
- orcamento
- proposta
- status comercial

Status atual:

- o modulo comercial ja possui hub de CRM, pipeline visual e agenda integrada
- o lead ja registra proxima acao, data de follow-up, reuniao e historico comercial
- propostas enviadas e aprovadas ja disparam automacoes operacionais no fluxo comercial
- o guia pratico desta frente esta em [CRM Comercial e Automacoes](/j:/Projetos/Nexa/my-app/docs/crm-comercial-e-automacoes.md)

### Modulo de clientes

Funcao:

- manter o cadastro formal dos clientes
- centralizar contratos e acessos
- controlar relacionamento

Principais entidades:

- cliente
- empresa do cliente
- contatos
- usuarios do cliente

### Modulo de projetos

Funcao:

- organizar execucao
- registrar etapas
- manter historico
- vincular equipe e entregas

Principais entidades:

- projeto
- etapa
- tarefa
- membro do projeto
- entrega
- documento
- timeline

Status atual:

- projeto ja nasce de proposta aprovada
- etapas padrao, tarefas, backlog, timeline e atualizacao operacional ja estao ativos
- area interna ja permite criar, editar, mover, reordenar e excluir com seguranca etapas e tarefas
- documentos do projeto ja contam com ficheiro real, versionamento, auditoria, exportacao e assinatura
- o andamento do projeto ja consegue ser refletido no portal do cliente

### Modulo portal do cliente

Funcao:

- dar transparencia e profissionalismo no acompanhamento do trabalho

Principais recursos:

- visao do projeto
- etapa atual
- entregas
- documentos
- cobrancas
- notas

Status atual:

- estrutura base do portal existe
- financeiro do cliente ja exibe cobrancas e pagamentos
- portal de projetos ja exibe etapa atual, progresso, proximos passos, documentos compartilhados e historico recente
- portal ja permite previa, download, aprovacao e assinatura de documentos dentro do escopo liberado
- aprofundamentos futuros agora ficam mais concentrados em comunicacao, integracoes e refinamentos executivos

### Modulo interno da equipe

Funcao:

- permitir que engenharia, gestao e operacao trabalhem dentro do mesmo ambiente

Principais recursos:

- acesso a clientes
- acesso a projetos
- status e andamento
- observacoes internas
- documentacao

### Modulo de colaboradores e organizacao interna

Funcao:

- cadastrar colaboradores da Nexa
- organizar setores
- controlar papeis e permissoes
- atribuir pessoas aos projetos

Principais recursos:

- cadastro de colaboradores
- setores internos
- funcao principal
- permissoes
- vinculo com projeto
- contrato, carga e foto de perfil
- documentos de RH vinculados ao cadastro

Status atual:

- cadastro ja cobre tipo de contrato, carga horaria, perfil de carga, foto e documentacao inicial
- ficha do colaborador ja concentra contexto operacional, RH e historico relacionado

### Modulo de RH

Funcao:

- controlar jornada, documentos, calendario e formalizacao do espelho de ponto

Principais recursos:

- lancamento de ponto
- fila de revisao
- banco de horas por competencia
- feriados
- ausencias aprovadas
- fechamento mensal
- aprovacao formal do espelho
- exportacao em PDF
- ciencia do colaborador

Status atual:

- RH ja opera em base forte
- banco de horas considera apenas pontos aprovados ou ajustados
- feriados e ausencias aprovadas entram no calculo da competencia
- fechamento mensal gera snapshot para evitar variacao retroativa
- espelho pode ser aprovado, exportado em PDF e receber ciencia do colaborador

### Modulo financeiro

Funcao:

- cuidar da saude financeira da Nexa

Principais recursos:

- contas a receber
- contas a pagar
- despesas
- receitas
- fluxo de caixa
- vinculo financeiro por projeto e por cliente

Status atual:

- despesas, cobrancas e pagamentos ja estao operacionais
- fluxo de caixa interno ja existe em leitura por periodo
- portal do cliente ja possui visao financeira

### Modulo de patrimonio, compras e custos

Funcao:

- controlar ativos da Nexa
- controlar estoque interno
- registrar compras
- organizar saidas e movimentacoes
- vincular gastos a centros de custo

Principais recursos:

- ativos patrimoniais
- estoque de itens
- compras
- fornecedores
- movimentacoes
- alocacao de ativo
- centros de custo
- rateio de despesas

Status atual:

- centros de custo, compras, fornecedores, ativos e estoque ja estao operacionais
- compras ja podem desdobrar para estoque, ativo e despesa

### Modulo fiscal

Funcao:

- controlar emissao e vinculo de notas fiscais

Principais recursos:

- registro de notas fiscais
- integracao fiscal
- vinculo com cobranca
- vinculo com cliente e projeto

### Modulo de integracoes

Funcao:

- conectar a plataforma com sistemas externos relevantes

Integracoes previstas:

- notas fiscais
- comunicacao
- sistema de chamados 1400

## Perfis de acesso

O sistema deve nascer com separacao clara entre papeis.

### admin

Pode:

- acessar todos os modulos
- configurar usuarios
- configurar permissoes
- visualizar financeiro e fiscal
- controlar integracoes

### gestor

Pode:

- acompanhar clientes
- acompanhar projetos
- acompanhar equipe
- visualizar indicadores operacionais
- participar de decisoes comerciais e financeiras

### comercial

Pode:

- visualizar leads
- cadastrar orcamentos
- registrar propostas
- converter lead em cliente

### engenharia

Pode:

- acessar projetos atribuidos
- registrar andamento
- gerenciar tarefas e entregas
- consultar dados necessarios dos clientes

### financeiro

Pode:

- acessar cobrancas
- acessar pagamentos
- acessar despesas
- acessar modulo fiscal

### cliente

Pode:

- acessar apenas os proprios dados
- acompanhar os proprios projetos
- visualizar arquivos, cobrancas e notas relacionadas ao proprio contexto

## Matriz atual de acesso interno

Observacao:

a plataforma agora combina duas camadas:

- acesso por modulo para navegacao e bloqueio de rota
- capacidades explicitas para mutacoes sensiveis no servidor

Regras atuais:

- `ADMIN` e `GESTOR`: acesso amplo ao backoffice
- `COMERCIAL` ou setor comercial: `crm.manage`, `proposals.manage`, `clients.lifecycle.manage` e `clients.portal_access.manage`
- `ENGENHARIA` ou setor engenharia: `clients.manage` e `projects.manage`
- setor `RH`: `collaborators.manage`, `rh.manage` e `rh.approve`
- `FINANCEIRO` ou setores administrativos relacionados: `administrative.manage`
- `CLIENTE`: acesso ao portal e resposta a documentos em `projects.client_documents.respond`
- todos os internos: `dashboard`, `padroes` e `meu-rh`

Diretriz importante:

- papel define responsabilidade principal
- setor atua como reforco de contexto operacional
- a governanca auditavel em `/app/permissoes` permite override por papel, setor e usuario
- quando houver conflito entre papel, setor e usuario, bloqueio explicito vence liberacao explicita
- a sessao passa por revalidacao no banco nas leituras e acoes protegidas
- alteracoes de papel, setor ou status refletem no servidor sem depender apenas de logout manual
- a matriz detalhada fica em [Seguranca e Permissoes](/j:/Projetos/Nexa/my-app/docs/seguranca-e-permissoes.md)

## Entidades principais do dominio

Estas sao as entidades mais importantes para o desenho do banco e da logica do sistema.

### User

Representa qualquer usuario autenticado.

Campos iniciais sugeridos:

- id
- name
- email
- password_hash
- role_id
- status
- created_at
- updated_at

### Role

Representa o papel do usuario.

Campos iniciais sugeridos:

- id
- name
- description

### Client

Representa o cliente da Nexa.

Campos iniciais sugeridos:

- id
- company_name
- trade_name
- document
- email
- phone
- status
- notes
- created_at
- updated_at

### ClientContact

Representa contatos do cliente.

Campos iniciais sugeridos:

- id
- client_id
- name
- email
- phone
- position

### ClientAccess

Relaciona usuarios ao cliente.

Campos iniciais sugeridos:

- id
- client_id
- user_id
- is_primary

### Lead

Representa a demanda inicial.

Campos iniciais sugeridos:

- id
- name
- email
- phone
- origin
- message
- status
- created_at

### Estimate

Representa solicitacao de orcamento.

Campos iniciais sugeridos:

- id
- lead_id
- client_id
- title
- description
- status
- estimated_value
- created_at

### Proposal

Representa proposta comercial formal.

Campos iniciais sugeridos:

- id
- client_id
- estimate_id
- title
- scope
- price
- status
- issued_at

### Project

Representa projeto contratado.

Campos iniciais sugeridos:

- id
- client_id
- proposal_id
- name
- description
- status
- start_date
- due_date
- created_at

### Collaborator

Representa colaborador interno da Nexa.

Campos iniciais sugeridos:

- id
- user_id
- sector_id
- title
- is_active
- created_at

### Sector

Representa setor interno da empresa.

Campos iniciais sugeridos:

- id
- name
- description

### ProjectStage

Representa fases do projeto.

Campos iniciais sugeridos:

- id
- project_id
- name
- status
- order_index
- start_date
- due_date

### Task

Representa trabalho executavel dentro do projeto.

Campos iniciais sugeridos:

- id
- project_id
- stage_id
- assigned_user_id
- title
- description
- status
- priority

### Document

Representa arquivos e documentos.

Campos iniciais sugeridos:

- id
- client_id
- project_id
- uploaded_by
- type
- name
- path
- visibility
- created_at

### TimelineEvent

Representa historico relevante.

Campos iniciais sugeridos:

- id
- project_id
- client_id
- user_id
- type
- description
- created_at

### Charge

Representa cobranca.

Campos iniciais sugeridos:

- id
- client_id
- project_id
- amount
- due_date
- status
- description

### Payment

Representa pagamento recebido.

Campos iniciais sugeridos:

- id
- charge_id
- amount
- paid_at
- method
- status

### Expense

Representa despesa da empresa.

Campos iniciais sugeridos:

- id
- title
- description
- category
- amount
- incurred_at
- status

### Supplier

Representa fornecedor da Nexa.

Campos iniciais sugeridos:

- id
- name
- document
- contact_name
- email
- phone
- notes

### CostCenter

Representa centro de custo da Nexa.

Campos iniciais sugeridos:

- id
- name
- code
- type
- description
- sector_id
- project_id

### PurchaseOrder

Representa compra ou pedido da Nexa.

Campos iniciais sugeridos:

- id
- supplier_id
- cost_center_id
- title
- description
- status
- total_amount
- ordered_at
- expected_at
- received_at

### InventoryItem

Representa item controlado em estoque.

Campos iniciais sugeridos:

- id
- name
- sku
- category
- unit
- quantity
- minimum_quantity
- storage_location

### InventoryMovement

Representa entrada, saida ou ajuste de estoque.

Campos iniciais sugeridos:

- id
- inventory_item_id
- type
- quantity
- occurred_at
- project_id
- collaborator_id
- cost_center_id
- reference

### Asset

Representa ativo patrimonial da Nexa.

Campos iniciais sugeridos:

- id
- purchase_order_id
- cost_center_id
- name
- tag
- serial_number
- category
- status
- condition
- acquired_at

### AssetAssignment

Representa alocacao de ativo.

Campos iniciais sugeridos:

- id
- asset_id
- collaborator_id
- project_id
- cost_center_id
- assigned_at
- returned_at

### ExpenseAllocation

Representa rateio de despesa por centro de custo.

Campos iniciais sugeridos:

- id
- expense_id
- cost_center_id
- amount

### Invoice

Representa nota fiscal.

Campos iniciais sugeridos:

- id
- client_id
- project_id
- charge_id
- number
- amount
- issue_date
- status

### IntegrationLog

Representa logs de integracao.

Campos iniciais sugeridos:

- id
- integration_name
- entity_type
- entity_id
- status
- payload
- response
- created_at

## Fluxos de negocio prioritarios

### Fluxo 1. Orcamento

1. visitante acessa o site
2. visitante envia formulario
3. sistema registra a solicitacao
4. equipe interna avalia
5. solicitacao entra no funil comercial

### Fluxo 2. Conversao em cliente

1. lead avanca em descoberta e proposta
2. proposta enviada gera follow-up automatico
3. proposta aprovada consolida o cliente
4. sistema prepara kickoff e abertura do projeto
5. operacao assume o contexto formalizado

### Fluxo 3. Abertura de projeto

1. proposta aprovada gera projeto
2. projeto recebe etapas padrao automaticamente
3. equipe interna organiza tarefas, backlog e status
4. timeline registra eventos operacionais relevantes
5. cliente passa a acompanhar o projeto no portal

### Fluxo 3.1. Padrao de desenvolvimento do projeto

1. requisitos sao refinados e validados
2. modelagem e arquitetura sao organizadas
3. documentacao base e consolidada
4. kickoff e planejamento sao registrados
5. execucao agil comeca
6. validacao e homologacao acontecem
7. implantacao e pos-entrega sao acompanhadas

### Fluxo 4. Portal do cliente

1. Nexa cadastra o acesso
2. cliente recebe credenciais
3. cliente entra no portal
4. cliente visualiza contexto do projeto
5. cliente acompanha documentos, financeiro e historico

### Fluxo 5. Financeiro e fiscal

1. projeto gera cobranca
2. cobranca pode receber pagamento
3. pagamento pode gerar nota fiscal
4. financeiro acompanha operacao por cliente e por projeto

Status atual:

- cobrancas, pagamentos, despesas e fluxo de caixa ja estao ativos
- integracao fiscal continua como proxima frente

### Fluxo 6. Patrimonio, compras e custos

1. compra e registrada
2. item entra como estoque ou ativo
3. movimentacao e controlada
4. ativo pode ser alocado a colaborador, setor ou projeto
5. despesa e compra podem ser vinculadas a centro de custo

Status atual:

- fluxo ja implementado em base funcional
- compra pode virar estoque, ativo e despesa financeira

### Fluxo 7. RH e espelho de ponto

1. colaborador e RH registram pontos
2. RH revisa e aprova ou ajusta os lancamentos
3. calendario de feriados e ausencias aprovadas entra no calculo do periodo
4. competencia e fechada com snapshot
5. espelho e aprovado formalmente
6. PDF pode ser gerado
7. colaborador registra ciencia

## Estrutura de rotas recomendada

### Area publica

- `/`
- `/sobrenexa`
- `/contato`
- `/orcamento`

### Autenticacao

- `/auth/login`

### Area interna

- `/app`
- `/app/dashboard`
- `/app/orcamentos`
- `/app/leads`
- `/app/clientes`
- `/app/propostas`
- `/app/projetos`
- `/app/colaboradores`
- `/app/setores`
- `/app/equipe`
- `/app/documentos`
- `/app/financeiro`
- `/app/estoque`
- `/app/ativos`
- `/app/compras`
- `/app/centros-de-custo`
- `/app/fiscal`
- `/app/configuracoes`

### Portal do cliente

- `/portal`
- `/portal/dashboard`
- `/portal/projetos`
- `/portal/documentos`
- `/portal/financeiro`
- `/portal/perfil`

## Diretrizes tecnicas

As proximas implementacoes devem respeitar estes principios.

### 1. Separacao clara entre area interna e portal

O cliente nao deve compartilhar a mesma experiencia principal da equipe interna.

### 2. Autorizacao baseada em papel

Toda acao sensivel deve considerar perfil e contexto.

### 3. Modelo orientado ao negocio

O banco deve refletir o processo real da Nexa, nao apenas nomes genericos de tabelas.

### 4. Historico e rastreabilidade

Projetos, financas e interacoes importantes precisam gerar historico verificavel.

### 5. Escalabilidade modular

Cada novo modulo deve entrar sobre a base existente, sem quebrar o restante da plataforma.

### 6. Padrao operacional explicito

O metodo de desenvolvimento da Nexa deve estar documentado e refletido nas etapas internas e na experiencia do portal do cliente.

## Roadmap recomendado

### Fase 1. Fundacao

- autenticacao
- usuarios
- papeis
- layout interno
- layout do portal
- estrutura inicial do banco

### Fase 2. Comercial e cadastro

- formulario real de orcamento
- painel de orcamentos
- lead
- cadastro de clientes

### Fase 3. Projetos

- criacao de projetos
- etapas
- tarefas
- membros
- timeline

### Fase 4. Portal do cliente

- dashboard do cliente
- acompanhamento de projeto
- documentos
- visualizacao de cobrancas

### Fase 5. Financeiro e fiscal

- cobrancas
- pagamentos
- despesas
- notas fiscais

### Fase 6. Integracoes

- integracao com notas fiscais
- integracao com sistema 1400

## Proximo passo tecnico imediato

A proxima implementacao recomendada e:

1. estruturar documentos e entregaveis por projeto
2. aprofundar a experiencia do portal do cliente
3. aprofundar fiscal e integracoes
4. conectar membros de projeto e responsabilidades operacionais
5. adicionar notificacoes operacionais em RH e pontos de controle administrativo

Com a base de projetos ja operacional, a proxima camada deve ampliar transparencia para o cliente e profundidade documental para a equipe.

## Conclusao

A Nexa deve ser tratada como uma empresa com operacao seria, e o sistema deve refletir isso desde a base.

Este projeto deve transmitir:

- confianca para o cliente
- organizacao para a operacao
- autoridade para a marca

Toda proxima etapa de implementacao deve apoiar esse objetivo.


