import seedProjects from "./projects";
import seedReports from "./reports";
import seedSprints from "./sprints";
import seedTeams from "./teams";
import seedUsers from "./users";
import seedWorkspaces from "./workspaces";
import seedWorkspacesMembers from "./workspacesMembers";

async function main() {
  console.log("Seeding...");
  console.time("Seeding complete 🌱");

  await seedWorkspaces();
  await seedProjects();
  await seedUsers();
  await seedTeams();
  await seedSprints();
  await seedReports();

  // Dependent routes
  await seedWorkspacesMembers();

  console.timeEnd("Seeding complete 🌱");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
