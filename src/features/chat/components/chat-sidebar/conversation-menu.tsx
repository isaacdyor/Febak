import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { useChatStore } from "../../use-chat";

export const ConversationMenu = () => {
  const focusNewConversationInput = useChatStore(
    (state) => state.focusNewConversationInput,
  );
  return (
    <div className="flex h-10 items-center gap-4 border-b p-2">
      <Input placeholder="Search conversation" className="h-6" />
      <SquarePen
        onClick={() => {
          console.log("bang");
          focusNewConversationInput();
        }}
        className="text-muted-foreground h-5 w-5 shrink-0 hover:cursor-pointer"
      />
    </div>
  );
};
