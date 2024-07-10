"use server";

import type * as z from "zod";

import type { OAuthProviders } from "@acme/auth";
import type { AuthLoginSchema } from "@acme/validators";
import { signIn } from "@acme/auth";

import routes from "~/_utils/routes";

export async function login(
  data: z.infer<typeof AuthLoginSchema>,
  callbackUrl?: string,
) {
  await signIn("resend", {
    email: data.email,
    callbackUrl: callbackUrl ?? routes.workspaces,
  });
}

export async function loginWithProvider(provider: OAuthProviders) {
  await signIn(provider);
}
