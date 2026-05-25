# Plano de Estabilizacao do Sistema

## Objetivo
Transformar a fase atual do Entregoo em uma fase de consolidacao controlada, reduzindo risco antes de continuar expandindo o produto.

---

## Fase 1. Isolamento de Tenant

### Objetivo
Garantir que cada assinante enxergue apenas seus proprios dados.

### Frentes

- revisar leituras e gravacoes de:
  - pedidos
  - catalogo
  - clientes
  - caixa
  - usuarios
  - configuracoes
  - sublojas
- eliminar operacoes assincronas dependentes do tenant ativo no momento errado
- garantir propagacao correta de `subscriberId`

### Critero de pronto

- nao haver mistura de dados entre assinantes
- trocar de assinante no portal sem herdar contexto de outro tenant

---

## Fase 2. Documentacao Central

### Objetivo
Registrar conceitos e regras do sistema dentro do projeto.

### Documentos minimos

- visao do produto
- guia de criacao de assinantes
- conceitos do sistema
- arquitetura atual
- regras de multitenancy

### Critero de pronto

- qualquer conceito central do produto poder ser explicado a partir da pasta `docs`

---

## Fase 3. Backend como Fonte Principal

### Objetivo
Reduzir dependencia do `localStorage` nas areas criticas.

### Prioridades

1. pedidos
2. catalogo
3. clientes
4. caixa
5. configuracoes
6. usuarios do assinante

### Critero de pronto

- cache local funcionar apenas como apoio
- fonte principal vir da API/PostgreSQL

---

## Fase 4. Nucleo Operacional

### Objetivo
Estabilizar o sistema do assinante.

### Escopo

- pedidos
- estoque
- clientes
- caixa
- sublojas
- permissoes

### Critero de pronto

- fluxo operacional principal confiavel
- menos comportamento inesperado em troca de tenant

---

## Fase 5. Expansao Controlada

### Objetivo
Retomar crescimento com base mais segura.

### Escopo

- afiliados
- catalogo compartilhado
- canais externos
- marketplaces
- APIs parceiras

### Critero de pronto

- novas integracoes sem comprometer isolamento e operacao

---

## Ordem de execucao recomendada

1. isolamento por tenant
2. documentacao central
3. backend como fonte principal
4. nucleo operacional
5. expansao controlada

---

## Regra de trabalho

Antes de evoluir qualquer modulo novo, verificar:

- isso respeita tenant?
- isso esta documentado?
- isso reforca ou enfraquece a fonte principal de dados?

Se enfraquecer, a evolucao deve ser revista.
