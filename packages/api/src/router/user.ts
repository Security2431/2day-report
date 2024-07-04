import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const userRouter = {
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      orderBy: { id: "desc" },
    });
  }),
  byWorkspaceId: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          workspaces: {
            some: {
              workspaceId: input.workspaceId,
            },
          },
        },
      });
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        emailVerified: z.date().optional(),
        image: z.string().optional(),
        password: z.string().optional(),
        city: z.string().optional(),
        workingHours: z.object({ from: z.string(), to: z.string() }).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({ data: input });
    }),
  update: protectedProcedure
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

      return ctx.db.user.update({
        where: { id },
        data: data,
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.user.delete({ where: { id: input } });
  }),
} satisfies TRPCRouterRecord;
