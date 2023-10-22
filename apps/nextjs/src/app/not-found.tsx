import Image from "next/image";
import Link from "next/link";

import Button from "./_components/button";
import Heading from "./_components/heading";
import routes from "./_lib/routes";

export default function NotFound() {
  return (
    <section className="container flex h-full max-w-md flex-col justify-center text-center">
      <Image
        className="mx-auto mb-4"
        width={300}
        height={300}
        src="/404.svg"
        alt="404"
      />
      <Heading as="h1" className="mb-4">
        Not Found
      </Heading>
      <p>Could not find requested resource</p>
      <Link href={routes.home}>
        <Button>Return Home</Button>
      </Link>
    </section>
  );
}
