FROM node:22 AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.js ./
RUN npm install
COPY . .
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"
RUN npm run build


FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/prisma.config.js ./prisma.config.js
EXPOSE 4000
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/server.js"]