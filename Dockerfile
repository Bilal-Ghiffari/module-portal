FROM node:24-alpine

WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "3000"]
