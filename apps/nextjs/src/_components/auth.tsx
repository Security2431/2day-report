import type { OAuthProviders } from "@acme/auth";
import { signIn } from "@acme/auth";
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
