import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { projectRouter } from "./router/project";
import { reactionRouter } from "./router/reaction";
import { reportRouter } from "./router/report";
import { sprintRouter } from "./router/sprint";
import { userRouter } from "./router/user";
import { workspaceRouter } from "./router/workspace";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  project: projectRouter,
  report: reportRouter,
  sprint: sprintRouter,
  user: userRouter,
  workspace: workspaceRouter,
  reaction: reactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
