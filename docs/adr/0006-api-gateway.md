# ADR 0006 — API Gateway: onde mora e o que ele decide

- **Status**: Aceita
- **Data**: 2026-09-14
- **Repos afetados**: `oficina-infra-k8s` (dono do recurso),
  `oficina-auth-lambda`, `TECH-CHALLENGE-FASE-ONE`

## Contexto

O PDF exige um API Gateway para controle e roteamento. Ele é o único
componente que precisa conhecer **os dois** destinos ao mesmo tempo: a
Lambda de autenticação por CPF (`oficina-auth-lambda`) e o Service da
aplicação rodando no EKS (`TECH-CHALLENGE-FASE-ONE`, sobre o cluster de
`oficina-infra-k8s`).

Isso levanta três perguntas que precisavam de resposta explícita: em qual
repositório ele mora, quem valida o token, e como um recurso só serve aos
dois ambientes (homolog e prod).

## Decisão

### 1. Mora em `oficina-infra-k8s`, com state próprio

O Gateway fica em `oficina-infra-k8s/api-gateway/`, como uma raiz Terraform
separada da do cluster, com sua própria key de state.

Não virou repositório novo porque a decisão de granularidade da Fase 0 já
fixou 4 repositórios (ver ADR 0001) — e a Q&A oficial da FIAP confirmou que
os quatro são o mínimo, não um teto, desde que a responsabilidade de cada um
fique clara. O Gateway é infraestrutura de borda, e o repo de infraestrutura
Kubernetes é quem já tem a VPC e as subnets de que o VPC Link precisa.

State separado do cluster porque os ciclos de vida são diferentes: o Gateway
depende da Lambda (outro repo) e do Service da aplicação, e derrubar/recriar
o cluster não deveria derrubar a porta de entrada junto.

### 2. O Gateway roteia; quem autoriza é a aplicação

O Gateway **não** valida JWT (nem via authorizer Lambda, nem via JWT
authorizer nativo). Ele roteia, e a autorização continua no `JwtAuthGuard` e
no `RolesGuard` da aplicação.

Motivo: a regra de autorização não é só "token válido" — é "esta role pode
esta operação" e "este cliente só vê o próprio `sub`" (ver a matriz de rotas
no README da app). Essa lógica já existe na aplicação e depende de dados de
domínio. Duplicá-la no Gateway criaria dois lugares que podem divergir, e o
que fica desatualizado é sempre o que ninguém lembra de atualizar.

A única rota sem autorização por natureza é `POST /auth/cpf`: é onde o token
é obtido, exigir token ali seria circular.

### 3. Um Gateway, dois stages, via stage variables

Foi escolhida a **REST API (v1)**, não a HTTP API (v2), por causa das *stage
variables*: elas permitem que uma única definição de integração invoque o
alias `homolog` ou `prod` da Lambda conforme o stage chamado
(`${stageVariables.alias}`). A HTTP API não tem stage variables, e sem elas
seria preciso duplicar integrações ou APIs por ambiente.

Isso completa a estratégia de ambientes da ADR 0002: namespaces no cluster,
databases lógicos no RDS, aliases na Lambda e agora stages no Gateway.

### 4. As rotas da aplicação são condicionais

O VPC Link aponta para o NLB do Service da aplicação — que só existe depois
que o pipeline do repo da app cria esse Service. Como esse recurso nasce
fora do Terraform daqui, ele entra como a variável `nlb_listener_arn`:

- vazia (padrão): sobe só a rota de autenticação, e o `apply` funciona
- preenchida: as rotas `ANY /{proxy+}` para o cluster são criadas

A alternativa seria o `apply` do Gateway falhar até a aplicação estar no ar,
o que tornaria impossível provisionar a infraestrutura em ordem.

## Consequências

- Positivas: o Gateway vira o único endereço público da oficina; a
  autorização tem uma fonte de verdade só; o mesmo recurso serve aos dois
  ambientes sem duplicação; provisionar não depende da aplicação já estar
  publicada.
- Negativas / trade-offs aceitos: como o Gateway não valida token, uma
  requisição sem JWT só é recusada depois de chegar na aplicação — gasta um
  hop de rede para devolver 401, e o cluster recebe tráfego não autenticado
  que um authorizer teria barrado antes. Aceitável no volume deste projeto,
  e o caminho para mudar é conhecido (adicionar um JWT authorizer no
  Gateway) caso o custo apareça. Além disso, `nlb_listener_arn` é um
  acoplamento manual: se o Service for recriado com outro NLB, alguém
  precisa atualizar a variável.
- Trabalho decorrente: expor o Service da aplicação como `LoadBalancer` para
  o NLB existir; alimentar `nlb_listener_arn` depois do primeiro deploy;
  apontar o front/cliente para a URL do stage em vez do endereço do cluster.
