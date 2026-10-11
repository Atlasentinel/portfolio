# ── 1. Build du front (Vite) ─────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src
RUN npm run build

# ── 2. Image finale : uniquement le serveur Bun + le build ───────────────────
FROM oven/bun:1-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/build ./build
COPY backend/index.ts backend/package.json ./backend/
COPY --chown=bun:bun src/data ./src/data

# Le serveur ne tourne pas en root
USER bun
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3001/api/projects >/dev/null || exit 1
CMD ["bun", "run", "backend/index.ts"]
