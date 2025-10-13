# Agent Guidelines

## Quick Orientation
- ToDoList is a Bun + Next.js 15 frontend talking to an ASP.NET Core 9 backend secured with Identity cookies.
- Frontend pages live in `frontend/app/`; the authenticated dashboard (`/app`) is composed from `TodoManager`, `AddTodoPanel`, `TodoList`, and `TodoItem`.
- Backend code is under `backend/Backend/`, with `TodosController` handling CRUD via Entity Framework and `AppDbContext` inheriting `IdentityDbContext<User>`.
- PostgreSQL (via Docker) listens on host port `5000`; the backend serves HTTPS on `https://localhost:5141`.

## Build/Test Commands
- `cd frontend && bun install && bun run dev` to iterate; `bun run build` for production bundles; `bunx prettier --write .` before committing.
- `cd backend/Backend && dotnet restore && dotnet build` to prep; `dotnet run` to serve the API; `dotnet ef database update` to apply migrations.
- `docker compose up -d` starts PostgreSQL; `docker compose down` stops it (append `-v` to reset data).
- Automated tests are not wired up yet—manually verify auth (register/login/logout) and todo CRUD flows end-to-end.

## Frontend Notes
- Components follow PascalCase filenames and 4-space indentation. Add client interactivity only behind `"use client"`.
- `getBackendUrl()` in `frontend/lib/BackendURL.ts` reads `NEXT_PUBLIC_BACKEND_URL`; missing envs throw immediately.
- All fetches must include `credentials: "include"` so the Identity cookie flows through API proxies.
- `TodoList` currently paginates incomplete todos (4 per page) and refetches after completion via the `refreshToken` pattern in `TodoManager`.
- Styling relies on Tailwind utility tokens defined in `app/globals.css` (neobrutalist borders, shadows, uppercase tracking). Prefer composing those tokens to new CSS.

## Backend Notes
- Services are configured in `Program.cs`; CORS currently whitelists `http://localhost:3000` and explicitly allows `PATCH`. Extend `WithMethods(...)` if you add new verbs.
- `TodosController` maps Identity user IDs from `ClaimTypes.NameIdentifier`; always guard endpoints with these checks.
- DTOs live in `backend/Backend/Requests/` (`CreateTodoRequest`, `UpdateTodoCompletionRequest`, `GetTodoRequest`). Keep validation attributes up to date with model requirements.
- Migrations reside in `backend/Backend/Migrations/`; generate via `dotnet ef migrations add <Name>` and review for accuracy.
- Identity cookie name is `.AspNetCore.Identity.Application`. Logout deletes it via `LogoutButton` server action—mirror that behavior for new sign-out flows.

## Data Flow Reference
1. User hits `/login` or `/sign-in` in the frontend.
2. Next.js API routes proxy credentials to backend Identity endpoints and forward the `Set-Cookie`.
3. Authenticated requests from the dashboard include cookies and hit `/Todos` (GET, POST, PATCH, DELETE).
4. Backend filters todos by `UserId`, ensuring user-scoped access.

## Gotchas & Verification
- Ensure `.env.local` contains `NEXT_PUBLIC_BACKEND_URL=https://localhost:5141`; without it, the frontend throws on first request.
- HTTPS certificates for ASP.NET Core may be untrusted locally—import them or use `DOTNET_DEV_CERT_EXPORT_PASSWORD` as needed.
- If CORS blocks non-PATCH methods, align `Program.cs` with the verbs you call (GET/POST/DELETE).
- Before handing off work, run `bun run build` and `dotnet build`, then spot-check dashboard flows (create, paginate, complete todo, logout).
