# Operacao do Portal Entregoo

## Objetivo
Este documento descreve como o Portal Entregoo deve ser entendido e operado no contexto do sistema.

Ele existe para:

- orientar o uso interno da Entregoo
- separar claramente o portal do sistema do assinante
- registrar o papel de cada tela principal
- ajudar na operacao diaria da carteira
- servir como referencia para onboarding interno

O Portal Entregoo e um produto interno da propria Entregoo.
Ele nao e uma area premium do cliente.

---

## 1. O que e o Portal Entregoo

O Portal Entregoo e o ambiente interno usado pela equipe da Entregoo para administrar a plataforma.

### O portal existe para

- criar assinantes
- escolher o assinante ativo de trabalho
- acompanhar a carteira
- gerir a equipe interna
- controlar implantacao
- registrar notas internas
- gerir tarefas operacionais
- cadastrar sublojas
- configurar relacoes comerciais
- preparar canais externos

### O portal nao existe para

- operacao diaria do cliente final
- preparo
- conferencia
- atendimento do pedido do assinante
- operacao de caixa do cliente

Essas funcoes pertencem ao dashboard do assinante.

---

## 2. Quem usa o Portal Entregoo

O portal deve ser usado apenas por usuarios internos da Entregoo.

### Perfis esperados

- fundador
- diretoria
- implantacao
- suporte
- operacoes
- comercial
- financeiro
- produto

### Regra

Usuarios do assinante nao devem operar o portal.

Mesmo que um assinante tenha permissao alta no proprio dashboard, isso nao significa que ele possa usar o portal interno.

---

## 3. Objetivos operacionais do portal

No dia a dia, o portal serve como camada de controle da carteira.

### Objetivos centrais

- registrar a entrada de novos assinantes
- ativar a estrutura correta de cada tenant
- acompanhar estado comercial e operacional
- administrar o contexto de implantacao
- manter contexto interno sobre a conta
- viabilizar a evolucao da operacao do cliente

### Resultado esperado

Quando o portal esta bem operado, a Entregoo consegue:

- entender a carteira rapidamente
- abrir o tenant certo sem misturar contexto
- saber em que etapa cada cliente esta
- acompanhar riscos e sinais de churn
- organizar tarefas internas de implantacao e suporte

---

## 4. Estrutura funcional do portal

Hoje o portal se organiza em algumas areas principais.

### 4.1 Painel

Funciona como centro de contexto operacional da carteira.

Ele concentra:

- assinantes ativos
- novo assinante
- cliente selecionado
- indicadores comerciais
- notas internas
- tarefas de implantacao
- historico de acoes
- relacoes comerciais
- canais externos

### 4.2 Equipe Entregoo

Area dedicada ao cadastro e visualizacao da equipe interna da Entregoo.

Ela existe para:

- criar colaboradores internos
- editar perfil, foto, cargo e setor
- organizar acesso interno
- manter base administrativa basica da equipe

### 4.3 Meu perfil

Area de autocuidado do usuario logado.

Ela serve para:

- atualizar dados pessoais
- trocar foto
- ajustar informacoes proprias
- mudar senha

### 4.4 Assinaturas

Area voltada para configuracao da assinatura e leitura do modelo da conta.

Ela ajuda a entender:

- modo de operacao
- tipo da assinatura
- estrutura ativada
- leitura geral do tenant

### 4.5 Comercial

Area voltada para:

- entrada de leads
- qualificacao comercial
- propostas
- contratos editaveis
- assinatura publica por link

### 4.6 Onboarding

Area voltada para:

- iniciar onboarding por assinante
- distribuir etapas
- acompanhar checklist
- controlar progresso ate o go-live

### 4.7 Base de assinantes

Area voltada para:

- consultar ficha completa do assinante direto do backend
- revisar acessos
- ver timeline interna
- visualizar contratos assinados
- baixar documento comercial

---

## 5. Fluxo principal do portal

O fluxo mais importante do portal hoje e:

1. entrar no portal com usuario interno Entregoo
2. escolher ou criar um assinante
3. selecionar o assinante ativo
4. analisar status comercial e operacional
5. registrar notas e tarefas
6. abrir o ambiente do cliente quando necessario
7. abrir proposta comercial quando houver negociacao
8. editar contrato e compartilhar link de assinatura
9. iniciar onboarding apos aceite

Esse fluxo e a espinha dorsal da operacao interna.

---

## 6. Processo de criacao de assinante no portal

O portal e o lugar oficial para criar assinantes.

### Dados estruturais que devem ser decididos

- tipo do assinante
- modo de catalogo
- segmento
- workflow operacional
- modulos ativos
- unidade inicial
- dados de contato
- acesso inicial

### Regras importantes

- sublojas so devem ser criadas no portal
- o time Entregoo decide a estrutura-base
- o tenant precisa nascer com modelagem coerente

### Referencia complementar

Para o detalhe do processo de criacao:

- [Guia de Criacao de Assinantes](/j:/Projetos/entregoo/docs/guia-criacao-de-assinantes.md)

---

## 7. Escolha do assinante ativo

No portal, existe o conceito de assinante ativo de trabalho.

### O que isso significa

O time Entregoo escolhe qual cliente esta sendo observado ou operado naquele momento.

Esse contexto influencia:

- leitura operacional da carteira
- notas e tarefas mostradas
- relacionamento comercial exibido
- atalho para abrir o ambiente do cliente

### O que isso nao significa

Escolher assinante ativo no portal nao mistura tenants.

Isso apenas define sobre qual assinante a operacao interna esta olhando naquele momento.

Mesmo assim, telas abertas em outra aba nao devem depender desse contexto global para continuar funcionando.

Por isso, fluxos como:

- `/loja`
- `/mesa`
- `/area-cliente`

devem preferir `subscriberId` explicito por URL quando nascerem a partir do portal ou dashboard.

---

## 8. Notas internas

O portal possui notas internas por assinante.

### Objetivo

Registrar contexto que nao deve ficar solto na memoria da equipe.

### Exemplos de uso

- combinados com o cliente
- contexto comercial
- observacoes de suporte
- situacao de implantacao
- riscos percebidos
- preferencias operacionais

### Regra de uso

As notas devem registrar contexto interno da Entregoo, nao dados operacionais sensiveis do cliente sem necessidade.

---

## 9. Tarefas de implantacao

O portal tambem funciona como gerenciador operacional interno por assinante.

### Para que servem as tarefas

- orientar implantacao
- distribuir responsabilidade interna
- acompanhar pendencias
- estruturar execucao do time

### O que uma tarefa deve conter

- titulo claro
- descricao objetiva
- responsavel
- prazo, quando houver
- status

### Status esperados

- a fazer
- em andamento
- concluida

---

## 10. Linha do tempo do portal

O portal registra eventos internos para formar historico.

### Objetivo

Permitir rastreabilidade de acoes importantes, como:

- criacao de assinante
- alteracoes de status
- notas
- tarefas
- movimentacoes relevantes do portal

### Valor operacional

Isso ajuda a equipe a responder:

- quem fez o que
- quando fez
- em qual contexto

---

## 11. Indicadores comerciais e de churn

O portal nao e apenas administrativo.
Ele tambem e uma camada de leitura executiva da carteira.

### O que essa area ajuda a enxergar

- quantidade de contas ativas
- implantacoes em andamento
- contas pausadas
- sinais de risco
- projecao comercial simples
- etapa comercial do assinante
- distribuicao da carteira por status
- distribuicao por etapa comercial
- alertas prioritarios
- ranking de contas saudaveis
- ranking de risco
- tendencia mensal simplificada

### Papel estrategico

Essa camada ajuda a Entregoo a nao tratar o portal so como CRUD de clientes.
Ele vira instrumento real de operacao da carteira.

---

## 12. Relacoes comerciais

O portal ja se prepara para operar redes mais complexas.

### Exemplos

- operador e afiliado
- empresa com origem de catalogo compartilhado
- canais externos ligados ao assinante

### Papel dessa area

Evitar que essas relacoes fiquem informais ou fora do sistema.

### Regra importante

Relacao comercial nao elimina isolamento entre tenants.

---

## 13. Canais externos

O portal e o lugar correto para preparar canais externos do assinante.

### Exemplos

- marketplace
- API parceira
- Shopify
- WooCommerce
- integracao manual

### Uso esperado

- registrar canal
- indicar tipo do canal
- preparar vinculacao com o assinante
- futuramente concentrar credenciais e configuracoes de integracao

---

## 14. Equipe Entregoo no portal

O portal tambem concentra o cadastro da equipe interna.

### Objetivo

Criar uma base administrativa e operacional dos colaboradores internos.

### Informacoes relevantes da equipe

- nome
- e-mail
- foto
- contato
- cargo
- setor
- perfil tecnico
- data de contratacao
- documento
- dados de RH basicos

### Valor para o sistema

Isso ajuda a separar:

- usuario interno Entregoo
- usuario do assinante

que sao categorias completamente diferentes dentro da plataforma.

---

## 15. Meu perfil

Todo colaborador Entregoo deve ter uma area propria de perfil.

### Isso existe para

- evitar usar a tela da equipe para ajustes pessoais simples
- permitir manutencao da propria identidade no portal
- reforcar a sessao autenticada e o contexto do usuario

### Informacoes tipicas

- foto
- nome
- e-mail
- contato
- senha
- leitura do cargo e setor

---

## 16. Sessao do usuario no portal

O portal ja trabalha com sessao autenticada da equipe interna.

### Elementos importantes da sessao

- identificacao do usuario logado
- funcao e setor
- avatar
- notificacoes
- logout
- expiracao da sessao

### Regra atual

A sessao do portal e temporaria e deve expirar por seguranca.

---

## 17. O que o portal nao deve virar

Para proteger a arquitetura do produto, o portal nao deve virar:

- um dashboard do cliente com mais botoes
- um lugar onde o cliente faz configuracoes internas de sua empresa
- um substituto do dashboard operacional
- um painel generico sem fronteira conceitual
- uma tela que mistura contexto de tenants em abas paralelas

### Regra

Se a funcionalidade e de administracao interna da Entregoo, ela vai para o portal.

Se a funcionalidade e de operacao do cliente, ela vai para o sistema do assinante.

---

## 18. Rotina operacional sugerida para o time Entregoo

Uma rotina saudavel de uso do portal tende a seguir esta ordem:

### Inicio do dia

- entrar no portal
- revisar notificacoes internas
- revisar carteira ativa
- verificar implantacoes em andamento
- olhar tarefas pendentes

### Durante a operacao

- selecionar o assinante que esta sendo tratado
- registrar nota quando houver contexto importante
- criar tarefa quando houver pendencia clara
- atualizar etapa comercial quando necessario
- abrir o dashboard do cliente quando precisar operar ou verificar algo

### Ao encerrar uma frente importante

- registrar contexto final
- concluir ou reabrir tarefa
- deixar a timeline coerente

---

## 19. Regras de governanca do portal

### Regra 1

Toda acao relevante do portal deve poder ser explicada depois.

### Regra 2

Notas e tarefas nao devem depender da memoria do time.

### Regra 3

Sublojas devem ser criadas no portal, nao pelo usuario do sistema.

### Regra 4

Afiliado, subloja e canal externo nao devem ser confundidos.

### Regra 5

O portal deve operar a carteira sem quebrar a fronteira de tenant.

---

## 20. Resumo executivo

O Portal Entregoo e a camada interna de operacao da propria Entregoo.

Ele existe para:

- administrar a carteira
- estruturar assinantes
- organizar equipe interna
- acompanhar implantacao
- registrar contexto operacional
- preparar a expansao comercial e tecnica da plataforma

Em uma frase:

> o portal e o centro de governanca interna da Entregoo sobre a plataforma e sobre a carteira de clientes.
