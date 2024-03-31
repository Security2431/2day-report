import { cn } from "@acme/ui";

/* <WorkspaceCardSkeleton />
============================================================================= */
interface Props {
  pulse?: boolean;
}

/* <WorkspaceCardSkeleton />
============================================================================= */
export function WorkspaceCardSkeleton({ pulse = true }: Props) {
  return (
    <div className="flex h-64 max-w-sm flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white shadow-lg transition-all  hover:scale-[101%] hover:bg-[#2e026fff]">
      <picture
        className={cn("h-12 w-12 rounded-full bg-pink-400", {
          "animate-pulse": pulse,
        })}
      />
      <h2
        className={cn("w-1/2 rounded bg-current text-xl font-bold uppercase", {
          "animate-pulse": pulse,
        })}
      >
        &nbsp;
      </h2>
      <span
        className={cn("w-1/3 rounded bg-current text-sm ", {
          "animate-pulse": pulse,
        })}
      >
        &nbsp;
      </span>
      <div
        className={cn(
          "mt-4 inline-flex w-1/2 items-center justify-center rounded border border-white bg-transparent px-4 py-2 font-semibold uppercase",
          {
            "animate-pulse": pulse,
          },
        )}
      >
        <span
          className={cn("w-1/2 rounded bg-current text-sm ", {
            "animate-pulse": pulse,
          })}
        >
          &nbsp;
        </span>
      </div>
    </div>
  );
}
