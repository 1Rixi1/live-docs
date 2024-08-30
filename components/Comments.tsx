import React from "react";
import { Composer, Thread } from "@liveblocks/react-ui";
import { useThreads } from "@liveblocks/react";
import { BaseMetadata, ThreadData } from "@liveblocks/core";
import { useIsThreadActive } from "@liveblocks/react-lexical";
import { cn } from "@/lib/utils";

const ThreadsWrapper = ({ thread }: { thread: ThreadData<BaseMetadata> }) => {
  const isActive = useIsThreadActive(thread.id);

  return (
    <Thread
      className={cn(
        "border comment-thread",
        isActive && "!border-blue-500 shadow-md",
        thread.resolved && "opacity-40"
      )}
      thread={thread}
      data-state={isActive ? "active" : null}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();

  return (
    <div className="comments-container">
      <Composer className="comment-composer" />

      {threads &&
        threads.map((thread) => (
          <ThreadsWrapper key={thread.id} thread={thread} />
        ))}
    </div>
  );
};

export default Comments;
