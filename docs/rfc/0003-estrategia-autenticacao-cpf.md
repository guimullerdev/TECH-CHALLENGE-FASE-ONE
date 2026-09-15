# RFC 0003 — Estratégia de autenticação por CPF

- **Status**: Aceita
- **Autor(es)**: Guilherme Müller
- **Data**: 2026-09-10
- **Repos afetados**: `oficina-auth-lambda`, `oficina-infra-db`,
  `TECH-CHALLENGE-FASE-ONE` (app)

## Contexto

O desafio exige que o cliente se autentique por CPF através de uma Lambda
externa, que devolve um JWT usado para consumir as rotas protegidas. A
Lambda roda **antes** de existir qualquer token — ela não pode se apoiar no
`JwtAuthGuard` da app pra se autenticar contra ela. É preciso decidir como a
Lambda confirma "esse CPF existe e está ativo" sem essa camada de auth.

Hoje o módulo `auth` da app (`src/modules/auth`) só lida com login
email/senha de usuários internos (staff). O cliente (`Cliente`, em
`src/modules/customers`) nunca teve fluxo de senha.

## Alternativas consideradas

### Opção A — Lambda consulta o RDS diretamente

- Prós: elimina a necessidade de expor um endpoint público/sem JWT na app
  só para a Lambda (que é exatamente o problema que a Lambda existe pra
  resolver); nenhuma segunda camada de auth (API key, segredo
  compartilhado) precisa ser inventada; consulta é read-only e restrita a
  dois campos (`documento`, `ativo`) da tabela `clientes`; padrão comum
  quando app, Lambda e banco pertencem ao mesmo time/projeto.
- Contras: acopla o schema da tabela `clientes` entre dois repositórios
  (app e Lambda) — mudança de schema em um pode quebrar o outro
  silenciosamente; exige a Lambda estar na mesma VPC do RDS e a Security
  Group do RDS liberar a SG da Lambda.

### Opção B — Endpoint dedicado na API principal

- Prós: nenhum acesso direto ao banco a partir de outro repositório;
  schema fica encapsulado atrás de um contrato de API.
- Contras: esse endpoint precisaria ficar público e sem exigência de JWT
  (a Lambda ainda não tem token nesse ponto do fluxo) — recriando o mesmo
  problema de segurança que a Lambda existe para resolver, e forçando a
  criação de uma segunda forma de autenticação (API key/segredo
  compartilhado entre app e Lambda) só para essa chamada interna.

## Decisão / Recomendação

**Lambda acessa o RDS diretamente**, com query read-only na tabela
`clientes`, filtrando por `documento` (CPF) e `ativo`. Critério decisivo:
evita uma segunda camada de autenticação redundante (API key só pra Lambda
chamar a app) e é o padrão mais simples dado que os três componentes (app,
Lambda, banco) são do mesmo time/projeto — o acoplamento de schema entre
repos é o trade-off aceito, e é exatamente o propósito desta RFC deixá-lo
documentado.

**Contrato mínimo** consumido pela Lambda (tabela `clientes`, hoje definida
em `src/modules/customers/domain/entities/customers.entity.ts`):
`documento` (CPF, 11 dígitos) e `ativo` (boolean) — nada além disso.

**Convivência com auth interno**: os dois fluxos de autenticação
coexistem, não são exclusivos — `User` (staff:
`ADMIN`/`ATENDENTE`/`MECANICO`) continua logando por email/senha via
`login.usecase.ts`; `Cliente` passa a logar só via CPF pela Lambda.

## Consequências

- Positivas: sem segredo/API key adicional para gerenciar entre repos; fluxo
  mais simples de implementar e testar.
- Negativas / trade-offs aceitos: mudança de schema na tabela `clientes`
  (renomear/remover `documento` ou `ativo`) exige coordenação manual entre
  os repos `TECH-CHALLENGE-FASE-ONE` e `oficina-auth-lambda`, já que não há
  contrato de API formal entre eles para essa consulta.
- Rede: a Lambda precisa estar provisionada na mesma VPC do RDS (definida em
  `oficina-infra-db`), com a Security Group do RDS liberando entrada da SG
  da Lambda.
- `JwtAuthGuard` da app precisa reconhecer tokens emitidos pela Lambda (ver
  ADR de organização de auth interno vs. CPF) — mesmo `JWT_SECRET` assina os
  dois tipos de token; claims da Lambda: `{ sub: clienteId, documento, role:
  'CLIENTE' }`.

## Referências

- `13SOAT - Fase 3 - Tech Challenge.pdf`
- Diagrama de sequência: `docs/diagrams/0002-sequencia-autenticacao-cpf.md`
- `TECH-CHALLENGE-FASE-ONE/src/modules/customers/domain/entities/customers.entity.ts`
- `TECH-CHALLENGE-FASE-ONE/src/modules/auth/domain/enums/user-role.enum.ts`
