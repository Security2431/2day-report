import { WeekList } from "./_components/WeekList";
import WorkspaceHeader from "./_components/WorkspaceHeader";
import { WeekendProvider } from "./providers";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WeekendProvider>
      <section>
        <WorkspaceHeader />
        <WeekList />

        {children}
      </section>
    </WeekendProvider>
  );
}
