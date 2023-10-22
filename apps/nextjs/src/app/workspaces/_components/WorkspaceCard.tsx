import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineArrowRight, HiUsers } from "react-icons/hi";

import type { RouterOutputs } from "@acme/api";

import Button from "~/app/_components/button";
import Heading from "~/app/_components/heading";

/* <WorkspaceCard />
============================================================================= */
interface Props {
  workspace: RouterOutputs["workspace"]["all"][number];
}

/* <WorkspaceCard />
============================================================================= */
const WorkspaceCard: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <div className="flex h-64 max-w-sm flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white p-4 shadow-lg  hover:bg-[#2e026fff]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-12 w-12 rounded-full"
        src={props.workspace.image ?? ""}
        alt=""
      />
      <Heading className="w-full truncate whitespace-nowrap text-xl font-bold">
        {props.workspace.name}
      </Heading>
      <span className="flex items-center">
        <HiUsers className="mr-2" />2 people
      </span>
      <Link href={`/workspace/${props.workspace.id}`}>
        <Button onClick={() => router.push(`/workspace/${props.workspace.id}`)}>
          <HiOutlineArrowRight className="mr-2" /> Enter
        </Button>
      </Link>
    </div>
  );
};

export default WorkspaceCard;
