# Oficina Mecânica API — Tech Challenge Fase 2

API REST de gestão de uma oficina mecânica: ordens de serviço (OS), clientes,
veículos, serviços, peças/estoque e orçamentos. Esta é a evolução da Fase 1,
focada em **qualidade, resiliência e escalabilidade** com práticas modernas de
infraestrutura e automação.

**Stack:** NestJS · Prisma 7 · PostgreSQL · Docker · Kubernetes (kind) ·
Terraform · GitHub Actions

---

## Objetivos da Fase 2

- **Refatoração** aplicando Clean Architecture (camadas
  `domain` / `application` / `infrastructure` / `presentation` por módulo) e
  Clean Code, com testes automatizados cobrindo os fluxos críticos.
- **Evolução das APIs de OS**: abertura de OS, consulta de status, aprovação de
  orçamento via notificação externa, listagem priorizada com exclusão lógica e
  atualização de status por ator externo.
- **Infraestrutura como código e automação**: conteinerização, manifestos
  Kubernetes com HPA, provisionamento via Terraform e pipeline de CI/CD que
  builda, testa e faz o deploy de ponta a ponta.

---

## Arquitetura

### Componentes da aplicação

Monólito NestJS organizado em módulos, cada um em Clean Architecture:

```
src/
├── modules/
│   ├── auth/            # autenticação JWT + guards (JWT, Roles, Webhook)
│   ├── customers/       # clientes
│   ├── vehicles/        # veículos
│   ├── services/        # catálogo de serviços
│   ├── parts/           # peças
│   ├── estoque/         # controle de estoque
│   ├── orcamentos/      # orçamentos
│   ├── service-orders/  # ciclo de vida da OS (+ webhook de notificação externa)
│   └── relatorios/      # métricas (tempo médio de execução)
├── common/health/       # GET /health (liveness/readiness)
└── prisma/              # PrismaService
```

- Cada módulo isola regras de negócio no `domain` (entidades, value objects,
  interfaces de repositório = *ports*) e a persistência no `infrastructure`
  (repositórios Prisma = *adapters*). `application` (use cases) depende só das
  interfaces; `presentation` (controllers) só dos use cases.

### Infraestrutura provisionada

Tudo roda dentro de um **cluster Kubernetes local (kind)**, provisionado por
Terraform, no namespace `oficina`:

```
Cluster Kubernetes (kind)
├── kube-system
│   └── metrics-server          # métricas de CPU para o HPA
└── namespace: oficina
    ├── ConfigMap + Secret       # NODE_ENV, JWT, DATABASE_URL, WEBHOOK_SECRET
    ├── Postgres                 # Deployment + Service + PVC
    └── oficina-api              # Deployment (2 pods) + Service + HPA (2→5, CPU 70%)
```

- Atores externos acessam a API pelo `Service`; o cliente pode consultar o
  status da OS publicamente e um sistema externo aprova/reprova orçamento pelo
  webhook (`POST /os/webhook/notificacao`, autenticado por `WEBHOOK_SECRET`).

### Fluxo de deploy (CI/CD)

Pipeline no GitHub Actions (`.github/workflows/ci-cd.yml`), disparado por push
na `main`, rodando em runner `ubuntu-latest`:

1. **build-and-test** — `yarn install`, `yarn build`, `yarn test:cov`
   (com threshold de cobertura).
2. **docker-build-push** — builda a imagem Docker e publica no GHCR.
3. **deploy** — sobe um **cluster kind efêmero no próprio runner** e roda
   `terraform apply`, que cria o cluster, carrega a imagem, provisiona o banco,
   o metrics-server e aplica os manifestos do app; em seguida valida o rollout,
   o HPA e o `/health`, e derruba o cluster ao final.

> O deploy usa **Terraform como mecanismo** (recursos `kubernetes_*` e
> `kubectl_manifest`), não `kubectl apply` avulso.

---

## Execução local (Docker Compose)

```bash
cp .env.example .env
docker compose up
```

- PostgreSQL na porta `5432`, API na porta `3000` (com hot-reload), migrações
  aplicadas automaticamente no start.
- API em **http://localhost:3000** · Swagger em **http://localhost:3000/api**.

```bash
docker compose down      # para o stack
docker compose down -v   # para e apaga o volume do banco
```

---

## Deploy em Kubernetes via Terraform (local)

Pré-requisitos: [Docker](https://docs.docker.com/get-docker/),
[kind](https://kind.sigs.k8s.io/), [Terraform](https://www.terraform.io/) e
[kubectl](https://kubernetes.io/docs/tasks/tools/).

```bash
# 1. Buildar a imagem com a tag que os manifestos esperam
docker build -t ghcr.io/guimullerdev/tech-challenge-fase-one:latest .

# 2. Provisionar cluster + banco + metrics-server + app
cd infra
terraform init
terraform apply -auto-approve

# 3. Acompanhar
export KUBECONFIG="$(terraform output -raw kubeconfig_path)"
kubectl get pods -n oficina
kubectl get hpa  -n oficina

# 4. Acessar a API
kubectl port-forward -n oficina svc/oficina-api 8080:80
# → http://localhost:8080/health  e  http://localhost:8080/api

# 5. Destruir
terraform destroy -auto-approve
```

### Recursos criados pelo Terraform (`infra/`)

| Arquivo | Recursos |
|---|---|
| `cluster.tf` | Cluster kind (`kind_cluster`) |
| `database.tf` | Namespace, Secret de credenciais, PVC, Deployment e Service do Postgres |
| `app.tf` | Carga da imagem no kind, metrics-server e manifestos do app (`k8s/`) via `kubectl_manifest` |
| `providers.tf` / `versions.tf` | Providers `kind`, `kubernetes`, `alekc/kubectl`, `null` |
| `variables.tf` / `outputs.tf` | Variáveis (nome do cluster, credenciais do banco, imagem) e outputs |

---

## APIs

- **Swagger / OpenAPI:** `http://localhost:3000/api` (com a aplicação rodando).
- Coleção de exemplos de requisições: [`manual-test.http`](manual-test.http).

Principais fluxos da Fase 2:

- `POST /os` — abertura de OS retornando o identificador único.
- `GET /os/:id/status` — consulta pública do status da OS.
- `GET /os` — listagem ordenada por prioridade de status (Em Execução >
  Aguardando Aprovação > Diagnóstico > Recebida), mais antigas primeiro, com
  exclusão lógica das arquivadas.
- `POST /os/webhook/notificacao` — webhook externo que aprova/reprova o
  orçamento de uma OS (autenticado por `WEBHOOK_SECRET`).

---

## Vídeo demonstrativo

> _(a preencher)_ — link do vídeo no YouTube/Vimeo demonstrando deploy da
> aplicação, execução do CI/CD, consumo das APIs e escalabilidade automática.

---

## Scripts úteis

| Comando | Descrição |
|---|---|
| `yarn start:dev` | Sobe a API com hot-reload |
| `yarn build` | Compila para `dist/` |
| `yarn test` / `yarn test:cov` | Testes unitários / com cobertura |
| `yarn test:e2e` | Testes end-to-end |
