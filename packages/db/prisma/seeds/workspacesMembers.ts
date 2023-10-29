import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const mocks: Prisma.WorkspacesMembersCreateInput[] = [
  {
    permissions: ["USER"],
    user: { connect: { id: "652ce878e5f41a254306180e" } },
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
  {
    permissions: ["USER"],
    user: { connect: { id: "652ce878e5f41a254306180f" } },
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
];

function main() {
  return (
    Promise.all(
      mocks.map((team) => prisma.workspacesMembers.create({ data: team })),
    )
      .then(() =>
        console.info("[SEED] Successfully create workspacesMembers records"),
      )
      .catch((e) =>
        console.error("[SEED] Failed to create workspacesMembers records", e),
      )
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(async () => {
        await prisma.$disconnect();
      })
  );
}

export default main;
