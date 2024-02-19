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
          Hello, {session.user?.name}!<SignOut>Sign Out</SignOut>
        </div>
      )}
    </div>
  );
};

export default Header;
