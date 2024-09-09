import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

export const Messages = () => {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  useEffect(() => {
    const storedVisitorId =
      typeof window !== "undefined" ? localStorage.getItem("visitorId") : null;
    setVisitorId(storedVisitorId);
  }, []);
  const { data: conversation } = api.conversations.getByVisitorId.useQuery(
    {
      visitorId: visitorId ?? "",
    },
    { enabled: !!visitorId },
  );
  return (
    <div className="flex flex-col">
      {conversation?.messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.sentByUser ? "justify-start" : "justify-end",
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-md px-2 py-1",
              message.sentByUser
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground",
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
