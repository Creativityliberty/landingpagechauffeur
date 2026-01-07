# Bun + Next.js | Service Layer Template

A production-ready Next.js template powered by [Bun](https://bun.com) with **Clean Architecture**.

## Architecture

```
├── core/                 # Business Logic (framework-agnostic)
│   ├── domain/           # Entities, validation rules
│   ├── application/      # Use cases / Services
│   └── ports/            # Interfaces (contracts)
│
├── infra/                # Infrastructure implementations
│   └── *.ts              # Repositories, external services
│
├── lib/                  # Dependency injection container
│   └── container.ts      # Wires dependencies
│
├── ui/                   # React components (no business logic)
│
└── app/                  # Next.js (pages, API routes)
    └── api/              # HTTP adapters only
```

## Key Principles

1. **Business logic lives in `core/`** - no Next.js, no React, no Bun APIs
2. **Routes are adapters** - they delegate to services
3. **Dependencies point inward** - core never imports from infra/app
4. **No logic in components** - UI calls API, API calls service

## Data Flow

```
UI Component → HTTP API → Service → Repository
     ↓             ↓          ↓           ↓
   React      app/api/*    core/     infra/
```

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Feature: Waitlist

The template includes a working **waitlist signup** demonstrating the Service Layer:

- **Domain Entity**: `core/domain/waitlist-entry.ts`
- **Port Interface**: `core/ports/waitlist-repository.ts`
- **Service**: `core/application/join-waitlist.ts`
- **Repository**: `infra/in-memory-waitlist-repository.ts`
- **HTTP Adapter**: `app/api/waitlist/route.ts`
- **UI Component**: `ui/waitlist-form.tsx`

## Adding a New Feature

1. Create entity in `core/domain/`
2. Define port interface in `core/ports/`
3. Implement service in `core/application/`
4. Create infrastructure implementation in `infra/`
5. Wire in `lib/container.ts`
6. Create API route in `app/api/`
7. Build UI component in `ui/`

## Why This Architecture?

If you remove Next.js tomorrow:
- `core/` remains 100% valid
- Services are reusable (CLI, MCP, agents, workers)
- Business logic survives any framework change

## Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript (strict mode)

## Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server

## Deployment

Deploy anywhere that supports Bun or Node.js:
- [Vercel](https://bun.com/docs/guides/deployment/vercel)
- [Railway](https://railway.app)
- [Fly.io](https://fly.io)

## License

MIT
# landingpagechauffeur
