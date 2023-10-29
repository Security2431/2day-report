import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const sprintRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.sprint.findMany({
      orderBy: { id: "desc" },
    });
  }),
  byDateRange: publicProcedure
    .input(z.object({ workspaceId: z.string(), from: z.date(), to: z.date() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.sprint.findMany({
        where: {
          date: {
            gte: input.from, //"2022-01-15"
            lte: input.to, // "2022-01-30"
          },
          workspaceId: input.workspaceId,
        },
        select: {
          id: true,
          date: true,
          type: true,
          tomorrowsDescription: true,
          reports: {
            select: {
              id: true,
              description: true,
              hours: true,
              project: {
                select: {
                  id: true,
                  image: true,
                  name: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: [{ date: "asc" }],
      });
    }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.sprint.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        // id: z.string().min(1).optional(),
        workspaceId: z.string().min(1),
        userId: z.string().min(1),
        date: z.date(),
        type: z.enum([
          "WORKING",
          "HOME_OFFICE",
          "NOT_WORKING",
          "HALF_DAY_VACATION",
          "VACATION",
          "SICK_DAY",
          "ILLNESS",
          "TRAVELING",
        ]),
        tomorrowsDescription: z.string().optional(),
        reports: z
          .array(
            z.object({
              projectId: z.string(),
              description: z.string().optional(),
              hours: z.number(),
            }),
          )
          .default([]),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.sprint.create({
        data: {
          workspaceId: input.workspaceId,
          userId: input.userId,
          date: input.date,
          tomorrowsDescription: input.tomorrowsDescription,
          type: input.type,
          // Include reports only if there are any to be created
          ...(input.reports?.length > 0 && {
            reports: {
              createMany: {
                data:
                  input.reports?.map((report) => ({
                    description: report.description,
                    projectId: report.projectId,
                    hours: report.hours,
                  })) ?? [],
              },
            },
          }),
        },
        include: {
          reports: true,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        workspaceId: z.string().min(1),
        userId: z.string().min(1),
        date: z.date(),
        type: z.enum([
          "WORKING",
          "HOME_OFFICE",
          "NOT_WORKING",
          "HALF_DAY_VACATION",
          "VACATION",
          "SICK_DAY",
          "ILLNESS",
          "TRAVELING",
        ]),
        tomorrowsDescription: z.string().optional(),
        reports: z
          .array(
            z.object({
              reportId: z.string().optional(),
              projectId: z.string(),
              description: z.string().optional(),
              hours: z.number(),
            }),
          )
          .default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const sprint = await ctx.prisma.sprint.update({
        where: { id: input.id },
        data: {
          workspaceId: input.workspaceId,
          userId: input.userId,
          date: input.date,
          tomorrowsDescription: input.tomorrowsDescription,
          type: input.type,
        },
        select: {
          id: true,
        },
      });

      const reports = await ctx.prisma.$transaction(async (tx) => {
        return Promise.all(
          input.reports?.map((report) => {
            if (!report.reportId) {
              return tx.report.create({
                data: {
                  description: report.description,
                  hours: report.hours,
                  sprintId: sprint.id,
                  projectId: report.projectId,
                },
              });
            }

            return tx.report.update({
              where: { id: report.reportId },
              data: {
                description: report.description,
                hours: report.hours,
              },
            });
          }),
        );
      });

      return {
        ...sprint,
        reports,
      };
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.sprint.update({
        where: {
          id: input,
        },
        data: {
          reports: {
            deleteMany: {},
          },
        },
      });

      return ctx.prisma.sprint.delete({
        where: { id: input },
      });
    }),
});
