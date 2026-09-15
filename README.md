# Oficina Mecânica API — Tech Challenge Fase 3

API REST de gestão de uma oficina mecânica: ordens de serviço (OS), clientes,
veículos, serviços, peças/estoque e orçamentos. Evolução das fases anteriores,
agora rodando em **infraestrutura real na AWS**, com autenticação de cliente
por CPF via função serverless, deploy automatizado em Kubernetes e
observabilidade ponta a ponta.

**Stack:** NestJS · Prisma 7 · PostgreSQL (RDS) · Docker · Kubernetes (EKS) ·
AWS API Gateway · AWS Lambda · Terraform · GitHub Actions · New Relic

Este é um dos **4 repositórios** da Fase 3:

| Repositório | Papel |
|---|---|
| **`TECH-CHALLENGE-FASE-ONE`** (aqui) | aplicação, manifestos Kubernetes e pipeline de deploy |
| [`oficina-auth-lambda`](https://github.com/guimullerdev/oficina-auth-lambda) | função serverless de autenticação por CPF |
| [`oficina-infra-k8s`](https://github.com/guimullerdev/oficina-infra-k8s) | cluster EKS, API Gateway e observabilidade |
| [`oficina-infra-db`](https://github.com/guimullerdev/oficina-infra-db) | banco de dados gerenciado (RDS) |

---

## Deploy ativo

A aplicação é alcançada **pelo API Gateway**, não diretamente: o `Service` no
cluster é um NLB interno, sem exposição à internet (ver ADR 0006).

| Ambiente | Endpoint |
|---|---|
| Produção | https://7eu2kz40xj.execute-api.us-east-1.amazonaws.com/prod |
| Homologação | https://7eu2kz40xj.execute-api.us-east-1.amazonaws.com/homolog |

- **Swagger**: https://7eu2kz40xj.execute-api.us-east-1.amazonaws.com/prod/api
- **Healthcheck**: https://7eu2kz40xj.execute-api.us-east-1.amazonaws.com/prod/health
- **Dashboard de observabilidade**: https://onenr.io/0qwykVVv1jn

Exemplo de ponta a ponta — CPF vira JWT, JWT abre as rotas do cliente:

```bash
BASE=https://7eu2kz40xj.execute-api.us-east-1.amazonaws.com/prod

TOKEN=$(curl -s -X POST "$BASE/auth/cpf" \
  -H 'content-type: application/json' \
  -d '{"cpf":"69759054876"}' | jq -r .accessToken)

curl -s "$BASE/os/me" -H "authorization: Bearer $TOKEN"
```

> Infraestrutura de curso, provisionada para a avaliação e destruída depois.
> Se os endpoints não responderem, é porque o `terraform destroy` já rodou —
> todo o provisionamento está versionado nos repositórios de infraestrutura.

---

## Objetivos da Fase 3

- **Autenticação de cliente por CPF** via função serverless, com JWT aceito
  pela mesma API que já autentica o staff por e-mail/senha — dois atores
  distintos convivendo (ver RFC 0003).
- **Infraestrutura gerenciada na AWS**: EKS para o cluster, RDS para o banco,
  Lambda para a autenticação e API Gateway como porta de entrada única.
- **Deploy automatizado por branch**: `main` → namespace `prod`,
  `develop` → namespace `homolog`, cada um com seu próprio banco.
- **Observabilidade**: logs estruturados em JSON com correlation-id,
  distributed tracing, dashboards, alertas e monitoramento externo de uptime.
- **Documentação arquitetural**: RFCs, ADRs e diagramas em [`docs/`](docs/).

### Objetivos da Fase 2 (histórico)

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

## Deploy em Kubernetes

A partir da Fase 3 o `infra/` (Terraform de cluster e banco) **saiu deste
repositório**. A divisão é:

| Onde | Responsabilidade |
|---|---|
| `oficina-infra-k8s` | Provisiona o cluster EKS: node groups, rede, add-ons, namespaces |
| `oficina-infra-db` | Provisiona o RDS PostgreSQL |
| **Este repo (`k8s/`)** | `Deployment`, `Service`, `HPA`, `ConfigMap` e o Job de migration — e o pipeline que aplica tudo isso |

A fronteira segue a ADR 0001: o repo de infraestrutura provisiona o
ambiente, e o ciclo de vida da aplicação (incluindo o deploy dela) pertence
a quem é dono do código.

### Como o deploy acontece

O pipeline deste repo, depois de publicar a imagem:

1. `aws eks update-kubeconfig` — autentica no cluster provisionado pelo
   `oficina-infra-k8s`
2. Confere se a `DATABASE_URL` resolvida é a do ambiente sendo deployado e
   **aborta se não for** — trava contra apontar homologação para o banco de
   produção
3. Cria o `Secret` a partir dos secrets do environment (`DATABASE_URL`,
   `JWT_SECRET`, …) — nunca de arquivo versionado
4. Aplica `ConfigMap` e `Service`
5. Aplica o **Job de migration e espera terminar** — se o schema falhar, o
   rollout é abortado e a versão nova nunca sobe contra um banco
   desatualizado (ADR 0005)
6. Só então aplica `Deployment` e `HPA`, e aguarda o rollout

A branch decide o ambiente: `develop` → namespace `homolog`, `main` →
namespace `prod` (ADR 0002). A imagem é sempre a tag do **SHA** do commit,
nunca `latest`, para o rollout apontar exatamente para o que aquele build
produziu.

Cada ambiente é um **GitHub Environment** (`homolog` e `prod`) com seus
próprios secrets. É isso que faz `secrets.DATABASE_URL` resolver para o banco
certo: secret de environment tem precedência sobre o do repositório. Sem os
environments configurados, os dois namespaces receberiam a mesma connection
string — e é justamente por isso que o passo 2 existe.

### Manifestos (`k8s/`)

| Arquivo | O que é |
|---|---|
| `deployment.yaml` | Deployment da API (2 réplicas, probes em `/health`) |
| `service.yaml` | Service que expõe a API no cluster |
| `hpa.yaml` | HPA de 2 a 5 réplicas a 70% de CPU (ADR 0003) |
| `configmap.yaml` | Config não sensível (`NODE_ENV`, `PORT`, …) |
| `migration-job.yaml` | Job que roda `prisma migrate deploy` dentro do cluster |
| `secret.example.yaml` | **Exemplo apenas** — mostra o formato esperado; o Secret real é criado pelo pipeline |

Nenhum manifesto declara `namespace`: o mesmo arquivo serve aos dois
ambientes, e o `kubectl apply -n` do pipeline decide qual. `${APP_IMAGE}` e
`${NAMESPACE}` são substituídos via `envsubst` na hora do deploy.

### Rodando os manifestos à mão

```bash
export APP_IMAGE=ghcr.io/guimullerdev/tech-challenge-fase-one:<sha>
export NAMESPACE=homolog
export MIGRATION_JOB_NAME=oficina-migrate-manual

kubectl apply -n "$NAMESPACE" -f k8s/configmap.yaml -f k8s/service.yaml
envsubst < k8s/migration-job.yaml | kubectl apply -n "$NAMESPACE" -f -
kubectl wait -n "$NAMESPACE" --for=condition=complete job/$MIGRATION_JOB_NAME --timeout=300s
envsubst < k8s/deployment.yaml  | kubectl apply -n "$NAMESPACE" -f -
kubectl apply -n "$NAMESPACE" -f k8s/hpa.yaml
```

O `Secret` precisa existir antes — crie com `kubectl create secret generic
oficina-api-secret` (ver o formato em `k8s/secret.example.yaml`).

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
| `GET /os/consulta?numero=&documento=` | Página pública de acompanhamento, no modelo de rastreio de encomenda — ver abaixo |

Sobre a consulta pública: ela exige o **par** número da OS + documento do
cliente, e o use case só devolve a OS se os dois baterem. É uma decisão de
produto deliberada (o cliente acompanha o serviço sem precisar de conta),
com o par funcionando como credencial de baixa fricção — o mesmo modelo de
um código de rastreio.

**Do cliente (token com `role: CLIENTE`).** Todas restritas ao próprio
`sub` do token — não há como ver dado de outro cliente trocando um
parâmetro:

| Rota | Escopo |
|---|---|
| `GET /os/me` | Só as OS do cliente do token |
| `GET /os/:id/status` | 404 se a OS não for dele |
| `GET /os/:id/acompanhamento` | 404 se a OS não for dele |

As duas últimas eram públicas e passaram a exigir token: diferente da
`/os/consulta`, elas aceitavam **só o UUID**, sem nenhuma conferência de
dono — quem tivesse o identificador lia a OS de qualquer pessoa.

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

**Fase 3**: _(a publicar)_ — autenticação por CPF, geração e uso do JWT,
execução da pipeline, deploy automatizado, consumo das APIs protegidas,
dashboard com análise ao vivo, logs estruturados, correlação entre
componentes e traces.

**Fase 2**: https://www.youtube.com/watch?v=FO_1gfI67RU — deploy da
aplicação, execução do CI/CD, consumo das APIs e escalabilidade automática.

---

## Participantes

1. Guilherme Müller Severo - Discord Guilherme M Severo - RM373321

---

## Scripts úteis

| Comando | Descrição |
|---|---|
| `yarn start:dev` | Sobe a API com hot-reload |
| `yarn build` | Compila para `dist/` |
| `yarn test` / `yarn test:cov` | Testes unitários / com cobertura |
| `yarn test:e2e` | Testes end-to-end |
