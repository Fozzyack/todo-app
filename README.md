# ToDoList Platform

ToDoList is a dual-stack productivity workspace: a neo-brutalist Next.js client paired with an ASP.NET Core API. Use it to manage tasks, experiment with automation workflows, and showcase stylized auth and landing experiences.

## Features
- **Terminal-inspired UI** – Tailwind-powered visuals with brutal shadows and accent glows for landing, login, and signup flows.
- **Task orchestration** – ASP.NET Core backend ready for entity tracking via Entity Framework Core migrations.
- **Container-ready** – Root-level `docker-compose.yaml` wires both services for full-stack bootstrap.

## Project Structure
```
frontend/        # Next.js 15 app (pages under app/, shared UI in components/)
backend/Backend/ # ASP.NET Core API with EF Core context, models, migrations
docker-compose.yaml
AGENTS.md        # contributor playbook for automation agents
CLAUDE.md        # supplemental agent notes (if applicable)
```

## Getting Started
1. **Prerequisites**
   - Node.js 20+ (or Bun, recommended), .NET 8 SDK, Docker (optional).
2. **Install dependencies**
   ```bash
   cd frontend
   bun install
   ```
3. **Start the frontend**
   ```bash
   bun run dev
   ```
   Visit `http://localhost:3000` for the landing and auth flows.
4. **Start the backend**
   ```bash
   cd backend/Backend
   dotnet restore
   dotnet ef database update   # apply migrations (requires configured connection)
   dotnet run
   ```
   The API listens on `http://localhost:5000` by default.
5. **Full stack via Docker** (optional)
   ```bash
   docker compose up --build
   ```

## Scripts & Commands
- Frontend builds: `bun run build` (production bundles) and `bun run start` (serve compiled output).
- Backend builds/tests: `dotnet build`, `dotnet test` (once tests exist).
- Database migrations: `dotnet ef migrations add <Name>` from `backend/Backend`.

## Contributing
- Review `AGENTS.md` for coding style, testing expectations, and PR etiquette.
- Keep commits focused (`feat: update login console layout`) and include screenshots for UI-facing changes.
- Run linters/formatters (`bunx prettier --write`) and backend checks before pushing.

## Roadmap
- Seed EF Core models with sample task data.
- Implement authentication handshake between client and server.
- Add automated test suites (Vitest/Playwright for frontend, xUnit for backend).

## License
This repository currently ships without a formal license. Confirm licensing with the maintainers before reuse or distribution.
