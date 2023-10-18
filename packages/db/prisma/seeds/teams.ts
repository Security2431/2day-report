import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const mocks: Prisma.TeamCreateInput[] = [
  {
    name: "General",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
];

function main() {
  return (
    Promise.all(mocks.map((team) => prisma.team.create({ data: team })))
      .then(() => console.info("[SEED] Successfully create team records"))
      .catch((e) => console.error("[SEED] Failed to create team records", e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(async () => {
        await prisma.$disconnect();
      })
  );
}

export default main;
