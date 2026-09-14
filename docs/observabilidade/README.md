# Observabilidade — New Relic

Dashboard ativo: **https://onenr.io/0qwykVVv1jn**

Definição versionada:
[`dashboard-newrelic.template.json`](dashboard-newrelic.template.json).

## Como importar

O arquivo é um **template**: os widgets trazem `"accountIds": [ACCOUNT_ID]`,
que precisa ser substituído pelo id da conta antes de importar. O New Relic
**não** preenche isso sozinho, e rejeita a importação com
`'accountId' or 'accountIds' can not contain: 0, null values or strings` se
o valor não for um número real.

O template é JSON inválido de propósito — assim ele falha na hora de gerar,
e não depois de colar na interface com uma mensagem obscura.

```bash
# 1. Descubra o id da conta: aparece na URL do New Relic, em
#    https://one.newrelic.com/.../accounts/SEU_ID/...
ACCOUNT_ID=1234567

# 2. Gere o JSON final
sed "s/\[ACCOUNT_ID\]/[$ACCOUNT_ID]/g" \
  docs/observabilidade/dashboard-newrelic.template.json > /tmp/dashboard.json

# 3. Confira que ficou válido
python3 -m json.tool /tmp/dashboard.json > /dev/null && echo OK
```

3. New Relic → **Dashboards** → **Import dashboard** → colar o conteúdo de
   `/tmp/dashboard.json`

## De onde vem cada dado

O PDF exige três painéis nominais. Vale saber a origem de cada um, porque
dois vêm de coisas que a aplicação emite de propósito — se alguém remover a
emissão, o painel não quebra, ele simplesmente esvazia.

| Painel exigido | Fonte | Emitido por |
|---|---|---|
| Volume diário de OS | `Log` com `req.url = '/os'` e `res.statusCode = 201` | `nestjs-pino` (automático por requisição) |
| Tempo médio por status | `Log` com `event = 'os.status.transicao'` | `OsStatusMetricsInterceptor` |
| Erros e falhas | `Log` com `event` em (`os.processamento.falha`, `requisicao.falha`) | `HttpExceptionFilter` |

### Por que o tempo médio por status precisou de código

As transições de status já eram registradas em `historicoStatus`, **mas só
no Postgres** — e o New Relic não consulta o banco da aplicação. Sem emitir
nada, esse painel ficaria permanentemente vazio.

O `OsStatusMetricsInterceptor` resolve isso: em toda rota que devolve uma
OS, ele calcula quanto tempo ela passou no status anterior
(`OrdemDeServico.duracaoUltimoStatusSegundos`, cálculo puro sobre o
histórico) e emite um log estruturado com `statusAnterior`, `statusNovo` e
`duracaoSegundos`.

Atenção: o módulo `relatorios` calcula tempo médio **por serviço**, que é
uma métrica diferente da que o PDF pede (**por status**). Reaproveitá-lo
aqui responderia à pergunta errada.

## Eventos estáveis

Os identificadores de evento são constantes exportadas e cobertas por teste:

| Constante | Valor | Onde |
|---|---|---|
| `FALHA_PROCESSAMENTO_OS` | `os.processamento.falha` | `common/filters/http-exception.filter.ts` |
| `FALHA_REQUISICAO` | `requisicao.falha` | idem |
| `EVENTO_TRANSICAO_STATUS` | `os.status.transicao` | `service-orders/presentation/interceptors/` |

São testados porque renomear um deles **não quebra nada visivelmente**: o
dashboard e o alerta continuam existindo e simplesmente param de receber
dados. O teste é o que torna essa falha barulhenta.

## Alerta de falha no processamento de OS

Condição sugerida (NRQL alert):

```sql
SELECT count(*) FROM Log WHERE event = 'os.processamento.falha'
```

Disparar acima de 0 numa janela de 5 minutos. Só 5xx chega aqui — 4xx é o
chamador errando (CPF inválido, validação) e alertar nisso geraria ruído
constante, até o alerta virar algo que todo mundo ignora.

## Pré-requisitos para os painéis terem dados

- `NEW_RELIC_ENABLED=true` e `NEW_RELIC_LICENSE_KEY` no Secret da aplicação
  (o pipeline já popula ambos)
- Agente do New Relic instalado no cluster, para os dados de CPU/memória —
  feito pelo pipeline de `oficina-infra-k8s` via Helm
- Tráfego real: em ambiente recém-criado, gerar chamadas antes de gravar o
  vídeo, senão os painéis aparecem vazios
