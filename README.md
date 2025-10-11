# ToDoList

A modern full-stack todo list application with user authentication, built with Next.js and ASP.NET Core.

## Tech Stack

**Frontend**
- Next.js 15 with TypeScript
- Tailwind CSS for styling
- Bun runtime

**Backend**
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server / PostgreSQL

## Features

- User authentication (login/sign-in)
- Todo list management (CRUD operations)
- Modern, responsive UI with Tailwind CSS
- Docker containerization for easy deployment
- RESTful API architecture

## Project Structure

```
├── frontend/              # Next.js application
│   ├── app/              # App router pages & API routes
│   │   ├── api/          # Next.js API routes (auth)
│   │   ├── app/          # Main application pages
│   │   ├── login/        # Login page
│   │   └── sign-in/      # Sign-in page
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions
│   └── constants/        # Static configuration
├── backend/              # ASP.NET Core API
│   └── Backend/
│       ├── Controllers/  # API endpoints
│       ├── Models/       # Data models (Users, Todos)
│       ├── Migrations/   # EF Core migrations
│       └── Program.cs    # Application entry point
└── docker-compose.yaml   # Docker orchestration
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- Docker & Docker Compose (optional)

### Local Development

#### Frontend Setup

```bash
cd frontend
bun install
bun run dev
```

The frontend will be available at `http://localhost:3000`

#### Backend Setup

```bash
cd backend/Backend
dotnet restore
dotnet build
dotnet ef database update
dotnet run
```

The API will be available at `http://localhost:5000`

### Docker Setup

Run both frontend and backend together:

```bash
docker compose up --build
```

## Development Commands

### Frontend

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bunx prettier --write .  # Format code
```

### Backend

```bash
dotnet run                      # Start API server
dotnet build                    # Build project
dotnet test                     # Run tests
dotnet ef migrations add <Name> # Create new migration
dotnet ef database update       # Apply migrations
```

## Configuration

- Frontend environment variables: Create `.env.local` in `frontend/` directory
- Backend configuration: Edit `appsettings.json` or `appsettings.Development.json`
- Database connection string: Configure in `appsettings.json`

## Contributing

See [AGENTS.md](AGENTS.md) for detailed guidelines on:
- Code style and conventions
- Testing requirements
- Pull request process
- Commit message format

## License

MIT
