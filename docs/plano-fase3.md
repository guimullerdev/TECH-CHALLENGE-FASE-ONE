# Plano — Fase 3 (Tech Challenge)

> Baseado em `13SOAT - Fase 3 - Tech Challenge.pdf`. Este repo hoje é o
> monólito da Fase 2 (NestJS + Terraform + kind, tudo em um repositório só,
> rodando localmente/no runner do CI). A Fase 3 exige separar em **4
> repositórios**, sair do kind local para **nuvem real**, adicionar
> **API Gateway + Lambda de autenticação por CPF**, **banco gerenciado**,
> **observabilidade (New Relic)** e **documentação arquitetural formal**.

> **Decisão tomada:** observabilidade via **New Relic** (tier free — 100 GB/mês
> de ingestão, 1 usuário full platform, usuários basic ilimitados, sem cartão
> de crédito). Cobre APM, logs, infraestrutura de Kubernetes e dashboards —
> suficiente para todos os requisitos de monitoramento do PDF sem custo.

## Visão geral dos 4 repositórios exigidos

| # | Repositório | Conteúdo | Relação com o que existe hoje |
|---|---|---|---|
| 1 | **app-oficina** (este repo) | Aplicação NestJS (a mesma, com ajustes) | Já existe — precisa ser **enxugado**: sai tudo que não é código da app |
| 2 | **oficina-auth-lambda** | Function Serverless de autenticação por CPF | **Novo** — não existe nada disso hoje |
| 3 | **oficina-infra-k8s** | Terraform do cluster Kubernetes (rede, node groups, add-ons, autoscaling) — **sem** manifestos da app, ver correção abaixo | Deriva de `infra/cluster.tf` |
| 4 | **oficina-infra-db** | Terraform do banco de dados gerenciado | Deriva de `infra/database.tf`, mas troca Postgres-em-pod por serviço gerenciado |

Cada um dos 4 precisa, isoladamente: `README.md` completo (propósito, stack,
como rodar/deployar, diagrama da arquitetura daquele repo, link do
Swagger/Postman), `Dockerfile` quando fizer sentido, pipeline de CI/CD
funcional com deploy automático, branch `main` protegida e PRs obrigatórios,
e o usuário `soat-architecture` adicionado como colaborador.

---

## 1. Mudanças **neste repositório** (app-oficina)

> **Correção (2026-09-13)**: os dois primeiros bullets abaixo (`k8s/*.yaml`
> migrando pro repo 3, e o repo 3 disparando o deploy) estavam errados —
> Q&A oficial da FIAP esclareceu que o repo de infra-k8s só provisiona o
> cluster; manifestos e pipeline de deploy da app ficam **aqui**. Ver ADR
> 0001 e ADR 0005 (revisadas) e a seção 3 abaixo (também corrigida).

### 1.1 O que sai daqui
- Só o Terraform de cluster/banco (`infra/cluster.tf`, `infra/database.tf`)
  migra para os repos 3 e 4 — hoje mistura cluster, banco e deploy da app
  no mesmo Terraform, isso vai ser dividido.
- `k8s/*.yaml` **fica neste repo** — é a app que possui seus próprios
  manifestos (`Deployment`, `Service`, `HPA`, `ConfigMap`), só passam a
  apontar pro cluster gerenciado pelo repo 3 em vez do `kind` local.
- O job `deploy` atual do `.github/workflows/ci-cd.yml` (que sobe um kind
  efêmero e roda terraform de cluster/banco) deixa de existir aqui, mas o
  pipeline **ganha um novo job de deploy real**: build/test → publicar
  imagem → `aws eks update-kubeconfig` (usando output do repo 3) →
  `kubectl apply`/`helm upgrade` dos manifestos deste repo contra o
  cluster. O deploy da app continua sendo disparado por este repo, não
  pelo repo 3.

### 1.2 O que muda no código da aplicação
- **Autenticação via CPF nas rotas sensíveis do cliente**: hoje o módulo
  `auth` (`src/modules/auth`) é 100% email/senha (`login.usecase.ts`,
  `register.usecase.ts`, `user.entity.ts`). O PDF pede autenticação por CPF
  para o cliente consumir as rotas protegidas, validada por uma **Lambda
  externa** que devolve um JWT. Duas peças precisam existir aqui:
  1. Um endpoint/mecanismo para a Lambda consultar "existência e status do
     cliente" — provavelmente reaproveitando `customers` (já tem
     `cpf-cnpj.vo.ts` e `customers.controller.ts`), exposto de forma que a
     Lambda consiga chamar (endpoint interno, ou a Lambda acessa o banco
     gerenciado diretamente — decisão a registrar em RFC/ADR).
  2. O `JwtAuthGuard` (`src/modules/auth/guards/jwt-auth.guard.ts`) precisa
     aceitar/validar tokens **emitidos pela Lambda** (mesma chave/segredo ou
     JWKS), não só os emitidos pelo `login.usecase.ts` local. Definir se os
     dois fluxos de auth (usuário interno da oficina vs. cliente por CPF)
     convivem lado a lado ou se o fluxo de cliente é exclusivamente via
     Lambda.
- **Logs estruturados em JSON com correlação entre requisições**: hoje não há
  um logger estruturado (verificar `main.ts`/`common/filters`) — precisa
  adicionar um interceptor/middleware de correlation-id (ex.: `x-request-id`)
  e trocar o logger padrão do Nest por um logger JSON (ex.: `nestjs-pino` ou
  `winston`).
- **Métricas/latência expostas para o APM (New Relic)**: instalar o agente
  `newrelic` (pacote `newrelic` + `newrelic.js`/`newrelic.cjs` de config) no
  `main.ts` (deve ser o primeiro `require` do processo), e garantir que
  `common/health` continue servindo o healthcheck que o monitoramento vai
  consumir.
- **Alertas para falhas no processamento de OS**: no módulo
  `service-orders`, garantir que exceções relevantes gerem eventos/logs
  identificáveis (nível `error`, campos estruturados) que a ferramenta de
  observabilidade consiga transformar em alerta.
- **Dashboards pedidos** (volume diário de OS, tempo médio por status,
  erros de integração): o módulo `relatorios` já calcula tempo médio de
  execução — verificar se dá pra reaproveitar as mesmas queries/eventos como
  fonte para os dashboards do Datadog/New Relic, ou se precisa emitir
  métricas customizadas (custom metrics) a partir desses casos de uso.
- **`DATABASE_URL` passa a apontar para o banco gerenciado** (repo 4), não
  mais para o Postgres em pod do mesmo cluster — ajustar
  `.env.example`, `docker-compose.yml` (para dev local continua com Postgres
  em container, tudo bem) e o `ConfigMap`/`Secret` de `k8s/secret.yaml`
  (que **fica neste repo**, populado pelo próprio pipeline a partir do
  output de `oficina-infra-db/bootstrap-db`).

### 1.3 O que fica igual
- Estrutura Clean Architecture por módulo, Prisma, testes, `Dockerfile` da
  app continuam aqui — é exatamente o artefato que os outros repos consomem
  (imagem Docker publicada no GHCR/ECR/etc.).

---

## 2. Repo novo: `oficina-auth-lambda`

Não existe nada disso no projeto atual — é construído do zero.

- **Função serverless** (AWS Lambda é o caminho mais natural dado que o
  restante já usa GHCR/GitHub Actions; mas é "livre escolha de nuvem").
  Responsabilidades:
  1. Receber CPF.
  2. Validar formato/dígito verificador do CPF (pode reaproveitar a lógica
     de `src/modules/customers/domain/value-objects/cpf-cnpj.vo.ts` — vale
     portar/duplicar essa validação aqui, já que a Lambda deve ser
     independente do monólito).
  3. Consultar existência/status do cliente — chamando a API principal
     (endpoint dedicado) **ou** o banco gerenciado diretamente. Recomendo
     documentar essa escolha como RFC (acoplamento direto no banco cria
     dependência de schema entre repos; chamar a API mantém a Lambda
     desacoplada, mas adiciona uma dependência de rede síncrona).
  4. Gerar e devolver um **JWT** assinado com o mesmo segredo/chave que a API
     principal usa para validar (`JwtAuthGuard`), com claims mínimas (ex.:
     `sub` = customerId, `role`).
- **API Gateway na frente da Lambda e da API principal**: uma rota tipo
  `POST /auth/cpf` roteia pro Lambda; as demais rotas sensíveis (`/os/*`,
  etc.) roteiam pro serviço do cluster, mas exigem o JWT emitido pela
  Lambda — isso é onde o API Gateway (AWS API Gateway, Kong ou Traefik) entra
  como autorizador/proxy.
- **CI/CD**: pipeline que builda o pacote da função (zip/container),
  roda testes unitários da validação de CPF, e publica/atualiza a Lambda
  automaticamente (ex.: `aws lambda update-function-code`, ou Terraform
  próprio se preferir gerenciar a Lambda como código — nesse caso é o único
  dos 4 repos que pode ter Terraform "embutido" além da infra dedicada).
- **Dockerfile**: só se a Lambda for empacotada como container image; caso
  contrário, README explica que não se aplica.

---

## 3. Repo novo: `oficina-infra-k8s`

> **Correção (2026-09-13)**: Q&A oficial da FIAP esclareceu a fronteira
> entre este repo e o repo da app — ver pergunta 2 registrada em
> `docs/adr/0001-padrao-comunicacao-entre-repos.md`. A versão original
> desta seção (abaixo, riscada conceitualmente) mandava os manifestos da
> app migrarem pra cá; isso está **errado**. Corrigido a seguir.

Deriva do `infra/` atual, mas fica só com o **provisionamento do cluster**
— rede, node groups, add-ons, autoscaling de infraestrutura. Nenhum
manifesto da aplicação (`Deployment`/`Service`/`HPA`/`ConfigMap`) vive
aqui — isso é responsabilidade do repo 1 (app), ver seção 1 acima.

- `providers.tf`, `versions.tf`, `variables.tf`, `outputs.tf` — migram quase
  1:1, ajustando o provider de `kind` para o provider do cluster gerenciado
  escolhido (EKS — "livre escolha de nuvem"; hoje é só `kind` local, que não
  atende "Cluster Kubernetes com escalabilidade" em nuvem real).
- **`k8s/*.yaml` da aplicação NÃO migram pra cá** — ficam no repo 1, que os
  aplica com seu próprio pipeline. Este repo só expõe, via output do
  Terraform, o que esse pipeline externo precisa pra autenticar no cluster
  (endpoint do EKS, IAM role/OIDC).
- **HPA**: a validação de que o cluster gerenciado tem metrics-server
  nativo é feita aqui (infra), mas o manifesto do HPA em si
  (`k8s/hpa.yaml`, 2→5 réplicas, CPU 70%) vive no repo 1 junto com o resto
  dos manifestos da app.
- **`app.tf` não existe mais neste repo** — o truque de
  `docker save | ctr import` do `kind` e a aplicação do Deployment saem
  daqui inteiramente; isso agora é pipeline do repo 1.
- **CI/CD**: pipeline dispara o `terraform apply` desse repo contra a nuvem
  real (com credenciais via secrets do CI), tanto em homologação quanto em
  produção, conforme a branch. Precisa de `terraform plan` em PR e `apply`
  automático só depois do merge (regra de proteção do PDF).
- **Integração com o repo 1**: nenhuma — é o repo 1 que lê os outputs
  deste repo (via remote state), não o contrário.
- **Integração com observabilidade**: instalar aqui o agente/daemonset do
  New Relic (Helm chart via `kubectl_manifest`/`helm_release`) para
  métricas de CPU/memória do cluster (isso é infraestrutura do cluster, não
  da aplicação, então fica aqui mesmo).

---

## 4. Repo novo: `oficina-infra-db`

Deriva de `infra/database.tf`, mas troca **Postgres rodando em pod** por um
**serviço de banco gerenciado** — hoje isso não existe (o banco é só um
`kubernetes_deployment` com PVC).

- Terraform próprio do provider de nuvem escolhido para provisionar o banco
  gerenciado (ex.: AWS RDS PostgreSQL, Cloud SQL, Azure Database, etc.).
- Deve tratar: rede (subnets/VPC ou equivalente gerenciado), parâmetros de
  performance, backups, e output da connection string (sem expor segredo em
  claro no state — usar recurso sensível / secrets manager).
- **Migrações Prisma** (`prisma/migrations/`) continuam vivendo no repo 1
  (app), mas passam a rodar contra esse banco gerenciado — decidido via ADR
  0005: Job de Kubernetes dentro do EKS, aplicado pelo pipeline do próprio
  repo 1 (não pelo repo 3, que só provisiona o cluster).
- **Documentação exigida pelo PDF** também nasce aqui: "justificativa
  formal para a escolha do banco de dados e ajustes no modelo relacional,
  com diagramas ER" — é natural que isso viva neste repo já que é o dono do
  recurso de banco.
- **CI/CD**: `terraform plan` em PR, `apply` automático pós-merge, com
  outputs consumidos pelo repo 1 — que materializa o `Secret` de
  `DATABASE_URL` no cluster ao fazer seu próprio deploy (o repo 3 não
  participa desse fluxo, ver correção na seção 3).

---

## 5. Cross-cutting (afeta todos os repos)

### API Gateway
Decisão de qual usar (AWS API Gateway é o mais natural se o resto for AWS;
Kong/Traefik fazem sentido se preferir multi-cloud ou manter tudo em k8s).
Onde ele mora arquiteturalmente também precisa virar ADR: pode ser parte do
repo de infra-k8s (se for Traefik/Kong rodando no próprio cluster) ou um
recurso à parte gerenciado pelo repo da Lambda/infra genérica.

### Observabilidade (Datadog/New Relic)
- Latência de APIs → instrumentação no repo 1 (app) + repo 2 (Lambda).
- CPU/memória do k8s → agente instalado pelo repo 3.
- Healthcheck/uptime → já existe `common/health` no repo 1; só precisa ser
  monitorado externamente pela ferramenta escolhida.
- Alertas de falha em OS e dashboards de volume/tempo médio/erros →
  configuração na ferramenta (Datadog/New Relic), alimentada pelos logs/
  métricas emitidos pelo repo 1.

### Documentação da arquitetura
Nenhum RFC/ADR/diagrama formal existe hoje (o `README.md` atual descreve a
arquitetura da Fase 2 em prosa, sem esse formato). Precisa criar, no mínimo:
- Diagrama de Componentes (visão de nuvem + APIs + banco + monitoramento) —
  substitui/expande `components.png` e `infra.png` atuais.
- Diagrama de Sequência: fluxo de autenticação por CPF (cliente → API
  Gateway → Lambda → banco → JWT) e fluxo de abertura de OS.
- RFCs: escolha da nuvem, do banco gerenciado, da estratégia de autenticação.
- ADRs: padrão de comunicação entre os 4 repos, uso do HPA (o `flow.excalidraw`
  atual pode servir de rascunho de partida).
- Diagrama ER + justificativa do modelo relacional (repo 4, mas referenciado
  nos demais READMEs).

### CI/CD — regras de proteção
Todos os 4 repos precisam de: branch `main`/`master` protegida sem commit
direto, PR obrigatório pra merge, deploy automático de homologação/produção
por branch. Hoje este repo faz push direto disparar o pipeline; a regra de
"branch protegida" e "PR obrigatório" ainda não está configurada em nenhum
lugar (é configuração do GitHub, não código) — precisa ser habilitada nas
settings de cada repositório.

---

## 6. Ordem sugerida de execução

1. **Decisões primeiro (RFC/ADR)**: nuvem, banco gerenciado, API Gateway,
   estratégia de autenticação — tudo depende dessas escolhas.
2. **Repo 4 (infra-db)**: provisiona o banco gerenciado; sem ele nada mais
   consegue rodar de verdade em nuvem.
3. **Repo 1 (app)**: ajustar `DATABASE_URL`, logs estruturados, JWT
   compatível com a Lambda, endpoint de consulta de cliente para a Lambda;
   remover só `infra/` daqui (`k8s/` fica); simplificar o CI/CD pra
   publicar a imagem **e** aplicar os próprios manifestos + Job de
   migration no cluster (ver correção na seção 1).
4. **Repo 2 (auth-lambda)**: implementa validação de CPF + emissão de JWT,
   já contra o banco/API do passo 3.
5. **Repo 3 (infra-k8s)**: só o cluster gerenciado (rede, node groups,
   add-ons, autoscaling da infra) + agente de observabilidade; expõe
   endpoint/IAM role como output pro repo 1 aplicar seus manifestos e
   Secret (ver correção na seção 3) — HPA em si é manifesto do repo 1.
6. **API Gateway** ligando Lambda (repo 2) + serviço do cluster (repo 3).
7. **Observabilidade e dashboards** (Datadog/New Relic) ligados por cima de
   tudo.
8. **Documentação final, vídeo de demonstração e PDF de entrega.**
