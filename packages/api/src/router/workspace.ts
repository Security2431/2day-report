import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const workspaceRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workspace.findMany({
      orderBy: { id: "desc" },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workspace.findFirst({ where: { id: input.id } });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        country: z.string().optional(),
        image: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workspace.create({ data: input });
    }),
  update: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
          name: z.string(),
          country: z.string(),
          image: z.string(),
        })
        .partial()
        .extend({ id: z.string() }),
    )
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;

      return ctx.prisma.workspace.update({
        where: { id },
        data: data,
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.workspace.delete({ where: { id: input } });
  }),
});
