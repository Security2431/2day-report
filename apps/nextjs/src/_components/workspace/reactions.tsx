"use client";

import { useCallback, useEffect, useState } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";

import type { RouterOutputs } from "@acme/api";
import { cn } from "@acme/ui";
import { Button } from "@acme/ui/button";
import { Icons } from "@acme/ui/icons";
import { toast } from "@acme/ui/toast";

import useOutsideClick from "~/_hooks/useOutsideClick";
import { api } from "~/trpc/react";

interface Props {
  sprintId: string;
  userId: string;
  reactions: RouterOutputs["sprint"]["byDateRange"][number]["reactions"];
}

export const ReactionRow: React.FC<Props> = ({
  sprintId,
  userId,
  reactions,
}) => {
  const utils = api.useUtils();
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setOpen(false);
  });

  // const { data: reactions } = api.reaction.bySprintId.useQuery({
  //   sprintId,
  // });

  const counts = reactions.reduce(
    (acc, value) => ({
      ...acc,
      [value.unified]: (acc[value.unified] ?? 0) + 1,
    }),
    {} as Record<string, number>,
  );

  const createReaction = api.reaction.create.useMutation({
    async onSuccess() {
      await utils.sprint.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to add reaction"
          : "Failed to add reaction",
      );
    },
  });

  const deleteReaction = api.reaction.delete.useMutation({
    async onSuccess() {
      await utils.sprint.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete reaction"
          : "Failed to delete reaction",
      );
    },
  });

  const handleClick = async (unified: string) => {
    setOpen(false);

    const reaction = reactions.find(
      (reaction) =>
        unified === reaction.unified &&
        sprintId === reaction.sprintId &&
        userId === reaction.userId,
    );

    if (!reaction?.id) {
      return createReaction.mutate({
        unified,
        sprintId,
        userId,
      });
    }

    return deleteReaction.mutate(reaction.id);
  };

  const uniqueReactions = [...new Set(reactions.map(({ unified }) => unified))];

  // When the user press the ESC key, onPressEscKey will be called
  const handleWindowKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeyDown);
    return () => window.removeEventListener("keydown", handleWindowKeyDown);
  }, [handleWindowKeyDown]);

  return (
    <section className="relative">
      <div className="flex flex-wrap gap-1.5">
        {uniqueReactions.map((unified) => (
          <Button
            variant="outline"
            size="icon"
            className={cn("h-auto rounded-full px-2 py-1", {
              "bg-blue-500 text-white hover:bg-blue-300": reactions.find(
                (reaction) =>
                  reaction.unified === unified && reaction.userId === userId,
              ),
            })}
            key={unified}
            onClick={() => handleClick(unified)}
          >
            <Emoji unified={unified} size={14} />
            <span className="ml-1 text-xs">{counts[unified]}</span>
          </Button>
        ))}
        <Button
          className="h-auto rounded-full px-2 py-1"
          variant="outline"
          size="icon"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <Icons.Smile className="size-3.5" />
        </Button>
      </div>

      {open && (
        <div
          ref={ref}
          className="absolute left-0 top-[calc(100%+0.25rem)] z-[1]"
        >
          <EmojiPicker
            height={500}
            width={400}
            onEmojiClick={(emoji) => handleClick(emoji.unified)}
            // customEmojis={[
            //   {
            //     names: ["Mustache"],
            //     imgUrl: "/emojis/Mustache.png",
            //     id: "mustache",
            //   },
            // ]}
          />
        </div>
      )}
    </section>
  );
};
