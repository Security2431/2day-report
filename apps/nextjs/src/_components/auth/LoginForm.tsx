"use client";

import type * as z from "zod";
import * as React from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@acme/ui/form";
import { Icons } from "@acme/ui/icons";
import { Input } from "@acme/ui/input";
import { AuthLoginSchema } from "@acme/validators";

import { SignIn } from "~/_components/auth";
import { login } from "./actions";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm({
    schema: AuthLoginSchema,
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof AuthLoginSchema>) {
    setIsLoading(true);
    try {
      await login(data, callbackUrl!);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="brian@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
      </Form>

      <p
        className="flex items-center overflow-hidden whitespace-nowrap text-center text-xs uppercase 
           text-muted-foreground before:relative before:right-2 before:inline-block 
           before:h-[1px] before:w-1/2 before:bg-border before:align-middle 
           after:relative after:left-2 after:inline-block after:h-[1px] after:w-1/2 after:bg-border after:align-middle"
      >
        Or continue with
      </p>

      <div className="flex flex-col gap-4">
        <SignIn provider="github" isLoading={isLoading}>
          Github
        </SignIn>
        <SignIn provider="google" isLoading={isLoading}>
          Google
        </SignIn>
      </div>
    </div>
  );
}
