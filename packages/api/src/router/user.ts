import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      orderBy: { id: "desc" },
    });
  }),
  byWorkspaceId: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
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
      return ctx.prisma.user.findFirst({ where: { id: input.id } });
    }),
  byEmail: protectedProcedure
    .input(z.object({ email: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ where: { email: input.email } });
    }),
  create: publicProcedure
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
      return ctx.prisma.user.create({ data: input });
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

      return ctx.prisma.user.update({
        where: { id },
        data: data,
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.user.delete({ where: { id: input } });
  }),
});
