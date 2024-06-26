FROM --platform=linux/amd64 node:20-alpine
WORKDIR /app

# Install Prisma Client - remove if not using Prisma
# COPY prisma ./

COPY package.json pnpm-lock.yaml