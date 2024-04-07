"use server";

import * as z from "zod";

import { OAuthProviders, signIn } from "@acme/auth";
import { AuthLoginSchema } from "@acme/validators";

import routes from "~/_utils/routes";

export async function login(
  data: z.infer<typeof AuthLoginSchema>,
  callbackUrl?: string,
) {
  console.log(data);
  await signIn("email", {
    email: data.email,
    callbackUrl: callbackUrl ?? routes.workspaces,
  });
}

export async function loginWithProvider(provider: OAuthProviders) {
  await signIn(provider);
}
