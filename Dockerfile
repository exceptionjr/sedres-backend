FROM node:22 AS build
WORKDIR /usr/src/app

ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"
ENV POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/db"
ENV POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/db"

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN npm install
COPY . .
RUN npm run build


FROM node:22-alpine
WORKDIR /usr/src/app

ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"
ENV POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/db"
ENV POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/db"

COPY package*.json ./
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/prisma.config.ts ./prisma.config.ts
RUN npm install --omit=dev
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/public ./public
EXPOSE 4000
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/server.js"]