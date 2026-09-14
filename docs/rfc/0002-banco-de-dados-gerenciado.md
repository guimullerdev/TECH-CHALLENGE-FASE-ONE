# RFC 0002 — Banco de dados gerenciado

- **Status**: Aceita
- **Autor(es)**: Guilherme Müller
- **Data**: 2026-09-10
- **Repos afetados**: `oficina-infra-db`, `TECH-CHALLENGE-FASE-ONE` (app)

## Contexto

A Fase 2 usa Postgres rodando em pod dentro do próprio cluster `kind`
(`kubernetes_deployment` + PVC), acessado via Prisma. A Fase 3 exige trocar
isso por um **serviço de banco de dados gerenciado** na nuvem. Com AWS já
decidida ([[0001-provedor-nuvem]]), a escolha se reduz a qual serviço de
banco gerenciado AWS usar, e se o motor do banco muda.

## Alternativas consideradas

### Opção A — RDS PostgreSQL

- Prós: mesmo motor (Postgres) que a app já usa via Prisma — nenhuma
  migration, query ou tipo de dado precisa ser reescrito; RDS é o serviço
  gerenciado "clássico" da AWS, com backups automáticos, Multi-AZ opcional
  e parâmetros de performance configuráveis via Terraform
  (`aws_db_instance`); tier `db.t4g.micro` é elegível a free tier.
- Contras: menos elástico que Aurora sob picos de carga (não é um problema
  real para o volume de um projeto de curso).

### Opção B — Aurora PostgreSQL

- Prós: melhor performance/escalabilidade sob carga alta, réplicas de
  leitura mais baratas de operar.
- Contras: custo mínimo mensal mais alto que RDS clássico mesmo em baixo
  uso; complexidade extra (cluster + instances separados) sem benefício
  para o volume de dados de um projeto de curso.

### Opção C — Trocar de motor (ex.: DynamoDB, outro SQL gerenciado)

- Prós: nenhum, dado o contexto.
- Contras: exigiria reescrever todo o schema Prisma e as migrations
  existentes da Fase 2 — custo alto sem ganho correspondente; descartada.

## Decisão / Recomendação

**RDS PostgreSQL** (`db.t4g.micro`), mantendo o mesmo motor já usado via
Prisma. Critério decisivo: zero retrabalho de schema/migrations/queries, e
o volume de dados de um projeto de curso não justifica a complexidade
adicional do Aurora.

Estratégia de ambientes: uma única instância RDS, com dois databases
lógicos (`oficina_homolog`, `oficina_prod`) — ver ADR de estratégia de
escalabilidade/ambientes — em vez de duas instâncias, para não duplicar
custo de infraestrutura ociosa num projeto de curso.

## Consequências

- Migrations Prisma continuam vivendo no repo da app (`prisma/migrations/`),
  mas passam a rodar contra o RDS — decidir em ADR separado onde/quando
  (pipeline do repo 1, do repo 4, ou Job de Kubernetes no repo 3).
- Connection string do RDS é output sensível do Terraform do
  `oficina-infra-db` — nunca em claro no state nem em log de CI.
- `oficina-infra-db` precisa documentar o modelo relacional (diagrama ER) e
  a justificativa formal da escolha do banco, exigidos pelo PDF.

## Referências

- `13SOAT - Fase 3 - Tech Challenge.pdf`
- `plan.md`, seção Fase 0 e Fase 2
- `TECH-CHALLENGE-FASE-ONE/prisma/`
