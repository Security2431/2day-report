"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import type { SubmitHandler } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

import Button from "./button";
import Field from "./form/Field";

/* Local constants & types
============================================================================= */
export type FormData = z.infer<typeof schemaValidation>;

const schemaValidation = z.object({
  email: z.string(),
  password: z.string(),
});

const CredentialAuth = () => {
  const router = useRouter();
  const methods = useForm<FormData>({
    resolver: zodResolver(schemaValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      console.log({ response });
      if (!response?.error) {
        router.push("/workspaces");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <form
      method="post"
      className="flex w-full flex-col gap-4"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <Field label="Email:" name="email" type="email" />
        <Field label="Password:" name="password" type="password" />

        <Button type="submit" variant="secondary">
          Sign In
        </Button>
      </FormProvider>
    </form>
  );
};

export default CredentialAuth;
