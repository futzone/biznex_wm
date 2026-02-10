# Biznex WM

A full-featured warehouse management system for tracking inventory across warehouse and dealer locations, with role-based access control and bilingual support (Uzbek/Russian).

Built with Next.js, React, PostgreSQL, and Prisma.

## Features

- **Inventory tracking** — Real-time stock levels across warehouse and dealer locations with minimum stock alerts
- **Warehouse operations** — Receive from suppliers, send to dealers, and handle returns with full transactional integrity
- **Movement history** — Complete audit trail of all stock movements with filtering by type, dealer, and date range
- **Role-based access control** — Three roles (Admin, Warehouse Manager, Dealer) with scoped permissions
- **Dealer & supplier management** — Manage dealer networks, suppliers, and client relationships
- **Product catalog** — Organize products by category with search and filtering
- **Dashboard** — Key metrics, low stock alerts, and recent activity at a glance
- **Bilingual UI** — Full Uzbek and Russian language support with one-click switching
- **Dark mode** — Light and dark theme toggle
- **Responsive design** — Works on desktop and mobile

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Framework  | Next.js 16 (App Router)                       |
| Frontend   | React 19, Tailwind CSS 4, Shadcn/ui           |
| Backend    | Next.js API Routes & Server Actions            |
| Database   | PostgreSQL 16                                 |
| ORM        | Prisma 7                                      |
| Auth       | NextAuth.js (JWT strategy, credentials provider) |
| i18n       | next-intl (Uzbek, Russian)                    |
| Deployment | Docker & Docker Compose                       |

## Prerequisites

- **Node.js** 20+
- **PostgreSQL** 16+ (or use the Docker Compose setup)
- **npm**

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd biznex_wm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Database
DATABASE_URL="postgresql://postgres:changeme@localhost:5432/biznex_wm?schema=public"
PG_PASSWORD="changeme"

# NextAuth
NEXTAUTH_SECRET="change-this-to-a-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Set up the database

```bash
npm run db:migrate
npm run db:seed
```

The seed script creates sample data including test users:

| Login      | Password       | Role              |
|------------|----------------|-------------------|
| `admin`    | `admin123`     | Admin             |
| `omborchi` | `warehouse123` | Warehouse Manager |
| `dealer1`  | `dealer123`    | Dealer            |
| `dealer2`  | `dealer123`    | Dealer            |

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment

Run the full stack (app + PostgreSQL) with Docker Compose:

```bash
docker compose up -d
```

This will:
- Start a PostgreSQL 16 database with a persistent volume
- Build the Next.js app in standalone mode
- Run database migrations automatically on startup
- Expose the app on port 3000

## Available Scripts

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run dev`        | Start development server             |
| `npm run build`      | Build for production                 |
| `npm run start`      | Start production server              |
| `npm run lint`       | Run ESLint                           |
| `npm run db:migrate` | Run Prisma migrations                |
| `npm run db:seed`    | Seed the database with sample data   |
| `npm run db:studio`  | Open Prisma Studio (visual DB editor)|
| `npm run db:generate`| Regenerate Prisma client             |

## Project Structure

```
src/
├── app/
│   ├── api/                    # REST API routes
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── clients/            # Client CRUD
│   │   ├── dealers/            # Dealer CRUD
│   │   ├── suppliers/          # Supplier CRUD
│   │   ├── dashboard/          # Dashboard stats
│   │   ├── movements/          # Stock movement queries
│   │   └── warehouse/          # Receive, send, returns
│   └── [locale]/               # Internationalized pages
│       ├── (dashboard)/        # Protected dashboard routes
│       │   ├── clients/
│       │   ├── dealers/
│       │   ├── products/
│       │   ├── suppliers/
│       │   ├── users/
│       │   ├── movements/
│       │   └── warehouse/
│       └── login/              # Login page
├── components/
│   ├── layout/                 # Sidebar, header, language/theme toggles
│   ├── providers/              # Session provider
│   └── ui/                     # Shadcn/ui components
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   ├── prisma.ts               # Prisma client with connection pooling
│   ├── actions.ts              # Server actions (core business logic)
│   ├── api-helpers.ts          # API utilities
│   └── utils.ts                # General utilities
├── i18n/                       # next-intl routing & request config
├── messages/                   # Translation files (uz.json, ru.json)
└── types/                      # TypeScript type extensions
prisma/
├── schema.prisma               # Database schema
├── migrations/                 # Migration history
└── seed.ts                     # Seed script
```

## Database Schema

The core data model consists of:

- **User** — Authenticated users with roles (Admin, Warehouse Manager, Dealer)
- **Product** — Product catalog with categories and minimum stock thresholds
- **Stock** — Current inventory quantities, tracked per product and location (warehouse or dealer)
- **StockMovement** — Audit log of every receive, send, and return operation
- **Supplier** — Companies that supply products to the warehouse
- **Dealer** — Distribution partners who receive products from the warehouse
- **Client** — End customers associated with dealers

## Roles & Permissions

| Capability                | Admin | Warehouse Manager | Dealer |
|---------------------------|:-----:|:-----------------:|:------:|
| View dashboard            |   +   |         +         |   +    |
| Manage products           |   +   |         +         |   -    |
| Warehouse operations      |   +   |         +         |   -    |
| View all movements        |   +   |         +         |   -    |
| View own movements        |   +   |         +         |   +    |
| Manage dealers            |   +   |         -         |   -    |
| Manage suppliers          |   +   |         -         |   -    |
| Manage users              |   +   |         -         |   -    |
| Manage clients            |   +   |         +         |   +    |
| View own dealer stock     |   +   |         +         |   +    |

## License

All rights reserved.
