FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# package-lock.json may be gitignored — install all deps so prisma CLI is available at build/runtime
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- http://localhost:3001/api/health || exit 1

# Push schema, seed CMS/admin if missing, then start API
CMD ["sh", "-c", "npx prisma db push && node prisma/seed.js && node src/index.js"]
