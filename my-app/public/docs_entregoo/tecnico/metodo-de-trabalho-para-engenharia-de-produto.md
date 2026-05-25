# Metodo de Trabalho Para Engenharia de Produto

## Objetivo

Transformar em padrao o metodo de raciocinio, investigacao e execucao usado para evoluir o Entregoo com menos retrabalho, menos ansiedade e mais clareza tecnica.

Este documento foi escrito para estudo e adocao pratica.

Nao e um texto motivacional.
E um metodo operacional.

---

## 1. A ideia central

Maturidade tecnica nao e saber tudo.

Maturidade tecnica e conseguir:

- entrar em um sistema complexo sem se perder
- transformar um problema solto em pergunta objetiva
- localizar a camada correta do problema
- corrigir a causa, nao so o sintoma
- validar sem quebrar outra area
- registrar a decisao para o time nao depender de memoria

Em resumo:

> menos impulso, mais metodo

---

## 2. O principio mais importante

Antes de tocar no codigo, responder:

> "Qual comportamento esta errado e qual comportamento deveria existir?"

Se isso nao estiver claro, ainda nao e hora de editar.

---

## 3. A sequencia base do metodo

Toda tarefa deve passar por estas etapas:

1. definir o problema real
2. mapear o fluxo de negocio
3. identificar a fonte da verdade
4. localizar a camada errada
5. implementar a correcao minima correta
6. validar a mudanca ponta a ponta
7. documentar a regra aprendida

---

## 4. Como definir o problema real

O primeiro trabalho e escrever o problema em uma frase simples.

### Formula

Use esta estrutura:

> "Quando eu faco X, acontece Y, mas deveria acontecer Z."

### Exemplos bons

- "Quando seleciono o assinante X no portal, o gestor abre no assinante Y, mas deveria abrir no X."
- "Quando o afiliado usa `shared_catalog`, ele ainda consegue editar item, mas deveria ficar em leitura somente."
- "Quando um item afiliado da Shopee aparece na vitrine, ele entra no checkout interno, mas deveria abrir o link externo."

### Exemplos ruins

- "Essa tela ta estranha."
- "O sistema ta errado."
- "Tem alguma coisa quebrada no tenant."

Problema mal nomeado gera correcao ruim.

---

## 5. Como mapear o fluxo de negocio

Antes de olhar o codigo, descrever o fluxo como usuario ou operador.

### Perguntas obrigatorias

- quem executa esse fluxo?
- em qual tela isso comeca?
- qual dado entra?
- qual dado muda?
- onde o fluxo termina?
- qual seria o resultado correto?

### Exemplo

Problema:

> "o afiliado quer vender produto Shopee no proprio site"

Fluxo:

1. operador cadastra item afiliado
2. item aparece no catalogo
3. item vai para a vitrine
4. cliente clica no produto
5. sistema decide se abre checkout interno ou link externo

Com esse fluxo claro, fica mais facil saber onde procurar.

---

## 6. Como pensar por camadas

Quase todo problema nasce no desencontro entre camadas.

Use sempre este mapa:

### 1. Contexto

- tenant
- subloja
- usuario
- sessao
- rota
- parametros de URL

### 2. Interface

- o que a tela mostra
- o que a tela permite clicar
- o que esta travado ou liberado errado

### 3. Estado local

- hooks
- estado em memoria
- localStorage
- cache
- espelho local

### 4. Integracao

- proxy do Next
- cliente de API
- controller
- service

### 5. Persistencia

- banco
- schema
- filtros
- relacionamento entre entidades

### Regra pratica

Sempre pergunte:

> "Em qual camada o comportamento foi decidido?"

Se voce corrige na camada errada, o bug volta com outra roupa.

---

## 7. Como encontrar a fonte da verdade

Toda decisao do sistema precisa ter uma origem principal.

Exemplos:

- tenant ativo: sessao ou URL
- catalogo herdado: relacionamento entre empresas
- item afiliado: metadados do proprio item
- status do pedido: payload persistido do pedido

### Pergunta-chave

> "Qual dado manda neste comportamento?"

### Regra

Se um dado aparece em varios lugares, um deles precisa ser a fonte da verdade e os outros sao derivados, cache ou espelho.

---

## 8. Como investigar sem se perder

Use sempre a mesma ordem.

### Ordem de investigacao

1. reproduzir o problema
2. nomear o problema em uma frase
3. mapear o fluxo real
4. localizar arquivos relacionados
5. descobrir onde a decisao e tomada
6. confirmar a causa
7. so depois editar

### Regra de ouro

Nao abrir dez arquivos aleatorios.

Abrir poucos arquivos com intencao.

---

## 9. Como escolher a correcao certa

Nem toda mudanca precisa ser grande.

A melhor correcao costuma ser:

- pequena
- clara
- alinhada a regra de negocio
- dificil de quebrar depois

### Perguntas antes de editar

- estou corrigindo causa ou sintoma?
- isso deveria ser validado no frontend, backend ou nos dois?
- essa regra vale so para esta tela ou para o sistema inteiro?
- esse comportamento merece documentacao?

---

## 10. O conceito de correcao minima correta

Existe diferenca entre:

- menor correcao possivel
- menor correcao correta

A menor correcao possivel pode esconder problema.

A menor correcao correta resolve a causa sem reinventar o sistema.

### Exemplo

Se o afiliado nao deve editar item herdado:

- correcao fraca: esconder um botao
- correcao correta: bloquear na UI e no backend

---

## 11. Como validar uma mudanca

Mudanca boa sem validacao ainda e risco.

### Camadas de validacao

1. build
2. fluxo funcional
3. impacto colateral
4. coerencia de negocio

### Checklist minimo

- o build passou?
- a tela continua abrindo?
- o fluxo original agora funciona?
- algum fluxo vizinho foi afetado?
- o comportamento esta coerente no frontend e no backend?

---

## 12. Como documentar do jeito certo

Documentar nao e enfeite.

Documentar serve para:

- reduzir dependencia de memoria
- acelerar manutencao futura
- preservar decisoes de negocio
- diminuir retrabalho

### O que registrar

- o problema
- a regra decidida
- onde essa regra mora
- limites do MVP
- proximos passos naturais

### Regra pratica

Toda mudanca estrutural importante deve deixar um rastro claro.

---

## 13. A rotina operacional recomendada

Use esta rotina em qualquer tarefa relevante.

### Etapa 1. Formular

Escreva:

- problema em uma frase
- resultado esperado
- risco principal

### Etapa 2. Mapear

Liste:

- fluxo de negocio
- telas envolvidas
- dados envolvidos
- possiveis camadas

### Etapa 3. Inspecionar

Abra:

- arquivo de interface
- hook ou storage
- cliente de API
- service ou schema, se necessario

### Etapa 4. Decidir

Escolha:

- regra correta
- camada da correcao
- escopo minimo seguro

### Etapa 5. Implementar

Faça:

- mudanca
- ajuste de UX, se necessario
- protecao backend, se necessario

### Etapa 6. Validar

Cheque:

- build
- fluxo principal
- efeito colateral

### Etapa 7. Registrar

Atualize:

- documento tecnico
- playbook
- mapa de manutencao
- registro de mudanca, quando fizer sentido

---

## 14. O template que voce pode usar sempre

Copie este bloco para qualquer tarefa:

```text
Problema:
Quando eu faco X, acontece Y, mas deveria acontecer Z.

Fluxo:
1.
2.
3.

Fonte da verdade:

Camadas envolvidas:
- contexto
- interface
- estado local
- integracao
- persistencia

Causa:

Correcao minima correta:

Como validar:

Risco colateral:

Documentacao necessaria:
```

---

## 15. Antipadroes para evitar

### 1. Editar cedo demais

Se voce ainda nao entendeu o fluxo, editar so aumenta confusao.

### 2. Corrigir so pela UI

Se a regra e de negocio, esconder botao nao basta.

### 3. Misturar conceitos

Exemplo:

- `shared_catalog` interno
- marketplace externo

Se a arquitetura mistura os dois, o sistema fica enganando voce.

### 4. Confiar so na memoria

Sem documento, a proxima manutencao custa mais caro.

### 5. Validar so a tela

Uma tela pode parecer certa e ainda estar errada no estado, na API ou no banco.

---

## 16. Como estudar esse metodo

Voce nao precisa decorar tudo.

Treine assim:

### Semana 1

Em toda tarefa, escreva o problema em uma frase.

### Semana 2

Em toda tarefa, identifique a fonte da verdade.

### Semana 3

Em toda tarefa, classifique o problema por camada.

### Semana 4

Em toda tarefa, use o template completo antes de editar.

Depois disso, o metodo comeca a ficar automatico.

---

## 17. Como aplicar isso no Entregoo

O Entregoo e um bom sistema para treinar esse metodo porque ele mistura:

- multitenancy
- storage local
- proxy Next
- API Express
- regras operacionais
- varias frentes de produto

Por isso, para este projeto, a ordem ideal e:

1. confirmar contexto
2. confirmar storage local e estado
3. confirmar proxy ou cliente de API
4. confirmar service backend
5. confirmar persistencia e schema

Essa ordem ja aparece no proprio mapa de manutencao.

---

## 18. Regra pessoal recomendada

Adote como padrao esta frase:

> "Eu nao mexo no codigo antes de conseguir explicar o problema, o fluxo e a fonte da verdade."

Se voce viver por essa regra, sua qualidade tecnica sobe muito.

---

## 19. Meta de maturidade

O objetivo nao e virar uma pessoa que sabe tudo.

O objetivo e virar uma pessoa que:

- nao entra em panico diante de sistema grande
- reduz ambiguidade antes de agir
- escolhe a camada certa
- corrige com criterio
- deixa o sistema mais compreensivel depois da propria passagem

Esse e o tipo de maturidade que escala.

---

## 20. Proximo passo de estudo

O melhor treino agora e praticar esse metodo em cima de bugs reais do Entregoo.

Sugestao:

1. pegar um bug pequeno
2. preencher o template
3. investigar por camadas
4. propor a correcao minima correta
5. validar
6. registrar o aprendizado

Se voce repetir isso varias vezes, o metodo deixa de ser teoria e vira reflexo.
