#!/bin/sh
set -e

# As migrations NÃO rodam mais aqui. A partir da Fase 3 elas são um Job de
# Kubernetes aplicado pelo pipeline antes do rollout (k8s/migration-job.yaml,
# ADR 0005): rodar no start do pod fazia cada réplica tentar migrar e, se
# falhasse, os pods entravam em CrashLoop com o rollout já em andamento.
#
# Para desenvolvimento local (docker-compose), rode a migration à mão:
#   npx prisma migrate deploy

exec "$@"
