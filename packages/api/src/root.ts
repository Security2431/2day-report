import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { workspaceRouter } from "./router/workspace";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  workspace: workspaceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
