# ToDoList

A modern full-stack todo list application with user authentication and neobrutalist design, built with Next.js 15 and ASP.NET Core 9.

## Tech Stack

**Frontend**
- Next.js 15.5.4 with App Router and Turbopack
- React 19.1.0 with TypeScript 5
- Tailwind CSS 4 (neobrutalist design system)
- Bun runtime

**Backend**
- ASP.NET Core 9.0 Web API
- Entity Framework Core 9.0.9
- ASP.NET Core Identity (cookie authentication)
- PostgreSQL with Npgsql 9.0.4
- Scalar API Reference (development mode)

## Features

- User authentication with ASP.NET Core Identity (registration/login/logout)
- Todo list management with CRUD operations
- Due date tracking for todos
- Terminal-inspired neobrutalist UI with custom Tailwind theme
- Cookie-based session authentication
- Responsive design with mobile-optimized components
- Docker containerization for PostgreSQL
- RESTful API with automatic documentation

## Project Structure

```
├── frontend/              # Next.js 15 application
│   ├── app/              # App router pages & API routes
│   │   ├── api/          # Next.js API routes (auth proxy)
│   │   │   ├── login/    # Login proxy endpoint
│   │   │   ├── logout/   # Logout proxy endpoint
│   │   │   └── sign-in/  # Registration proxy endpoint
│   │   ├── app/          # Dashboard page (command center)
│   │   ├── login/        # Login page
│   │   └── sign-in/      # Registration page
│   ├── components/       # Reusable React components
│   │   ├── AddTodoPanel.tsx       # Todo creation form
│   │   ├── Card.tsx               # Base card layout
│   │   ├── LogoutButton.tsx       # Logout action
│   │   └── MobileAddTodoTrigger.tsx # Mobile modal trigger
│   ├── lib/              # Utility functions
│   │   ├── BackendURL.ts # Backend URL config helper
│   │   └── GetCookie.ts  # Cookie management utilities
│   └── constants/        # Static configuration
├── backend/              # ASP.NET Core 9 API
│   └── Backend/
│       ├── Controllers/  # API endpoints
│       │   └── TodosController.cs  # Todo CRUD operations
│       ├── Models/       # Entity models
│       │   ├── Todo.cs   # Todo entity with due date
│       │   └── User.cs   # IdentityUser extension
│       ├── Requests/     # Request DTOs
│       │   └── CreateTodoRequest.cs
│       ├── Migrations/   # EF Core migrations
│       ├── AppDbContext.cs        # Database context
│       ├── BaseController.cs      # Base controller
│       └── Program.cs    # Application entry point
├── docker-compose.yaml   # PostgreSQL container
├── AGENTS.md            # Repository guidelines
└── CLAUDE.md            # AI assistant guidance
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/) (for PostgreSQL)

### Local Development

#### 1. Start PostgreSQL Database

```bash
docker compose up -d
```

This starts PostgreSQL on `localhost:5000` (mapped from container port 5432).

#### 2. Backend Setup

```bash
cd backend/Backend
dotnet restore
dotnet build
dotnet ef database update
dotnet run
```

The API will be available at `https://localhost:5141` with:
- Scalar API documentation at `/scalar/v1`
- Identity endpoints at `/register`, `/login`, `/logout`
- Todo endpoints at `/Todos`

#### 3. Frontend Setup

Create `.env.local` in the `frontend/` directory:

```env
NEXT_PUBLIC_BACKEND_URL=https://localhost:5141
```

Then start the development server:

```bash
cd frontend
bun install
bun run dev
```

The frontend will be available at `http://localhost:3000`

## Development Commands

### Frontend

```bash
bun run dev          # Start development server with Turbopack
bun run build        # Build for production with Turbopack
bun run start        # Start production server
bunx prettier --write .  # Format code
```

### Backend

```bash
dotnet run                      # Start API server (HTTPS enabled)
dotnet build                    # Build project
dotnet ef migrations add <Name> # Create new migration
dotnet ef database update       # Apply migrations to database
```

### Database

```bash
docker compose up -d         # Start PostgreSQL
docker compose down          # Stop PostgreSQL
docker compose down -v       # Stop and remove volumes
```

## Configuration

### Frontend Environment Variables

Create `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_BACKEND_URL=https://localhost:5141
```

### Backend Configuration

Edit `backend/Backend/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=todo;Username=postgres;Password=postgres;Port=5000"
  }
}
```

**Note**: The PostgreSQL port is `5000` (mapped from Docker container's internal port 5432).

## API Endpoints

### Authentication (ASP.NET Core Identity)

- `POST /register` - Create new user account
- `POST /login?useCookies=true&useSessionCookies=true` - Authenticate user
- `POST /logout?useCookies=true&useSessionCookies=true` - Sign out user

### Todos

- `GET /Todos` - Get all todos for authenticated user
- `POST /Todos` - Create new todo (requires: name, description, date)
- `DELETE /Todos/{id}` - Delete specific todo

## Architecture Notes

### Authentication Flow

1. Frontend pages (`/login`, `/sign-in`) submit credentials
2. Next.js API routes (`/api/login`, `/api/sign-in`) proxy to ASP.NET backend
3. Backend uses ASP.NET Core Identity for authentication
4. Session cookies (`.AspNetCore.Identity.Application`) maintain authentication
5. Frontend forwards cookies to backend on subsequent requests

### API Error Handling

Next.js API routes transform ASP.NET Core Identity validation errors:
- Identity format: `{ errors: { FieldName: ["error message"] } }`
- Transformed: `{ message: "error text" }`

See `/app/api/login/route.ts` and `/app/api/sign-in/route.ts` for implementation.

## Design System

The frontend uses a custom neobrutalist/terminal-inspired design:

- **Colors**: Navy backgrounds (`#0a1628`), accent orange/blue/purple
- **Shadows**: Brutal offset shadows (4px, 8px, 12px)
- **Typography**: Monospace fonts with uppercase tracking
- **Borders**: Heavy 4px borders on all interactive elements
- **Labels**: Terminal-style brackets: `[SYSTEM::READY]`

See `frontend/app/globals.css` for Tailwind theme configuration.

## Contributing

See [AGENTS.md](AGENTS.md) for detailed guidelines on:
- Project structure and module organization
- Build, test, and development commands
- Code style and naming conventions
- Testing guidelines
- Commit and pull request guidelines
- Security and configuration tips

For AI assistant guidance, see [CLAUDE.md](CLAUDE.md).

## License

MIT
