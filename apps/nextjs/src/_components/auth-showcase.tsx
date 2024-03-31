import type { OAuthProviders } from "@acme/auth";
import { auth } from "@acme/auth";

import { SignIn } from "~/_components/auth";

interface Props {
  provider: OAuthProviders;
}

export async function AuthShowcase({ provider }: Props) {
  const session = await auth();

  if (!session) {
    return (
      <SignIn provider={provider}>
        Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </SignIn>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>
    </div>
  );
}
