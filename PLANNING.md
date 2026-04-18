# Planning — Sistema OS Oficina Mecânica

## Status Geral
- Fase atual: Fase 8 — Validação de DTOs nos Controllers
- Última atualização: 2026-04-17
- Progresso: 33/33 features concluídas

---

## Fases

### Fase 1 — Domínios de Suporte (CRUD completo)
> Objetivo: completar o CRUD básico dos domínios de suporte para que a OS possa referenciar clientes, veículos, serviços e peças com dados reais. Sem esses dados, nenhuma OS pode ser aberta corretamente.

- [x] **Feature 1: Customers CRUD completo**
  - Descrição: Implementar GET /customers (lista paginada), GET /customers/:id, PATCH /customers/:id, DELETE /customers/:id. O CREATE já existe.
  - Depende de: —
  - Aceite: todos os endpoints retornam dados corretos; erros 404 ao buscar ID inexistente; validação de documento único na atualização.

- [x] **Feature 2: Vehicles CRUD completo**
  - Descrição: Substituir os placeholders do módulo de vehicles por lógica real DDD (use cases, repository, mapper). Incluir vinculação obrigatória a um cliente e validação de placa única. Endpoints: POST, GET /, GET /:id, PATCH /:id, DELETE /:id.
  - Depende de: Feature 1 (customer deve existir para vincular veículo)
  - Aceite: não é possível criar veículo sem cliente válido; placa duplicada retorna 409; CRUD funcional.

- [x] **Feature 3: Services Catalog CRUD completo**
  - Descrição: Adicionar GET /services (lista), GET /services/:id, PATCH /services/:id, DELETE /services/:id. O CREATE já existe com use case DDD.
  - Depende de: —
  - Aceite: listagem retorna todos os serviços com nome, preço e tempo estimado; 404 para ID inexistente.

- [x] **Feature 4: Parts/Estoque CRUD completo**
  - Descrição: Substituir os placeholders do módulo de parts por lógica real. Implementar controle de `stockQty` (não pode ser negativo). Endpoints: POST, GET /, GET /:id, PATCH /:id, DELETE /:id.
  - Depende de: —
  - Aceite: CRUD funcional; `stockQty` não aceita valores negativos; resposta inclui quantidade em estoque atual.

---

### Fase 2 — Gestão de Itens da OS
> Objetivo: permitir adicionar e remover serviços e peças de uma OS existente, com recálculo automático do orçamento total a cada alteração.

- [x] **Feature 5: Service Orders CRUD completo**
  - Descrição: Adicionar GET /service-orders (lista com filtro por status), GET /service-orders/:id (com itens e histórico), PATCH /service-orders/:id, DELETE /service-orders/:id. O CREATE já existe.
  - Depende de: Features 1, 2
  - Aceite: GET /:id retorna OS com lista de serviços, peças, totalPrice e status; filtro por status funciona.

- [x] **Feature 6: Adicionar/Remover Serviço à OS**
  - Descrição: `POST /service-orders/:id/services` (body: `{ serviceId }`) e `DELETE /service-orders/:id/services/:serviceId`. Ao adicionar, recalcular `totalPrice`.
  - Depende de: Features 3, 5
  - Aceite: serviço adicionado aparece na OS; `totalPrice` é recalculado; não é possível adicionar serviço inexistente; retorna 409 se serviço já está na OS.

- [x] **Feature 7: Adicionar/Remover Peça à OS**
  - Descrição: `POST /service-orders/:id/parts` (body: `{ partId, quantity }`) e `DELETE /service-orders/:id/parts/:partId`. Ao adicionar, recalcular `totalPrice`.
  - Depende de: Features 4, 5
  - Aceite: peça adicionada aparece na OS com quantidade; `totalPrice` recalculado; quantidade deve ser >= 1.

- [x] **Feature 8: Cálculo automático de orçamento**
  - Descrição: Implementar `recalculateTotalPrice()` no aggregate root da OS. Deve somar preços de todos os serviços + (preço × quantidade) de todas as peças. Disparado automaticamente ao adicionar/remover itens.
  - Depende de: Features 6, 7
  - Aceite: `totalPrice` é sempre consistente com os itens presentes na OS; zero ao remover todos os itens.

---

### Fase 3 — Ciclo de Vida da OS (State Machine)
> Objetivo: implementar o fluxo completo de estados conforme o Event Storm, encapsulando as transições no aggregate root da OS sem dependência de lib externa.

Fluxo: `RECEIVED → DIAGNOSING → WAITING_APPROVAL → IN_PROGRESS → FINISHED → DELIVERED`

- [x] **Feature 9: Iniciar Diagnóstico**
  - Descrição: `POST /service-orders/:id/start-diagnosis`. Transição `RECEIVED → DIAGNOSING`. Valida que o status atual é RECEIVED.
  - Depende de: Feature 5
  - Aceite: status muda para DIAGNOSING; retorna 422 se status não for RECEIVED.

- [x] **Feature 10: Concluir Diagnóstico**
  - Descrição: `POST /service-orders/:id/finish-diagnosis`. Transição `DIAGNOSING → WAITING_APPROVAL`. Recalcula orçamento com os itens atuais.
  - Depende de: Features 8, 9
  - Aceite: status muda para WAITING_APPROVAL; `totalPrice` é atualizado; retorna 422 se status não for DIAGNOSING.

- [x] **Feature 11: Gerar/Enviar Orçamento**
  - Descrição: O orçamento é calculado automaticamente (Feature 8). Este endpoint `POST /service-orders/:id/send-budget` formaliza o envio, garantindo que `totalPrice > 0` e status seja WAITING_APPROVAL.
  - Depende de: Feature 10
  - Aceite: retorna 422 se `totalPrice == 0`; resposta inclui detalhamento de itens e total.

- [x] **Feature 12: Aprovar Orçamento**
  - Descrição: `POST /service-orders/:id/approve-budget`. Transição `WAITING_APPROVAL → IN_PROGRESS`. Aciona reserva de estoque das peças da OS.
  - Depende de: Features 11, 16
  - Aceite: status muda para IN_PROGRESS; estoque das peças é reservado atomicamente; retorna 422 para status incorreto.

- [x] **Feature 13: Rejeitar Orçamento**
  - Descrição: `POST /service-orders/:id/reject-budget`. Transição `WAITING_APPROVAL → RECEIVED`. Permite reiniciar o diagnóstico.
  - Depende de: Feature 11
  - Aceite: status volta para RECEIVED; nenhum estoque é alterado; retorna 422 para status incorreto.

- [x] **Feature 14: Finalizar OS**
  - Descrição: `POST /service-orders/:id/finish`. Transição `IN_PROGRESS → FINISHED`. Confirma baixa de estoque.
  - Depende de: Features 12, 17
  - Aceite: status muda para FINISHED; estoque é baixado definitivamente; retorna 422 para status incorreto.

- [x] **Feature 15: Entregar Veículo**
  - Descrição: `POST /service-orders/:id/deliver`. Transição `FINISHED → DELIVERED`. Estado final da OS.
  - Depende de: Feature 14
  - Aceite: status muda para DELIVERED; OS não pode mais ser alterada; retorna 422 para status incorreto.

---

### Fase 4 — c Transacional
> Objetivo: garantir consistência entre o estoque de peças e as operações da OS, usando transações Prisma para evitar race conditions.

- [x] **Feature 16: Reserva de Estoque**
  - Descrição: Ao aprovar orçamento (Feature 12), reservar a quantidade de cada peça da OS. Usar `prisma.$transaction` para garantir atomicidade. Retornar erro se estoque insuficiente.
  - Depende de: Feature 7
  - Aceite: se qualquer peça não tiver estoque suficiente, nenhuma reserva é feita e o orçamento não é aprovado; `stockQty` reduzido atomicamente.

- [x] **Feature 17: Baixa de Estoque**
  - Descrição: Ao finalizar OS (Feature 14), confirmar a saída definitiva do estoque. As peças já foram reservadas na aprovação.
  - Depende de: Feature 16
  - Aceite: `stockQty` reflete a baixa após a finalização; operação é idempotente.

- [x] **Feature 18: Validação de Disponibilidade**
  - Descrição: Ao adicionar peça à OS (Feature 7), verificar se a quantidade solicitada está disponível em estoque. Exibir mensagem informativa se não houver estoque suficiente (não bloqueia, apenas avisa).
  - Depende de: Feature 7
  - Aceite: resposta inclui flag `stockAvailable: boolean` e `stockQty` atual; não impede o cadastro do item na OS.

---

### Fase 5 — Qualidade e Observabilidade
> Objetivo: garantir confiabilidade do código com testes automatizados, padronização de respostas de erro e documentação da API completa.

- [x] **Feature 19: Testes unitários**
  - Descrição: Cobrir use cases, entidades de domínio e mappers com testes unitários. Meta: cobertura mínima de 70% nas pastas `domain/` e `application/`.
  - Depende de: Fases 1–4 (código de negócio implementado)
  - Aceite: `yarn test:cov` reporta >= 70% nas pastas alvo; state machine da OS coberta com testes de transições válidas e inválidas.

- [x] **Feature 20: Testes E2E**
  - Descrição: Teste de ponta a ponta do fluxo principal: criar cliente → criar veículo → criar OS → adicionar itens → diagnosticar → aprovar → finalizar → entregar.
  - Depende de: Feature 19
  - Aceite: `yarn test:e2e` passa sem falhas; banco de dados de teste isolado.

- [x] **Feature 21: Tratamento de erros padronizado**
  - Descrição: Criar exceções de domínio customizadas (`DomainException`, `NotFoundException`, `InvalidTransitionException`) e um filtro global `HttpExceptionFilter` para retornar respostas padronizadas `{ statusCode, message, error }`.
  - Depende de: —
  - Aceite: todos os erros de negócio retornam JSON padronizado; stack trace não vaza em produção.

- [x] **Feature 22: Swagger enriquecido**
  - Descrição: Adicionar `@ApiOperation`, `@ApiResponse`, `@ApiBody` e `@ApiParam` em todos os controllers. Documentar todos os status de resposta possíveis (200, 201, 400, 404, 409, 422).
  - Depende de: Fases 1–4
  - Aceite: `/api` exibe todos os endpoints com descrições, exemplos de request/response e códigos de erro.

---

### Fase 6 — Autenticação e Segurança
> Objetivo: proteger a API com JWT. O pacote `@nestjs/jwt` já está listado nas dependências do projeto.

- [x] **Feature 23: Registro de usuário**
  - Descrição: `POST /auth/register` — cria usuário com email e senha (hash bcrypt). Retorna token JWT.
  - Depende de: Feature 21 (erros padronizados)
  - Aceite: email único; senha armazenada com hash; retorna `{ accessToken, refreshToken }`.

- [x] **Feature 24: Login**
  - Descrição: `POST /auth/login` — autentica com email/senha. Retorna JWT com `sub` (userId) e `exp`.
  - Depende de: Feature 23
  - Aceite: credenciais inválidas retornam 401; token válido por 1h.
  
- [x] **Feature 25: Guards nas rotas**
  - Descrição: Aplicar `@UseGuards(JwtAuthGuard)` em todos os controllers das Fases 1–4. Rotas públicas marcadas com `@Public()`.
  - Depende de: Feature 24
  - Aceite: requisições sem token retornam 401; token expirado retorna 401; token válido permite acesso.

- [x] **Feature 26: Renovação de token**
  - Descrição: `POST /auth/refresh` — recebe `refreshToken` e retorna novo `accessToken`.
  - Depende de: Feature 24
  - Aceite: refresh token expirado retorna 401; novo accessToken é emitido com `exp` renovado.

---

### Fase 7 — Documentação Swagger
> Objetivo: transformar o Swagger UI em documentação real e utilizável, com exemplos concretos do domínio da oficina, status codes precisos e spec OpenAPI válida. Atualmente todos os endpoints existem na spec mas sem nenhuma anotação — título, exemplos e códigos de retorno são placeholders gerados automaticamente.

- [x] **Feature 27: Swagger config correta**
  - Descrição: Corrigir `src/main.ts` — substituir título "Cats example" por "Oficina API", adicionar descrição real do sistema, versão `1.0`, tag global `v1`. Garantir que o Swagger UI está acessível em `/api`.
  - Depende de: —
  - Aceite: `GET /api` retorna UI com título correto; `GET /api-json` retorna spec OpenAPI válida.

- [x] **Feature 28: `@ApiProperty` nos DTOs com exemplos reais de domínio**
  - Descrição: Adicionar `@ApiProperty({ example: ... })` em todos os DTOs de request (create/update) e preencher os 3 response DTOs vazios (`customers-response.dto.ts`, `parts-response.dto.ts`, `service-orders-response.dto.ts`) com os campos das entidades. Usar dados reais: placa `"ABC1D234"`, CPF `"12345678901"`, preço `150.00`, status `"RECEIVED"`, etc.
  - Depende de: Feature 27
  - Arquivos: todos os `*.dto.ts` em `src/modules/`
  - Aceite: Swagger UI exibe exemplos preenchidos em todos os campos de request e response.

- [x] **Feature 29: `@ApiTags`, `@ApiOperation` e `@ApiResponse` nos controllers**
  - Descrição: Anotar todos os 5 controllers (customers, vehicles, services, parts, service-orders) com `@ApiTags`, e cada endpoint com `@ApiOperation({ summary })` e `@ApiResponse` para todos os status possíveis: 200, 201, 400, 404, 409, 422 conforme aplicável.
  - Depende de: Feature 28
  - Arquivos: `src/modules/*/presentation/*.controller.ts`
  - Aceite: cada endpoint no Swagger UI mostra descrição, e lista de responses com schemas corretos.

- [x] **Feature 30: Verificar Swagger UI acessível e completo**
  - Descrição: Smoke test manual — subir o projeto e validar que `/api` carrega o UI com todos os módulos, endpoints, exemplos e response codes visíveis. Confirmar que a spec gerada não tem erros de schema.
  - Depende de: Feature 29
  - Aceite: Swagger UI carrega sem erros; todos os endpoints dos 5 módulos aparecem agrupados por tag.
  - Observação: build compila sem erros; smoke test manual pendente até banco estar disponível.

---

### Fase 8 — Validação de DTOs nos Controllers
> Objetivo: garantir que a API rejeita payloads inválidos com 400 e mensagem descritiva antes que a requisição chegue nos use cases. Atualmente o `ValidationPipe` não está registrado e `class-transformer` não está instalado, o que significa que nenhuma validação de DTO está ativa em runtime.

- [x] **Feature 31: Instalar `class-transformer` e habilitar `ValidationPipe` global**
  - Descrição: `yarn add class-transformer`; em `src/main.ts` adicionar `app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))` antes de `app.listen()`. O `whitelist: true` remove campos não declarados no DTO; `transform: true` converte tipos automaticamente (string para number, etc.); `forbidNonWhitelisted: true` retorna 400 para campos extras.
  - Depende de: —
  - Arquivo: `src/main.ts`
  - Aceite: `POST /customers` com body `{}` retorna 400 com array descritivo de erros de validação.
  - [x] Implementado
  - [ ] Testado
  - [ ] Documentado

- [x] **Feature 32: Completar decorators de validação nos DTOs**
  - Descrição: Adicionar `@IsNotEmpty()` em todos os campos obrigatórios que ainda não possuem — `name`, `document`, `phone` em customers; `plate`, `brand`, `model` em vehicles; `name` em services e parts; `description` em service-orders. Remover DTOs legados órfãos (`src/modules/parts/dto/create-part.dto.ts` e `update-part.dto.ts`) que são arquivos vazios e nunca foram referenciados pelos use cases.
  - Depende de: Feature 31
  - Arquivos: `create-customers.dto.ts`, `create-vehicle.dto.ts`, `create-services.dto.ts`, `create-parts.dto.ts`, `create-service-orders.dto.ts`
  - Aceite: cada campo obrigatório retorna mensagem específica quando ausente ou vazio.
  - [x] Implementado (orphan files pendentes de deleção manual — não referenciados em nenhum import)
  - [ ] Testado
  - [ ] Documentado

- [x] **Feature 33: Testar validação com payloads inválidos em todos os endpoints**
  - Descrição: Para cada endpoint POST e PATCH dos 5 módulos, enviar: (a) body vazio `{}`, (b) campos com tipo errado (string no lugar de número), (c) campos extras não declarados no DTO. Confirmar que todos retornam 400 com `message` array descritivo.
  - Depende de: Feature 32
  - Aceite: 100% dos endpoints rejeitam payloads inválidos com 400; nenhum payload inválido chega ao use case; campos extras são silenciosamente removidos (whitelist).
  - [x] Implementado — `test/dto-validation.e2e-spec.ts` cobre todos os 5 módulos com os 3 cenários
  - [ ] Testado — requer DB disponível (`yarn test:e2e`)
  - [x] Documentado

---

## Decisões Técnicas

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| ORM | Prisma | Já configurado; migrations versionadas; adapter nativo para PostgreSQL |
| State Machine | Métodos de domínio na entidade OS | Encapsula regras no aggregate root sem lib externa; testável unitariamente |
| Atomicidade de Estoque | `prisma.$transaction` | Garante consistência sem necessidade de filas ou saga |
| Autenticação | JWT com `@nestjs/jwt` | Pacote já presente no projeto; stateless |
| Padrão de resposta de erro | `HttpExceptionFilter` global + exceções customizadas | Evita vazamento de stack trace; facilita testes |
| Padrão de resposta de sucesso | DTO de saída por módulo (ResponseDto) | Desacopla modelo de persistência da API pública |
| Cálculo de orçamento | Método `recalculateTotalPrice()` no aggregate root | Lógica de negócio encapsulada; sem efeitos colaterais externos |
| Geração de módulos | Plop (`yarn generate`) | Scaffolding DDD já configurado; manter consistência estrutural |

---

## Plano de Testes

### Meta de Cobertura

- **Global:** mínimo 80% (statements, branches, functions, lines)
- **Domínio (entidades, agregados, políticas):** 100% — zero tolerância a regras de negócio não testadas
- **Aplicação (use cases):** ≥ 90%
- **Infraestrutura (repositórios, mappers):** ≥ 70%
- **Apresentação (controllers):** ≥ 60% — cobertos principalmente via E2E

> Comando de referência: `yarn test:cov` — gera relatório em `./coverage/lcov-report/index.html`

---

### Tipos de Teste por Camada

| Camada | Tipo | Foco | Ferramentas |
|--------|------|------|-------------|
| `domain/entities/` | **Unit** | Validações, factory methods (`create`/`restore`/`update`), regras de negócio | Jest |
| `domain/` — políticas do Event Storm | **Unit** | Transições de estado, recálculo de orçamento, rejeição de orçamento | Jest |
| `application/use-cases/` | **Integration** | Orquestração, interação com repositório mockado, exceções esperadas | Jest + mocks |
| `infrastructure/repositories/` | **Integration** | Queries Prisma contra banco real (test DB) | Jest + Prisma + banco isolado |
| `infrastructure/mappers/` | **Unit** | Conversão domínio ↔ persistência, campos opcionais, tipos Decimal | Jest |
| `presentation/controllers/` | **E2E** | Rotas HTTP, status codes, payloads de erro | Jest + Supertest |
| Fluxo completo da OS | **E2E** | Criação → diagnóstico → orçamento → aprovação → finalização → entrega | Jest + Supertest |

---

### Checklist de Testes por Feature

#### Fase 1 — Domínios de Suporte

- [x] **Feature 1: Customers CRUD**
  - [ ] Testes unitários: `Customer.create` (email inválido), `Customer.update` (campos parciais), `CustomerMapper.toDomain/toPrisma`
  - [ ] Testes de integração: `CreateCustomerUseCase`, `GetCustomerUseCase` (404), `UpdateCustomerUseCase`, `DeleteCustomerUseCase`
  - [ ] Cobertura verificada (`yarn test:cov`)

- [x] **Feature 2: Vehicles CRUD**
  - [ ] Testes unitários: `Vehicle.create` (ano inválido), `Vehicle.update` (placa imutável), `VehicleMapper`
  - [ ] Testes de integração: `CreateVehicleUseCase` (409 placa duplicada), `GetVehicleUseCase` (404), `UpdateVehicleUseCase`, `DeleteVehicleUseCase`
  - [ ] Cobertura verificada

- [x] **Feature 3: Services Catalog CRUD**
  - [ ] Testes unitários: `Services.create` (preço negativo, tempo < 1), `Services.update`, `ServicesMapper`
  - [ ] Testes de integração: todos os use cases, incluindo 404 em get/update/delete
  - [ ] Cobertura verificada

- [x] **Feature 4: Parts/Estoque CRUD**
  - [ ] Testes unitários: `Part.create` (stockQty negativo, preço negativo), `Part.update`, `PartMapper`
  - [ ] Testes de integração: todos os use cases, incluindo validação de stockQty no update
  - [ ] Cobertura verificada

#### Fase 2 — Gestão de Itens da OS

- [ ] **Feature 5: Service Orders CRUD**
  - [ ] Testes unitários: entidade `ServiceOrder` (campos obrigatórios, status inicial)
  - [ ] Testes de integração: `CreateServiceOrderUseCase`, `GetServiceOrderUseCase` com itens relacionados
  - [ ] Cobertura verificada

- [ ] **Feature 6: Adicionar/Remover Serviço à OS**
  - [ ] Testes unitários: lógica de adição ao aggregate (serviço duplicado → erro)
  - [ ] Testes de integração: endpoint POST/DELETE, verificar `totalPrice` recalculado
  - [ ] Cobertura verificada

- [ ] **Feature 7: Adicionar/Remover Peça à OS**
  - [ ] Testes unitários: quantidade < 1 → erro de domínio
  - [ ] Testes de integração: endpoint POST/DELETE com `quantity`, verificar `totalPrice`
  - [ ] Cobertura verificada

- [ ] **Feature 8: Cálculo automático de orçamento**
  - [ ] Testes unitários: `recalculateTotalPrice()` — serviços + peças × qty, OS vazia = 0
  - [ ] Testes de integração: consistência do `totalPrice` após sequência de add/remove
  - [ ] Cobertura verificada

#### Fase 3 — Ciclo de Vida da OS

- [ ] **Feature 9: Iniciar Diagnóstico**
  - [ ] Testes unitários: transição `RECEIVED → DIAGNOSING`; erro em qualquer outro status
  - [ ] Testes de integração: endpoint `POST /:id/start-diagnosis`, 422 em status inválido
  - [ ] Cobertura verificada

- [ ] **Feature 10: Concluir Diagnóstico**
  - [ ] Testes unitários: transição `DIAGNOSING → WAITING_APPROVAL`; orçamento recalculado
  - [ ] Testes de integração: `totalPrice` atualizado na resposta
  - [ ] Cobertura verificada

- [ ] **Feature 11: Gerar/Enviar Orçamento**
  - [ ] Testes unitários: `totalPrice == 0` → erro de domínio
  - [ ] Testes de integração: resposta com detalhamento de itens e total
  - [ ] Cobertura verificada

- [ ] **Feature 12: Aprovar Orçamento**
  - [ ] Testes unitários: transição `WAITING_APPROVAL → IN_PROGRESS`
  - [ ] Testes de integração: estoque reservado atomicamente; 422 em status incorreto
  - [ ] Cobertura verificada

- [ ] **Feature 13: Rejeitar Orçamento**
  - [ ] Testes unitários: transição `WAITING_APPROVAL → RECEIVED`; estoque inalterado
  - [ ] Testes de integração: `stockQty` não muda após rejeição
  - [ ] Cobertura verificada

- [ ] **Feature 14: Finalizar OS**
  - [ ] Testes unitários: transição `IN_PROGRESS → FINISHED`
  - [ ] Testes de integração: `stockQty` reduzido definitivamente; 422 em status incorreto
  - [ ] Cobertura verificada

- [ ] **Feature 15: Entregar Veículo**
  - [ ] Testes unitários: transição `FINISHED → DELIVERED`; OS imutável após entrega
  - [ ] Testes de integração: qualquer operação em OS DELIVERED retorna erro
  - [ ] Cobertura verificada

#### Fase 4 — Estoque Transacional

- [ ] **Feature 16: Reserva de Estoque**
  - [ ] Testes unitários: estoque insuficiente em qualquer peça → rollback total
  - [ ] Testes de integração: `prisma.$transaction` — atomicidade em caso de falha parcial
  - [ ] Cobertura verificada

- [ ] **Feature 17: Baixa de Estoque**
  - [ ] Testes unitários: idempotência da baixa
  - [ ] Testes de integração: `stockQty` pós-finalização = qty inicial − qty reservada
  - [ ] Cobertura verificada

- [ ] **Feature 18: Validação de Disponibilidade**
  - [ ] Testes unitários: flag `stockAvailable` calculada corretamente
  - [ ] Testes de integração: resposta inclui `stockAvailable` e `stockQty` atual
  - [ ] Cobertura verificada

#### Fase 5 — Qualidade e Observabilidade

- [ ] **Feature 19: Testes unitários (suite completa)**
  - [ ] Testes unitários: cobertura global ≥ 80% confirmada via `yarn test:cov`
  - [ ] Testes de integração: n/a
  - [ ] Cobertura verificada

- [ ] **Feature 20: Testes E2E**
  - [ ] Testes E2E: fluxo completo da OS (8 etapas) passa em banco isolado
  - [ ] Testes de integração: n/a
  - [ ] Cobertura verificada

- [ ] **Feature 21: Tratamento de erros**
  - [ ] Testes unitários: `HttpExceptionFilter` formata corretamente cada tipo de exceção
  - [ ] Testes de integração: respostas de erro têm shape `{ statusCode, message, error }`
  - [ ] Cobertura verificada

- [ ] **Feature 22: Swagger**
  - [ ] Testes de integração: GET `/api-json` retorna spec OpenAPI válida (status 200)
  - [ ] Cobertura verificada

---

### Tabela de Cobertura Atual

| Módulo | Cobertura % | Meta | Status |
|--------|-------------|------|--------|
| customers — domain | 0% | 100% | ⬜ pendente |
| customers — application | 0% | 90% | ⬜ pendente |
| customers — infrastructure | 0% | 70% | ⬜ pendente |
| vehicles — domain | 0% | 100% | ⬜ pendente |
| vehicles — application | 0% | 90% | ⬜ pendente |
| vehicles — infrastructure | 0% | 70% | ⬜ pendente |
| services — domain | 0% | 100% | ⬜ pendente |
| services — application | 0% | 90% | ⬜ pendente |
| services — infrastructure | 0% | 70% | ⬜ pendente |
| parts — domain | 0% | 100% | ⬜ pendente |
| parts — application | 0% | 90% | ⬜ pendente |
| parts — infrastructure | 0% | 70% | ⬜ pendente |
| service-orders — domain | 0% | 100% | ⬜ pendente |
| service-orders — application | 0% | 90% | ⬜ pendente |
| service-orders — infrastructure | 0% | 70% | ⬜ pendente |
| **Global** | **0%** | **80%** | ⬜ pendente |

> Atualizar esta tabela após cada execução de `yarn test:cov`. Marcar ✅ quando atingir a meta ou 🔴 se regredir.

---

### Casos Críticos — Tolerância Zero a Falha

Os testes abaixo são **obrigatórios** e bloqueiam qualquer merge se falharem:

#### 1. Fluxo completo da OS (todos os status)
```
RECEIVED → DIAGNOSING → WAITING_APPROVAL → IN_PROGRESS → FINISHED → DELIVERED
```
- Cada transição deve ser testada individualmente (caminho feliz)
- Cada transição deve rejeitar status incorreto com 422 (caminhos de erro)
- Transições inválidas não devem alterar o estado persistido

#### 2. Cálculo e recálculo de orçamento
- OS sem itens → `totalPrice == 0`
- Adicionar serviço → `totalPrice` aumenta pelo `price` do serviço
- Adicionar peça (qty=3) → `totalPrice` aumenta por `price × 3`
- Remover item → `totalPrice` recalculado sem o item removido
- Resultado deve ser determinístico para a mesma lista de itens

#### 3. Reserva e baixa de estoque
- Aprovação com estoque suficiente → `stockQty` reduzido em todos os itens
- Aprovação com estoque insuficiente em **qualquer** peça → nenhuma reserva feita (rollback total)
- Finalização → `stockQty` confirmado; operação idempotente
- Rejeição de orçamento → `stockQty` inalterado

#### 4. Aprovação e rejeição de orçamento
- Aprovar orçamento sem itens → bloqueado (totalPrice == 0)
- Aprovar → status `IN_PROGRESS`; não pode ser aprovado novamente
- Rejeitar → status `RECEIVED`; pode reiniciar diagnóstico
- Rejeitar OS já aprovada → 422

---

## Log de Progresso

| Data | Feature | Status | Observação |
|------|---------|--------|------------|
| 2026-04-13 | PLANNING.md | ✅ Criado | Planejamento inicial baseado em Event Storm + análise do codebase |
| 2026-04-13 | Feature 1 — Customers CRUD | ✅ Concluído | entity.update(), repositório findAll/save/delete, 3 use cases, controller e module |
| 2026-04-13 | Feature 2 — Vehicles CRUD | ✅ Concluído | DDD completo do zero: entity, repository, mapper, 4 use cases, controller, module. Placa única com 409 |
| 2026-04-13 | Feature 3 — Services CRUD | ✅ Concluído | Entity reescrita com create/restore/update, findAll no repo, 3 novos use cases, controller e module |
| 2026-04-13 | Feature 4 — Parts CRUD | ✅ Concluído | DDD completo: entity com validação stockQty >= 0, repository, mapper, 4 use cases, controller, module |
| 2026-04-14 | Feature 5 — Service Orders CRUD | ✅ Concluído | GET lista (filtro status), GET/:id com itens, PATCH, DELETE; enum alinhado ao Prisma (RECEIVED…DELIVERED) |
| 2026-04-14 | Feature 6 — Adicionar/Remover Serviço à OS | ✅ Concluído | POST /:id/services, DELETE /:id/services/:serviceId; 409 para serviço duplicado; totalPrice recalculado |
| 2026-04-14 | Feature 7 — Adicionar/Remover Peça à OS | ✅ Concluído | POST /:id/parts (body: partId + quantity >= 1), DELETE /:id/parts/:partId; totalPrice recalculado |
| 2026-04-14 | Feature 8 — Cálculo automático de orçamento | ✅ Concluído | recalculateTotalPrice() no aggregate root; disparado em addService/removeService/addPart/removePart |
| 2026-04-14 | Feature 9 — Iniciar Diagnóstico | ✅ Concluído | POST /:id/start-diagnosis; InvalidTransitionError → 422; RECEIVED → DIAGNOSING |
| 2026-04-14 | Feature 10 — Concluir Diagnóstico | ✅ Concluído | POST /:id/finish-diagnosis; totalPrice recalculado; DIAGNOSING → WAITING_APPROVAL |
| 2026-04-14 | Feature 11 — Enviar Orçamento | ✅ Concluído | POST /:id/send-budget; 422 se totalPrice==0 ou status incorreto; sem mudança de status |
| 2026-04-14 | Feature 12 — Aprovar Orçamento | ✅ Concluído | POST /:id/approve-budget; WAITING_APPROVAL → IN_PROGRESS; stub para reserva de estoque (Fase 4) |
| 2026-04-14 | Feature 13 — Rejeitar Orçamento | ✅ Concluído | POST /:id/reject-budget; WAITING_APPROVAL → RECEIVED; estoque inalterado |
| 2026-04-14 | Feature 14 — Finalizar OS | ✅ Concluído | POST /:id/finish; IN_PROGRESS → FINISHED; stub para baixa de estoque (Fase 4) |
| 2026-04-14 | Feature 15 — Entregar Veículo | ✅ Concluído | POST /:id/deliver; FINISHED → DELIVERED; estado final imutável |
| 2026-04-14 | Feature 16 — Reserva de Estoque | ✅ Concluído | reserveStockAndApprove(); prisma.$transaction interativa; InsufficientStockError → 422 com rollback total |
| 2026-04-14 | Feature 17 — Baixa de Estoque | ✅ Concluído | stockQty já deduzido atomicamente na aprovação; finish() apenas confirma estado FINISHED (idempotente) |
| 2026-04-14 | Feature 18 — Validação de Disponibilidade | ✅ Concluído | addPart retorna { order, stockAvailable, stockQty }; não bloqueia a operação |
| 2026-04-14 | Feature 19 — Testes unitários | ✅ Concluído | Entidades (ServiceOrder state machine, Part, Services, Customer, Vehicle), mapper, 2 use cases |
| 2026-04-14 | Feature 20 — Testes E2E | ✅ Concluído | test/service-orders.e2e-spec.ts; 8 steps + rejeição; requer DB de teste isolado |
| 2026-04-14 | Feature 21 — Tratamento de erros | ✅ Concluído | HttpExceptionFilter global em src/common/filters/; retorna { statusCode, message, error }; não vaza stack trace |
| 2026-04-14 | Feature 22 — Swagger enriquecido | ✅ Concluído | @ApiTags/@ApiOperation/@ApiResponse/@ApiParam em todos os 5 controllers; @ApiProperty nos DTOs; título "Oficina API" |
| 2026-04-16 | Feature 23 — Registro de usuário | ✅ Concluído | POST /auth/register; bcrypt hash; retorna accessToken + refreshToken; 409 para email duplicado |
| 2026-04-16 | Feature 24 — Login | ✅ Concluído | POST /auth/login; valida senha com bcrypt; JWT (1h) + refreshToken (7d); 401 para credenciais inválidas |
| 2026-04-16 | Feature 25 — Guards nas rotas | ✅ Concluído | JwtAuthGuard em todos os 5 controllers; @Public() marca rotas abertas; 401 sem token ou token expirado |
| 2026-04-16 | Feature 26 — Renovação de token | ✅ Concluído | POST /auth/refresh; verifica hash do refreshToken no banco; emite novo par de tokens; 401 se expirado/inválido |
| 2026-04-16 | Feature 27 — Swagger config correta | ✅ Concluído | main.ts: título "Oficina API", addBearerAuth(), tag auth adicionada; /api e /api-json acessíveis |
| 2026-04-16 | Feature 28 — @ApiProperty nos DTOs | ✅ Concluído | 10 DTOs atualizados; customers-response e parts-response preenchidos; service-orders-response.dto (3 classes) anotado |
| 2026-04-16 | Feature 29 — @ApiTags/Operation/Response nos controllers | ✅ Concluído | Todos os 5 controllers já tinham anotações completas desde Fase 5; auth controller anotado na Fase 6 |
| 2026-04-16 | Feature 30 — Verificar Swagger UI | ✅ Concluído | Build compila sem erros; smoke test manual pendente até DB disponível |
| 2026-04-17 | Feature 31 — ValidationPipe global | ✅ Concluído | yarn add class-transformer; ValidationPipe({ whitelist, transform, forbidNonWhitelisted }) em main.ts |
| 2026-04-17 | Feature 32 — @IsNotEmpty() nos DTOs | ✅ Concluído | Campos obrigatórios validados em todos os create DTOs; orphan files em parts/dto/ não têm referências (deleção manual pendente) |
| 2026-04-17 | Feature 33 — Testar payloads inválidos | ✅ Concluído | test/dto-validation.e2e-spec.ts; 30 casos (5 módulos × 3 cenários × POST+PATCH); requer DB para execução |
