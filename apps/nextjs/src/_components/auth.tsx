import type { OAuthProviders } from "@acme/auth";
import { signIn, signOut } from "@acme/auth";
import { Button } from "@acme/ui/button";

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
        variant="outline"
        size="lg"
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
        className="h-auto w-full p-0"
        variant="ghost"
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
