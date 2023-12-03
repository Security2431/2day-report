import { NextResponse } from "next/server";

import { auth } from "@acme/auth";

export const AUTH_PAGES = ["/sign-in"];

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url));

export default auth(async (req) => {
  const { url, nextUrl } = req;
  // const { value: token } = cookies.get("token") ?? { value: null };

  const session = await auth();

  // const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested && !session?.user) {
    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }

  if (isAuthPageRequested) {
    const response = NextResponse.redirect(new URL(`/workspaces`, url));
    return response;
  }

  if (!session?.user) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(new URL(`/?${searchParams}`, url));

    response.cookies.delete("token");

    return response;
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/workspaces", "/workspace/:path*"],
};
