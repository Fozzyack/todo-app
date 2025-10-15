FROM oven/bun:1 AS base
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# When building undo these. However for now, building will not be done on production
# COPY package.json bun.lock ./
# RUN bun install --frozen-lockfile

COPY . .

# RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
