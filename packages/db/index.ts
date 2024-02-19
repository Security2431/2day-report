// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export * from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
