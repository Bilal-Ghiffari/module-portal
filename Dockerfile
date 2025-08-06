# Gunakan Node.js 24.5
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build:prod

FROM node:24-alpine

WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "3000"]
