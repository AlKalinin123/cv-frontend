# CV frontend

SPA built with **Vite 5**, **React 19**, **TypeScript**, **React Router 7**, **Redux Toolkit + RTK Query** (`@rtk-query/graphql-request-base-query`), **GraphQL Code Generator** (`typescript-rtk-query`), **MUI 9**, **react-i18next**, **React Hook Form + Zod**, and **Vitest + Testing Library**.

Folders follow **Feature-Sliced Design**: `app`, `pages`, `widgets`, `features`, `entities`, `shared` (see `src/`).

## Prerequisites

- **Node.js** 20.16+ (20.19+ recommended if you later upgrade to Vite 8).
- **npm**

## Setup

```bash
npm install
cp .env.example .env
```

Set `VITE_GRAPHQL_URL` in `.env` to your GraphQL HTTP endpoint.

## Scripts

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Vite dev server                                  |
| `npm run build`   | Typecheck + production build                      |
| `npm run preview` | Preview production build                         |
| `npm run lint`    | ESLint                                           |
| `npm run format`  | Prettier                                         |
| `npm run typecheck` | `tsc -b` only                                  |
| `npm run test`    | Vitest watch                                     |
| `npm run test:run`| Vitest single run                                |
| `npm run codegen` | GraphQL Codegen → `generated.ts` + small fixup |

## GraphQL schema and `cv-graphql`

The npm package [`cv-graphql`](https://www.npmjs.com/package/cv-graphql) ships **TypeScript types** (inputs, enums), not an SDL file. Use it next to codegen output, for example:

```ts
import type { AuthInput } from '@/shared/api/cv-types'
```

For **codegen**, either:

- keep the committed placeholder `src/shared/api/graphql/schema.graphql` and replace it with your real SDL, or  
- set `CODEGEN_SCHEMA_URL` to your endpoint (introspection) and point `schema` in `codegen.ts` at that URL.

After changing operations under `src/**/*.graphql`, run `npm run codegen`. The post-step `scripts/fix-graphql-codegen-output.mjs` adapts output for **graphql@16** (plain string documents + Vite `import.meta.hot`).

## i18n

`react-i18next` works in any React app (not Next-specific). Detection order: **localStorage** then **navigator**; manual language (your future switcher) can persist via the same `localStorage` key `i18nextLng`.

## Git hooks (Husky)

- **pre-commit**: `lint-staged` (ESLint + Prettier on staged files).  
- **pre-push**: `npm run lint` and `npm run typecheck` (blocks push if either fails).

## Dependency notes

- **`graphql-request`** is pinned to **v6** so peer dependencies align with `@graphql-codegen/typescript-rtk-query`.
- **`graphql`** stays on **v16** until the codegen + runtime story matches newer graphql-js releases.
