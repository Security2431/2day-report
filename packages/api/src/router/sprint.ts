import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { DayType } from "@acme/db";

import { protectedProcedure } from "../trpc";

export const sprintRouter = {
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.sprint.findMany({
      orderBy: { id: "desc" },
    });
  }),
  byDateRange: protectedProcedure
    .input(z.object({ workspaceId: z.string(), from: z.date(), to: z.date() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.sprint.findMany({
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
          mood: true,
          reports: {
            select: {
              id: true,
              description: true,
              blockers: true,
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
          reactions: {
            select: {
              id: true,
              sprintId: true,
              userId: true,
              unified: true,
            },
          },
          comments: {
            orderBy: [{ updatedAt: "desc" }],
            select: {
              id: true,
              message: true,
              private: true,
              updatedAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: [{ date: "asc" }],
      });
    }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.sprint.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        // id: z.string().min(1).optional(),
        workspaceId: z.string().min(1),
        userId: z.string().min(1),
        date: z.date(),
        type: z.nativeEnum(DayType),
        tomorrowsDescription: z.string().optional(),
        reports: z
          .array(
            z.object({
              projectId: z.string(),
              description: z.string().optional(),
              blockers: z.string().optional(),
              hours: z.number(),
            }),
          )
          .default([]),
        mood: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.sprint.create({
        data: {
          workspaceId: input.workspaceId,
          userId: input.userId,
          date: input.date,
          tomorrowsDescription: input.tomorrowsDescription,
          type: input.type,
          mood: input.mood,
          // Include reports only if there are any to be created
          ...(input.reports.length > 0 && {
            reports: {
              createMany: {
                data: input.reports.map((report) => ({
                  description: report.description,
                  blockers: report.blockers,
                  projectId: report.projectId,
                  hours: report.hours,
                })),
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
        type: z.nativeEnum(DayType),
        tomorrowsDescription: z.string().optional(),
        reports: z
          .array(
            z.object({
              reportId: z.string().optional(),
              projectId: z.string(),
              description: z.string().optional(),
              hours: z.number(),
              blockers: z.string().optional(),
            }),
          )
          .default([]),
        mood: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const sprint = await ctx.db.sprint.update({
        where: { id: input.id },
        data: {
          workspaceId: input.workspaceId,
          userId: input.userId,
          date: input.date,
          tomorrowsDescription: input.tomorrowsDescription,
          type: input.type,
          mood: input.mood,
        },
        select: {
          id: true,
        },
      });

      const reports = await ctx.db.$transaction(async (tx) => {
        return Promise.all(
          input.reports.map((report) => {
            if (!report.reportId) {
              return tx.report.create({
                data: {
                  description: report.description,
                  hours: report.hours,
                  sprintId: sprint.id,
                  projectId: report.projectId,
                  blockers: report.blockers,
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
      await ctx.db.sprint.update({
        where: {
          id: input,
        },
        data: {
          reports: {
            deleteMany: {},
          },
        },
      });

      return ctx.db.sprint.delete({
        where: { id: input },
      });
    }),
} satisfies TRPCRouterRecord;
