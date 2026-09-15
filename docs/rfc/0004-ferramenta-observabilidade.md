# RFC 0004 — Ferramenta de observabilidade

- **Status**: Aceita
- **Autor(es)**: Guilherme Müller
- **Data**: 2026-09-10
- **Repos afetados**: todos (app, auth-lambda, infra-k8s, infra-db)

## Contexto

O desafio exige observabilidade cobrindo: latência de APIs, métricas de
CPU/memória do cluster, monitoramento de healthcheck/uptime, alertas para
falhas no processamento de ordens de serviço, logs estruturados com
correlação entre requisições, traces, e dashboards (volume diário de OS,
tempo médio por status, erros de integração). O comunicado oficial da Fase
3 pede RFC formal justificando a ferramenta escolhida, não apenas a decisão
registrada em prosa.

## Alternativas consideradas

### Opção A — New Relic (tier free)

- Prós: tier free cobre 100 GB/mês de ingestão, 1 usuário full platform e
  usuários basic ilimitados, sem exigir cartão de crédito; cobre APM
  (latência de API), logs, infraestrutura de Kubernetes (CPU/memória via
  agente/daemonset) e dashboards customizados na mesma plataforma —
  suficiente para todos os requisitos do PDF sem custo adicional.
- Contras: tier free tem limite de ingestão mensal que precisa ser
  respeitado (não é um risco real para o volume de um projeto de curso).

### Opção B — Datadog

- Prós: plataforma equivalente em capacidades (APM, logs, infra, dashboards).
- Contras: trial gratuito é limitado no tempo (14 dias) e a maioria dos
  planos pagos exige cartão de crédito — inadequado para um projeto de
  curso que precisa continuar rodando/demonstrável além do período de
  trial.

### Opção C — Stack open-source auto-hospedada (Prometheus + Grafana +
Loki/Tempo)

- Prós: sem limite de ingestão artificial, controle total.
- Contras: exige provisionar e operar infraestrutura adicional (mais
  componentes rodando no EKS ou em instâncias à parte), aumentando custo de
  infra e complexidade operacional — o oposto do que um projeto de curso
  com escopo já amplo (4 repositórios) precisa.

## Decisão / Recomendação

**New Relic**, tier free. Critério decisivo: única opção que cobre todos os
pilares exigidos (APM, logs, infra de Kubernetes, dashboards, alertas) sem
custo e sem exigir cartão de crédito, evitando tanto gasto quanto a
complexidade operacional de uma stack auto-hospedada.

## Consequências

- App (`TECH-CHALLENGE-FASE-ONE`) instala o agente `newrelic` (pacote npm),
  carregado antes de tudo em `main.ts`, para instrumentação de latência de
  API.
- `oficina-auth-lambda` também precisa de instrumentação equivalente
  (latência de invocação).
- `oficina-infra-k8s` instala o agente/daemonset do New Relic via Helm
  (`kubectl_manifest`/`helm_release`) para métricas de CPU/memória do
  cluster.
- Logs estruturados em JSON com correlation-id são pré-requisito para os
  dashboards e alertas funcionarem corretamente — ver ADR de organização de
  logs e traces.
- Risco aceito: ficar dentro do limite de 100 GB/mês de ingestão do tier
  free (não crítico para o volume esperado do projeto).

## Referências

- `13SOAT - Fase 3 - Tech Challenge.pdf`
- ADR 0004 — organização dos logs e traces
- `docs/observabilidade/` — dashboard versionado
- `TECH-CHALLENGE-FASE-ONE/docs/plano-fase3.md`
