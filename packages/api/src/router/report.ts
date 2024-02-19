import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const reportRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.report.findMany({
      orderBy: { id: "desc" },
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.report.findFirst({ where: { id: input.id } });
    }),
  create: publicProcedure
    .input(
      z.object({
        sprintId: z.string().min(1),
        projectId: z.string().min(1),
        hours: z.number(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.report.create({ data: input });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.report.delete({ where: { id: input } });
  }),
  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(({ ctx, input }) => {
      return ctx.db.report.deleteMany({
        where: {
          id: { in: input },
        },
      });
    }),
});
