import { Suspense } from "react";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";
import routes from "./_lib/routes";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect(routes.workspaces);
  }

  return (
    <div className="container mt-12 flex flex-col items-center justify-center gap-4 py-8">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Create <span className="text-pink-400">T3</span> Turbo
      </h1>
      <AuthShowcase provider="github" />

      <CreatePostForm />
      <div className="h-[40vh] w-full max-w-2xl overflow-y-scroll">
        <Suspense
          fallback={
            <div className="flex w-full flex-col gap-4">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          }
        >
          <PostList />
        </Suspense>
      </div>
    </div>
  );
}
