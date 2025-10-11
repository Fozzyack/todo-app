# ToDoList Frontend

Next.js 15 application providing a secure todo management interface with authentication and a brutalist design system.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router and Turbopack
- **UI**: React 19.1.0, Tailwind CSS 4
- **Language**: TypeScript 5
- **Runtime**: Bun

## Project Structure

- `app/` - Next.js app router pages and API routes
  - `app/page.tsx` - Dashboard/command center
  - `login/page.tsx` - Login page
  - `sign-in/page.tsx` - Sign-in page
  - `api/` - Authentication API routes
- `components/` - Shared React components (Card, LogoutButton)
- `constants/` - Landing page and auth constants
- `lib/` - Utilities (BackendURL, cookie management)

## Getting Started

### Prerequisites

- Bun installed
- Backend API running on `http://localhost:5141`

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

### Production Build

```bash
bun run build
bun run start
```

## Features

- User authentication with secure session management
- Todo list dashboard with command center interface
- Brutalist design system with custom Tailwind tokens
- Server-side rendering with Next.js App Router
- Cookie-based authentication integration with backend

## Environment Variables

Configure backend URL in `lib/BackendURL.ts` (defaults to `http://localhost:5141`).

## Styling

Global styles and Tailwind configuration in `app/globals.css` with custom color tokens:
- Navy backgrounds
- Accent blue and orange
- Brutal shadow system
