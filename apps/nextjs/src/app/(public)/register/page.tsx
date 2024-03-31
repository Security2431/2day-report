import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@acme/ui";
import { buttonVariants } from "@acme/ui/button";

import { RegisterForm } from "~/_components/auth/RegisterForm";
import Logo from "~/_components/logo";
import routes from "~/_utils/routes";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function RegisterPage() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:min-h-[600px] lg:max-w-none lg:grid-cols-2 lg:px-0 xl:min-h-[800px]">
        <Link
          href={routes.login}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-background">
            <div className="absolute inset-0 z-[1] bg-foreground/50 mix-blend-multiply backdrop-blur-sm" />
            <Image
              className="block size-full object-cover dark:hidden"
              src="/auth/authentication-light.jpg"
              fill
              alt="Authentication"
            />
            <Image
              src="/auth/authentication-dark.jpg"
              alt="Authentication"
              className="hidden size-full object-cover dark:block"
              fill
            />
          </div>
          <Logo />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;The day report is a way to communicate with others, it's
                a way to share our ideas, thoughts, and feelings in a meaningful
                way.&rdquo;
              </p>
              <footer className="text-sm">Simon Sinek</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
