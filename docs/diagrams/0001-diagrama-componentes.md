# Diagrama de Componentes — Oficina Mecânica (Fase 3)

> Cobre os 6 elementos exigidos pelo comunicado oficial da Fase 3: nuvem,
> APIs, banco de dados, Kubernetes, Function Serverless, ferramentas de
> monitoramento. Baseado nas decisões de `plan.md` (Fase 0) e nas RFCs/ADRs
> em `docs/rfc/` e `docs/adr/`.

```mermaid
flowchart TB
    Cliente["Cliente / App (browser, mobile)"]
    Staff["Staff da oficina (ADMIN / ATENDENTE / MECANICO)"]

    subgraph AWS["Nuvem — AWS"]
        direction TB

        Gateway["API Gateway\n(stages /homolog, /prod)"]

        subgraph Lambda["Function Serverless — AWS Lambda\n(repo: oficina-auth-lambda)"]
            LambdaFn["Auth por CPF\n(valida CPF, consulta RDS, emite JWT)"]
        end

        subgraph EKS["Kubernetes — cluster AWS EKS\ncluster + namespaces: oficina-infra-k8s\nworkloads abaixo: TECH-CHALLENGE-FASE-ONE"]
            direction TB
            Ns["namespaces: homolog | prod\n(mesmos manifestos, DATABASE_URL diferente)"]
            App["App NestJS — Deployment + Service\nAPIs: auth, clientes, veículos,\nordens de serviço, orçamento, estoque"]
            HPA["HPA — 2 a 5 réplicas, CPU 70%"]
            MigJob["Job: prisma migrate deploy"]
            Ns --- App
            App --- HPA
        end

        RDS[("RDS PostgreSQL\n(repo: oficina-infra-db)\ndbs: oficina_homolog, oficina_prod")]

        subgraph Obs["Monitoramento — New Relic (tier free)"]
            direction TB
            APM["APM (latência de API)"]
            InfraAgent["Infra agent (CPU/memória do EKS)"]
            LogsNR["Logs estruturados (JSON + correlation-id)"]
            Dashboards["Dashboards + Alertas"]
        end
    end

    CICD["CI/CD — GitHub Actions\n(4 pipelines, um por repo)"]
    Registry[("Container Registry\nGHCR / ECR")]

    Cliente -->|"POST /auth/cpf"| Gateway
    Staff -->|"POST /auth/login (email/senha)"| Gateway
    Gateway -->|"invoke"| LambdaFn
    Gateway -->|"VPC Link + JWT Bearer"| App

    LambdaFn -->|"SELECT documento, ativo\nFROM clientes (read-only)"| RDS
    App -->|"Prisma"| RDS

    App -.->|"agente newrelic"| APM
    LambdaFn -.->|"agente newrelic"| APM
    EKS -.->|"daemonset/helm_release"| InfraAgent
    App -.->|"logs JSON"| LogsNR
    APM --> Dashboards
    InfraAgent --> Dashboards
    LogsNR --> Dashboards

    CICD -->|"build + push (pipeline da app)"| Registry
    Registry -->|"pull image"| App
    CICD -->|"kubectl apply — manifestos da app\n(pipeline da app, não do infra-k8s)"| App
    CICD -->|"kubectl apply + wait\n(antes do rollout)"| MigJob
    MigJob -->|"prisma migrate deploy"| RDS
    CICD -->|"terraform apply (infra do cluster)"| EKS
    CICD -->|"terraform apply"| RDS
    CICD -->|"zip/container + deploy"| LambdaFn
```

## Notas

- **Nuvem**: AWS, conta única, separação lógica homolog/prod (namespaces no
  EKS, databases lógicos no RDS, aliases/stages na Lambda/Gateway) — ver
  ADR 0002.
- **APIs**: expostas pela app NestJS dentro do EKS; roteadas pelo API
  Gateway via VPC Link.
- **Banco de dados**: RDS PostgreSQL, único ponto de dados compartilhado
  entre app (via Prisma) e Lambda (consulta read-only direta) — ver
  RFC 0002 e RFC 0003.
- **Kubernetes**: EKS, com HPA já validado na Fase 2 — ver ADR 0003.
  Fronteira de responsabilidade: `oficina-infra-k8s` provisiona o cluster
  (rede, node groups, add-ons, namespaces, autoscaling da infra); o repo da
  app é dono dos manifestos que rodam dentro dele (`Deployment`, `Service`,
  `HPA`, `ConfigMap`, `Secret`, Job de migration) e do pipeline que os
  aplica — ver ADR 0001 e ADR 0005.
- **Function Serverless**: Lambda de autenticação por CPF, roda na mesma
  VPC do RDS.
- **Monitoramento**: New Relic cobrindo APM, infraestrutura, logs e
  dashboards — ver RFC 0004 e ADR 0004.
