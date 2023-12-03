import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Role } from "@acme/db";

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
        userId: z.string().min(1),
        country: z.string().optional(),
        image: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isExist = await ctx.prisma.workspace.findFirst({
        where: { name: input.name.toLowerCase() },
      });

      if (isExist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Workspace already exists",
        });
      }

      const workspace = await ctx.prisma.workspace.create({
        data: {
          name: input.name,
        },
      });

      await ctx.prisma.workspacesMembers.create({
        data: {
          userId: input.userId,
          workspaceId: workspace.id,
          permissions: [Role.ADMIN],
        },
      });

      return workspace;
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
