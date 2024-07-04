import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";

import { LoginForm } from "~/_components/auth/LoginForm";
import Footer from "~/_components/footer";
import Header from "~/_components/header";
import { Meteors } from "~/_components/meteors";

// export const runtime = "edge";

export default function HomePage() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="container flex h-full w-full items-center justify-center">
          {/* <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" /> */}
          <Card className="relative z-[1] max-w-sm">
            <CardHeader>
              <CardTitle>Simplify, Track, Succeed!</CardTitle>
              <CardDescription>
                Gain a clear overview of your team&apos;s progress and
                availability with 2day.report!
              </CardDescription>
            </CardHeader>

            <CardContent>
              <LoginForm />
            </CardContent>

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
