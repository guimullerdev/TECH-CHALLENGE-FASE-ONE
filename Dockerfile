### deps stage: install production-only dependencies (cached separately from build)
FROM node:24.13.1-alpine AS deps

WORKDIR /app

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN yarn install --frozen-lockfile --production

### builder stage: install all deps (incl. dev) and compile TypeScript
FROM node:24.13.1-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

### runtime stage: lean image with only dist + production node_modules
FROM node:24.13.1-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache dos2unix

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/package.json ./

# CAs da AWS para RDS — sem elas o Prisma não abre TLS contra o banco
# gerenciado (ver src/prisma/pg-connection.ts).
COPY --from=builder /app/certs ./certs

# Config do agente New Relic. Sem este arquivo o agente sobe assim mesmo, lendo
# só as variáveis de ambiente e registrando "Unable to find configuration
# file" — e aí a exclusão de headers sensíveis, o distributed tracing e o
# encaminhamento de logs passam a depender dos defaults do agente em vez do
# que está versionado aqui (ADR 0004).
COPY --from=builder /app/newrelic.cjs ./

COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/src/main"]
