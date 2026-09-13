# Diagrama de Sequência — Abertura de Ordem de Serviço

> Baseado em `CreateOrdemDeServicoUseCase`
> (`src/modules/service-orders/application/use-cases/create-service-orders.usecase.ts`)
> e nos use cases auxiliares `AddServicoToOsUseCase` /
> `AddPecaToOsUseCase`. Rota: `POST /service-orders`, protegida pelo
> `JwtAuthGuard` global (staff autenticado, sem restrição de role
> específica nesse endpoint).

```mermaid
sequenceDiagram
    actor Staff as Staff (ATENDENTE/ADMIN)
    participant Gateway as API Gateway
    participant App as App NestJS
    participant UC as CreateOrdemDeServicoUseCase
    participant ClienteRepo as ClienteRepository
    participant VeiculoRepo as VeiculoRepository
    participant OsRepo as OrdemDeServicoRepository
    participant AddServico as AddServicoToOsUseCase
    participant AddPeca as AddPecaToOsUseCase
    participant DB as RDS PostgreSQL

    Staff->>Gateway: POST /service-orders\nAuthorization: Bearer <JWT>\n{ clienteId, veiculoId, descricaoProblema, servicos[], pecas[] }
    Gateway->>App: proxy via VPC Link
    App->>App: JwtAuthGuard — valida assinatura/expiração do token
    App->>UC: execute(dto)

    UC->>ClienteRepo: findById(clienteId)
    ClienteRepo->>DB: SELECT * FROM clientes WHERE id = ?
    DB-->>ClienteRepo: cliente
    ClienteRepo-->>UC: cliente

    alt cliente não encontrado
        UC-->>App: 404 NotFoundException
    else cliente inativo
        UC-->>App: 422 UnprocessableEntityException
    else cliente ok
        UC->>VeiculoRepo: findById(veiculoId)
        VeiculoRepo->>DB: SELECT * FROM veiculos WHERE id = ?
        DB-->>VeiculoRepo: veiculo
        VeiculoRepo-->>UC: veiculo

        alt veículo não encontrado
            UC-->>App: 404 NotFoundException
        else veículo inativo
            UC-->>App: 422 UnprocessableEntityException
        else veículo não pertence ao cliente
            UC-->>App: 400 BadRequestException
        else veículo ok
            UC->>OsRepo: generateNumero()
            OsRepo->>DB: próximo número sequencial
            DB-->>OsRepo: numero
            UC->>UC: OrdemDeServico.create({ numero, clienteId, veiculoId,\ndescricaoProblema, status: RECEBIDA })
            UC->>OsRepo: create(os)
            OsRepo->>DB: INSERT INTO ordens_de_servico
            DB-->>OsRepo: os salva
            OsRepo-->>UC: os

            loop para cada servico em dto.servicos
                UC->>AddServico: execute(os.id, servicoId)
                AddServico->>DB: valida serviço ativo + INSERT os_itens_servico
                DB-->>AddServico: os atualizada
                AddServico-->>UC: os atualizada
            end

            loop para cada peca em dto.pecas
                UC->>AddPeca: execute(os.id, pecaId, quantidade)
                AddPeca->>DB: valida peça/estoque + INSERT os_itens_peca\n+ reserva de estoque
                DB-->>AddPeca: os atualizada
                AddPeca-->>UC: os atualizada
            end

            UC-->>App: OS criada (status RECEBIDA)
        end
    end

    App-->>Gateway: 201 Created / 400 / 404 / 422
    Gateway-->>Staff: resposta
```

## Notas

- OS nasce sempre com status `RECEBIDA` (enum `StatusOS` do Prisma schema).
- Adicionar serviços/peças na abertura é opcional (`dto.servicos ?? []`,
  `dto.pecas ?? []`) — reaproveita os mesmos use cases usados para
  adicionar itens depois da criação.
- Validações de negócio (cliente/veículo ativos, veículo pertence ao
  cliente) ficam no use case, não no controller — mantém a regra fora da
  camada de apresentação (Clean Architecture já usada no projeto).
- `x-request-id` da requisição deve aparecer em todo log emitido durante
  esse fluxo (ver ADR 0004), inclusive em eventual `error` log se alguma
  validação falhar de forma inesperada.
