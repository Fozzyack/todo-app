# ToDoList

Modern full-stack todo application with secure authentication, a neobrutalist interface, and a fully documented ASP.NET Core API.

## Overview
- **Frontend**: Next.js 15 (App Router + Turbopack), React 19, Tailwind CSS 4, Bun runtime.
- **Backend**: ASP.NET Core 9 Web API, Entity Framework Core 9, Identity cookie auth, Scalar API docs.
- **Database**: PostgreSQL (Docker container mapped to `localhost:5000`).
- Identity cookie name: `.AspNetCore.Identity.Application`.

## Features
- Registration, login, and logout backed by ASP.NET Core Identity cookies.
- Todo CRUD with due dates, completion status, and pagination of active tasks (4 per page).
- Mobile-friendly dashboard with modal creation flow (`MobileAddTodoTrigger`).
- Terminal-inspired neobrutalist design language (4px borders, brutal shadows, uppercase tracking).
- Dockerized PostgreSQL database and OpenAPI documentation (Scalar) in development.

## Repository Structure
```
├── frontend/                       # Next.js application (Bun)
│   ├── app/                        # App Router pages, layouts, API routes
│   │   ├── api/                    # Auth proxy routes (login/logout/sign-in)
│   │   ├── app/                    # Authenticated dashboard
│   │   ├── login/                  # Login page
│   │   ├── sign-in/                # Registration page
│   │   ├── globals.css             # Tailwind tokens + theme
│   │   └── layout.tsx              # Root layout
│   ├── components/                 # Reusable React components
│   │   ├── Card.tsx                # Base neobrutalist surface
│   │   ├── AddTodoPanel.tsx        # Todo creation form
│   │   ├── TodoList.tsx            # Paginated active todos
│   │   ├── TodoItem.tsx            # Individual todo card with completion CTA
│   │   ├── TodoManager.tsx         # Coordinates create/list refresh cycle
│   │   └── MobileAddTodoTrigger.tsx# Mobile modal launcher
│   ├── lib/                        # Helpers (`BackendURL`, `GetCookie`)
│   └── constants/                  # Landing page copy (`landing.ts`)
├── backend/
│   └── Backend/
│       ├── Program.cs              # Service & middleware configuration
│       ├── AppDbContext.cs         # IdentityDbContext with `DbSet<Todo>`
│       ├── BaseController.cs       # `[ApiController]` base route
│       ├── Controllers/TodosController.cs
│       ├── Models/Todos.cs         # `Todo` entity (Guid Id, timestamps)
│       ├── Models/Users.cs         # `User : IdentityUser`
│       ├── Requests/CreateTodoRequest.cs
│       ├── Requests/UpdateTodoCompletionRequest.cs
│       ├── Requests/GetTodosRequest.cs        # Defines `GetTodoRequest` projection
│       └── Migrations/                         # EF Core migrations
├── docker-compose.yaml             # PostgreSQL service definition
├── AGENTS.md                       # Agent playbook
└── CLAUDE.md                       # Expanded assistant guidance
```

## Quick Start
1. **Start PostgreSQL**
   ```bash
   docker compose up -d
   ```
   Exposes PostgreSQL on `localhost:5000` (container `5432`).

2. **Run the backend**
   ```bash
   cd backend/Backend
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
   - HTTPS API at `https://localhost:5141`
   - Scalar docs at `/scalar/v1`
   - Identity endpoints at `/register`, `/login`, `/logout`
   - Todo endpoints at `/Todos`

3. **Configure & start the frontend**
   ```bash
   cd ../../frontend
   echo "NEXT_PUBLIC_BACKEND_URL=https://localhost:5141" > .env.local
   bun install
   bun run dev
   ```
   App is served at `http://localhost:3000`. All fetches use `credentials: "include"`; trust the ASP.NET dev certificate if prompted.

## Command Reference
- Frontend: `bun run dev`, `bun run build`, `bun run start`, `bunx prettier --write .`
- Backend: `dotnet run`, `dotnet build`, `dotnet ef migrations add <Name>`, `dotnet ef database update`
- Database: `docker compose up -d`, `docker compose down`, `docker compose down -v`

## Configuration
- **Frontend `.env.local`**
  ```env
  NEXT_PUBLIC_BACKEND_URL=https://localhost:5141
  ```
- **Backend `appsettings.Development.json`**
  ```json
  {
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Database=todo;Username=postgres;Password=postgres;Port=5000"
    }
  }
  ```
- Identity cookie name: `.AspNetCore.Identity.Application`
- CORS (`Program.cs`) currently allows origin `http://localhost:3000` and explicitly whitelists `PATCH`. Add additional verbs if you introduce new cross-origin calls.

## API Cheat Sheet
| Method | Endpoint                         | Description                              |
|--------|----------------------------------|------------------------------------------|
| POST   | `/register`                      | Create new user (Identity)               |
| POST   | `/login?useCookies=true&useSessionCookies=true` | Authenticate and issue cookie            |
| POST   | `/logout?useCookies=true&useSessionCookies=true`| Sign out and clear cookie                |
| GET    | `/Todos`                         | Fetch todos for authenticated user       |
| POST   | `/Todos`                         | Create todo (`name`, `description`, `date`) |
| PATCH  | `/Todos/{id}`                    | Update completion (`completed`)          |
| DELETE | `/Todos/{id}`                    | Delete todo                              |

`GET /Todos` returns an array of `GetTodoRequest` objects:
```json
{
  "id": "f5e2b3d9-05b5-4a6a-9b25-4d2cfe0b3a57",
  "name": "Draft release notes",
  "description": "Outline key changes",
  "completed": false,
  "dueDate": "2025-01-31T00:00:00Z"
}
```

## Architecture Notes
- Next.js API routes (`app/api/login|logout|sign-in/route.ts`) proxy credentials to the backend and normalize Identity error payloads (flattened `message` field).
- `TodoManager` holds a `refreshToken` counter that lets `AddTodoPanel` trigger refetches in `TodoList`.
- `TodoList` currently filters completed todos client-side and paginates the remaining active tasks.
- Backend uses `ClaimTypes.NameIdentifier` to scope todos to the authenticated user.
- `AppDbContext` extends `IdentityDbContext<User>` and adds `DbSet<Todo>` with default `CreatedAt` timestamps.

## Design System Highlights
- 4px borders and brutal offset shadows (`shadow-brutal-*` tokens) on every interactive element.
- Monospace typography with uppercase tracking (`tracking-[0.3em]`).
- Dark navy backgrounds (`#0a1628` / `#050d1a`) with bright accent colors (`#fb923c`, `#60a5fa`, `#c084fc`).
- Responsive layout: mobile uses `MobileAddTodoTrigger` modal; desktop shows `AddTodoPanel` beside the list.

## Troubleshooting
- **CORS issues**: Expand `WithMethods(...)` in `Program.cs` for any verbs beyond `PATCH`.
- **Cookie missing**: Ensure frontend fetches include `credentials: "include"` and `.env.local` points to the HTTPS backend.
- **SSL warnings**: Trust the ASP.NET development certificate (`dotnet dev-certs https --trust`).
- **Database errors**: Confirm Docker container is running (`docker ps`) and connection string matches `localhost:5000`.

## Related Documentation
- `frontend/README.md` – Frontend implementation details
- `backend/README.md` – Backend implementation details
- `AGENTS.md` – Quick agent playbook
- `CLAUDE.md` – In-depth assistant guide
