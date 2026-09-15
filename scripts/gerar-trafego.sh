#!/usr/bin/env bash
#
# Gera tráfego contra o ambiente para os painéis do New Relic terem o que
# mostrar. Escrito para a gravação do vídeo da Fase 3: os painéis consultam
# eventos específicos, e sem tráfego real eles nascem vazios.
#
# Uso:
#   export BASE_URL=https://7eu2kz40xj.execute-api.us-east-1.amazonaws.com/prod
#   export STAFF_EMAIL=... STAFF_PASSWORD=...
#   ./scripts/gerar-trafego.sh [ciclos]
#
# Sem STAFF_EMAIL/STAFF_PASSWORD o script roda assim mesmo, só pulando o que
# exige staff (abertura de OS e transições de status). Útil para aquecer
# latência e códigos HTTP sem precisar de credencial.
#
# A senha nunca aparece em argumento de linha de comando — vem por variável
# de ambiente, para não ficar visível em `ps` nem no histórico do shell.
set -uo pipefail

BASE_URL="${BASE_URL:?defina BASE_URL com o endpoint do stage}"
CICLOS="${1:-20}"
CPF_ATIVO="${CPF_ATIVO:-69759054876}"
CPF_INATIVO="${CPF_INATIVO:-38405253149}"
CPF_INEXISTENTE="${CPF_INEXISTENTE:-11144477735}"

# Da massa de demonstração (prisma/seed-demo.sql).
OS_DO_CLIENTE="${OS_DO_CLIENTE:-dddddddd-2222-4222-8222-dddddddddddd}"
OS_ENCERRADA="${OS_ENCERRADA:-dddddddd-1111-4111-8111-dddddddddddd}"
OS_DE_OUTRO="${OS_DE_OUTRO:-dddddddd-3333-4333-8333-dddddddddddd}"
CLIENTE_ID="${CLIENTE_ID:-11111111-1111-4111-8111-111111111111}"
VEICULO_ID="${VEICULO_ID:-aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa}"

json() { python3 -c "import sys,json;print(json.load(sys.stdin).get('$1',''))" 2>/dev/null; }

chamar() { # método url [token] [body]
  local metodo="$1" url="$2" token="${3:-}" body="${4:-}"
  local args=(-s -o /dev/null -w '%{http_code}' -X "$metodo" "${BASE_URL}${url}"
              -H "x-request-id: carga-$(date +%s)-$RANDOM")
  [ -n "$token" ] && args+=(-H "authorization: Bearer $token")
  [ -n "$body" ] && args+=(-H 'content-type: application/json' -d "$body")
  curl "${args[@]}"
}

# ---------------------------------------------------------------------------
# Autenticação
# ---------------------------------------------------------------------------
echo "==> autenticando cliente por CPF"
TOKEN_CLIENTE=$(curl -s -X POST "$BASE_URL/auth/cpf" -H 'content-type: application/json' \
  -d "{\"cpf\":\"$CPF_ATIVO\"}" | json accessToken)
[ -z "$TOKEN_CLIENTE" ] && { echo "!! não obtive token de cliente — a massa foi aplicada neste ambiente?"; exit 1; }

TOKEN_STAFF=""
if [ -n "${STAFF_EMAIL:-}" ] && [ -n "${STAFF_PASSWORD:-}" ]; then
  echo "==> autenticando staff por email/senha"
  TOKEN_STAFF=$(curl -s -X POST "$BASE_URL/auth/login" -H 'content-type: application/json' \
    -d "{\"email\":\"$STAFF_EMAIL\",\"password\":\"$STAFF_PASSWORD\"}" | json accessToken)
  [ -z "$TOKEN_STAFF" ] && echo "!! login de staff falhou — seguindo sem os painéis que dependem dele"
else
  echo "-- STAFF_EMAIL/STAFF_PASSWORD não definidos: pulando abertura de OS e transições"
fi

# ---------------------------------------------------------------------------
# Ciclos
# ---------------------------------------------------------------------------
for i in $(seq 1 "$CICLOS"); do
  printf '\n== ciclo %s/%s\n' "$i" "$CICLOS"

  # Painéis de latência, códigos HTTP e rotas mais lentas: qualquer tráfego
  # serve, desde que variado.
  printf '  health=%s  os/me=%s  status=%s  acompanhamento=%s\n' \
    "$(chamar GET /health)" \
    "$(chamar GET /os/me "$TOKEN_CLIENTE")" \
    "$(chamar GET "/os/$OS_DO_CLIENTE/status" "$TOKEN_CLIENTE")" \
    "$(chamar GET "/os/$OS_ENCERRADA/acompanhamento" "$TOKEN_CLIENTE")"

  # Recusas: alimentam o painel por status HTTP e provam o isolamento.
  printf '  os-de-outro=%s  sem-token=%s  staff-only=%s  consulta-errada=%s\n' \
    "$(chamar GET "/os/$OS_DE_OUTRO/status" "$TOKEN_CLIENTE")" \
    "$(chamar GET /os/me)" \
    "$(chamar GET /os "$TOKEN_CLIENTE")" \
    "$(chamar GET "/os/consulta?numero=OS-2026-0001&documento=$CPF_INEXISTENTE")"

  # Os três desfechos da autenticação por CPF.
  printf '  cpf-inativo=%s  cpf-inexistente=%s  cpf-malformado=%s\n' \
    "$(chamar POST /auth/cpf '' "{\"cpf\":\"$CPF_INATIVO\"}")" \
    "$(chamar POST /auth/cpf '' "{\"cpf\":\"$CPF_INEXISTENTE\"}")" \
    "$(chamar POST /auth/cpf '' '{"cpf":"123"}')"

  if [ -n "$TOKEN_STAFF" ]; then
    # Painel "volume diário de OS": conta POST /os com 201.
    OS_NOVA=$(curl -s -X POST "$BASE_URL/os" -H 'content-type: application/json' \
      -H "authorization: Bearer $TOKEN_STAFF" \
      -d "{\"clienteId\":\"$CLIENTE_ID\",\"veiculoId\":\"$VEICULO_ID\",\"descricaoProblema\":\"Carga de demonstração — ciclo $i\"}" \
      | json id)

    if [ -n "$OS_NOVA" ]; then
      # Painéis "tempo médio por status" e "transições ao longo do tempo":
      # dependem do evento os.status.transicao, que só nasce de transição
      # real. O intervalo entre elas vira a duração no gráfico.
      printf '  OS criada  diagnostico=%s  ' "$(chamar PATCH "/os/$OS_NOVA/iniciar-diagnostico" "$TOKEN_STAFF")"
      sleep 3
      printf 'conclui=%s  ' "$(chamar PATCH "/os/$OS_NOVA/concluir-diagnostico" "$TOKEN_STAFF")"
      sleep 2
      printf 'execucao=%s\n' "$(chamar PATCH "/os/$OS_NOVA/iniciar-execucao" "$TOKEN_STAFF")"
    else
      echo "  !! abertura de OS não retornou id"
    fi
  fi

  sleep 2
done

echo
echo "Pronto. Os painéis levam ~1 min para refletir (harvest do agente)."
