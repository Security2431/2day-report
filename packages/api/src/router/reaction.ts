import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const reactionRouter = {
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.reaction.findMany({
      orderBy: { id: "desc" },
    });
  }),
  bySprintId: protectedProcedure
    .input(z.object({ sprintId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.reaction.findMany({
        where: {
          sprint: {
            id: input.sprintId,
          },
        },
      });
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.reaction.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        sprintId: z.string().min(1),
        unified: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.reaction.create({
        data: {
          unified: input.unified,
          user: { connect: { id: input.userId } },
          sprint: { connect: { id: input.sprintId } },
        },
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.reaction.delete({ where: { id: input } });
  }),
} satisfies TRPCRouterRecord;
