import { TRPCError, TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { Role } from "@acme/db";

import { protectedProcedure } from "../trpc";

export const workspaceRouter = {
  all: protectedProcedure.query(async ({ ctx }) => {
    const workspaces = await ctx.db.workspace.findMany({
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
      workspacePermission: users.find(
        (user) => user.userId === ctx.session.user.id,
      )?.permission,
    }));

    return decoratedWorkspaces;
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.workspace.findFirst({
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
      const isExist = await ctx.db.workspace.findFirst({
        where: { name: input.name.toLowerCase() },
      });

      if (isExist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Workspace already exists",
        });
      }

      const workspace = await ctx.db.workspace.create({
        data: {
          name: input.name,
        },
      });

      await ctx.db.workspacesMembers.create({
        data: {
          permission: Role.OWNER,
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

      return ctx.db.workspace.update({
        where: { id },
        data: data,
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userRole = await ctx.db.workspacesMembers.findFirst({
        where: {
          workspaceId: input,
          userId: ctx.session.user.id,
        },
        select: {
          permission: true,
        },
      });

      if (userRole?.permission !== Role.OWNER) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You must be an admin to delete a workspace",
        });
      }

      const workspaceData = await ctx.db.workspace.findFirst({
        where: {
          id: input,
        },
        include: {
          teams: true,
          projects: true,
          integrations: true,
          invitations: true,
          sprints: true,
        },
      });

      const [, workspace] = await ctx.db.$transaction([
        ctx.db.team.findMany({
          where: {
            id: { in: workspaceData?.teams.map((team) => team.id) },
          },
        }),
        ctx.db.project.findMany({
          where: {
            id: { in: workspaceData?.projects.map((project) => project.id) },
          },
        }),
        ctx.db.integration.findMany({
          where: {
            id: {
              in: workspaceData?.integrations.map(
                (integration) => integration.id,
              ),
            },
          },
        }),
        ctx.db.invitation.deleteMany({
          where: {
            id: {
              in: workspaceData?.invitations.map((invitation) => invitation.id),
            },
          },
        }),
        ctx.db.sprint.deleteMany({
          where: {
            id: {
              in: workspaceData?.sprints.map((sprint) => sprint.id),
            },
          },
        }),
        ctx.db.workspacesMembers.deleteMany({
          where: {
            workspaceId: input,
          },
        }),
        // ctx.db.team.deleteMany({
        //   where: {
        //     workspaceId: input,
        //   },
        // }),
        // ctx.db.sprint.deleteMany({
        //   where: {
        //     workspaceId: input,
        //   },
        // }),
        // ctx.db.reaction.deleteMany({
        //   where: {
        //     workspaceId: input,
        //   },
        // }),
        ctx.db.workspace.delete({ where: { id: input } }),
      ]);

      // const reports = await ctx.db.$transaction(async (tx) => {
      //   return Promise.all(
      //     input.reports?.map((report) => {
      //       if (!report.reportId) {
      //         return tx.report.create({
      //           data: {
      //             description: report.description,
      //             hours: report.hours,
      //             sprintId: sprint.id,
      //             projectId: report.projectId,
      //           },
      //         });
      //       }

      //       return tx.report.update({
      //         where: { id: report.reportId },
      //         data: {
      //           description: report.description,
      //           hours: report.hours,
      //         },
      //       });
      //     }),
      //   );
      // });

      // const workspace = await ctx.db.workspace.deleteMany({
      //   where: {
      //     id: input,
      //   },
      // });

      return workspace;
    }),
} satisfies TRPCRouterRecord;
