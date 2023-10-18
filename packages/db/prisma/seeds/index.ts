import seedProjects from "./projects";
import seedReports from "./reports";
import seedSprints from "./sprints";
import seedTeams from "./teams";
import seedUsers from "./users";
import seedWorkspaces from "./workspaces";

async function main() {
  console.log("Seeding...");

  await seedWorkspaces();
  await seedProjects();
  await seedUsers();
  await seedTeams();
  await seedSprints();
  await seedReports();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
