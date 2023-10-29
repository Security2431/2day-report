import Link from "next/link";

import { auth } from "@acme/auth";

import { SignOut } from "~/components/auth";
import routes from "../_lib/routes";
import Logo from "./logo";

/* <Header />
============================================================================= */
const Header = async () => {
  const session = await auth();

  return (
    <div className="container flex items-center justify-between py-8">
      <Link href={routes.home}>
        <Logo />
      </Link>
      {session && (
        <div className="flex items-center gap-3">
          Hello, {session.user.name}!
          <SignOut className="rounded border border-white bg-transparent px-4 py-2 font-semibold uppercase text-white hover:border-transparent hover:bg-red-300 hover:text-purple-500">
            Sign Out
          </SignOut>
        </div>
      )}
    </div>
  );
};

export default Header;
