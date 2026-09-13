# Diagrama ER — Modelo Relacional

> Gerado a partir de `prisma/schema.prisma` (fonte da verdade). Este arquivo
> deve ser referenciado (ou copiado) em `oficina-infra-db` — o PDF exige
> "justificativa formal da escolha do banco + diagrama ER" nesse repo,
> já que é o dono do recurso de banco gerenciado (ver RFC 0002).

```mermaid
erDiagram
    CLIENTE ||--o{ VEICULO : possui
    CLIENTE ||--o{ ORDEM_DE_SERVICO : solicita
    VEICULO ||--o{ ORDEM_DE_SERVICO : "é levado em"
    ORDEM_DE_SERVICO ||--o{ OS_ITEM_SERVICO : contem
    SERVICO ||--o{ OS_ITEM_SERVICO : "é usado em"
    ORDEM_DE_SERVICO ||--o{ OS_ITEM_PECA : contem
    PECA ||--o{ OS_ITEM_PECA : "é usada em"
    ORDEM_DE_SERVICO ||--|| ORCAMENTO : gera
    ORDEM_DE_SERVICO ||--o{ MOVIMENTACAO_ESTOQUE : origina
    PECA ||--o{ MOVIMENTACAO_ESTOQUE : sofre

    CLIENTE {
        uuid id PK
        string nome
        string documento UK "CPF/CNPJ"
        enum tipo_documento "CPF | CNPJ"
        string telefone
        string email
        string endereco
        boolean ativo
        datetime created_at
        datetime updated_at
    }

    VEICULO {
        uuid id PK
        uuid cliente_id FK
        string placa UK
        string marca
        string modelo
        int ano
        string cor
        int km_atual
        boolean ativo
        datetime created_at
        datetime updated_at
    }

    SERVICO {
        uuid id PK
        string nome
        string descricao
        decimal preco_base
        int tempo_estimado
        boolean ativo
        datetime created_at
        datetime updated_at
    }

    PECA {
        uuid id PK
        string nome
        string codigo UK
        string descricao
        decimal preco_unitario
        int qtd_total
        int qtd_disponivel
        int qtd_reservada
        boolean ativo
        datetime created_at
        datetime updated_at
    }

    MOVIMENTACAO_ESTOQUE {
        uuid id PK
        uuid peca_id FK
        enum tipo "ENTRADA | BAIXA | RESERVA | LIBERACAO_RESERVA"
        int quantidade
        uuid os_id FK "opcional"
        string observacao
        datetime created_at
    }

    ORDEM_DE_SERVICO {
        uuid id PK
        string numero UK
        uuid cliente_id FK
        uuid veiculo_id FK
        enum status "RECEBIDA..ENTREGUE (8 estados)"
        boolean arquivada
        string descricao_problema
        datetime data_abertura
        datetime data_fechamento
        datetime created_at
        datetime updated_at
    }

    OS_ITEM_SERVICO {
        uuid id PK
        uuid os_id FK
        uuid servico_id FK
        decimal preco_unitario
        datetime inicio_exec
        datetime fim_exec
        datetime created_at
    }

    OS_ITEM_PECA {
        uuid id PK
        uuid os_id FK
        uuid peca_id FK
        int quantidade
        decimal preco_unitario
        boolean utilizada
        datetime created_at
    }

    ORCAMENTO {
        uuid id PK
        uuid os_id FK "unique — 1:1 com OS"
        enum status "GERADO | ENVIADO | APROVADO | REPROVADO"
        decimal valor_total
        datetime data_geracao
        datetime data_envio
        datetime data_resposta
        string observacoes
        datetime created_at
        datetime updated_at
    }

    USER {
        uuid id PK
        string email UK
        string password_hash
        string refresh_token_hash
        enum role "ADMIN | ATENDENTE | MECANICO"
        datetime created_at
    }
```

## Justificativa e relacionamentos

- **`clientes` 1:N `veiculos`**: um cliente pode ter vários veículos
  cadastrados; `veiculos.cliente_id` é obrigatório (todo veículo pertence a
  um cliente).
- **`clientes` 1:N `ordens_de_servico`** e **`veiculos` 1:N
  `ordens_de_servico`**: uma OS sempre referencia exatamente um cliente e
  um veículo (validado no `CreateOrdemDeServicoUseCase`: o veículo
  informado precisa pertencer ao cliente informado).
- **`ordens_de_servico` N:M `servicos`** via `os_itens_servico`: tabela
  associativa que guarda o preço praticado no momento da adição
  (`preco_unitario` congela o valor, independente de mudanças futuras em
  `servicos.preco_base`) e o intervalo de execução (`inicio_exec`/
  `fim_exec`), usado pelo módulo `relatorios` para calcular tempo médio por
  status.
- **`ordens_de_servico` N:M `pecas`** via `os_itens_peca`: mesma lógica de
  preço congelado, mais a flag `utilizada` (peça reservada vs.
  efetivamente consumida na OS).
- **`ordens_de_servico` 1:1 `orcamentos`**: `orcamentos.os_id` é `@unique`
  — cada OS gera no máximo um orçamento ativo.
- **`pecas` 1:N `movimentacoes_estoque`**: toda entrada/baixa/reserva/
  liberação de estoque é rastreada; `os_id` é opcional porque
  movimentações do tipo `ENTRADA` (reposição de estoque) não estão
  associadas a nenhuma OS.
- **`users` isolada**: tabela de autenticação do staff (`ADMIN`/
  `ATENDENTE`/`MECANICO`), sem FK para o restante do modelo — é
  intencionalmente desacoplada do domínio de negócio (ver RFC 0003: `User`
  é auth interno por email/senha; `Cliente` passa a autenticar via CPF pela
  Lambda, mas `Cliente` já existia como entidade de negócio, não como
  registro de autenticação).

## Por que RDS PostgreSQL (não migra motor)

Ver RFC 0002 (`docs/rfc/0002-banco-de-dados-gerenciado.md`) para a análise
completa de alternativas. Resumo: o modelo acima já é 100% relacional com
FKs, enums e `@unique` constraints usados ativamente pelas regras de
negócio (ex.: `veiculos.placa` único, `orcamentos.os_id` único para
garantir 1:1) — trocar de motor exigiria reescrever schema e migrations
sem nenhum ganho para o escopo do projeto. RDS PostgreSQL mantém o mesmo
motor usado via Prisma desde a Fase 2.
