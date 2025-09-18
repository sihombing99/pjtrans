# 1) Install deps (cacheable)
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
# Copy hanya file yang pengaruhi dependency cache
COPY package.json package-lock.json* ./
# Jika ada lockfile -> npm ci, kalau tidak -> npm install
RUN if [ -f package-lock.json ]; then npm ci --force --no-audit --prefer-offline; else npm install --force --no-audit; fi

# 2) Build (termasuk generate Prisma client & next build)
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Prisma client (pastikan schema ada)
RUN npx prisma generate
# Build Next (standalone)
RUN npm run build

# 3) Runtime minimal
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# User non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# Copy assets & standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]
