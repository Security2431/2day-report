import type { OAuthProviders } from "@acme/auth";
import { signIn, signOut } from "@acme/auth";

import Button from "~/app/_components/button";

export function SignIn({
  provider,
  ...props
}: {
  provider: OAuthProviders;
  children: React.ReactNode;
}) {
  return (
    <form>
      <Button
        variant="secondary"
        type="submit"
        className="w-full"
        formAction={async () => {
          "use server";
          await signIn(provider);
        }}
      >
        {props.children}
      </Button>
    </form>
  );
}

export function SignOut(props: { children: React.ReactNode }) {
  return (
    <form>
      <Button
        variant="secondary"
        type="submit"
        formAction={async () => {
          "use server";
          await signOut();
        }}
      >
        {props.children}
      </Button>
    </form>
  );
}
