import { z } from "zod";

import { Role } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({ orderBy: { id: "desc" } });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.project.findFirst({ where: { id: input.id } });
    }),
  byWorkspaceId: protectedProcedure
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
  create: protectedProcedure
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
