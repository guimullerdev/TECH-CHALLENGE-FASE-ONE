# ADR 0001 — Padrão de comunicação entre os 4 repositórios

- **Status**: Aceita
- **Data**: 2026-09-10
- **Repos afetados**: todos (app, auth-lambda, infra-k8s, infra-db)

## Contexto

Os 4 repositórios (`TECH-CHALLENGE-FASE-ONE`, `oficina-auth-lambda`,
`oficina-infra-k8s`, `oficina-infra-db`) são independentes (não é
monorepo), mas dependem uns dos outros em runtime e em deploy:

- `TECH-CHALLENGE-FASE-ONE` (app) precisa do cluster provisionado por
  `oficina-infra-k8s` para aplicar seus próprios manifestos, e da
  `DATABASE_URL` gerada por `oficina-infra-db`. Fronteira confirmada via
  Q&A oficial da FIAP: o repo de infra-k8s só provisiona o cluster (EKS,
  node groups, rede, add-ons, autoscaling da infra); `Deployment`,
  `Service`, `HPA`, `ConfigMap` e o pipeline de deploy da aplicação são
  responsabilidade do repo da app, não do repo de infra.
- `oficina-auth-lambda` precisa acessar o mesmo RDS que `oficina-infra-db`
  provisiona, e assinar JWT com o mesmo `JWT_SECRET` da app.
- Terraform de `oficina-infra-k8s` e `oficina-infra-db` precisa de um
  backend de state compartilhado para eles se referenciarem sem duplicar
  provisionamento.

Sem um padrão explícito, cada integração vira uma decisão ad-hoc por
pipeline.

## Decisão

1. **Artefato entre app e infra-k8s**: `oficina-infra-k8s` expõe, via output
   do Terraform, o que o pipeline da app precisa para falar com o cluster
   (endpoint do EKS, dados de autenticação/IAM role). O pipeline de
   `TECH-CHALLENGE-FASE-ONE` publica sua própria imagem Docker em registry
   (GHCR/ECR) com tag previsível (`sha`/`latest`) e **aplica seus próprios
   manifestos** (`Deployment`/`Service`/`HPA`/`ConfigMap`, que vivem nesse
   mesmo repo) contra esse cluster — nenhuma chamada direta de API entre os
   pipelines dos dois repos, e nenhum manifesto de aplicação vive em
   `oficina-infra-k8s`.
2. **Segredos/config entre infra-db e app**: exclusivamente via **outputs
   do Terraform**, nunca hardcoded. `oficina-infra-db` expõe `DATABASE_URL`
   (e demais parâmetros de conexão) como output sensível (via
   `bootstrap-db/`); o **pipeline do repo da app** consome via remote state
   (S3 backend compartilhado) e materializa como Kubernetes `Secret` no
   namespace do ambiente — `oficina-infra-k8s` não participa desse fluxo,
   só provisiona o cluster onde o Secret é aplicado.
3. **Backend do Terraform compartilhado**: S3 (state) + DynamoDB (lock), um
   bucket e uma tabela usados por `oficina-infra-k8s` e `oficina-infra-db`,
   com prefixos de key diferentes por repo/ambiente (ex.:
   `infra-k8s/homolog/terraform.tfstate`). Provisionado manualmente uma
   única vez (`aws s3 mb` + `aws dynamodb create-table`), fora do Terraform
   gerenciado — problema do ovo e da galinha de bootstrapar o próprio
   backend do state.
4. **Auth compartilhada entre app e Lambda**: nenhuma chamada de rede entre
   os dois em tempo de autenticação — a Lambda acessa o RDS diretamente
   (ver RFC de estratégia de autenticação por CPF) e assina JWT com o mesmo
   `JWT_SECRET` que a app usa para validar, distribuído como secret de
   pipeline/ambiente em cada repo (não versionado).
5. **Granularidade**: só 4 repositórios git. VPC entra como módulo
   Terraform dentro de `oficina-infra-k8s` (o cluster depende da rede, não
   faz sentido separar em pipeline próprio); API Gateway ainda não tem ADR
   própria — fica para a Fase 6 do `plan.md`, quando o Gateway for
   provisionado (dentro de `oficina-infra-k8s` ou `oficina-infra-db`,
   dependendo do que for mais simples na hora).

## Consequências

- Positivas: nenhuma dependência de rede síncrona entre pipelines para
  configuração — tudo flui por outputs de Terraform versionados em state
  compartilhado; menos peças móveis que a alternativa de 6+ repositórios
  (evita remote state em cascata só para o cluster subir).
- Negativas / trade-offs aceitos: acoplamento de schema entre app e Lambda
  (tabela `clientes`) não é mitigado por essa ADR — é aceito e documentado
  separadamente na RFC de estratégia de autenticação; qualquer mudança de
  output do Terraform em `infra-db` exige coordenação manual com o
  pipeline da app; o pipeline de `TECH-CHALLENGE-FASE-ONE` cresce em
  responsabilidade (agora também aplica manifestos/Secrets no cluster, não
  só builda/publica imagem).
- Trabalho decorrente: criar bucket S3 + tabela DynamoDB uma única vez,
  antes do primeiro `terraform init` de `infra-k8s` ou `infra-db`; definir
  convenção de prefixo de key por repo/ambiente antes de escrever os
  primeiros `.tf`.
