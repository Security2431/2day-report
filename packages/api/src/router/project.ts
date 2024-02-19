import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.project.findFirst({ where: { id: input.id } });
    }),
  byWorkspaceId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.project.findMany({
        where: { workspaceId: input.id },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        workspaceId: z.string(),
        image: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      // TODO: before create, check this project name doesn't exist in this workspace
      return ctx.db.project.create({ data: input });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.project.delete({ where: { id: input } });
  }),
});
