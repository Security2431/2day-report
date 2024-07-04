import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const commentRouter = {
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.comment.findMany({ orderBy: { id: "desc" } });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.comment.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        sprintId: z.string().min(1),
        message: z.string().min(1),
        private: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.comment.create({ data: input });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.comment.delete({ where: { id: input } });
  }),
} satisfies TRPCRouterRecord;
