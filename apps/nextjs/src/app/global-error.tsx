"use client";

import { useEffect } from "react";
import Image from "next/image";

import { Button } from "@acme/ui/button";
import { Title } from "@acme/ui/title";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container max-w-md text-center">
      <Image
        className="mx-auto mb-4"
        width={300}
        height={300}
        src="/status-codes/something-went-wrong.svg"
        alt="Something went wrong"
      />

      <Title asChild variant="h4" className="mb-4">
        <h4> Oops, looks like something went wrong!</h4>
      </Title>
      <p>
        We track these errors automatically, but if the problem persists feel
        free to{" "}
        <a
          className="underline"
          href="mailto:artem2431@gmail.com?subject=2day.report Trouble shooting&body=Hi, I got an error while using your app. <your_message_here>"
        >
          contact us
        </a>{" "}
        for additional troubleshooting steps. In the meantime, try refreshing.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </section>
  );
}
