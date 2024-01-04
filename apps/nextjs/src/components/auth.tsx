import type { OAuthProviders } from "@acme/auth";
import { CSRF_experimental } from "@acme/auth";

import Button from "~/app/_components/button";

export function SignIn({
  provider,
  ...props
}: {
  provider: OAuthProviders;
  children: React.ReactNode;
}) {
  return (
    <form action={`/api/auth/signin/${provider}`} method="post">
      <Button variant="secondary" type="submit" className="w-full">
        {props.children}
      </Button>
      <CSRF_experimental />
    </form>
  );
}

export function SignOut(props: { children: React.ReactNode }) {
  return (
    <form action="/api/auth/signout" method="post" className="w-full">
      <Button variant="secondary" type="submit">
        {props.children}
      </Button>
      <CSRF_experimental />
    </form>
  );
}
