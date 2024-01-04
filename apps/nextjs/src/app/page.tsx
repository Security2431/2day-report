import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { AuthShowcase } from "./_components/auth-showcase";
import CredentialAuth from "./_components/credential-auth";
import Heading from "./_components/heading";
import { Meteors } from "./_components/meteors";
import routes from "./_lib/routes";

export default async function HomePage() {
  const session = await auth();

  if (session) {
    redirect(routes.workspaces);
  }

  return (
    <div className="container flex h-full w-full items-center justify-center">
      {/* <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" /> */}
      <div className="relative max-w-sm overflow-hidden rounded-2xl border border-white bg-white bg-opacity-10 p-8 text-center shadow-xl backdrop-blur">
        <Heading as="h1" className="mb-4 !text-2xl">
          Simplify, Track, Succeed!
        </Heading>

        <p>
          Gain a clear overview of your team&apos;s progress and availability
          with 2day.report!
        </p>

        <CredentialAuth />

        <p
          className="my-6 flex items-center overflow-hidden text-center text-xs uppercase before:relative 
           before:right-2 before:inline-block before:h-[1px] before:w-1/2 
           before:bg-white before:align-middle after:relative after:left-2 
           after:inline-block after:h-[1px] after:w-1/2 after:bg-white after:align-middle"
        >
          or
        </p>

        <div className="flex flex-col gap-4">
          <AuthShowcase provider="google" />
          <AuthShowcase provider="github" />
        </div>

        <Meteors number={10} />
      </div>
    </div>
  );
}
