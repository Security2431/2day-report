import type { Metadata, Viewport } from "next";
import classNames from "classnames";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ToastContainer } from "react-toastify";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";
import Footer from "./_components/footer";
import Header from "./_components/header";

import "~/app/globals.scss";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={classNames(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ToastContainer theme="dark" autoClose={3000} />

        <TRPCReactProvider>
          <header className="header">
            <Header />
          </header>
          <main className="main">{props.children}</main>

          <footer className="footer flex items-end">
            <Footer />
          </footer>
        </TRPCReactProvider>

        <div id="modal"></div>
      </body>
    </html>
  );
}
