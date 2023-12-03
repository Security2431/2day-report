import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { Role } from "@acme/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const workspaceRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const workspaces = await ctx.prisma.workspace.findMany({
      where: {
        users: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      include: {
        users: true,
      },
      orderBy: { id: "desc" },
    });

    const decoratedWorkspaces = workspaces.map(({ users, ...workspace }) => ({
      ...workspace,
      people: users.length,
      workspacePermissions:
        users.find((user) => user.userId === ctx.session.user.id)
          ?.permissions ?? [],
    }));

    return decoratedWorkspaces;
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.workspace.findFirst({
        where: {
          id: input.id,
          users: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
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
          permissions: [Role.ADMIN],
          user: { connect: { id: ctx.session.user.id } },
          workspace: { connect: { id: workspace.id } },
        },
      });

      return workspace;
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

      return ctx.prisma.workspace.update({
        where: { id },
        data: data,
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const [, workspace] = await ctx.prisma.$transaction([
        ctx.prisma.workspacesMembers.deleteMany({
          where: {
            workspaceId: input,
          },
        }),
        ctx.prisma.workspace.delete({ where: { id: input } }),
      ]);

      return workspace;
    }),
});
