FROM node:24.13.1-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

# Copy manifests + prisma schema before install so postinstall (prisma generate) works
COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN yarn install

# Copy the rest of the source
COPY . .

EXPOSE 3000

COPY entrypoint.sh /entrypoint.sh
RUN apk add --no-cache dos2unix && dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node_modules/.bin/nest", "start", "--watch"]
