# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and AI assistants when working with code in this repository.

## Project Overview

ToDoList is a full-stack todo management application with ASP.NET Core Identity authentication and a terminal-inspired neobrutalist design.

**Tech Stack**:
- **Frontend**: Next.js 15.5.4 (App Router) with React 19.1.0, TypeScript 5, Tailwind CSS 4, Bun runtime
- **Backend**: ASP.NET Core 9.0 Web API with Entity Framework Core 9.0.9 and ASP.NET Core Identity
- **Database**: PostgreSQL with Npgsql 9.0.4 provider
- **Design System**: Custom neobrutalist theme with terminal-inspired UI
- **API Docs**: Scalar API Reference 2.8.8 (development mode)

**Key Features**:
- User authentication (registration, login, logout) with cookie-based sessions
- Todo CRUD operations with due dates and completion status
- User-scoped todo access (users only see their own todos)
- Responsive design with mobile-optimized modal for todo creation
- Heavy 4px borders, brutal shadows, monospace fonts, uppercase tracking

## Development Commands

### Frontend (`/frontend`)
```bash
# Install dependencies (Bun recommended)
bun install

# Development server with Turbopack hot reload
bun run dev              # Opens at http://localhost:3000

# Production build
bun run build

# Start production server
bun run start

# Format code
bunx prettier --write .
```

**Environment**: Requires `.env.local` with `NEXT_PUBLIC_BACKEND_URL=https://localhost:5141`

### Backend (`/backend/Backend`)
```bash
# Restore dependencies
dotnet restore

# Build project
dotnet build

# Run development server (HTTPS enabled)
dotnet run               # Opens at https://localhost:5141

# Apply database migrations
dotnet ef database update

# Create new migration
dotnet ef migrations add <MigrationName>
```

**Environment**: Uses `appsettings.Development.json` with PostgreSQL connection string

### Database (`/`)
```bash
# Start PostgreSQL container (port 5000)
docker compose up -d

# Stop PostgreSQL container
docker compose down

# Stop and remove volumes
docker compose down -v
```

## Architecture

### Frontend Structure

**Directory Layout**:
```
frontend/
├── app/
│   ├── api/              # Next.js API routes (proxy to backend)
│   │   ├── login/route.ts      # POST /api/login
│   │   ├── logout/route.ts     # POST /api/logout
│   │   └── sign-in/route.ts    # POST /api/sign-in
│   ├── app/              # Dashboard page
│   │   ├── page.tsx            # Main dashboard UI
│   │   ├── layout.tsx          # App layout wrapper
│   │   └── template.tsx        # App template
│   ├── login/page.tsx    # Login page
│   ├── sign-in/page.tsx  # Registration page
│   ├── globals.css       # Tailwind theme (neobrutalist tokens)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── AddTodoPanel.tsx           # Todo creation form (desktop panel)
│   ├── Card.tsx                   # Base card layout primitive
│   ├── LogoutButton.tsx           # Server action logout button
│   └── MobileAddTodoTrigger.tsx   # Mobile modal for todo form
├── lib/
│   ├── BackendURL.ts     # Backend URL helper (reads NEXT_PUBLIC_BACKEND_URL)
│   └── GetCookie.ts      # ASP.NET Core cookie utilities
└── constants/
    └── landing.ts        # Landing page copy
```

**API Route Pattern**: Next.js API routes act as proxy layers between client and ASP.NET backend.

**Flow**:
```
Client → /app/api/<endpoint>/route.ts → Backend: /<endpoint>
```

**Key Pattern**: API routes transform ASP.NET Core Identity validation errors:
- **Identity format**: `{ errors: { FieldName: ["error message"] } }`
- **Transformed format**: `{ message: "error text" }`
- **Implementation**: See `/app/api/sign-in/route.ts` and `/app/api/login/route.ts`

**Backend URL Configuration**:
- Environment variable: `NEXT_PUBLIC_BACKEND_URL` (e.g., `https://localhost:5141`)
- Helper function: `getBackendUrl()` in `/lib/BackendURL.ts`
- Throws error if not configured

**Component Patterns**:
- **Card.tsx**: Base layout primitive with 4px borders, brutal shadows, padding
- **AddTodoPanel.tsx**: Todo creation form with controlled inputs, loading states
- **MobileAddTodoTrigger.tsx**: Mobile modal trigger with overlay and click-outside-to-close
- **LogoutButton.tsx**: Server action logout with cookie cleanup

### Backend Structure

**Directory Layout**:
```
backend/Backend/
├── Controllers/
│   ├── TodosController.cs      # Todo CRUD endpoints
│   └── BaseController.cs       # Base controller with routing
├── Models/
│   ├── Todo.cs                 # Todo entity (Id, Name, Description, Completed, DueDate, UserId, CreatedAt, UpdatedAt)
│   └── User.cs                 # IdentityUser extension
├── Requests/
│   └── CreateTodoRequest.cs    # DTO for todo creation
├── Migrations/                 # EF Core migrations
├── AppDbContext.cs             # IdentityDbContext<User> with Todos DbSet
├── Program.cs                  # Service configuration and middleware pipeline
├── appsettings.json            # Base configuration (production-safe)
└── appsettings.Development.json # Local overrides (connection string)
```

**Authentication**: ASP.NET Core Identity with cookie-based sessions
- **Endpoints**: Automatically generated via `MapIdentityApi<User>()`
  - `POST /register` - Create user account
  - `POST /login?useCookies=true&useSessionCookies=true` - Authenticate and set cookie
  - `POST /logout?useCookies=true&useSessionCookies=true` - Clear cookie
- **User Model**: `Backend.Models.User` extends `IdentityUser`
- **Cookie Name**: `.AspNetCore.Identity.Application`
- **Configuration**: `AddCookie(IdentityConstants.ApplicationScheme)` in `Program.cs`

**Database Context**: `AppDbContext` extends `IdentityDbContext<User>`
- **Connection String Key**: `"DefaultConnection"` in `appsettings.Development.json`
- **Provider**: Npgsql (PostgreSQL)
- **Development Connection**: `Host=localhost;Database=todo;Username=postgres;Password=postgres;Port=5000`
- **DbSets**: `Todos` (Identity tables inherited)
- **Configuration**: `CreatedAt` default value with `HasDefaultValueSql("NOW()")`

**API Documentation**: Scalar API reference at `/scalar/v1` (development mode only)

**CORS**: Configured for `http://localhost:3000` with `AllowCredentials()` to enable cookie-based auth

**Middleware Pipeline**:
1. OpenAPI/Scalar (development only)
2. HTTPS redirection
3. CORS
4. Authentication/Authorization (implicit via Identity)
5. Identity API endpoints (`MapIdentityApi<User>()`)
6. Controllers

**Todo Access Control**: 
- Todos scoped to authenticated users via `UserId` foreign key
- `TodosController` extracts user ID from `ClaimTypes.NameIdentifier`
- All queries filter by `UserId` to ensure users only access their own todos

### Design System (Tailwind CSS v4)

**Theme Tokens** (defined in `/frontend/app/globals.css`):

**Colors** (use as `bg-<name>` or `text-<name>`):
- `background`: `#0a1628` (navy)
- `background-dark`: `#050d1a` (darker navy)
- `primary`: `#fb923c` (orange)
- `secondary`: `#60a5fa` (blue)
- `tertiary`: `#c084fc` (purple)
- `border`: `#475569` (slate)
- `border-dark`: `#334155` (darker slate)

**Shadows** (use as `shadow-<name>`):
- `shadow-brutal-secondary`: `8px 8px 0 0 #1e3a8a`
- `shadow-brutal-secondary-lg`: `12px 12px 0 0 #1e3a8a`
- `shadow-brutal-secondary-sm`: `6px 6px 0 0 #1e3a8a`
- `shadow-brutal-muted`: `8px 8px 0 0 #1e293b`
- `shadow-brutal-muted-sm`: `4px 4px 0 0 #1e293b`
- `shadow-brutal-muted-lg`: `12px 12px 0 0 #1e293b`
- `shadow-brutal-primary`: `4px 4px 0 0 #c2410c`
- `shadow-brutal-primary-lg`: `8px 8px 0 0 #c2410c`

**Neobrutalist Style Characteristics**:
- Heavy 4px borders (`border-4`)
- Brutal offset shadows (4px, 8px, 12px offsets)
- Monospace fonts (`font-mono`)
- Uppercase text with wide tracking (`tracking-[0.3em]` to `tracking-[0.45em]`)
- Terminal-style labels in brackets: `[SYSTEM::READY]`, `[AUTH_CONSOLE]`, `[FOCUS_MODE]`
- Dark navy backgrounds with bright accent colors
- Hover states with translate transforms (`hover:-translate-x-1 hover:-translate-y-1`)

**Responsive Design**:
- Mobile-first approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Desktop: grid layouts (`grid-cols-12`), side panels
- Mobile: full-width layouts, modals

## Important Patterns

### Error Handling with ASP.NET Identity

When working with Identity API endpoints in Next.js API routes, always handle the validation problem format:

```typescript
if (!res.ok) {
    const err = await res.json();

    // Handle Identity validation errors
    if (err.errors) {
        // Extract all error messages from validation problem details
        const errorMessages = Object.values(err.errors).flat().join(". ");
        return NextResponse.json({ message: errorMessages }, { status: res.status });
    }

    // Handle other errors
    return NextResponse.json(
        { message: err.message || err.title || "Operation failed" },
        { status: res.status }
    );
}
```

See `/app/api/login/route.ts` and `/app/api/sign-in/route.ts` for full implementation.

### Cookie Handling Pattern

**Login Flow** (`/app/api/login/route.ts`):
```typescript
// Forward login request to backend
const res = await fetch(
    `${getBackendUrl()}/login?useCookies=true&useSessionCookies=true`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    }
);

// Extract cookie from response
const cookie = res.headers.get("set-cookie");

// Forward cookie to client
return NextResponse.json(
    { msg: "success" },
    { headers: { "set-cookie": cookie } }
);
```

**Authenticated Requests** (`/components/AddTodoPanel.tsx`):
```typescript
const res = await fetch(`${getBackendUrl()}/Todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",  // Include cookies in request
    body: JSON.stringify({ name, description, date }),
});
```

**Logout Flow** (`/components/LogoutButton.tsx`):
- Uses server action with `cookies()` to access cookie store
- Forwards cookie to backend `/logout` endpoint
- Deletes cookie from client
- Redirects to `/login`

### Form State Management Pattern

Authentication forms (`/app/login/page.tsx`, `/app/sign-in/page.tsx`) use controlled components:

```typescript
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [error, setError] = useState<string>("");
const [loading, setLoading] = useState<boolean>(false);

const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");  // Clear error on input change
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        window.location.href = "/app";
    } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
        setLoading(false);
    }
};
```

**Error Display**:
```tsx
{error && (
    <div className="border-4 border-rose-500 bg-rose-500/10 px-4 py-3 font-mono text-xs uppercase text-rose-400 shadow-brutal-muted-sm">
        <span className="font-black">[ERROR] </span>
        {error}
    </div>
)}
```

**Loading State**:
```tsx
<button
    type="submit"
    disabled={loading}
    className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
    {loading ? "Authenticating..." : "Initiate Access"}
</button>
```

### Page Layout Pattern

Main pages (`/app/login/page.tsx`, `/app/sign-in/page.tsx`) use consistent two-column layout:

```tsx
<main className="relative isolate min-h-dvh overflow-hidden bg-background text-slate-200">
    {/* Background gradients with blur effects */}
    <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute -top-32 left-1/3 h-[420px] w-[420px] bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[15%] h-80 w-80 bg-tertiary/20 blur-3xl" />
    </div>

    {/* Content grid */}
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center px-6 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            {/* Left: Hero content */}
            <section className="space-y-8 text-center lg:text-left">
                {/* ... */}
            </section>

            {/* Right: Form card */}
            <Card className="border-secondary bg-background-dark/85 shadow-brutal-secondary-lg">
                {/* ... */}
            </Card>
        </div>
    </div>
</main>
```

### Todo CRUD Pattern

**Create Todo** (`/components/AddTodoPanel.tsx`):
- POST to `/Todos` with `credentials: "include"`
- Body: `{ name, description, date }` (date as ISO string)
- Backend converts date to UTC via `DateTime.Parse(request.Date).ToUniversalTime()`
- Returns `201 Created` with created todo

**Get Todos** (not yet implemented in frontend):
- GET to `/Todos` with `credentials: "include"`
- Backend filters by `UserId` from claims
- Returns array of todos

**Delete Todo** (not yet implemented in frontend):
- DELETE to `/Todos/{id}` with `credentials: "include"`
- Backend verifies ownership via user ID
- Returns `200 OK` on success, `404 Not Found` if not found

## Database Migrations

### Migration History
1. `20251004071322_init` - Initial Identity schema (Users, Roles, Claims, etc.)
2. `20251006160755_AddTodo` - Add Todo entity (initial version)
3. `20251006162227_AddTodos` - Update Todos schema
4. `20251011143711_TodoUpdate` - Add DueDate, CreatedAt, UpdatedAt fields

### Creating New Migrations

When modifying entity models:

1. **Update model** in `/backend/Backend/Models/` (e.g., `Todo.cs`, `User.cs`)
2. **Create migration**:
   ```bash
   cd backend/Backend
   dotnet ef migrations add <DescriptiveName>
   ```
3. **Review generated migration** in `/Migrations/` directory
4. **Apply migration**:
   ```bash
   dotnet ef database update
   ```
5. **Verify end-to-end**:
   ```bash
   docker compose up --build
   dotnet run
   ```

### Migration Tips
- Use descriptive names: `AddDueDateToTodo`, `CreateUserPreferencesTable`
- Review generated SQL in migration files
- Test rollback: `dotnet ef database update <PreviousMigrationName>`
- Document breaking changes in PR description

## Environment Variables

### Frontend (`.env.local` in `/frontend/`)

```env
# Required: Backend API URL
NEXT_PUBLIC_BACKEND_URL=https://localhost:5141
```

**Usage**: 
- Accessed via `process.env.NEXT_PUBLIC_BACKEND_URL`
- Helper function: `getBackendUrl()` in `/lib/BackendURL.ts`
- Throws error if not set

### Backend (`appsettings.Development.json` in `/backend/Backend/`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=todo;Username=postgres;Password=postgres;Port=5000"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

**Note**: Port `5000` matches Docker Compose PostgreSQL port mapping.

### Production Configuration
- Use environment variables or secret managers (Azure Key Vault, AWS Secrets Manager)
- Never commit secrets to the repository
- Override connection strings, API keys, JWT secrets via environment variables

## API Endpoints

### Authentication (ASP.NET Core Identity)
- `POST /register` - Create user account
  - Body: `{ "email": "user@example.com", "password": "Password123!" }`
  - Returns: `200 OK` on success, `400 Bad Request` with validation errors
- `POST /login?useCookies=true&useSessionCookies=true` - Authenticate user
  - Body: `{ "email": "user@example.com", "password": "Password123!" }`
  - Returns: `200 OK` with `Set-Cookie` header, `401 Unauthorized` on invalid credentials
- `POST /logout?useCookies=true&useSessionCookies=true` - Sign out user
  - Requires: Authentication cookie
  - Returns: `200 OK`

### Todos (Requires Authentication)
- `GET /Todos` - Get all todos for authenticated user
  - Returns: `200 OK` with array of todo objects
- `POST /Todos` - Create new todo
  - Body: `{ "name": "Task name", "description": "Details", "date": "2025-12-31" }`
  - Returns: `201 Created` with created todo, `401 Unauthorized` if not authenticated
- `DELETE /Todos/{id}` - Delete specific todo
  - Returns: `200 OK`, `404 Not Found` if not found, `401 Unauthorized` if not authenticated

## Project Structure

```
/
├── frontend/                # Next.js 15 application
│   ├── app/                # App Router pages and layouts
│   │   ├── api/            # Next.js API routes (proxy to backend)
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── sign-in/route.ts
│   │   ├── app/            # Dashboard page
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── template.tsx
│   │   ├── login/page.tsx  # Login page
│   │   ├── sign-in/page.tsx # Registration page
│   │   ├── globals.css     # Tailwind theme
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/         # Reusable components
│   │   ├── AddTodoPanel.tsx
│   │   ├── Card.tsx
│   │   ├── LogoutButton.tsx
│   │   └── MobileAddTodoTrigger.tsx
│   ├── lib/               # Utilities
│   │   ├── BackendURL.ts
│   │   └── GetCookie.ts
│   ├── constants/         # Static configuration
│   │   └── landing.ts
│   ├── public/            # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── backend/Backend/       # ASP.NET Core 9 API
│   ├── Controllers/       # API endpoints
│   │   ├── TodosController.cs
│   │   └── BaseController.cs
│   ├── Models/           # Entity models
│   │   ├── Todo.cs
│   │   └── User.cs
│   ├── Requests/         # Request DTOs
│   │   └── CreateTodoRequest.cs
│   ├── Migrations/       # EF Core migrations
│   ├── AppDbContext.cs   # Database context
│   ├── Program.cs        # App entry point
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   └── Backend.csproj
├── docker-compose.yaml    # PostgreSQL container
├── AGENTS.md             # Repository contribution guidelines
├── CLAUDE.md             # This file (AI assistant guidance)
└── README.md             # Full-stack setup and overview
```

## Common Tasks

### Adding a New Todo Property
1. Update `Todo.cs` in `/backend/Backend/Models/`
2. Create migration: `dotnet ef migrations add Add<PropertyName>ToTodo`
3. Apply migration: `dotnet ef database update`
4. Update `CreateTodoRequest.cs` if property is required for creation
5. Update frontend form in `/components/AddTodoPanel.tsx`

### Adding a New API Endpoint
1. Add method to `TodosController.cs` or create new controller inheriting from `BaseController`
2. Use `User.FindFirstValue(ClaimTypes.NameIdentifier)` to get authenticated user ID
3. Return appropriate HTTP status codes (`200`, `201`, `401`, `404`)
4. Add corresponding frontend API call with `credentials: "include"`

### Adding a New Page
1. Create page in `/frontend/app/<route>/page.tsx`
2. Follow existing layout pattern (background gradients, two-column grid)
3. Use `Card` component for consistent styling
4. Apply neobrutalist theme tokens from `globals.css`

### Updating the Design System
1. Edit theme tokens in `/frontend/app/globals.css`
2. Follow naming convention: `--color-<name>` for colors, `--shadow-<name>` for shadows
3. Use tokens in components: `bg-<name>`, `text-<name>`, `shadow-<name>`
4. Test responsive design at mobile (`md:`) and desktop (`lg:`) breakpoints

## Testing & Debugging

### Frontend Debugging
- Check browser console for errors
- Verify `NEXT_PUBLIC_BACKEND_URL` is set in `.env.local`
- Inspect Network tab for API requests/responses
- Check cookies in Application/Storage tab

### Backend Debugging
- View Scalar API docs at `/scalar/v1`
- Check logs in terminal for request/response details
- Verify PostgreSQL is running: `docker ps`
- Test connection string: `psql -h localhost -p 5000 -U postgres -d todo`

### Common Issues
- **401 Unauthorized**: Check cookies are included (`credentials: "include"`)
- **CORS errors**: Verify CORS policy in `Program.cs` matches frontend origin
- **Connection refused**: Ensure PostgreSQL is running and port 5000 is accessible
- **Migration errors**: Check `dotnet ef` tools are installed globally

## Additional Resources

- **Contribution Guidelines**: See [AGENTS.md](AGENTS.md)
- **Setup Guide**: See root [README.md](README.md)
- **Frontend README**: See [frontend/README.md](frontend/README.md)
- **Backend README**: See [backend/README.md](backend/README.md)
