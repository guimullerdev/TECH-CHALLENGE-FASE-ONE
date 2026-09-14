# RFC 0001 — Provedor de nuvem

- **Status**: Aceita
- **Autor(es)**: Guilherme Müller
- **Data**: 2026-09-10
- **Repos afetados**: todos (app, auth-lambda, infra-k8s, infra-db)

## Contexto

A Fase 3 exige sair do cluster local (`kind`) para nuvem real, com Cluster
Kubernetes gerenciado, Function Serverless, API Gateway e banco de dados
gerenciado. O enunciado permite escolha livre de provedor. Essa escolha
condiciona todas as decisões técnicas seguintes (qual serviço de cada
categoria usar), então precisa ser fechada primeiro.

## Alternativas consideradas

### Opção A — AWS

- Prós: cobre nativamente as 4 peças exigidas (EKS, Lambda, API Gateway,
  RDS) com integração de primeira classe entre elas (ex.: API Gateway →
  Lambda, API Gateway → VPC Link → EKS); documentação e exemplos mais
  abundantes; free tier cobre boa parte do escopo de um projeto de curso.
- Contras: maior superfície de serviços/IAM pra aprender se o time nunca
  usou AWS antes.

### Opção B — GCP

- Prós: GKE tem reputação de cluster gerenciado mais simples de operar;
  Cloud Functions cobre o serverless.
- Contras: API Gateway nativo da GCP é menos maduro/direto para o caso de
  uso de autorizador + proxy que o desafio pede; menos exemplos prontos
  para essa combinação específica.

### Opção C — Azure

- Prós: AKS + Azure Functions + API Management cobrem os requisitos.
- Contras: mesma familiaridade menor do time; API Management tem curva de
  configuração mais alta que o equivalente da AWS para este escopo.

### Opção D — Multi-cloud (cada peça em um provedor diferente)

- Prós: nenhum benefício real para o escopo do desafio.
- Contras: adiciona autenticação/rede cruzada entre provedores sem
  necessidade nenhuma — complexidade pura, descartada de imediato.

## Decisão / Recomendação

**AWS**, cobrindo as 4 peças (EKS, Lambda, API Gateway, RDS) dentro do
mesmo provedor. Critério decisivo: integração nativa entre as peças (API
Gateway já fala diretamente com Lambda e com serviços dentro de uma VPC via
VPC Link, sem stack adicional), e é a opção com mais documentação/exemplos
para o par "Kubernetes gerenciado + serverless + API Gateway" que o desafio
pede.

## Consequências

- Todas as RFCs/ADRs seguintes assumem AWS (API Gateway, EKS, Lambda, RDS).
- Custo: projeto fica sujeito aos free tiers/menor tier pago de cada serviço
  AWS (EKS control plane não entra em free tier — ver
  [[0003-organizacao-ambientes]] no plan.md sobre 1 cluster único para
  mitigar custo).
- Trabalho futuro: criar/configurar conta AWS, IAM roles para CI/CD
  (GitHub Actions → AWS via OIDC ou access keys), backend do Terraform em
  S3+DynamoDB (ver ADR de comunicação entre repos / infraestrutura).

## Referências

- `13SOAT - Fase 3 - Tech Challenge.pdf`
- `plan.md`, seção Fase 0
