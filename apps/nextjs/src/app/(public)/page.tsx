import { Card } from "@acme/ui/card";
import { Title } from "@acme/ui/title";

import { AuthShowcase } from "~/_components/auth-showcase";
import Footer from "~/_components/footer";
import Header from "~/_components/header";
import { Meteors } from "~/_components/meteors";

export const runtime = "edge";

export default async function HomePage() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="container flex h-full w-full items-center justify-center">
          {/* <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" /> */}
          <Card className="relative max-w-sm p-8">
            <Title asChild variant="h1" className="mb-4 !text-2xl">
              <h1>Simplify, Track, Succeed!</h1>
            </Title>

            <p>
              Gain a clear overview of your team&apos;s progress and
              availability with 2day.report!
            </p>

            <p
              className="my-6 flex items-center overflow-hidden text-center text-xs uppercase before:relative 
           before:right-2 before:inline-block before:h-[1px] before:w-1/2 
           before:bg-white before:align-middle after:relative after:left-2 
           after:inline-block after:h-[1px] after:w-1/2 after:bg-white after:align-middle"
            >
              or
            </p>

            <div className="flex flex-col gap-4">
              <AuthShowcase provider="google" />
              <AuthShowcase provider="github" />
            </div>

            <Meteors number={10} />
          </Card>
        </div>
      </main>

      <footer className="flex items-end">
        <Footer />
      </footer>
    </>
  );
}
