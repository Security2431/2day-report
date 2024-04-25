import { z } from "zod";

import { DayType } from "@acme/db";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(2, {
    message: "Workspace must be at least 2 characters.",
  }),
  image: z.string().optional(),
});

export const CreateTomorrowsDescription = z.object({
  tomorrowsDescription: z.string().optional(),
});

const CreateReportSchema = z.object({
  projectId: z.string().min(1),
  reportId: z.string().optional(),
  projectName: z.string(),
  description: z.string(),
  blockers: z.string().optional(),
  hours: z.coerce.number().min(0.5).max(24),
});

export const CreateFillMyDaySchema = z.object({
  tomorrowsDescription: z.string().optional(),
  mood: z.string().optional().default(""),
  reports: z.array(CreateReportSchema).optional(),
  type: z.nativeEnum(DayType).optional(),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(2, {
    message: "Project must be at least 2 characters.",
  }),
  image: z.string().optional(),
});

export const AuthLoginSchema = z.object({
  email: z.string().min(1),
});

export const CreateCommentSchema = z.object({
  message: z.string().min(1),
  private: z.boolean().optional(),
});
