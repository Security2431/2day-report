import Heading from "../_components/heading";
import WorkspaceModal from "./_components/WorkspaceModal";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container">
      <header className="mb-12 grid grid-cols-5">
        <Heading as="h1" className="col-start-3 flex-1">
          My Workspaces
        </Heading>
        <WorkspaceModal className="col-start-5" />
      </header>
      {children}
    </section>
  );
}
