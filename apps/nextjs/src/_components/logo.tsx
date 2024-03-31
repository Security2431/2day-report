import Link from "next/link";

import { Icons } from "@acme/ui/icons";

import routes from "~/_utils/routes";

/* <Logo />
============================================================================= */
const Logo = () => {
  return (
    <Link href={routes.home}>
      <div className="relative z-20 flex items-center text-lg font-medium uppercase">
        <Icons.logo className="mr-2 size-8" />
        2day.report
      </div>
    </Link>
  );
};

export default Logo;
