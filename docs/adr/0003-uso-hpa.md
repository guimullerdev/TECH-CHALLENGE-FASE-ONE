# ADR 0003 — Uso do Horizontal Pod Autoscaler (HPA)

- **Status**: Aceita
- **Autor(es)**: Guilherme Müller
- **Data**: 2026-09-10 (revisada em 2026-09-13: o manifesto do HPA fica no
  repo da app, não no de infra — ver ADR 0001)
- **Repos afetados**: `TECH-CHALLENGE-FASE-ONE` (dono do manifesto),
  `oficina-infra-k8s` (precisa garantir o metrics-server no cluster)

## Contexto

A Fase 2 já define um HPA (`k8s/hpa.yaml`) para o Deployment da app, escalando
de 2 a 5 réplicas com base em 70% de utilização de CPU, usando o
metrics-server manual instalado no `kind`. A Fase 3 mantém esse manifesto no
repo da app, mas passa a rodá-lo em EKS real — é preciso confirmar se essa
configuração se mantém e o que muda ao sair de um cluster local para um
gerenciado.

## Decisão

Manter o HPA com os mesmos parâmetros da Fase 2 — **2 a 5 réplicas, alvo de
70% de utilização de CPU** — com o manifesto vivendo em `k8s/hpa.yaml` no
repo da app e aplicado pelo pipeline dela (`kubectl apply`), um HPA por
namespace (`homolog`/`prod`, ver ADR 0002). O HPA é ciclo de vida da
aplicação, não da infraestrutura do cluster (ver ADR 0001); o que
`oficina-infra-k8s` precisa garantir é só o **metrics-server** disponível no
cluster, sem o qual o HPA não tem métrica para agir.

Diferença em relação à Fase 2: o `metrics-server` deixa de ser aplicado como
manifesto solto (`metrics-server.yaml`, que existia só para suprir a lacuna
do `kind`) e passa a ser um **add-on gerenciado do EKS**, declarado no
Terraform de `oficina-infra-k8s`.

Atenção: ao contrário do GKE, **o EKS não traz metrics-server por padrão** —
sem instalar explicitamente, o HPA sobe mas fica com `<unknown>` nas métricas
e nunca escala. Por isso ele é declarado como add-on, não assumido.

## Consequências

- Positivas: reaproveita configuração já validada na Fase 2 sem
  retrabalho; o metrics-server passa a ser um add-on gerenciado pela AWS
  (atualização e disponibilidade deixam de ser problema nosso) em vez de um
  manifesto que o time mantém à mão.
- Negativas / trade-offs aceitos: threshold de 70% CPU e o range 2-5
  réplicas não foram recalibrados para tráfego real de nuvem (continuam
  sendo os valores herdados de um ambiente de teste local) — se o volume
  real de OS/requisições divergir muito do teste da Fase 2, esses números
  podem precisar de ajuste posterior.
- Trabalho decorrente: `oficina-infra-k8s` confirma, ao subir o EKS pela
  primeira vez, que o add-on de metrics-server está habilitado (via
  Terraform/`eksctl`/console) — sem isso o HPA aplicado pelo repo da app
  fica sem métricas para agir; o repo da app parametriza `k8s/hpa.yaml` por
  namespace, junto com o resto dos seus manifestos.
