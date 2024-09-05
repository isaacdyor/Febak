import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon } from "lucide-react";
import { LogoutButton } from "./logout-button";
import { useUser } from "@/features/auth/use-user";

export const UserMenu = () => {
  const { user } = useUser();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group flex items-center gap-2 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-secondary">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="border bg-background text-sm">
              {user.email &&
                user.email.length > 0 &&
                user.email[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground">{user.email}</p>
          <EllipsisIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-1">
        <div className="flex flex-col gap-2">
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
