# ADR 0004 — Organização de logs e traces

- **Status**: Aceita
- **Data**: 2026-09-10
- **Repos afetados**: `TECH-CHALLENGE-FASE-ONE` (app),
  `oficina-auth-lambda`

## Contexto

O PDF exige logs estruturados com correlação entre requisições, e traces
visíveis em execução, cobrindo pelo menos o fluxo de autenticação por CPF
(cliente → API Gateway → Lambda → banco → JWT) e o fluxo de abertura de
ordem de serviço. Hoje a app não tem logger estruturado nem qualquer
correlation-id entre requisições (é o logger padrão do Nest, texto simples).
Com New Relic já escolhido como ferramenta de observabilidade (RFC 0004),
é preciso decidir o formato dos logs e como o ID de correlação atravessa
os componentes.

## Decisão

- **Formato**: logs em **JSON estruturado** em todos os componentes (app e
  Lambda), via `nestjs-pino` (ou `winston`, a definir na implementação) na
  app, e `console.log` em JSON ou lib equivalente na Lambda.
- **Correlation-id**: um único ID por requisição, propagado via header
  `x-request-id`. Se o cliente/API Gateway não enviar, a app gera um
  (`uuid`) na entrada. Middleware/interceptor na app injeta esse ID em todo
  log emitido durante o processamento daquela requisição.
- **Ponta a ponta no fluxo de CPF**: o `x-request-id` (ou equivalente
  gerado pelo API Gateway) é propagado da chamada do cliente até a Lambda,
  para que os logs da Lambda e os logs da app referentes à mesma
  autenticação sejam correlacionáveis no New Relic pelo mesmo ID.
- **Traces**: cobertos pelo agente APM do New Relic instalado na app
  (`newrelic` package, carregado antes de tudo em `main.ts`) e por
  instrumentação equivalente na Lambda — não é necessário instrumentar
  manualmente span-by-span; o agente captura automaticamente
  entrada/saída de requisições HTTP e chamadas ao banco.
- **Nível `error` para falhas de OS**: exceções relevantes no módulo
  `service-orders` devem ser logadas em nível `error`, com campos
  estruturados suficientes para virar alerta no New Relic (ver RFC 0004),
  incluindo o `x-request-id` da requisição que originou a falha.

## Consequências

- Positivas: um único ID de correlação atravessa todo o fluxo de CPF
  (cliente → Gateway → Lambda → banco → JWT → app), o que é exigido
  explicitamente na demonstração final (vídeo); logs em JSON são
  diretamente consumíveis pelo New Relic sem parsing customizado.
- Negativas / trade-offs aceitos: introduz uma dependência nova
  (`nestjs-pino`/`winston`) e um middleware que precisa ser testado para
  não vazar dados sensíveis nos logs (ex.: nunca logar CPF completo ou JWT
  em claro).
- Trabalho decorrente: implementar o middleware de `x-request-id` e trocar
  o logger padrão do Nest antes de instalar o agente New Relic (para os
  logs já nascerem estruturados); garantir que o header de correlação seja
  propagado explicitamente na chamada HTTP entre API Gateway e Lambda/EKS
  (não é automático — precisa ser configurado no mapeamento do Gateway).
