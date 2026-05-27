# Modelo de Dados

## Entidades principais

| Entidade | Finalidade |
| --- | --- |
| `customers` | Clientes principais ou grupos empresariais |
| `customer_units` | Unidades, lojas ou filiais |
| `customer_contacts` | Pessoas de contato e papéis na operação |
| `cs_interactions` | Linha do tempo de interacoes |
| `cs_feedbacks` | Feedbacks recebidos |
| `cs_tickets` | Tickets internos gerados a partir de feedbacks |
| `cs_tasks` | Tarefas e follow-ups |
| `cs_surveys` | Pesquisas enviadas |
| `cs_survey_answers` | Respostas e notas de NPS |
| `cs_action_plans` | Planos de ação por cliente |
| `cs_action_plan_tasks` | Tarefas vinculadas a planos |
| `cs_health_scores` | Histórico de score de saúde |
| `cs_playbooks` | Fluxos padronizados de CS |
| `cs_campaigns` | Campanhas de pesquisa, treinamento e indicação |
| `cs_recognitions` | Elogios e reconhecimentos internos |
| `cs_churns` | Cancelamentos, ameacas de churn e retencao |

## Relacionamentos principais

- Um cliente possui muitas unidades.
- Um cliente possui muitos contatos.
- Um cliente possui muitos feedbacks.
- Um feedback pode gerar um ticket.
- Um cliente possui muitas tarefas.
- Um plano de ação possui muitas tarefas.
- Uma pesquisa pode ser aplicada por cliente ou unidade.
- Toda ação relevante deve gerar registro na linha do tempo.

## Campos criticos

Campos como `status`, `priority`, `owner`, `dueDate`, `customerId` e `unitId` devem ser consistentes entre modulos para permitir filtros e indicadores confiaveis.

