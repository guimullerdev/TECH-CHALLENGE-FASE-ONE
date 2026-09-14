# ADR 0002 — Estratégia de escalabilidade e separação de ambientes

- **Status**: Aceita
- **Autor(es)**: Guilherme Müller
- **Data**: 2026-09-10
- **Repos afetados**: `oficina-infra-k8s`, `oficina-infra-db`,
  `oficina-auth-lambda`

## Contexto

O PDF exige separação entre ambientes de homologação e produção, com
deploy automático por branch, além de escalabilidade do cluster
Kubernetes. Num projeto de curso, duplicar toda a infraestrutura (cluster
EKS + instância RDS por ambiente) tem custo desproporcional ao benefício:
EKS cobra pelo control plane por cluster (~US$0,10/h, ~US$73/mês cada),
então dois clusters dobram esse custo sem necessidade real de isolamento
físico entre homolog e prod para os fins deste desafio.

## Decisão

Separação **lógica**, não física, entre ambientes — 1 conta AWS, 1 cluster
EKS, 1 instância RDS:

- **`oficina-infra-k8s`**: um cluster EKS único, com os dois *namespaces*
  (`homolog`/`prod`) criados como parte do provisionamento do cluster.
  Namespace já isola recursos, quotas e Secrets o suficiente para o
  requisito de "branch → deploy automático em homolog/prod" do PDF. O que
  roda *dentro* de cada namespace (Deployment/HPA/Secret da app) é aplicado
  pelo pipeline do repo da app, não por este repo — ver ADR 0001.
- **`oficina-infra-db`**: uma instância RDS `db.t4g.micro`, dois databases
  lógicos (`oficina_homolog`, `oficina_prod`) na mesma instância;
  `DATABASE_URL` de cada ambiente muda só o nome do database no output do
  Terraform.
- **`oficina-auth-lambda`**: duas Lambda aliases (`homolog`/`prod`) com
  variável de ambiente apontando para o database/API correto; API Gateway
  com dois stages (`/homolog`, `/prod`), cada um invocando seu alias —
  nativo e sem custo ocioso adicional (Lambda não cobra por tempo parado).
- **Branch → ambiente**: PR/merge em `develop` (ou branch de homolog)
  dispara `terraform apply`/deploy no namespace/alias de homolog; merge em
  `main` dispara o de produção.
- **Escalabilidade do cluster**: HPA por Deployment dentro de cada
  namespace (ver ADR 0003), usando o metrics-server nativo do EKS —
  nenhuma infraestrutura de scaling adicional além do que o HPA já cobre.

## Consequências

- Positivas: custo de infraestrutura ociosa reduzido a um único control
  plane EKS e uma única instância RDS, em vez de dobrar ambos; ainda
  atende ao requisito funcional de "homolog e prod separados com deploy
  por branch".
- Negativas / trade-offs aceitos: isolamento entre ambientes é lógico, não
  físico — um erro de configuração de namespace/RBAC ou de nome de
  database poderia em tese vazar entre homolog e prod; falha do cluster
  único ou da instância RDS única afeta os dois ambientes simultaneamente
  (aceitável para projeto de curso, não seria para produção real
  multi-tenant).
- Trabalho decorrente: os manifestos Kubernetes da app (no repo
  `TECH-CHALLENGE-FASE-ONE`) precisam ser parametrizados por namespace (via
  Kustomize/Helm, ou substituição no próprio pipeline);
  `oficina-infra-k8s` precisa criar os dois namespaces ao provisionar o
  cluster; cada pipeline precisa mapear branch → namespace/alias/stage
  corretamente antes do primeiro deploy real.
