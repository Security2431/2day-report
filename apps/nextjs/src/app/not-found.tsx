import Image from "next/image";
import Link from "next/link";

import { Button } from "@acme/ui/button";
import { Title } from "@acme/ui/title";

import routes from "~/_utils/routes";

export default function NotFound() {
  return (
    <section className="container flex min-h-screen max-w-md flex-col justify-center gap-4 py-4 text-center">
      <Image
        className="mx-auto"
        width={300}
        height={300}
        src="/status-codes/404.svg"
        alt="404"
      />
      <Title asChild variant="h1">
        <h1>Not Found</h1>
      </Title>
      <p>Could not find requested resource</p>
      <Button asChild>
        <Link href={routes.home}>Return Home</Link>
      </Button>
    </section>
  );
}
