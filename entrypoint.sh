#!/bin/sh
set -e

# Pastikan kepemilikan benar jika folder dimount dari host sebagai root
chown -R nextjs:nodejs /app/.next 2>/dev/null || true
chown -R nextjs:nodejs /app/public/uploads 2>/dev/null || true

# Pastikan minimal permission write
chmod -R u+rwX,g+rwX /app/.next /app/public/uploads 2>/dev/null || true

# Jalankan perintah utama sebagai user non-root
exec su-exec nextjs "$@"
