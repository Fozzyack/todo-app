# Repository Guidelines

This document provides guidelines for contributing to the ToDoList full-stack application. Follow these conventions to maintain consistency across the codebase.

## Project Structure & Module Organization

### Frontend (`frontend/`)
- **Pages**: `frontend/app/` contains Next.js App Router pages (`/login`, `/sign-in`, `/app`)
- **API Routes**: `frontend/app/api/` houses authentication proxy endpoints
- **Components**: `frontend/components/` contains reusable React components
  - `Card.tsx` - Base neobrutalist card layout primitive
  - `AddTodoPanel.tsx` - Todo creation form (desktop panel)
  - `MobileAddTodoTrigger.tsx` - Mobile modal trigger for todo form
  - `LogoutButton.tsx` - Server action logout button
- **Utilities**: `frontend/lib/` contains helper functions
  - `BackendURL.ts` - Backend URL configuration helper
  - `GetCookie.ts` - ASP.NET Core cookie utilities
- **Constants**: `frontend/constants/` stores page-specific constants (e.g., `landing.ts`)
- **Styles**: `frontend/app/globals.css` centralizes Tailwind theme tokens and neobrutalist design system
- **Tests**: Reserve `frontend/tests/` for future test coverage

### Backend (`backend/Backend/`)
- **Entry Point**: `Program.cs` configures services, middleware, and application startup
- **Database**: `AppDbContext.cs` extends `IdentityDbContext<User>` with `Todos` DbSet
- **Controllers**: `backend/Backend/Controllers/` contains API endpoints
  - `TodosController.cs` - Todo CRUD operations with user-scoped access
  - `BaseController.cs` - Base controller with `[ApiController]` and routing
- **Models**: `backend/Backend/Models/` contains entity models
  - `Todo.cs` - Todo entity with due date, completion status, and timestamps
  - `User.cs` - `IdentityUser` extension for ASP.NET Core Identity
- **Requests**: `backend/Backend/Requests/` contains request DTOs
  - `CreateTodoRequest.cs` - DTO for todo creation with validation
- **Migrations**: `backend/Backend/Migrations/` stores EF Core migration files
- **Configuration**: `appsettings.json` (base), `appsettings.Development.json` (local overrides)
- **Tests**: Reserve `backend/Tests/` for future xUnit test coverage

### Infrastructure
- **Docker**: `docker-compose.yaml` orchestrates PostgreSQL database on port 5000
- **Documentation**: 
  - `README.md` - Full-stack overview and setup
  - `AGENTS.md` - This file (contribution guidelines)
  - `CLAUDE.md` - AI assistant guidance

## Build, Test, and Development Commands

### Frontend Development
```bash
cd frontend

# Install dependencies (uses Bun by default)
bun install

# Start development server with Turbopack hot reload
bun run dev              # Opens at http://localhost:3000

# Build for production
bun run build

# Start production server
bun run start

# Format code with Prettier
bunx prettier --write .
```

### Backend Development
```bash
cd backend/Backend

# Restore dependencies
dotnet restore

# Build project
dotnet build

# Apply database migrations
dotnet ef database update

# Start API server (HTTPS enabled)
dotnet run               # Opens at https://localhost:5141

# Create new migration
dotnet ef migrations add <MigrationName>
```

### Database Management
```bash
# Start PostgreSQL container
docker compose up -d

# Stop PostgreSQL container
docker compose down

# Stop and remove volumes (data loss!)
docker compose down -v
```

### Full Stack Setup
```bash
# 1. Start database
docker compose up -d

# 2. Apply migrations
cd backend/Backend && dotnet ef database update

# 3. Start backend
dotnet run &

# 4. Start frontend
cd ../../frontend && bun run dev
```

## Coding Style & Naming Conventions

### TypeScript/React (Frontend)
- **Components**: Functional components with TypeScript types
- **File Naming**: PascalCase for component files (e.g., `AddTodoPanel.tsx`)
- **Indentation**: 4 spaces
- **Styling**: Use Tailwind utility classes from `globals.css` theme
  - Prefer composition over custom CSS
  - Follow neobrutalist patterns: 4px borders, brutal shadows, uppercase tracking
- **State Management**: 
  - Use `useState` for local component state
  - Server actions for mutations (see `LogoutButton.tsx`)
  - Controlled forms with error/loading states
- **Formatting**: Run `bunx prettier --write .` before committing
- **Encoding**: Keep files ASCII unless Unicode is explicitly needed

### C# (.NET Backend)
- **Naming Conventions**: 
  - PascalCase for classes, methods, properties
  - camelCase for local variables and parameters
  - Suffix async methods with `Async` (e.g., `GetAllTodosAsync`)
- **Controllers**: Keep thin by delegating logic to services or DbContext
- **Models**: Use data annotations for validation (`[Required]`, `[ForeignKey]`)
- **Async/Await**: Use async methods for all I/O operations (database, HTTP)
- **Error Handling**: Return appropriate HTTP status codes (`200`, `201`, `401`, `404`)
- **Indentation**: 4 spaces (default .NET style)

### Shared Conventions
- **Comments**: Minimal; prefer self-documenting code
- **Magic Numbers**: Use named constants or enums
- **Security**: Never log or expose secrets, keys, or passwords

## Testing Guidelines

### Frontend Testing (Future)
- **Location**: `frontend/tests/*.test.ts(x)`
- **Framework**: Vitest for unit tests, Playwright for E2E tests
- **Commands**: 
  - `bun run test` for unit tests
  - `bun run test:e2e` for end-to-end tests
- **Coverage**: Test user flows (login, registration, todo CRUD), form validation, API error handling

### Backend Testing (Future)
- **Location**: `backend/Tests/`
- **Framework**: xUnit with EF Core in-memory database or test containers
- **Commands**: `dotnet test`
- **Coverage**: Test controller actions, authentication/authorization, database operations
- **Data**: Use seeded test data or mocks for repeatable tests

### Pre-PR Checklist
- Run relevant test suites (when available)
- Verify builds succeed (`bun run build`, `dotnet build`)
- Test authentication flows manually
- Call out any intentional test gaps in PR description

## Commit & Pull Request Guidelines

### Commit Messages
- **Format**: `<type>: <description>` (present tense, lowercase)
- **Types**: 
  - `feat`: New feature
  - `fix`: Bug fix
  - `refactor`: Code restructuring without behavior change
  - `style`: Formatting, design system changes
  - `docs`: Documentation updates
  - `chore`: Build, dependencies, configuration
- **Examples**: 
  - `feat: add todo deletion endpoint`
  - `fix: correct cookie forwarding in login proxy`
  - `refactor: extract todo form to reusable component`
  - `style: update neobrutalist shadow offsets`
  - `docs: update backend README with API endpoints`

### Pull Request Requirements
- **Summary**: Concise description of changes and motivation
- **Screenshots**: Include for UI/UX changes (desktop + mobile)
- **Linked Issues**: Reference related issues or tickets
- **Test Evidence**: Call out manual testing performed (auth flows, CRUD operations)
- **Migration Steps**: Document EF Core migrations if schema changed
- **Rebase**: Rebase onto `main` before merging
- **Build Verification**: Confirm `bun run build` and `dotnet build` succeed after resolving conflicts

## Security & Configuration Tips

### Environment Variables
- **Frontend**: Store in `.env.local` (never commit)
  - `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- **Backend**: Store in `appsettings.Development.json` for local development
  - `ConnectionStrings:DefaultConnection` - PostgreSQL connection string
- **Production**: Use environment variables or secret managers (Azure Key Vault, AWS Secrets Manager, etc.)

### Secrets Management
- **Never commit**: API keys, database passwords, JWT secrets, connection strings with credentials
- **Development**: Use `appsettings.Development.json` (add to `.gitignore` if it contains real secrets)
- **Production**: Inject via environment variables or secret managers

### Docker & Ports
- **PostgreSQL**: Port `5000` (mapped from container's `5432`)
- **Backend**: Port `5141` (HTTPS)
- **Frontend**: Port `3000`
- **Update**: If ports change, update:
  - `docker-compose.yaml`
  - `appsettings.Development.json`
  - `.env.local`
  - All README files

### Database Migrations
1. **After Schema Changes**: 
   - Run `dotnet ef migrations add <DescriptiveName>`
   - Review generated migration files
   - Apply with `dotnet ef database update`
2. **Verify End-to-End**: 
   - Run `docker compose up --build`
   - Confirm backend starts without errors
   - Test full authentication and CRUD flows
3. **Document in PR**: Call out migration steps and any manual data updates needed

### CORS Configuration
- **Development**: Frontend origin `http://localhost:3000` is configured in `Program.cs`
- **Production**: Update CORS policy to match production frontend URL
- **Credentials**: `AllowCredentials()` enables cookie-based authentication

## Design System Guidelines

### Neobrutalist Theme
Follow the terminal-inspired design patterns:

**Visual Style**:
- Heavy 4px borders on all interactive elements
- Brutal offset shadows (4px, 8px, 12px)
- Dark navy backgrounds (`#0a1628`, `#050d1a`)
- Bright accent colors (orange `#fb923c`, blue `#60a5fa`, purple `#c084fc`)

**Typography**:
- Monospace fonts (`font-mono`) for labels and technical text
- Uppercase with wide tracking (`tracking-[0.3em]`)
- Terminal-style labels: `[SYSTEM::STATUS]`, `[AUTH_CONSOLE]`

**Components**:
- Use `Card` component for consistent layout primitives
- Hover states with translate transforms (`hover:-translate-x-1 hover:-translate-y-1`)
- Focus states with colored shadows
- Disabled states with opacity (`opacity-50`)

**Responsive Design**:
- Mobile-first approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Desktop: grid layouts, side panels
- Mobile: full-width layouts, modals

Refer to `frontend/app/globals.css` for theme token reference.

## Additional Notes

### API Route Pattern
Next.js API routes in `frontend/app/api/` act as proxy layers:
1. Receive client request
2. Forward to ASP.NET backend with cookies
3. Transform Identity validation errors to simple messages
4. Return response with cookies forwarded to client

See `app/api/login/route.ts` for error handling pattern.

### Authentication Flow
1. User submits credentials on `/login` or `/sign-in`
2. Next.js API route proxies to backend Identity endpoints
3. Backend sets `.AspNetCore.Identity.Application` cookie
4. Frontend forwards cookie to client
5. Subsequent requests include cookie via `credentials: "include"`
6. Backend validates cookie and authorizes requests

### Todo Scoping
Todos are scoped to authenticated users:
- `TodosController` extracts user ID from `ClaimTypes.NameIdentifier`
- All queries filter by `UserId`
- Users can only access their own todos

## Questions or Issues?

- **Documentation**: Check `CLAUDE.md` for detailed architecture patterns
- **Setup Issues**: See root `README.md` for full-stack setup
- **API Reference**: Visit `/scalar/v1` when backend is running
