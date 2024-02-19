import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import classNames from "classnames";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { ToastContainer } from "react-toastify";

import "~/app/globals.scss";

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
    <html lang="en" suppressHydrationWarning>
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

