# ToDoList Frontend

Next.js 15 application providing a secure todo management interface with authentication and a neobrutalist/terminal-inspired design system.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router and Turbopack
- **UI**: React 19.1.0, Tailwind CSS 4
- **Language**: TypeScript 5
- **Runtime**: Bun

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API route handlers (proxy to backend)
│   │   ├── login/         # Login authentication proxy
│   │   ├── logout/        # Logout proxy
│   │   └── sign-in/       # Registration proxy
│   ├── app/               # Dashboard/command center page
│   │   ├── page.tsx       # Main dashboard UI
│   │   ├── layout.tsx     # App layout wrapper
│   │   └── template.tsx   # App template
│   ├── login/             # Login page
│   │   └── page.tsx
│   ├── sign-in/           # Registration page
│   │   └── page.tsx
│   ├── globals.css        # Tailwind theme and global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   ├── AddTodoPanel.tsx           # Todo creation form
│   ├── Card.tsx                   # Base neobrutalist card component
│   ├── LogoutButton.tsx           # Server action logout button
│   └── MobileAddTodoTrigger.tsx   # Mobile modal for todo creation
├── constants/             # Static configuration
│   └── landing.ts         # Landing page copy
├── lib/                   # Utility functions
│   ├── BackendURL.ts      # Backend URL configuration helper
│   └── GetCookie.ts       # ASP.NET Core cookie utilities
├── public/               # Static assets
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Getting Started

### Prerequisites

- **Bun** installed ([bun.sh](https://bun.sh))
- **Backend API** running on `https://localhost:5141`
- **PostgreSQL** database running (via Docker Compose)

### Installation

```bash
bun install
```

### Environment Configuration

Create `.env.local` in the `frontend/` directory:

```env
NEXT_PUBLIC_BACKEND_URL=https://localhost:5141
```

### Development

```bash
bun run dev
```

Opens at [http://localhost:3000](http://localhost:3000) with hot reload enabled via Turbopack.

### Production Build

```bash
bun run build
bun run start
```

## Features

### Authentication
- Cookie-based session authentication with ASP.NET Core Identity
- Registration (`/sign-in`) and login (`/login`) pages with form validation
- Next.js API routes proxy authentication requests to backend
- Automatic error transformation from Identity validation format
- Server action logout with cookie cleanup

### Todo Management
- Dashboard command center interface (`/app`)
- Create todos with name, description, and due date
- Mobile-optimized modal for todo creation
- Desktop: side panel layout, Mobile: full-screen modal

### Design System
- Neobrutalist/terminal-inspired aesthetic
- Heavy 4px borders on all interactive elements
- Brutal offset shadows (4px, 8px, 12px)
- Monospace typography with uppercase tracking
- Terminal-style labels: `[SYSTEM::STATUS]`
- Dark navy backgrounds with bright accent colors
- Responsive grid layouts with mobile breakpoints

## Environment Variables

Create `.env.local`:

```env
# Required
NEXT_PUBLIC_BACKEND_URL=https://localhost:5141
```

The `NEXT_PUBLIC_` prefix exposes the variable to the browser. The backend URL is validated at runtime by `getBackendUrl()` in `/lib/BackendURL.ts`.

## Styling

### Theme Configuration

Global styles and Tailwind theme tokens are defined in `app/globals.css`:

**Colors**:
- `background`: `#0a1628` (navy)
- `background-dark`: `#050d1a` (darker navy)
- `primary`: `#fb923c` (orange)
- `secondary`: `#60a5fa` (blue)
- `tertiary`: `#c084fc` (purple)
- `border`: `#475569` (slate)

**Shadows** (brutal offset shadows):
- `shadow-brutal-secondary`: `8px 8px 0 0 #1e3a8a`
- `shadow-brutal-secondary-lg`: `12px 12px 0 0 #1e3a8a`
- `shadow-brutal-muted`: `8px 8px 0 0 #1e293b`
- `shadow-brutal-muted-sm`: `4px 4px 0 0 #1e293b`
- `shadow-brutal-primary`: `4px 4px 0 0 #c2410c`

### Component Patterns

**Card Component** (`components/Card.tsx`):
Base layout primitive with neobrutalist styling - 4px borders, brutal shadows, and padding.

**Form Inputs**:
- 4px borders with `border-border` color
- Uppercase placeholder text
- Focus states with colored shadows
- Monospace font for labels

**Buttons**:
- Heavy borders and brutal shadows
- Hover states with translate transforms (`-translate-x-1 -translate-y-1`)
- Uppercase tracking for emphasis
- Disabled states with opacity

## API Integration

### Backend URL Configuration

The `lib/BackendURL.ts` helper retrieves the backend URL from environment variables:

```typescript
export const getBackendUrl = () => {
    if (!backendURL) {
        throw new Error("No Backend_URL specified in environment variables");
    }
    return backendURL;
};
```

### API Route Pattern

Next.js API routes in `app/api/` act as proxy layers to the ASP.NET backend:

1. **Receive client request** with credentials/data
2. **Forward to backend** with appropriate headers and cookies
3. **Transform error responses** from Identity format to simple messages
4. **Return response** with cookies forwarded to client

Example from `/app/api/login/route.ts`:
```typescript
// Handle ASP.NET Core Identity validation errors
if (err.errors) {
    const errorMessages = Object.values(err.errors).flat().join(". ");
    return NextResponse.json({ message: errorMessages }, { status: res.status });
}
```

### Cookie Handling

Authentication cookies (`.AspNetCore.Identity.Application`) are:
- Set by backend on successful login
- Forwarded through Next.js API routes
- Included in subsequent requests with `credentials: "include"`
- Cleared on logout via server action

## Development Notes

### Code Style
- Functional React components with TypeScript
- PascalCase for component filenames
- 4-space indentation
- Tailwind utility classes (no CSS modules)
- Server components by default, `"use client"` only when needed

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Mobile: full-width layouts, modals
- Desktop: grid layouts, side panels

### Performance
- Turbopack for fast hot reload
- React Server Components for initial render
- Client components only for interactivity
- Image optimization (if images added in future)

## Related Documentation

- See [CLAUDE.md](../CLAUDE.md) for detailed architecture patterns
- See [AGENTS.md](../AGENTS.md) for contribution guidelines
- See root [README.md](../README.md) for full-stack setup
