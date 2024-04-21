FROM node:20-alpine

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY . .

RUN corepack enable
RUN corepack prepare pnpm@latest-8 --activate
RUN chown -R node /app
USER node
RUN pnpm install --frozen-lockfile --prod

EXPOSE $PORT

CMD ["pnpm", "start"]
