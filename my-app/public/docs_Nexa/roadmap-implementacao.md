# Roadmap de Implementacao Nexa

## Objetivo

Este roadmap transforma a visao da plataforma Nexa em uma sequencia pratica de execucao.

Ele existe para responder:

- o que entra primeiro
- o que depende do que
- o que pode esperar

## Ordem de implementacao

### Etapa 1. Fundacao tecnica

Objetivo:

- criar a base estrutural do sistema

Entregas:

- banco de dados
- ORM
- autenticacao
- usuarios
- papeis
- layouts privados
- protecao de rotas

Resultado esperado:

- sistema pronto para suportar modulos reais com controle de acesso

Status atual:

- concluida

### Etapa 2. Comercial

Objetivo:

- transformar o orcamento em fluxo operacional

Entregas:

- formulario real de orcamento
- painel interno de orcamentos
- status do orcamento
- conversao em cliente

Resultado esperado:

- a demanda deixa de ser apenas contato e vira processo

Status atual:

- concluida em base funcional
- CRM ja possui pipeline visual, agenda integrada e alertas automaticos
- envio e aprovacao de proposta ja geram automacoes de follow-up e conversao comercial

### Etapa 3. Clientes

Objetivo:

- registrar clientes e preparar acesso ao portal

Entregas:

- cadastro de clientes
- contatos do cliente
- usuarios do cliente
- vinculo entre cliente e acesso

Resultado esperado:

- cliente deixa de ser so nome e passa a ser entidade gerenciavel

Status atual:

- concluida em base funcional

### Etapa 4. Projetos

Objetivo:

- organizar execucao interna

Entregas:

- criacao de projeto
- etapas
- tarefas
- membros
- timeline
- anexos

Resultado esperado:

- a operacao de engenharia passa a existir dentro da plataforma

Status atual:

- concluida em base operacional
- projeto nasce de proposta aprovada
- projeto recebe etapas padrao da Nexa
- a equipe interna ja consegue criar, editar, mover, reordenar e excluir com seguranca etapas e tarefas
- timeline e status do projeto se atualizam com rastreabilidade
- documentos do projeto agora contam com ficheiro real, versionamento, auditoria, exportacao e assinatura

### Etapa 5. Portal do cliente

Objetivo:

- entregar transparencia e profissionalismo

Entregas:

- login do cliente
- dashboard do cliente
- visualizacao do projeto
- documentos
- cobranca

Resultado esperado:

- cliente acompanha o projeto sem depender apenas de contato manual

Status atual:

- concluida em base forte
- estrutura do portal e financeiro do cliente ja existem
- portal de projetos ja mostra etapa atual, progresso, proximos passos, documentos compartilhados e historico recente
- o portal ja permite previa, download, aprovacao e assinatura documental dentro do escopo liberado

### Etapa 6. Financeiro

Objetivo:

- organizar receita, cobranca e custos

Entregas:

- cobrancas
- pagamentos
- despesas
- fluxo de caixa
- centros de custo
- base de compras
- base de ativos e estoque

Resultado esperado:

- a Nexa passa a ter visao financeira, patrimonial e de custos integrada ao contexto operacional

Status atual:

- concluida em base forte
- despesas, cobrancas, pagamentos, boletos, conciliacao bancaria, fluxo de caixa, fechamento mensal, compras, ativos, estoque e centros de custo ja operam de forma conectada
- a leitura executiva do modulo ja aparece em rotina diaria, auditoria e central de pendencias

### Etapa 7. Fiscal e integracoes

Objetivo:

- fechar o ciclo administrativo

Entregas:

- notas fiscais
- vinculo fiscal com cobranca
- integracoes futuras
- ponte com sistema 1400

Resultado esperado:

- o sistema passa a apoiar operacao completa da empresa

Status atual:

- concluida em base forte
- notas fiscais ja operam com vinculo a cliente, projeto e cobranca
- o conector `FISCAL_NFE` ja consulta status externo, registra snapshot, aponta divergencias e influencia fechamento mensal
- o conector `1400CR` ja opera snapshots, alertas, historico e leitura no portal do cliente
- o conector `FINANCEIRO_BANKING` ja opera sync real, fila manual, excecoes e camada executiva de conciliacao

## Expansao administrativa recomendada

Depois da base de RH e colaboradores, a Nexa deve expandir a area administrativa com estes blocos:

1. centros de custo
2. fornecedores
3. compras
4. ativos patrimoniais
5. estoque e movimentacoes
6. alocacao de ativos por colaborador, setor ou projeto

Resultado esperado:

- a Nexa passa a controlar nao so software e projetos, mas tambem seus recursos internos, gastos operacionais e patrimonio

## RH e operacao interna

Status atual:

- base forte em operacao
- cadastro de colaborador ja cobre contrato, carga, foto e documentacao inicial
- RH ja opera ponto, revisao, banco de horas, feriados, ausencias, fechamento de competencia, PDF do espelho e ciencia do colaborador
- documentos e fechamentos ja contam com fila operacional, pendencias formais, devolucao para correcao e reenvio guiado

Proxima evolucao natural:

1. maturidade maior de jornada por perfil ou contrato
2. politicas mais finas de excecao por tipo de colaborador
3. refinamentos de relatorio e leitura executiva de pessoas

## Prioridade real a partir de agora

Se for preciso resumir a prioridade maxima:

1. integracoes externas e automacoes operacionais
2. consolidacoes executivas e leitura de produto
3. refinamentos de governanca e relatorios
4. novas frentes externas que agreguem operacao real

## Observacao

O sistema deve crescer por fundacao e nao por ansiedade.

Implementar modulos antes da base correta pode gerar:

- retrabalho
- permissoes erradas
- modelagem ruim
- dificuldade de manutencao

Hoje a plataforma ja saiu do campo conceitual em comercial, clientes, projetos, portal, RH, financeiro, fiscal e administrativo. O foco imediato pode migrar menos para fundacao e mais para refinamento de produto, governanca executiva e novas integracoes externas com impacto operacional real.
