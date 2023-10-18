import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

const mocks: Prisma.ProjectCreateInput[] = [
  {
    id: "652e78cfe5d72ca950a93b42",
    name: "reserv.me",
    image:
      "https://private-user-images.githubusercontent.com/11134693/276224908-03cc74d8-dad9-4aba-a79a-c34a7f11664d.svg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTc2MzAyMTIsIm5iZiI6MTY5NzYyOTkxMiwicGF0aCI6Ii8xMTEzNDY5My8yNzYyMjQ5MDgtMDNjYzc0ZDgtZGFkOS00YWJhLWE3OWEtYzM0YTdmMTE2NjRkLnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzEwMTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMxMDE4VDExNTE1MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWExMjJiNWJmZTY1MjcwZmI2NDQxZjgyZWViMWVhN2JhN2M3MWU3N2Y4OWViYTMyYzcyNzI3ZTYwYmI3YTVmZTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.0TinrPEKRa9Oiw8puCrwwWs-L0bMsQexXys4NMhOcO0",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
  {
    id: "652e7861e286a8b1dc3615a9",
    name: "webjs unbillable",
    image: "https://avatars.githubusercontent.com/u/138393439?s=300",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
  {
    id: "652e7860e286a8b1dc3615a8",
    name: "piped.video",
    image: "https://avatars.githubusercontent.com/u/74294114?s=300",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
  {
    id: "652c21ae1b4490c7565ab9b4",
    name: "2day.report",
    image:
      "https://repository-images.githubusercontent.com/700451409/c010bd12-8892-491e-9596-19b01557b55f",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
  {
    id: "652ea590633990ea019ee7a6",
    name: "kittie.tech",
    image: "https://kittie.tech/logo.svg",
    workspace: { connect: { id: "652e78c6e5d72ca950a93b41" } },
  },
];

function main() {
  return (
    Promise.all(
      mocks.map((project) =>
        prisma.project.create({
          data: project,
        }),
      ),
    )
      .then(() => console.info("[SEED] Successfully create project records"))
      .catch((e) => console.error("[SEED] Failed to create project records", e))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .finally(async () => {
        await prisma.$disconnect();
      })
  );
}

export default main;
