# Repository Guidelines

## Project Structure & Module Organization
- `frontend/` houses the Next.js UI; primary pages live in `frontend/app/`, shared components in `frontend/components/`, and landing/login constants in `frontend/constants/`.
- `frontend/app/globals.css` centralizes Tailwind tokens, while layout primitives sit in `frontend/components/Card.tsx`.
- `backend/Backend/` contains the ASP.NET Core service (`Program.cs`, `AppDbContext.cs`, `Models/`, `Migrations/`) with configuration in `appsettings*.json`.
- Reserve `frontend/tests/` and `backend/Tests/` for automated coverage; Docker orchestration starts from `docker-compose.yaml`.

## Build, Test, and Development Commands
- `cd frontend && bun install` synchronizes dependencies; `bun run dev` launches hot reload, `bun run build` creates production bundles, and `bun run start` serves the compiled app.
- `cd backend/Backend && dotnet restore && dotnet build` prepares the API; `dotnet run` starts it locally.
- `dotnet ef database update` applies migrations against the configured database.
- `docker compose up --build` rebuilds and boots the full stack with shared networking.

## Coding Style & Naming Conventions
- TypeScript: use functional components, PascalCase filenames (e.g., `CommandPanel.tsx`), 4-space indentation, and Tailwind utilities from `globals.css`.
- Run `bunx prettier --write` before commit; keep files ASCII unless the file already requires otherwise.
- C#: follow standard .NET casing, suffix async methods with `Async`, and keep controllers thin by moving data logic to `AppDbContext` or dedicated services.

## Testing Guidelines
- Frontend tests should live in `frontend/tests/*.test.ts(x)` using Vitest or Playwright; wire them to `bun run test` or `bun run test:e2e`.
- Backend coverage belongs in `backend/Tests/` with xUnit; supply seeded data or mocks so `dotnet test` runs repeatably.
- Execute relevant suites before opening a PR and call out any intentional gaps in the description.

## Commit & Pull Request Guidelines
- Write commits in present tense with focused scope (e.g., `feat: add secure login console layout`).
- Pull requests need a concise summary, UI screenshots for visual changes, linked issues or tickets, and test evidence (`dotnet test`, `bun run test`).
- Document Entity Framework migration steps when schema shifts occur, rebase onto `main`, and rerun builds after resolving conflicts.

## Security & Configuration Tips
- Store secrets in environment files or secret managers, not in the repository; use `appsettings.Development.json` for local overrides.
- Keep Docker environment variables synchronized across services and update the guide when ports or base URLs change.
- After schema changes, regenerate migrations and verify `docker compose up --build` still succeeds end-to-end.
