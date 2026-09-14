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

![img.png](components.png)

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

![img_1.png](infra.png)

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

![img_2.png](cicd.png)

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
# (aplicado em duas etapas: os providers kubernetes/kubectl dependem dos
#  atributos do cluster, que só existem após a criação do kind_cluster)
cd infra
terraform init
terraform apply -auto-approve -target=kind_cluster.this
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

Destaques da Fase 2:

- `POST /os` — abertura de OS retornando o identificador único.
- `GET /os/:id/status` — consulta do status da OS.
- `GET /os` — listagem ordenada por prioridade de status (Em Execução >
  Aguardando Aprovação > Diagnóstico > Recebida), mais antigas primeiro, com
  exclusão lógica das arquivadas.
- `POST /os/webhook/notificacao` — webhook externo que aprova/reprova o
  orçamento de uma OS (autenticado por `WEBHOOK_SECRET`).

### Autenticação: dois fluxos, dois atores

A partir da Fase 3 existem **dois** caminhos de autenticação, para dois
atores diferentes. Os dois emitem um JWT assinado com o mesmo `JWT_SECRET`,
e o `JwtAuthGuard` valida qualquer um deles do mesmo jeito.

| | Cliente da oficina | Staff (ADMIN / ATENDENTE / MECANICO) |
|---|---|---|
| Como autentica | CPF, via `POST /auth/cpf` no API Gateway | Email + senha, via `POST /auth/login` |
| Quem emite o token | `oficina-auth-lambda` (Function Serverless) | A própria aplicação |
| Claim `role` | `CLIENTE` | `ADMIN`, `ATENDENTE` ou `MECANICO` |
| O que é o `sub` | `id` do `Cliente` | `id` do `User` |
| Tem senha? | Não, nunca | Sim (bcrypt) |

O cliente **não** existe como `User` no banco — por isso `CLIENTE` fica fora
do enum `UserRole`, que mapeia a tabela `users`. Detalhes na RFC 0003 e na
ADR 0001.

### Rotas por perfil

**Públicas (sem token).** São só as que realmente não podem exigir
autenticação:

| Rota | Por que é pública |
|---|---|
| `POST /auth/login`, `/auth/register`, `/auth/refresh` | É onde o token é obtido |
| `GET /health` | Healthcheck consumido pelo Kubernetes e pelo monitoramento |
| `GET /api` | Swagger |
| `POST /os/webhook/notificacao` | Integração externa — tem validação própria via `WEBHOOK_SECRET`, não JWT |

**Do cliente (token com `role: CLIENTE`).** Todas restritas ao próprio
`sub` do token — não há como ver dado de outro cliente trocando um
parâmetro:

| Rota | Escopo |
|---|---|
| `GET /os/me` | Só as OS do cliente do token |
| `GET /os/consulta?numero=` | O documento vem do token; o parâmetro de query é ignorado |
| `GET /os/:id/status` | 404 se a OS não for dele |
| `GET /os/:id/acompanhamento` | 404 se a OS não for dele |

> O 404 (em vez de 403) é deliberado: responder "existe, mas não é sua"
> confirmaria a existência da OS para quem não deveria saber.

**Do staff (token com role interna).** Todo o resto — CRUD de clientes,
veículos, serviços, peças, estoque, orçamentos, e o ciclo de vida da OS
(diagnóstico → orçamento → execução → entrega). Algumas operações exigem
perfil específico, por exemplo:

| Rota | Perfis |
|---|---|
| `PATCH /os/:id/servicos/:itemId/realizar` | `MECANICO`, `ADMIN` |
| `PATCH /os/:id/pecas/:itemId/utilizar` | `MECANICO`, `ADMIN` |
| `GET /os` (listagem geral) | Qualquer perfil de staff |

### Todas as rotas

| Método | Rota | Descrição |
|---|---|---|
| `GET`  | `/health` | Health check (liveness/readiness) |
| `POST` | `/auth/register` | Registrar usuário |
| `POST` | `/auth/login` | Autenticar e emitir tokens |
| `POST` | `/auth/refresh` | Renovar o access token |
| `POST` | `/clientes` | Criar cliente |
| `GET`  | `/clientes` | Listar clientes |
| `GET`  | `/clientes/:id` | Buscar cliente por ID |
| `PUT`  | `/clientes/:id` | Atualizar cliente |
| `DELETE` | `/clientes/:id` | Remover cliente |
| `POST` | `/veiculos` | Cadastrar veículo |
| `GET`  | `/veiculos` | Listar veículos |
| `GET`  | `/veiculos/:id` | Buscar veículo por ID |
| `PUT`  | `/veiculos/:id` | Atualizar veículo |
| `DELETE` | `/veiculos/:id` | Remover veículo |
| `POST` | `/servicos` | Criar serviço |
| `GET`  | `/servicos` | Listar serviços |
| `GET`  | `/servicos/:id` | Buscar serviço por ID |
| `PUT`  | `/servicos/:id` | Atualizar serviço |
| `PATCH` | `/servicos/:id/desativar` | Desativar serviço |
| `PATCH` | `/servicos/:id/reativar` | Reativar serviço |
| `POST` | `/pecas` | Criar peça |
| `GET`  | `/pecas` | Listar peças |
| `GET`  | `/pecas/:id` | Buscar peça por ID |
| `PUT`  | `/pecas/:id` | Atualizar peça |
| `PATCH` | `/pecas/:id/desativar` | Desativar peça |
| `PATCH` | `/pecas/:id/reativar` | Reativar peça |
| `POST` | `/estoque/entrada` | Registrar entrada de estoque |
| `POST` | `/estoque/baixa` | Registrar baixa de estoque |
| `POST` | `/estoque/reservar` | Reservar estoque |
| `POST` | `/estoque/liberar-reserva` | Liberar reserva de estoque |
| `POST` | `/estoque/solicitar-reposicao` | Solicitar reposição |
| `GET`  | `/estoque/movimentacoes` | Listar movimentações |
| `POST` | `/os` | Abrir ordem de serviço |
| `GET`  | `/os` | Listar OS (priorizada, exclui arquivadas) |
| `GET`  | `/os/consulta` | Consulta pública da OS |
| `GET`  | `/os/metricas/tempo-medio` | Tempo médio de execução |
| `GET`  | `/os/:id` | Buscar OS por ID |
| `GET`  | `/os/:id/status` | Consultar status da OS |
| `GET`  | `/os/:id/acompanhamento` | Acompanhamento da OS |
| `GET`  | `/os/:id/orcamento` | Orçamento da OS |
| `POST` | `/os/webhook/notificacao` | Webhook externo — aprova/reprova orçamento |
| `POST` | `/os/:id/servicos` | Adicionar serviço à OS |
| `DELETE` | `/os/:id/servicos/:itemId` | Remover serviço da OS |
| `PATCH` | `/os/:id/servicos/:itemId/realizar` | Registrar execução de serviço |
| `POST` | `/os/:id/pecas` | Adicionar peça à OS |
| `DELETE` | `/os/:id/pecas/:itemId` | Remover peça da OS |
| `PATCH` | `/os/:id/pecas/:itemId/utilizar` | Marcar peça como utilizada |
| `PATCH` | `/os/:id/iniciar-diagnostico` | Iniciar diagnóstico |
| `PATCH` | `/os/:id/concluir-diagnostico` | Concluir diagnóstico (gera orçamento) |
| `PATCH` | `/os/:id/iniciar-execucao` | Iniciar execução |
| `PATCH` | `/os/:id/finalizar-execucao` | Finalizar execução |
| `PATCH` | `/os/:id/liberar-veiculo` | Liberar veículo |
| `PATCH` | `/os/:id/entregar` | Entregar veículo |
| `GET`  | `/orcamentos/by-os/:osId` | Buscar orçamento pela OS |
| `GET`  | `/orcamentos/:id` | Buscar orçamento por ID |
| `POST` | `/orcamentos/:id/enviar` | Enviar orçamento ao cliente |
| `PATCH` | `/orcamentos/:id/aprovar` | Aprovar orçamento |
| `PATCH` | `/orcamentos/:id/reprovar` | Reprovar orçamento |
| `GET`  | `/relatorios/tempo-medio-servicos` | Tempo médio por serviço |

---

## Variáveis de ambiente

| Variável | Descrição | Default |
|---|---|---|
| `DATABASE_URL` | String de conexão do PostgreSQL | `postgresql://oficina:oficina@localhost:5432/oficina_db` |
| `DB_USER` | Usuário do Postgres (Docker Compose) | `oficina` |
| `DB_PASSWORD` | Senha do Postgres (Docker Compose) | `oficina` |
| `DB_NAME` | Nome do banco (Docker Compose) | `oficina_db` |
| `JWT_SECRET` | Chave de assinatura do JWT | `dev_secret_key` |
| `JWT_EXPIRES_IN` | Validade do token | `8h` |
| `WEBHOOK_SECRET` | Segredo do webhook de notificação externa | `dev_webhook_secret` |
| `NODE_ENV` | Ambiente da aplicação | `development` |

---

## Vídeo demonstrativo

> _https://www.youtube.com/watch?v=FO_1gfI67RU_ — link do vídeo no YouTube/Vimeo demonstrando deploy da
> aplicação, execução do CI/CD, consumo das APIs e escalabilidade automática.

---

## Participantes

1. Natália Manosso - Discord natz6 - RM371743
2. Guilherme Müller Severo - Discord Guilherme M Severo - RM373321

---

## Scripts úteis

| Comando | Descrição |
|---|---|
| `yarn start:dev` | Sobe a API com hot-reload |
| `yarn build` | Compila para `dist/` |
| `yarn test` / `yarn test:cov` | Testes unitários / com cobertura |
| `yarn test:e2e` | Testes end-to-end |
