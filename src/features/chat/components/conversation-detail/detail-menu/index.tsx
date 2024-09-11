// this needs to be optimized

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/features/chat/hooks/use-chat";
import { api } from "@/trpc/react";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { ConversationSuggestion } from "./conversation-suggestion";

export const DetailMenu = () => {
  const searchParams = useSearchParams();
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const setNewConversationInputRef = useChatStore(
    (state) => state.setNewConversationInputRef,
  );

  const {
    initialActiveVisitors,
    activeConversation,
    newConversationVisitor,
    setShowDetail,
  } = useChatStore((state) => ({
    initialActiveVisitors: state.activeVisitors,
    activeConversation: state.activeConversation,
    newConversationVisitor: state.newConversationVisitor,
    setShowDetail: state.setShowDetail,
  }));

  const { data: activeVisitors } = api.visitors.getActive.useQuery(undefined, {
    initialData: initialActiveVisitors,
  });

  useEffect(() => {
    setNewConversationInputRef(inputRef);
    return () => setNewConversationInputRef(null);
  }, [setNewConversationInputRef]);

  const search = searchParams.has("search");
  const name = activeConversation
    ? activeConversation?.visitor.name
    : newConversationVisitor?.name;

  return (
    <div className="relative">
      <div className="flex h-10 w-full items-center gap-2 border-b px-2">
        <div
          className="rounded-md hover:cursor-pointer hover:bg-secondary"
          onClick={() => setShowDetail(false)}
        >
          <ChevronLeft className="text-muted-foreground" />
        </div>

        {(!activeConversation && !newConversationVisitor) || search ? (
          <div className="flex">
            <p>To:</p>
            <Input
              ref={inputRef}
              placeholder="Search or start new chat"
              className="h-6 w-full border-none focus-visible:ring-transparent"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="border bg-background text-sm">
                {name ? name.length > 0 && name[0]?.toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <p>{name ?? "Unknown"}</p>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          </div>
        )}
      </div>
      {isFocused && !activeConversation && !newConversationVisitor && (
        <div className="absolute flex h-10 w-full flex-col bg-background">
          {activeVisitors?.map((visitor) => (
            <Fragment key={visitor.id}>
              <ConversationSuggestion visitor={visitor} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
