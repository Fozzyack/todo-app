# ToDoList Backend

ASP.NET Core 9.0 REST API providing authentication and todo management with PostgreSQL persistence.

## Tech Stack

- **Framework**: ASP.NET Core 9.0 (Web API)
- **Database**: PostgreSQL with Entity Framework Core 9.0.9
- **Authentication**: ASP.NET Core Identity with cookie authentication
- **API Documentation**: Scalar API Reference (development)
- **ORM**: Entity Framework Core with Npgsql provider

## Project Structure

- `Controllers/` - API controllers (TodoController)
- `Models/` - Entity models (User, Todo)
- `Migrations/` - EF Core database migrations
- `Program.cs` - Application entry point and service configuration
- `AppDbContext.cs` - Database context
- `appsettings.json` - Configuration (connection strings, etc.)

## Getting Started

### Prerequisites

- .NET 9.0 SDK
- PostgreSQL database

### Installation

```bash
cd Backend
dotnet restore
dotnet build
```

### Database Setup

Update connection string in `appsettings.json` or `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=todolist;Username=your_user;Password=your_password"
  }
}
```

Apply migrations:

```bash
dotnet ef database update
```

### Development

```bash
dotnet run
```

API runs at `https://localhost:5141` (or configured port).

API documentation available at `/scalar/v1` in development mode.

## API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout

### Todos
- `GET /api/todo` - List user todos
- `POST /api/todo` - Create todo
- `GET /api/todo/{id}` - Get specific todo
- `PUT /api/todo/{id}` - Update todo
- `DELETE /api/todo/{id}` - Delete todo

## Models

### Todo
- `Id` (Guid) - Unique identifier
- `Name` (string, required) - Todo title
- `Description` (string) - Optional description
- `Completed` (bool) - Completion status
- `UserId` (string, required) - Owner reference
- `CreatedAt` / `UpdatedAt` (DateTime) - Timestamps

### User
- ASP.NET Core Identity user with todo relationship

## Configuration

Configure in `appsettings.json`:
- Database connection string
- Logging levels
- CORS policies (if needed)

## Migrations

Create new migration:
```bash
dotnet ef migrations add MigrationName
```

Apply migrations:
```bash
dotnet ef database update
```
