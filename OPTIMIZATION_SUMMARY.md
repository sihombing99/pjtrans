# PJTrans Website – Optimization Changes

Date: 2025-08-22

## Applied Changes
1. **Image path fix**: Rewrote `src="image/...` to `src="/image/...` across app routes so Next.js serves images from `/public/image` correctly.
   - Files changed: 1

2. **Route SEO metadata**: Injected `export const metadata` into route pages missing it for better SEO titles/descriptions.
   - Files changed: 5
   - Routes: app, harga, kontak, layanan, tentang

3. **Robots & Sitemap**:
   - Added `app/robots.txt` and `app/sitemap.ts` to help indexing and search engines.

4. **Repository hygiene**:
   - Added `.gitignore` to exclude build artifacts and dependencies.

## Next Suggestions (not auto-applied)
- Add JSON-LD organization schema in `app/layout.tsx`.
- Audit unused dependencies in `package.json` (e.g., duplicate carousel libs).
- Run Lighthouse and image compression for large assets in `/public/image`.

