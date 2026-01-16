# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Nuxt 4** application configured to run with **Bun** as the JavaScript runtime. The project includes a comprehensive testing setup with both unit/integration tests (Vitest) and end-to-end tests (Playwright), containerization via Docker, and ESLint for code quality.

## Package Manager

**This project uses Bun**, not npm/yarn/pnpm. Always use `bun` commands:
- `bun install` - Install dependencies
- `bun --bun run <script>` - Run package.json scripts
- `bun add <package>` - Add new dependencies
- `bun remove <package>` - Remove dependencies

## Common Commands

### Development
```bash
bun --bun run dev          # Start dev server at http://localhost:3000
```

### Building
```bash
bun run build        # Build for production
bun run preview      # Preview production build locally
bun run generate     # Generate static site (SSG)
```

### Testing

The project uses a **multi-project Vitest configuration** separating unit and Nuxt-specific tests:

```bash
# Run all tests (unit + Nuxt component tests)
bun run test

# Watch mode (auto-rerun on file changes)
bun run test:watch

# Run only unit tests (test/unit/*.test.ts)
bun run test:unit

# Run only Nuxt component/integration tests (test/nuxt/*.test.ts)
bun run test:nuxt

# Run E2E tests with Playwright
bun run test:e2e

# Run E2E tests with Playwright UI
bun run test:e2e:ui
```

**Running specific test files:**
```bash
# Run specific unit test
bun run test test/unit/example.test.ts

# Run specific Nuxt test
bun run test test/nuxt/component.test.ts

# Run specific E2E test
bun run test:e2e tests/example.spec.ts
```

### Linting
```bash
# Lint code (uses @nuxt/eslint)
npx eslint .

# Auto-fix linting issues
npx eslint . --fix
```

### Docker

```bash
# Build Docker image
docker build -t test-docker .

# Run container
docker run -p 3000:3000 test-docker
```

## Project Architecture

### Testing Structure

This project has a **three-tier testing strategy**:

1. **Unit Tests** (`test/unit/`)
   - Environment: Node.js
   - Use for: Pure functions, utilities, business logic
   - Framework: Vitest with standard Node environment
   - Example: `test/unit/example.test.ts`

2. **Nuxt Component Tests** (`test/nuxt/`)
   - Environment: Nuxt + happy-dom
   - Use for: Vue components, composables, Nuxt-specific features
   - Framework: Vitest with `@nuxt/test-utils`
   - Utilities: `mountSuspended` for component mounting
   - Example: `test/nuxt/component.test.ts`

3. **E2E Tests** (`tests/`)
   - Environment: Chromium browser via Playwright
   - Use for: Full user workflows, page interactions
   - Framework: Playwright with `@nuxt/test-utils/playwright`
   - Utilities: `goto`, `page` fixtures
   - Example: `tests/example.spec.ts`

### Configuration Files

- `vitest.config.ts` - Multi-project Vitest setup (unit + nuxt projects)
- `playwright.config.ts` - E2E test configuration
- `nuxt.config.ts` - Nuxt app configuration with modules: @nuxt/eslint, @nuxt/test-utils, @nuxt/ui
- `eslint.config.mjs` - ESLint setup (extends Nuxt's config)
- `Dockerfile` - Multi-stage Docker build using Bun runtime

### Application Structure

- `app/` - Nuxt 4 application directory
  - `app/app.vue` - Root application component
- `test/unit/` - Unit tests (Node environment)
- `test/nuxt/` - Nuxt component/integration tests (Nuxt environment)
- `tests/` - Playwright E2E tests
- `.nuxt/` - Generated Nuxt build artifacts (gitignored)
- `public/` - Static assets served at root

## Writing Tests

### Unit Tests (Pure Logic)
```typescript
import { describe, expect, it } from 'vitest'

describe('my utility', () => {
  it('should work', () => {
    expect(myFunction()).toBe(expectedValue)
  })
})
```

### Nuxt Component Tests
```typescript
import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', async () => {
    const component = await mountSuspended(MyComponent, {
      props: { /* ... */ }
    })
    expect(component.text()).toContain('expected text')
  })
})
```

### E2E Tests
```typescript
import { expect, test } from '@nuxt/test-utils/playwright'

test('user can navigate', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await expect(page).toHaveTitle(/Expected Title/)
})
```

## Nuxt 4 Notes

- Uses `app/` directory instead of legacy `pages/` (unless pages is explicitly added)
- Modules are configured in `nuxt.config.ts`
- Auto-imports enabled for components, composables, and utilities
- `@nuxt/ui` provides UI components (likely Nuxt UI v4)
- TypeScript support with `.nuxt/tsconfig.json` generated during `postinstall`

## Docker Notes

The Dockerfile uses a **multi-stage build**:
- Base stage: Sets up Bun runtime and working directory
- Install stage: Caches dependencies separately (dev + prod)
- Prerelease stage: Copies source and node_modules
- Final image runs dev server (can be modified for production)

Uncomment lines 25-27 in Dockerfile to enable tests and production build during Docker build.
