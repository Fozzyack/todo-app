# ToDoList Frontend

Next.js 15 (App Router) client for the ToDoList platform. Built with React 19, Tailwind CSS 4, and Bun, it delivers a terminal-inspired, neobrutalist todo experience backed by ASP.NET Core Identity cookies.

## Key Technologies
- Next.js 15.5.4 (Turbopack dev server, React Server Components)
- React 19 + TypeScript 5
- Tailwind CSS 4 with custom theme tokens in `app/globals.css`
- Bun runtime for scripts and package management

## Structure
```
frontend/
├── app/
│   ├── api/                       # Next.js API routes forwarding to backend
│   │   ├── login/route.ts         # POST /api/login → POST /login
│   │   ├── logout/route.ts        # POST /api/logout → POST /logout
│   │   └── sign-in/route.ts       # POST /api/sign-in → POST /register
│   ├── app/                       # Authenticated dashboard
│   │   ├── layout.tsx             # Dashboard shell
│   │   ├── page.tsx               # Command center UI
│   │   └── template.tsx           # Route-level loading shell
│   ├── login/page.tsx             # Login form
│   ├── sign-in/page.tsx           # Registration form
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Landing page
│   └── globals.css                # Tailwind theme + global styles
├── components/
│   ├── Card.tsx                   # Base neobrutalist surface (4px borders)
│   ├── AddTodoPanel.tsx           # Todo creation form (POST /Todos)
│   ├── TodoManager.tsx            # Coordinates refresh between form and list
│   ├── TodoList.tsx               # Fetches/paginates active todos (4 per page)
│   ├── TodoItem.tsx               # Todo card with `[DONE]` completion CTA
│   ├── MobileAddTodoTrigger.tsx   # Full-screen modal trigger for mobile
│   └── LogoutButton.tsx           # Server action; calls backend logout and clears cookie
├── constants/landing.ts           # Landing page copy + terminal mock
├── lib/
│   ├── BackendURL.ts              # Reads `NEXT_PUBLIC_BACKEND_URL`
│   └── GetCookie.ts               # Helper for `.AspNetCore.Identity.Application`
└── README.md                      # This file
```

## Environment Setup
1. Ensure the backend is running at `https://localhost:5141`.
2. Create `.env.local` in `frontend/`:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://localhost:5141
   ```
   `getBackendUrl()` throws if this variable is missing.

## Commands
```bash
bun install        # Install dependencies
bun run dev        # Start Turbopack dev server (http://localhost:3000)
bun run build      # Create production build
bun run start      # Serve production build
bunx prettier --write .  # Format source files
```

## Runtime Behavior
- `TodoManager` stores a `refreshToken` counter. Creating a todo increments it, causing `TodoList` to refetch and reset pagination.
- `TodoList` filters out completed todos client-side and paginates the remainder (4 items per page). Completed items disappear from the list.
- `TodoItem` marks todos complete by issuing `PATCH /Todos/:id` with `credentials: "include"`.
- API routes handle Identity validation errors by flattening them into a single `message` string for UI display.
- `LogoutButton` executes a server action that forwards the Identity cookie to `POST /logout`, deletes it locally, and redirects to `/login`.

## Design System
- Heavy 4px borders, brutal offset shadows, and monospace uppercase labels (`tracking-[0.3em]`) defined in `globals.css`.
- Color palette: navy backgrounds (`--color-background`, `--color-background-dark`) with bright accents (`--color-primary`, `--color-secondary`, `--color-tertiary`).
- Mobile: `MobileAddTodoTrigger` renders the form inside a full-screen modal; desktop shows `AddTodoPanel` inline.

## Tips for New Work
- Favor server components; add `"use client"` only when state or browser APIs are required.
- Reuse `Card` for new surfaces to maintain visual consistency.
- Always call backend routes with `credentials: "include"` to carry the Identity cookie.
- Update `types/index.d.ts` if you expand the `Todo` interface consumed by the dashboard.
- Run `bun run build` before handing off to catch type or bundling errors.
