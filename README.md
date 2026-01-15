# PJTrans

Website PJTrans (PT Portama Jaya Transportasi) berbasis Next.js + Prisma + PostgreSQL.

## Prasyarat
- Node.js 20+
- PostgreSQL (untuk mode lokal), atau Docker (untuk mode compose)

## Cara Menjalankan (Lokal)
1) Install dependency:
```bash
npm install
```

2) Buat file `.env`:
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pjtrans?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="changeme-please"
```

3) Jalankan migrasi Prisma:
```bash
npx prisma migrate dev
```

4) Jalankan server dev:
```bash
npm run dev
```

Akses di `http://localhost:3000`.

## Cara Menjalankan (Docker Compose)
1) Build dan jalankan:
```bash
docker compose up --build
```

2) Akses:
- App: `http://localhost:3000`
- Adminer: `http://localhost:8080`

Login Adminer:
- System: PostgreSQL
- Server: `db`
- Username: `postgres`
- Password: `asintel123`
- Database: `pjtrans`

## Build Production (opsional)
```bash
npm run build
npm start
```

## Struktur Singkat
- `app/` halaman dan route Next.js
- `prisma/` schema dan migration
- `compose.yml` docker compose (app + postgres + adminer)
