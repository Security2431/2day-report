import type { OAuthProviders } from "@acme/auth";
import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";

import { loginWithProvider } from "./auth/actions";

export function SignIn({
  provider,
  isLoading = false,
  ...props
}: {
  isLoading?: boolean;
  provider: OAuthProviders;
  children: React.ReactNode;
}) {
  const Icon = Icons[provider];

  return (
    <form>
      <Button
        className="w-full"
        variant="outline"
        type="submit"
        formAction={async () => {
          await loginWithProvider(provider);
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icon className="mr-2 h-4 w-4" />
        )}
        {props.children}
      </Button>
    </form>
  );
}
