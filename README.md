# Nuxt 4 + Bun + Docker

A Nuxt 4 application with Bun runtime, fully containerized with Docker.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (version with Docker Compose v2.22+)

That's it! You don't need to install Node.js, Bun, or any dependencies locally.

## Development with Docker (Recommended)

### Quick Start

```bash
# Start development server with hot reload
docker compose watch
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Alternative: Background Mode

```bash
# Start in background
docker compose up --watch -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### What happens automatically?

- ✅ **Code changes** (`app/`, `components/`, etc.) → Hot reload (instant)
- ✅ **Config changes** (`nuxt.config.ts`, etc.) → Container restart (~5s)
- ✅ **Dependencies changes** (`package.json`, `bun.lock`) → Image rebuild (~1-2min)

### Adding Dependencies

Just use Bun normally while `docker compose watch` is running:

```bash
# Add dependency
bun add axios

# Docker will automatically rebuild and restart
```

### Useful Commands

```bash
# Run tests inside container
docker compose exec app bun run test

# Run specific test
docker compose exec app bun run test:unit

# Access container shell
docker compose exec app sh

# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose watch
```

## Local Development (Without Docker)

If you prefer to run locally without Docker:

### Setup

Make sure to install dependencies:

```bash
bun install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
