#!/usr/bin/env bash
#
# Prepara o painel "tempo médio por status" para a gravação.
#
# O problema que este script resolve: `gerar-trafego.sh` cria uma OS e a leva
# do começo ao fim em segundos. A duração de cada status vira 1–4 segundos, e
# o gráfico — que mostra minutos — fica visualmente rasteiro. Duração só
# existe se a OS **ficar parada**.
#
# Por isso o trabalho é em duas fases, com uma espera humana no meio:
#
#   1. ./scripts/preparar-demo.sh semear
#        cria as OS e estaciona cada uma num status diferente
#
#   ... espere 30–60 minutos (quanto mais, mais expressivo o gráfico) ...
#
#   2. ./scripts/preparar-demo.sh avancar
#        move cada uma um passo adiante, fechando a medição
#
# Rodar `avancar` durante a gravação faz o gráfico se mexer ao vivo, que é o
# item "análise ao vivo" cobrado no desafio.
#
# Uso:
#   export BASE_URL=https://7eu2kz40xj.execute-api.us-east-1.amazonaws.com/prod
#   export STAFF_EMAIL=... STAFF_PASSWORD=...
#   ./scripts/preparar-demo.sh semear
set -uo pipefail

FASE="${1:-}"
[ "$FASE" = "semear" ] || [ "$FASE" = "avancar" ] || {
  echo "uso: $0 semear|avancar"; exit 1; }

BASE_URL="${BASE_URL:?defina BASE_URL com o endpoint do stage}"
STAFF_EMAIL="${STAFF_EMAIL:?defina STAFF_EMAIL}"
STAFF_PASSWORD="${STAFF_PASSWORD:?defina STAFF_PASSWORD}"

CLIENTE_ID="${CLIENTE_ID:-11111111-1111-4111-8111-111111111111}"
VEICULO_ID="${VEICULO_ID:-aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa}"

# Onde as OS semeadas ficam registradas entre as duas fases. Fora do git: é
# estado de uma gravação, não do projeto.
ESTADO="${ESTADO:-/tmp/oficina-demo-os.txt}"

json() { python3 -c "import sys,json;print(json.load(sys.stdin).get('$1',''))" 2>/dev/null; }

TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" -H 'content-type: application/json' \
  -d "{\"email\":\"$STAFF_EMAIL\",\"password\":\"$STAFF_PASSWORD\"}" | json accessToken)
[ -z "$TOKEN" ] && { echo "!! login de staff falhou"; exit 1; }

patch() { curl -s -o /dev/null -w '%{http_code}' -X PATCH "$BASE_URL$1" -H "authorization: Bearer $TOKEN"; }

# ---------------------------------------------------------------------------
if [ "$FASE" = "semear" ]; then
  : > "$ESTADO"
  echo "==> criando OS e estacionando cada uma num status diferente"

  # Cada linha é: <parada_em>:<quantas>. Distribuir entre status diferentes
  # faz o gráfico ter barras em todos eles, não uma só.
  for spec in "RECEBIDA:2" "EM_DIAGNOSTICO:3" "AGUARDANDO_APROVACAO:3" "APROVADA:2"; do
    parada="${spec%%:*}"; qtd="${spec##*:}"
    for _ in $(seq 1 "$qtd"); do
      OS=$(curl -s -X POST "$BASE_URL/os" -H 'content-type: application/json' \
        -H "authorization: Bearer $TOKEN" \
        -d "{\"clienteId\":\"$CLIENTE_ID\",\"veiculoId\":\"$VEICULO_ID\",\"descricaoProblema\":\"Preparação da demonstração — parada em $parada\"}" \
        | json id)
      [ -z "$OS" ] && { echo "  !! falha ao criar OS"; continue; }

      # Avança só até o ponto onde essa OS deve parar.
      case "$parada" in
        EM_DIAGNOSTICO)
          patch "/os/$OS/iniciar-diagnostico" >/dev/null ;;
        AGUARDANDO_APROVACAO)
          patch "/os/$OS/iniciar-diagnostico" >/dev/null
          patch "/os/$OS/concluir-diagnostico" >/dev/null ;;
        APROVADA)
          patch "/os/$OS/iniciar-diagnostico" >/dev/null
          patch "/os/$OS/concluir-diagnostico" >/dev/null
          ORC=$(curl -s "$BASE_URL/orcamentos/by-os/$OS" -H "authorization: Bearer $TOKEN" | json id)
          [ -n "$ORC" ] && patch "/orcamentos/$ORC/aprovar" >/dev/null ;;
      esac

      echo "$OS:$parada" >> "$ESTADO"
      echo "  $OS parada em $parada"
    done
  done

  echo
  echo "Semeadas $(wc -l < "$ESTADO" | tr -d ' ') OS, registradas em $ESTADO"
  echo "Espere 30–60 min e rode: $0 avancar"

# ---------------------------------------------------------------------------
else
  [ -s "$ESTADO" ] || { echo "!! $ESTADO vazio — rode '$0 semear' antes"; exit 1; }
  echo "==> avançando as OS semeadas (fecha a medição de duração)"

  while IFS=: read -r OS parada; do
    [ -z "$OS" ] && continue
    case "$parada" in
      RECEBIDA)
        printf '  %s  RECEBIDA → EM_DIAGNOSTICO  %s\n' "$OS" "$(patch "/os/$OS/iniciar-diagnostico")" ;;
      EM_DIAGNOSTICO)
        printf '  %s  EM_DIAGNOSTICO → AGUARDANDO_APROVACAO  %s\n' "$OS" "$(patch "/os/$OS/concluir-diagnostico")" ;;
      AGUARDANDO_APROVACAO)
        ORC=$(curl -s "$BASE_URL/orcamentos/by-os/$OS" -H "authorization: Bearer $TOKEN" | json id)
        printf '  %s  AGUARDANDO_APROVACAO → APROVADA  %s\n' "$OS" "$([ -n "$ORC" ] && patch "/orcamentos/$ORC/aprovar" || echo 'sem orçamento')" ;;
      APROVADA)
        printf '  %s  APROVADA → EM_EXECUCAO  %s\n' "$OS" "$(patch "/os/$OS/iniciar-execucao")" ;;
    esac
  done < "$ESTADO"

  echo
  echo "Pronto. O painel reflete em ~1 min."
  echo "Para uma nova rodada, rode '$0 semear' de novo."
fi
