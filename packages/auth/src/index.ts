import type { DefaultSession } from "@auth/core/types";
import Github from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

import { prisma as db } from "@acme/db";
import { sendMagicAuthEmail } from "@acme/mail";

import { env } from "../env";

export type { Session } from "next-auth";

// Update this whenever adding new providers so that the client can
export const providers = ["google", "github"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    // verifyRequest: "/verify-request",
  },
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      // NextJS is able to automatically link accounts. See the discussion thread:
      // https://github.com/nextauthjs/next-auth/discussions/2808#discussioncomment-6021287
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    {
      id: "email",
      type: "email",
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: Number(env.EMAIL_SERVER_PORT),
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      maxAge: 1 * 60 * 60, // Invalidate in 1 hour
      name: "Email",
      options: {},
      sendVerificationRequest: async (params) => {
        let { identifier: email, url } = params;

        try {
          sendMagicAuthEmail({
            toMail: email,
            verificationUrl: url,
          });
        } catch (error) {
          console.log({ error });
        }
      },
    },
  ],
  callbacks: {
    session({ token, session }) {
      if (token) {
        session.user.name = token.name!;
        session.user.email = token.email!;
        session.user.image = token.picture!;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (!dbUser) {
        return token;
      }

      return {
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  // callbacks: {
  //   session: (opts) => {
  //     if (!("user" in opts)) throw "unreachable with session strategy";

  //     return {
  //       ...opts.session,
  //       user: {
  //         ...opts.session.user,
  //         id: opts.user.id,
  //       },
  //     };
  //   },
  // },
});
