
FROM node:24-alpine3.21
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY package.json bun.lock ./
RUN npm install --verbose
COPY . .

RUN npm run build --verbose
EXPOSE 3000
CMD ["npm", "run", "start"]
