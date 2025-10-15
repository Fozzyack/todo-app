FROM oven/bun:1
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public

EXPOSE 3000

CMD ["node", "server.js"]

