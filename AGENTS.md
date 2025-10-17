# Agent Guidelines

## Quick Orientation
- ToDoList: Bun + Next.js 15 frontend (React 19, Tailwind 4) talking to ASP.NET Core 9 backend (EF Core, Identity cookies, PostgreSQL).
- Frontend: `frontend/app/` has pages/layouts; `frontend/components/` has reusable UI (Card, TodoItem, TodoList, etc.).
- Backend: `backend/Backend/` has Controllers, Models, Requests/DTOs, Migrations, AppDbContext (IdentityDbContext<User>).
- PostgreSQL via Docker on `localhost:5000`; backend HTTPS on `https://localhost:5141`; frontend on `http://localhost:3000`.

## Build/Test Commands
- **Frontend**: `cd frontend && bun install && bun run dev` (dev), `bun run build` (prod), `bunx prettier --write .` (format).
- **Backend**: `cd backend/Backend && dotnet restore && dotnet build` (build), `dotnet run` (serve), `dotnet ef database update` (migrations).
- **Database**: `docker compose up -d` (start), `docker compose down` (stop), `docker compose down -v` (reset).
- **Pre-commit**: `bun run build` and `dotnet build` must succeed; manually test auth/CRUD flows end-to-end.
- No automated tests yet; write manual verification steps in PRs.

## Code Style
- **Formatting**: 4-space tabs, no trailing commas in TypeScript objects, Prettier config (tabWidth: 4, semi: true, singleQuote: false, trailingComma: es5).
- **TypeScript**: `strict: true`, use full type annotations; rely on `@types/*` packages. Paths alias `@/*` → root.
- **Frontend Imports**: Relative imports within `app/` and `components/`; use `@/` for cross-directory imports. Components: PascalCase filenames, `"use client"` for interactivity.
- **Backend C#**: Nullable enabled (`<Nullable>enable</Nullable>`); implicit usings (`<ImplicitUsings>enable</ImplicitUsings>`); PascalCase classes, methods, properties.
- **Naming**: Components = PascalCase; files = *.tsx/*.ts (frontend), *.cs (backend); DTOs in `Requests/`; models in `Models/`.
- **Error Handling**: Frontend: throw on missing env vars (e.g., `getBackendUrl()`). Backend: return `Unauthorized` (401), `Forbid` (403), `BadRequest` (400), `NotFound` (404).
- **Auth & Cookies**: All fetches use `credentials: "include"`. Backend guards endpoints with `ClaimTypes.NameIdentifier` checks. Identity cookie: `.AspNetCore.Identity.Application`.
- **UI/Styling**: Reuse `<Card>` component; use Tailwind tokens from `app/globals.css` (neobrutalist: 4px borders, brutal shadows, uppercase). No inline magic numbers.
- **DTOs & Validation**: Requests inherit from base class, use validation attributes. `CreateTodoRequest` = Name/Description/Date (string); `UpdateTodoCompletionRequest` = toggle Completed; `GetTodoRequest` = projection.
- **Migrations**: Generate via `dotnet ef migrations add <Name>`. Always review for accuracy and document in PRs when schemas change.

## Data Flow
1. User → `/login` or `/sign-in` (frontend).
2. Next.js API route → backend `/register`, `/login`, `/logout` (Identity endpoints).
3. Backend issues `.AspNetCore.Identity.Application` cookie; route forwards `Set-Cookie` to browser.
4. Dashboard GETs/POSTs/PATCHes/DELETEs `/Todos` with cookie via `credentials: "include"`.
5. Backend filters by `UserId` (from `ClaimTypes.NameIdentifier`); `LogoutButton` server action calls `/logout` then redirects.

## Gotchas
- Missing `.env.local` (`NEXT_PUBLIC_BACKEND_URL=https://localhost:5141`) crashes frontend immediately.
- CORS requires verb whitelist in `Program.cs` `WithMethods(...)`; untrusted HTTPS certs may need `dotnet dev-certs https --trust`.
- All CRUD requests must include `credentials: "include"` or cookie auth fails silently.
- `TodoList` filters completed items client-side; pagination/sorting may need optimization if scale grows.
