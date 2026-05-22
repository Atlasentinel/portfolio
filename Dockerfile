FROM oven/bun:1-alpine
WORKDIR /app

COPY build/    ./build/
COPY backend/  ./backend/
COPY src/data/ ./src/data/

WORKDIR /app/backend
EXPOSE 3001
CMD ["bun", "run", "index.ts"]
