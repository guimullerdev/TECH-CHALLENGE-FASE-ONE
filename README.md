# Oficina Mecânica API

Backend REST API for a mechanical workshop management system. Manages service orders (Ordens de Serviço), clients, vehicles, services, and parts/supplies.

**Stack:** NestJS · Prisma 7 · PostgreSQL · Docker · Yarn

> **Note:** The Docker setup in this repository is configured for **development only** (hot-reload, source volume mount). It is not intended for production use.

---

## Requirements

- [Docker](https://docs.docker.com/get-docker/) + Docker Compose
- [Node.js 24+](https://nodejs.org/) (for local development without Docker)
- [Yarn](https://yarnpkg.com/) (for local development without Docker)

---

## Running with Docker (development)

### 1. Copy the environment file

```bash
cp .env.example .env
```

The defaults in `.env.example` work out of the box with the Docker Compose setup. No changes needed.

### 2. Start the stack

```bash
docker compose up
```

This will:
- Start a PostgreSQL 15 database on port `5432`
- Build and start the NestJS app on port `3000` with **hot-reload** enabled
- Automatically run pending database migrations on startup

The API will be available at **http://localhost:3000**

### 3. Stop the stack

```bash
docker compose down
```

To also remove the database volume (wipes all data):

```bash
docker compose down -v
```

---

## Running locally (without Docker)

### 1. Prerequisites

Make sure a PostgreSQL instance is running and accessible. You can use the Docker DB only:

```bash
docker compose up -d db
```

### 2. Copy the environment file

```bash
cp .env.example .env
```

The default `.env` points to `localhost:5432` which matches the Docker DB above.

### 3. Install dependencies

```bash
yarn install
```

> `prisma generate` runs automatically via the `postinstall` script.

### 4. Run database migrations

```bash
npx prisma migrate deploy
```

### 5. Start the development server

```bash
yarn start:dev
```

The API will be available at **http://localhost:3000**

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | Full PostgreSQL connection string | `postgresql://oficina:oficina@localhost:5432/oficina_db` |
| `DB_USER` | PostgreSQL user (used by Docker Compose) | `oficina` |
| `DB_PASSWORD` | PostgreSQL password (used by Docker Compose) | `oficina` |
| `DB_NAME` | PostgreSQL database name (used by Docker Compose) | `oficina_db` |
| `JWT_SECRET` | Secret key for JWT signing | `dev_secret_key` |
| `JWT_EXPIRES_IN` | JWT expiration time | `8h` |
| `NODE_ENV` | Application environment | `development` |

---

## Available Scripts

| Command | Description |
|---|---|
| `yarn start:dev` | Start with hot-reload (development) |
| `yarn build` | Compile TypeScript to `dist/` |
| `yarn start:prod` | Start compiled production build |
| `yarn test` | Run unit tests |
| `yarn test:cov` | Run tests with coverage report |
| `yarn test:e2e` | Run end-to-end tests |
| `yarn lint` | Lint and auto-fix source files |
| `yarn generate` | Scaffold a new module with Plop |

---

## API Documentation

Swagger UI is available at **http://localhost:3000/api** when the app is running.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/clientes` | Create a customer |
| `GET` | `/clientes` | List customers |
| `GET` | `/clientes/:id` | Get a customer by ID |
| `PUT` | `/clientes/:id` | Update a customer |
| `PATCH` | `/clientes/:id/desativar` | Deactivate a customer |
| `DELETE` | `/clientes/:id` | Remove a customer |
| `POST` | `/veiculos` | Register a vehicle |
| `GET` | `/veiculos` | List vehicles |
| `GET` | `/veiculos/:id` | Get a vehicle by ID |
| `PUT` | `/veiculos/:id` | Update a vehicle |
| `PATCH` | `/veiculos/:id/desativar` | Deactivate a vehicle |
| `DELETE` | `/veiculos/:id` | Remove a vehicle |
| `POST` | `/servicos` | Create a service |
| `GET` | `/servicos` | List services |
| `GET` | `/servicos/:id` | Get a service by ID |
| `PUT` | `/servicos/:id` | Update a service |
| `PATCH` | `/servicos/:id/desativar` | Deactivate a service |
| `POST` | `/pecas` | Create a part |
| `GET` | `/pecas` | List parts |
| `GET` | `/pecas/:id` | Get a part by ID |
| `PUT` | `/pecas/:id` | Update a part |
| `PATCH` | `/pecas/:id/desativar` | Deactivate a part |
| `POST` | `/os` | Create a service order |
| `GET` | `/os` | List service orders |
| `GET` | `/os/:id` | Get a service order by ID |
| `PATCH` | `/os/:id/iniciar-diagnostico` | Start diagnosis |
| `PATCH` | `/os/:id/concluir-diagnostico` | Finish diagnosis (generates budget) |
| `PATCH` | `/os/:id/iniciar-execucao` | Start execution |
| `PATCH` | `/os/:id/finalizar-execucao` | Finish execution |
| `PATCH` | `/os/:id/entregar` | Mark as delivered |
| `POST` | `/os/:id/servicos` | Add service to order |
| `DELETE` | `/os/:id/servicos/:itemId` | Remove service from order |
| `PATCH` | `/os/:id/servicos/:itemId/realizar` | Record service execution |
| `POST` | `/os/:id/pecas` | Add part to order |
| `DELETE` | `/os/:id/pecas/:itemId` | Remove part from order |
| `PATCH` | `/os/:id/pecas/:itemId/utilizar` | Mark part as used |
| `GET` | `/os/metricas/tempo-medio` | Average completion time metrics |
| `GET` | `/os/consulta` | Public order status lookup |

---

## Project Structure

```
src/
├── modules/
│   ├── customers/          # Client management
│   │   ├── domain/         # Entity, repository interface
│   │   ├── application/    # Use cases, DTOs
│   │   ├── infrastructure/ # Prisma repository, mapper
│   │   └── presentation/   # Controller
│   ├── vehicles/           # Vehicle management
│   ├── services/           # Workshop services catalog
│   ├── parts/              # Parts & supplies + stock
│   └── service-orders/     # OS lifecycle management
├── prisma/                 # PrismaService (database connection)
└── shared/                 # Base classes (Entity, ValueObject, Repository)
prisma/
├── schema.prisma           # Database schema
└── migrations/             # Migration history
```

The architecture follows **Domain-Driven Design (DDD)**:
- **Domain** — entities, value objects, repository interfaces
- **Application** — use cases, DTOs
- **Infrastructure** — Prisma repositories, mappers
- **Presentation** — NestJS controllers

---

## Database Migrations

Create a new migration after changing `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name describe_your_change
```

Apply existing migrations (used in Docker entrypoint):

```bash
npx prisma migrate deploy
```

Open Prisma Studio (database GUI):

```bash
npx prisma studio
```
