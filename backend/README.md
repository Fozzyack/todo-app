# ToDoList Backend

ASP.NET Core 9 Web API providing authentication and todo management for the ToDoList application. Uses Entity Framework Core with PostgreSQL and ASP.NET Core Identity cookie authentication.

## Stack
- .NET 9 Web API
- Entity Framework Core 9.0.9 + Npgsql 9.0.4 provider
- ASP.NET Core Identity (cookies issued via `MapIdentityApi<User>()`)
- Scalar.AspNetCore 2.8.8 for API reference in development
- PostgreSQL (Docker container exposed on `localhost:5000`)

## Project Layout
```
backend/Backend/
├── Program.cs                      # Service + middleware configuration
├── AppDbContext.cs                 # IdentityDbContext<User> with DbSet<Todo>
├── BaseController.cs               # `[ApiController]` routed base class
├── Controllers/
│   └── TodosController.cs          # CRUD endpoints scoped to authenticated user
├── Models/
│   ├── Todos.cs                    # `Todo` entity (Guid Id, timestamps)
│   └── Users.cs                    # `User : IdentityUser`
├── Requests/
│   ├── CreateTodoRequest.cs        # Name/Description/Date payload
│   ├── UpdateTodoCompletionRequest.cs
│   └── GetTodosRequest.cs          # Defines `GetTodoRequest` projection
├── Migrations/                     # EF Core migrations history
├── appsettings.json                # Base configuration
├── appsettings.Development.json    # Local overrides (connection string, logging)
├── Backend.csproj                  # Project file and dependencies
└── Backend.http                    # Sample REST requests (VS Code REST Client)
```

## Getting Started
1. **Prerequisites**
   - .NET 9 SDK
   - PostgreSQL (recommended: `docker compose up -d` from project root)
   - `dotnet-ef` global tool for migrations (`dotnet tool install --global dotnet-ef`)

2. **Restore, build, and apply migrations**
   ```bash
   cd backend/Backend
   dotnet restore
   dotnet build
   dotnet ef database update
   ```

3. **Run the API**
   ```bash
   dotnet run
   ```
   - HTTPS endpoint: `https://localhost:5141`
   - Scalar docs (dev only): `https://localhost:5141/scalar/v1`
   - Identity endpoints: `/register`, `/login`, `/logout`
   - Todo endpoints: `/Todos`

## Configuration
- `appsettings.Development.json`
  ```json
  {
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Database=todo;Username=postgres;Password=postgres;Port=5000"
    }
  }
  ```
- CORS in `Program.cs` allows origin `http://localhost:3000` and currently whitelists the `PATCH` verb. Extend the policy if other methods (GET/POST/DELETE) are called cross-origin.
- HTTPS dev certificates must be trusted for the frontend to call the backend without warnings (`dotnet dev-certs https --trust`).

## API Endpoints
### Identity (MapIdentityApi<User>())
- `POST /register` – Create user (`{ "email": "...", "password": "..." }`)
- `POST /login?useCookies=true&useSessionCookies=true` – Authenticate and issue cookie
- `POST /logout?useCookies=true&useSessionCookies=true` – Sign out (requires cookie)

### Todos (Authenticated)
- `GET /Todos` – Returns array of `GetTodoRequest` projections filtered by `UserId`
- `POST /Todos` – Creates todo; body must include `name`, `description`, `date`
- `PATCH /Todos/{id}` – Toggles completion using `UpdateTodoCompletionRequest`
- `DELETE /Todos/{id}` – Removes todo owned by current user

Sample `Todo` response:
```json
{
  "id": "4d52ebec-1a86-4d9c-b166-c3e55a2e3fe4",
  "name": "Draft release notes",
  "description": "Outline key changes",
  "completed": false,
  "dueDate": "2025-01-31T00:00:00Z"
}
```

## Implementation Notes
- `TodosController` retrieves the authenticated user ID via `User.FindFirstValue(ClaimTypes.NameIdentifier)` and returns `Unauthorized` if absent.
- `CreateTodo` parses `Date` with `DateTime.Parse(...).ToUniversalTime()`. Ensure client sends parsable strings (frontend currently uses `toUTCString()`).
- `UpdateTodoCompletion` updates `UpdatedAt` and ensures the todo belongs to the requesting user.
- `AppDbContext` sets a default of `NOW()` for `CreatedAt`. Maintain timestamps manually when updating entities.
- Add validation attributes on DTOs whenever you introduce new fields (e.g., `[Required]`, `[StringLength]`).

## Migrations
- Generate: `dotnet ef migrations add <MigrationName>`
- Apply: `dotnet ef database update`
- Snapshot: `backend/Backend/Migrations/AppDbContextModelSnapshot.cs`
- Review generated migrations before committing to ensure they match intended schema changes.

## Troubleshooting
- **Database connection failures**: Confirm Docker container is running (`docker ps`) and that port `5000` is free.
- **CORS errors**: Expand allowed verbs/headers in `Program.cs`.
- **Unauthorized responses**: Verify cookies are forwarded (frontend must send requests with `credentials: "include"`).
- **Date parsing exceptions**: Ensure incoming payload uses a consistent format; consider switching to ISO 8601 if you control both ends.

## Related Docs
- [Root README](../README.md) – Full-stack overview
- [frontend/README.md](../frontend/README.md) – Frontend details
- [AGENTS.md](../AGENTS.md) – Agent playbook
- [CLAUDE.md](../CLAUDE.md) – Extended assistant guide
