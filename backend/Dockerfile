# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gerar build de produção
RUN npm run build

# Etapa de produção
FROM node:18-alpine

WORKDIR /app

# Apenas copiar os arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Executar migrações do Prisma antes de iniciar o servidor
RUN npx prisma generate

EXPOSE 3001

# Usar o modo de produção do NestJS
CMD ["node", "dist/main"]
