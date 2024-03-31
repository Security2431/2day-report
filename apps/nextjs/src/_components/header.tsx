import { auth } from "@acme/auth";

import { UserNav } from "./dropdowns/user-nav";
import Logo from "./logo";

/* <Header />
============================================================================= */
const Header = async () => {
  const session = await auth();

  return (
    <header className="mb-4 py-6 shadow-md">
      <div className="container flex items-center justify-between">
        <Logo />

        {session?.user && <UserNav user={session.user} />}
      </div>
    </header>
  );
};

export default Header;
