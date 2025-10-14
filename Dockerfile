# 1) Install deps (cacheable)
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --force --no-audit --prefer-offline; else npm install --force --no-audit; fi

# 2) Build (generate Prisma client & next build)
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
# tools minimal untuk runtime dan penurunan hak akses
RUN apk add --no-cache libc6-compat su-exec
# buat user non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# copy output & asset
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# --- penting: siapkan folder yang akan ditulis saat runtime ---
# 1) Cache next/image
RUN mkdir -p /app/.next/cache/images
# 2) Uploads publik
RUN mkdir -p /app/public/uploads

# berikan kepemilikan ke user non-root
RUN chown -R nextjs:nodejs /app

# (opsional tapi berguna) beri group-write agar aman di berbagai environment
RUN chmod -R 775 /app/.next /app/public/uploads

# entrypoint untuk memperbaiki permission saat ada bind-mount dari host
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "server.js"]
