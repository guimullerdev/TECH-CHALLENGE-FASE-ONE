FROM node:24.13.1-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ─────────────────────────────────────────────────────────────────────────────

FROM node:24.13.1-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/main"]
