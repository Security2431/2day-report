import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const mocks: Prisma.ReportCreateInput[] = [
  {
    description:
      "- Created OSVC doc and shared /w @@652ce878e5f41a254306180e\n- Created new repository with onboarding information https://github.com/webjs-tech/webjs-tech",
    hours: 8,
    project: { connect: { id: "652e7860e286a8b1dc3615a8" } },
    sprint: { connect: { id: "652ea916a5e055b678ceff17" } },
  },
];

function main() {
  return (
    Promise.all(mocks.map((report) => prisma.report.create({ data: report })))
      .then(() => console.info("[SEED] Successfully create report records"))
      .catch((e) => console.error("[SEED] Failed to create report records", e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(async () => {
        await prisma.$disconnect();
      })
  );
}

export default main;
