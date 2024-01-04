import Credentials from "@auth/core/providers/credentials";
import Github from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import type { DefaultSession } from "@auth/core/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { verify } from "argon2";
import NextAuth from "next-auth";

import { prisma } from "@acme/db";

import { env } from "./env.mjs";

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

// Function to exclude user password returned from prisma
// const exclude = (user, keys) => {
//   for (let key of keys) {
//     delete user[key];
//   }
//   return user;
// };

const validatePassword = async (
  plainPassword: string,
  hashedPassword?: string | null,
) => {
  if (!hashedPassword) {
    return false;
  }

  return await verify(hashedPassword, plainPassword);
};

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // NextJS is able to automatically link accounts. See the discussion thread:
      // https://github.com/nextauthjs/next-auth/discussions/2808#discussioncomment-6021287
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email: ",
          type: "text",
        },
        password: {
          label: "Password: ",
          type: "password",
        },
      },

      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findFirst({
          where: {
            email: {
              equals: email,
              mode: "insensitive",
            },
          },
        });

        const isValidPassword = await validatePassword(
          password,
          user?.password,
        );

        if (!user || !isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // TODO: exclude password field
        return user;
      },

      // This is where you need to retrieve user data
      // to verify with credentials
      //   await new Promise((resolve) => setTimeout(resolve, 1000));

      //   if (
      //     credentials.email === user.email &&
      //     credentials.password === user.password
      //   ) {
      //     return user;
      //   }

      //   return null;
      // },
    }),
  ],
  callbacks: {
    jwt({ token, user, session }) {
      console.log(
        "jwt-------------------------------------------------------",
        session,
        token,
        user,
      );

      // if (trigger === "update" && session?.name) {
      //   token.name = session.name;
      // }

      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
        };
      }

      return token;
    },
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (credentials) {
    //     return true;
    //   }

    //   console.log("email", email);
    //   console.log("profile", profile);
    //   console.log("account", account);
    //   console.log("user", user);

    //   const dbUser = await prisma.user.upsert({
    //     where: { email: user.email! },
    //     update: {
    //       name: user.name!,
    //       image: user.image,
    //     },
    //     create: {
    //       name: user.name!,
    //       email: user.email!,
    //       image: user.image,
    //       password: user.name!,
    //     },
    //   });
    //   // add the userId to the session object
    //   // user.role = dbUser.role;
    //   user.id = dbUser.id;

    //   return true;
    // },
    session: ({ session, token, user }) => {
      console.log(
        "session-------------------------------------------------------",
        session,
        token,
        user,
      );
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },

    // @TODO - if you wanna have auth on the edge
    // jwt: ({ token, profile }) => {
    //   if (profile?.id) {
    //     token.id = profile.id;
    //     token.image = profile.picture;
    //   }
    //   return token;
    // },

    // @TODO
    // authorized({ request, auth }) {
    //   return !!auth?.user
    // }
  },
});
