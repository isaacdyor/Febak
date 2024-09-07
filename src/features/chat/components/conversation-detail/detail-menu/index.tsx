import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/features/chat/use-chat";
import { Fragment, useEffect, useRef, useState } from "react";
import { ConversationSuggestion } from "./conversation-suggestion";

export const DetailMenu = () => {
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const setNewConversationInputRef = useChatStore(
    (state) => state.setNewConversationInputRef,
  );

  const { activeVisitors, activeConversation } = useChatStore((state) => ({
    activeVisitors: state.activeVisitors,
    activeConversation: state.activeConversation,
  }));

  console.log(activeVisitors);

  useEffect(() => {
    setNewConversationInputRef(inputRef);
    return () => setNewConversationInputRef(null);
  }, [setNewConversationInputRef]);

  return (
    <div className="relative">
      <div className="flex h-10 w-full items-center border-b px-2">
        {activeConversation ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="border bg-background text-sm">
                {activeConversation.visitor.name
                  ? activeConversation.visitor.name.length > 0 &&
                    activeConversation.visitor.name[0]?.toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <p>{activeConversation.visitor.name ?? "Unknown"}</p>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          </div>
        ) : (
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
        )}
      </div>
      {isFocused && !activeConversation && (
        <div className="absolute flex h-10 w-full flex-col bg-background">
          {activeVisitors.map((visitor) => (
            <Fragment key={visitor.id}>
              <ConversationSuggestion visitor={visitor} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
