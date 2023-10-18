import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const mocks: Prisma.SprintCreateInput[] = [
  {
    id: "652ea916a5e055b678ceff17",
    date: "2023-07-30",
    type: "WORKING",
    tomorrowsDescription: "- Fullfils information in Readme.md",
    createdAt: "2023-07-30T20:10:00.560+00:00",
    updatedAt: "2023-07-30T20:10:00.560+00:00",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
    user: { connect: { id: "652ce878e5f41a254306180f" } }, // Artem
  },
  {
    date: "2023-10-18",
    type: "WORKING",
    tomorrowsDescription: "",
    createdAt: "2023-10-18T12:20:31.560+00:00",
    updatedAt: "2023-10-18T12:20:31.560+00:00",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
    user: { connect: { id: "652ce878e5f41a254306180e" } }, // Eduard
  },
];

function main() {
  return (
    Promise.all(mocks.map((sprint) => prisma.sprint.create({ data: sprint })))
      .then(() => console.info("[SEED] Successfully create sprint records"))
      .catch((e) => console.error("[SEED] Failed to create sprint records", e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(async () => {
        await prisma.$disconnect();
      })
  );
}

export default main;
