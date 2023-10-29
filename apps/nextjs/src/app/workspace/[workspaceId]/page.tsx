import { auth } from "@acme/auth";

import { Sprint } from "./_components/Sprint";

export default async function WorkspacePage() {
  const session = await auth();

  return <Sprint session={session} />;
}
