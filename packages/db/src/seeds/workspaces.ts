import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const mocks: Prisma.WorkspaceCreateInput[] = [
  {
    id: "652e78c6e5d72ca950a93b41",
    name: "WebJS.tech",
    image: "https://avatars.githubusercontent.com/u/138393439?s=300",
  },
];

function main() {
  return (
    Promise.all(
      mocks.map((workspace) => prisma.workspace.create({ data: workspace })),
    )
      .then(() => console.info("[SEED] Successfully create workspace records"))
      .catch((e) =>
        console.error("[SEED] Failed to create workspace records", e),
      )
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(async () => {
        await prisma.$disconnect();
      })
  );
}

export default main;
