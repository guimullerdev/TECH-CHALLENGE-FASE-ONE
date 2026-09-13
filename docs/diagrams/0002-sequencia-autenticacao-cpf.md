# Diagrama de Sequência — Autenticação por CPF

> Fluxo: cliente → API Gateway → Lambda → banco → JWT, seguido do uso do
> token numa rota protegida da app. Baseado na RFC 0003
> (`docs/rfc/0003-estrategia-autenticacao-cpf.md`) e no `JwtAuthGuard`
> (`src/modules/auth/guards/jwt-auth.guard.ts`).

```mermaid
sequenceDiagram
    actor Cliente
    participant Gateway as API Gateway
    participant Lambda as Lambda (oficina-auth-lambda)
    participant RDS as RDS PostgreSQL (tabela clientes)
    participant App as App NestJS (EKS)

    Cliente->>Gateway: POST /auth/cpf { documento }
    Gateway->>Lambda: invoke (proxy integration)

    Lambda->>Lambda: valida formato/dígito verificador do CPF

    alt CPF com formato inválido
        Lambda-->>Gateway: 400 Bad Request
        Gateway-->>Cliente: 400 Bad Request
    else CPF com formato válido
        Lambda->>RDS: SELECT id, ativo FROM clientes WHERE documento = ? (read-only)
        RDS-->>Lambda: linha encontrada ou vazio

        alt cliente não encontrado ou ativo = false
            Lambda-->>Gateway: 404 Not Found / 422 Unprocessable Entity
            Gateway-->>Cliente: 404 / 422
        else cliente encontrado e ativo
            Lambda->>Lambda: gera JWT assinado com JWT_SECRET\nclaims: { sub: clienteId, documento, role: 'CLIENTE' }
            Lambda-->>Gateway: 200 { accessToken }
            Gateway-->>Cliente: 200 { accessToken }
        end
    end

    Note over Cliente,App: token em mãos, cliente consome rota protegida

    Cliente->>Gateway: GET /service-orders/:id\nAuthorization: Bearer <JWT>\nx-request-id: <uuid>
    Gateway->>App: proxy via VPC Link (propaga headers)
    App->>App: JwtAuthGuard.canActivate()\nverifica assinatura/expiração (mesmo JWT_SECRET)
    App->>App: RolesGuard — restringe acesso ao próprio sub (role CLIENTE)
    App->>RDS: Prisma query (dados da OS do cliente)
    RDS-->>App: resultado
    App-->>Gateway: 200 OK
    Gateway-->>Cliente: 200 OK
```

## Notas

- A Lambda **nunca chama a API principal** para validar o CPF — acessa o
  RDS diretamente, read-only, restrito a `documento` e `ativo` (decisão da
  RFC 0003). Evita expor endpoint público/sem JWT na app só para esse
  propósito.
- O `JwtAuthGuard` da app não muda entre os dois tipos de ator (staff via
  email/senha, cliente via CPF) — só valida assinatura/expiração com o
  mesmo `JWT_SECRET`. Quem diferencia o ator é o campo `role`/`actorType`
  no payload, verificado pelo `RolesGuard`.
- `x-request-id` propagado do cliente (ou gerado no Gateway) até a Lambda e
  a app, para correlacionar logs no New Relic — ver ADR 0004.
