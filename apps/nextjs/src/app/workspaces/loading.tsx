import WorkspaceCardSkeleton from "./_components/WorkspaceCardSkeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <WorkspaceCardSkeleton />
      <WorkspaceCardSkeleton />
      <WorkspaceCardSkeleton />
      <WorkspaceCardSkeleton />
    </div>
  );
}
