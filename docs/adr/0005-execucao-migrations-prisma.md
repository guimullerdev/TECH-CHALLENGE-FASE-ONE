# ADR 0005 — Onde rodam as migrations Prisma

- **Status**: Aceita
- **Autor(es)**: Guilherme Müller
- **Data**: 2026-09-13 (revisada no mesmo dia após Q&A oficial da FIAP sobre
  a fronteira entre repo de infra-k8s e repo da app — ver ADR 0001)
- **Repos afetados**: `TECH-CHALLENGE-FASE-ONE` (app), `oficina-infra-db`,
  `oficina-infra-k8s`

## Contexto

As migrations Prisma (`prisma/migrations/`) continuam vivendo no repo 1
(app), mas precisam rodar contra o RDS provisionado por `oficina-infra-db`.
Três lugares possíveis foram cogitados: direto no pipeline do repo 1 (app),
direto no pipeline do repo 4 (`oficina-infra-db`), ou como um Job de
Kubernetes dentro do cluster.

O fator decisivo já existe: o RDS é `publicly_accessible = false` de
propósito (ver `oficina-infra-db/network.tf`) — só é alcançável de dentro da
VPC default da conta. Runners hospedados do GitHub Actions **não estão na
VPC**. Essa é a mesma restrição que já forçou mover a criação dos databases
lógicos/usuários para um submódulo aplicado manualmente
(`oficina-infra-db/bootstrap-db/`, ver README daquele repo) em vez de rodar
no CI — rodar migrations direto de um runner do GitHub Actions bateria no
mesmo problema: timeout de conexão na porta 5432.

O cluster EKS (provisionado por `oficina-infra-k8s`) é o único componente
que roda **dentro** dessa VPC (precisa disso pra alcançar o RDS em runtime
de qualquer forma), então é o único lugar com rota de rede nativa até o
banco sem expor o RDS à internet — um Job de Kubernetes rodando nesse
cluster resolve o problema de rede.

Isso não decide sozinho *quem aplica* esse Job. A ADR 0001 (revisada após
Q&A oficial da FIAP) estabeleceu que `oficina-infra-k8s` só provisiona o
cluster (EKS, node groups, rede, add-ons, autoscaling) — `Deployment`,
`Service`, `HPA`, `ConfigMap` e o pipeline de deploy da aplicação são
responsabilidade do repo da app. O Job de migration é conceitualmente parte
do deploy da aplicação (roda a cada novo código, usa a mesma imagem), não
da infraestrutura do cluster em si.

## Decisão

Migrations Prisma rodam como um **Kubernetes Job dentro do cluster EKS**,
mas **aplicado pelo pipeline do repo 1 (app)** — não pelo pipeline de
`oficina-infra-k8s`.

- O Job usa a **mesma imagem Docker que o próprio pipeline acabou de
  publicar** (já contém `prisma/migrations/` e o Prisma CLI), rodando
  `npx prisma migrate deploy` como comando.
- `DATABASE_URL` vem do mesmo `Secret` que o `Deployment` da app usa — o
  próprio pipeline do repo 1 materializa esse `Secret` a partir do output
  de `oficina-infra-db/bootstrap-db` (ver ADR 0001, decisão 2).
- O pipeline do repo 1 acessa o cluster via `aws eks update-kubeconfig`,
  usando o endpoint/credenciais expostos como output pelo Terraform de
  `oficina-infra-k8s` (ver ADR 0001, decisão 1) — mesma mecânica usada para
  aplicar o `Deployment`.
- Ordem de aplicação, dentro do pipeline do repo 1: aplica o Job → espera
  completar (`kubectl wait --for=condition=complete`) → só então atualiza o
  `Deployment` — evita rodar a nova versão do código contra um schema
  desatualizado.
- Pré-requisito: o `terraform apply` de `oficina-infra-db/bootstrap-db`
  (cria o database lógico + usuário de app) precisa já ter rodado pelo
  menos uma vez antes do primeiro Job de migration — é manual, não faz
  parte deste fluxo automatizado.

## Consequências

- Positivas: nenhuma dependência de rede nova além da que o próprio EKS já
  precisa em runtime; reaproveita a mesma decisão de manter o RDS privado
  (ver `oficina-infra-db/bootstrap-db/README.md`); mesmo mecanismo vale
  igual para homolog e produção (só muda o namespace/Secret); consistente
  com a ADR 0001 — o repo da app é dono de tudo que é ciclo de vida da
  aplicação, incluindo o Job de migration.
- Negativas / trade-offs aceitos: o pipeline do repo 1 precisa de
  permissão para acessar o cluster EKS (via IAM role/OIDC), não só para
  publicar imagem — mais escopo de credencial nesse pipeline; falha do Job
  precisa bloquear o rollout do `Deployment` (senão a app sobe com schema
  desatualizado) — exige `backoffLimit` baixo e o pipeline checando o
  resultado do `kubectl wait` antes de prosseguir.
- Trabalho decorrente: criar o manifesto do Job dentro do repo 1 (Fase 3,
  não Fase 5); adicionar ao pipeline do repo 1 os passos de
  `update-kubeconfig` → aplica-Job → espera → aplica-Deployment, em vez de
  aplicar tudo em paralelo; `oficina-infra-k8s` só precisa expor os outputs
  necessários (endpoint, IAM role) para esse pipeline externo autenticar.
