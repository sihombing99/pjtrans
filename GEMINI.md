# GEMINI.md

## Project Overview
PJTrans (PT Portama Jaya Transportasi) is a web application for car rental services. It is built using **Next.js (App Router)**, **Prisma ORM**, **PostgreSQL**, and **NextAuth.js**. The application features a public-facing website for showcasing vehicles and services, along with an administrative dashboard for managing fleet data and slideshows.

### Key Technologies
- **Framework:** Next.js 15+ (React 19)
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL with Prisma
- **Authentication:** NextAuth.js (Session-based, protecting `/admin` routes)
- **Styling:** Tailwind CSS 4.0, Shadcn UI (Radix UI)
- **State Management:** React Hooks, Form management with React Hook Form & Zod
- **Deployment:** Docker & Docker Compose support

## Building and Running

### Prerequisites
- Node.js 20+
- PostgreSQL (for local development)
- Docker & Docker Compose (optional)

### Local Development
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pjtrans?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   ```
3. **Database Migration:**
   ```bash
   npx prisma migrate dev
   ```
4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

### Docker Deployment
1. **Run with Docker Compose:**
   ```bash
   docker compose up --build
   ```
   This starts the application, a PostgreSQL database, and Adminer (database management tool).
   - App: `http://localhost:3000`
   - Adminer: `http://localhost:8080`

## Project Structure
- `app/`: Next.js pages, layouts, and API routes.
  - `admin/`: Protected administrative dashboard.
  - `api/`: Backend API endpoints (e.g., `mobil/`, `auth/`, `slideshow/`).
- `components/`: Reusable React components.
  - `ui/`: Core UI primitives (Shadcn UI).
- `prisma/`: Database schema (`schema.prisma`) and migrations.
- `public/`: Static assets and uploaded files (`/uploads`).
- `lib/`: Utility functions and Prisma client initialization.
- `hooks/`: Custom React hooks.

## Development Conventions

### Coding Standards
- **Components:** Use functional components with TypeScript.
- **Styling:** Use Tailwind CSS utility classes. Prefer `cn()` utility for conditional classes.
- **API Routes:** Use Next.js Route Handlers. Ensure proper error handling and status codes.
- **Data Fetching:** Use Server Components for initial data fetching where possible.
- **Form Handling:** Use `react-hook-form` with `zod` for validation.

### Database Workflow
- Always update `prisma/schema.prisma` for data model changes.
- Use `npx prisma migrate dev` to apply changes and generate the Prisma client.
- The `postinstall` script automatically runs `prisma generate`.

### Security
- The `/admin` route is protected by `middleware.ts` using NextAuth.
- Sensitive credentials should only be stored in `.env`.
- File uploads are stored in `public/uploads` with unique timestamps to prevent collisions.

### UI Guidelines
- Follow the Shadcn UI patterns established in `components/ui/`.
- Maintain a consistent look and feel using the CSS variables in `app/globals.css`.
