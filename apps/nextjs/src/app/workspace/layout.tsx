import { Navigation } from "./_components/navigation/navigation";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <Navigation />

      <article className="flex-1">{children}</article>
    </div>
  );
}
