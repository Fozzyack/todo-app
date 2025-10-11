# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack TODO application with a terminal/neobrutalism design aesthetic, featuring:
- **Frontend**: Next.js 15 (App Router) with React 19, TypeScript, and Tailwind CSS v4
- **Backend**: ASP.NET Core 9.0 with Entity Framework Core and ASP.NET Identity
- **Database**: PostgreSQL
- **Design System**: Custom neobrutalism theme with terminal-inspired UI

## Development Commands

### Frontend (`/frontend`)
```bash
# Install dependencies (uses Bun by default)
bun install

# Development server with Turbopack
bun run dev
# or: npm run dev

# Production build
bun run build

# Start production server
bun start
```

### Backend (`/backend/Backend`)
```bash
# Restore dependencies
dotnet restore

# Run development server (HTTPS redirection enabled)
dotnet run

# Build
dotnet build

# Apply database migrations
dotnet ef database update

# Create new migration
dotnet ef migrations add <MigrationName>
```

### Full Stack with Docker
```bash
# Start PostgreSQL database
docker compose up -d

# Stop database
docker compose down
```

## Architecture

### Frontend Structure

**API Route Pattern**: The frontend uses Next.js API routes as a proxy layer between the client and ASP.NET backend.

```
/app/api/<endpoint>/route.ts
  ↓ (fetch)
Backend: /api/<endpoint>
```

**Key Pattern**: API routes handle ASP.NET Core Identity error format conversion:
- Identity returns validation errors as `{ errors: { FieldName: ["error message"] } }`
- API routes extract and flatten these into simple `{ message: "error text" }` responses
- See `/app/api/sign-in/route.ts` for the error handling pattern

**Backend URL Configuration**:
- Managed via `BACKEND_URL` environment variable
- Helper function: `getBackendUrl()` in `/lib/BackendURL.ts`
- Throws error if not configured

**Constants Organization**:
- Page-specific constants stored in `/constants/` directory
- Example: `landing.ts` contains landing page copy and feature lists for the marketing surface

**Component Pattern**:
- Reusable components in `/components/`
- `Card.tsx` provides base styling with neobrutalism theme

### Backend Structure

**Authentication**: Uses ASP.NET Core Identity with built-in endpoints via `MapIdentityApi<User>()`
- Registration endpoint: `/register`
- Login endpoint: `/login?useCookies=true&useSessionCookies=true` (with cookie support)
- User model: `Backend.Models.User` extends `IdentityUser`
- Cookie-based authentication configured with `AddCookie(IdentityConstants.ApplicationScheme)`

**Database Context**: `AppDbContext` extends `IdentityDbContext<User>`
- Connection string key: `"DefaultConnection"` in `appsettings.json` or `appsettings.Development.json`
- Provider: Npgsql (PostgreSQL)
- Development connection string: `Host=localhost;Database=todo;Username=postgres;Password=postgres;Port=5000`

**API Documentation**: Scalar API reference available in development mode at `/scalar/v1`

**CORS & Middleware**:
- HTTPS redirection enabled via `UseHttpsRedirection()`
- Identity API endpoints mapped with `MapIdentityApi<User>()`

### Design System (Tailwind CSS v4)

**Custom Theme Variables** defined in `/frontend/app/globals.css`:

Colors follow `--color-<name>` pattern, used as `bg-<name>` or `text-<name>`:
- `navy`, `navy-dark` - Background colors
- `accent-orange`, `accent-blue`, `accent-purple` - Accent colors
- `border-slate`, `border-slate-dark` - Border colors

Shadows follow `--shadow-<name>` pattern, used as `shadow-<name>`:
- `brutal-blue`, `brutal-blue-lg`, `brutal-blue-sm`
- `brutal-slate`, `brutal-slate-lg`, `brutal-slate-sm`
- `brutal-orange`, `brutal-orange-lg`

**Neobrutalism Style Characteristics**:
- Heavy 4px borders (`border-4`)
- Brutal offset shadows (4px, 8px, 12px offsets)
- Monospace fonts (`font-mono`)
- Uppercase text with wide tracking
- Terminal-style labels in brackets: `[SYSTEM::READY]`
- Dark navy backgrounds with bright accent colors

## Important Patterns

### Error Handling with ASP.NET Identity

When working with Identity API endpoints, always handle the validation problem format:

```typescript
if (!res.ok) {
    const err = await res.json();

    // Handle Identity validation errors
    if (err.errors) {
        const errorMessages = Object.values(err.errors).flat().join(". ");
        return NextResponse.json({ message: errorMessages }, { status: res.status });
    }

    return NextResponse.json(
        { message: err.message || err.title || "Operation failed" },
        { status: res.status }
    );
}
```

### Cookie Handling Pattern

Login route handles cookie-based authentication:
```typescript
const cookie = res.headers.get("set-cookie");
return NextResponse.json(
    { msg: "success" },
    { headers: { "set-cookie": cookie } }
);
```
- Backend sets authentication cookie via Identity API
- Next.js API route forwards cookie to client
- Query params `?useCookies=true&useSessionCookies=true` enable cookie mode

### Form State Management Pattern

Authentication forms use controlled components with error/loading states:
- `error` state for displaying validation/API errors
- `loading` state for button disabled state and loading text
- Clear errors on input change for better UX
- Display errors in terminal-styled boxes with rose color scheme

### Page Layout Pattern

Main pages use consistent layout structure:
- Full-height container: `min-h-dvh` or `h-screen`
- Background gradients with blur effects using absolute positioning
- Two-column grid on desktop: left content section, right form card
- Responsive breakpoints using Tailwind's `lg:` prefix

## Database Migrations

When modifying the `User` model or adding new entities:
1. Update model in `/backend/Backend/Models/`
2. Run `dotnet ef migrations add <DescriptiveName>` from `/backend/Backend`
3. Review generated migration in `/Migrations/`
4. Apply with `dotnet ef database update`

## Environment Variables

**Frontend** requires (in `/frontend/.env.local`):
- `BACKEND_URL` - Base URL of the ASP.NET backend API (e.g., `http://localhost:5000`)

**Backend** requires (in `appsettings.Development.json`):
- `ConnectionStrings:DefaultConnection` - PostgreSQL connection string
  - Default: `Host=localhost;Database=todo;Username=postgres;Password=postgres;Port=5000`
  - Port 5000 matches docker-compose PostgreSQL mapping

## Project Structure

```
/
├── frontend/           # Next.js 15 application
│   ├── app/           # App Router pages and layouts
│   │   ├── api/       # Next.js API routes (proxy to backend)
│   │   ├── login/     # Login page
│   │   ├── sign-in/   # Sign-in page
│   │   └── app/       # Dashboard/app pages
│   ├── components/    # Reusable React components
│   ├── constants/     # Page-specific constants
│   ├── lib/          # Utility functions
│   └── public/       # Static assets
├── backend/Backend/   # ASP.NET Core 9.0 API
│   ├── Models/       # Entity models
│   ├── Migrations/   # EF Core migrations
│   ├── Program.cs    # App entry point
│   └── AppDbContext.cs # Database context
└── docker-compose.yaml # PostgreSQL container definition
```
