# Lendsqr

A Dashboard built to sort of replicate lendsqrs admin dashboard,for managing users: login, user list with filters, and user details.

## Tech stack

- **React 19** + **TypeScript** + **Vite 7**
- **React Router** for routing
- **Sass** for styles
- **Jest** + **ts-jest** for tests

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (or npm / yarn)

## Setup

```bash
pnpm install
```

Optional: add `VITE_DEMO_PASSWORD=yourpassword` to a `.env` file if you want a custom demo login password (default is `password123`).

## Scripts

| Command   | Description              |
| --------- | -------------------------|
| `pnpm dev`    | Start dev server          |
| `pnpm build`  | Type-check and build      |
| `pnpm preview`| Preview production build  |
| `pnpm test`   | Run Jest tests            |
| `pnpm lint`   | Run ESLint                |

## Demo login

- **Email:** any user email from the generated list (e.g. `admin@lendsqr.com` for the first user)
- **Password:** `password123` (or the value in `.env` as `VITE_DEMO_PASSWORD`)

User data is generated with [@faker-js/faker](https://fakerjs.dev/) and stored in `localStorage` on first load.
