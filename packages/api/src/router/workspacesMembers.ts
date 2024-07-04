import { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { Role } from "@acme/db";

import { protectedProcedure } from "../trpc";

export const workspacesMembersRouter = {
  all: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.workspacesMembers.findMany({
      where: { workspaceId: input },
      include: { user: true },
      orderBy: { id: "desc" },
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.workspacesMembers.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
        userId: z.string(),
        permission: z.nativeEnum(Role),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.workspacesMembers.create({ data: input });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        permission: z.nativeEnum(Role),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;

      return ctx.db.workspacesMembers.update({
        where: {
          id,
        },
        data,
      });
    }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.workspacesMembers.delete({ where: { id: input } });
  }),
} satisfies TRPCRouterRecord;
