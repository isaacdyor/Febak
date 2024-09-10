import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon } from "lucide-react";
import { LogoutButton } from "./logout-button";
import { useUser } from "@/features/auth/use-user";
import { cn } from "@/lib/utils";

export const UserMenu: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const { user } = useUser();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "group flex items-center gap-2 rounded-md px-2 py-1",
            isHovered && "w-44 hover:cursor-pointer hover:bg-secondary",
          )}
        >
          <Avatar
            className={cn("h-7 w-7", !isHovered && "hover:cursor-pointer")}
          >
            <AvatarFallback
              className={cn(
                "border bg-background text-sm",
                !isHovered && "hover:bg-secondary",
              )}
            >
              {user.email &&
                user.email.length > 0 &&
                user.email[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p
            className={cn(
              "truncate text-sm text-muted-foreground",
              !isHovered && "hidden",
            )}
          >
            {user.email}
          </p>
          <EllipsisIcon
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground",
              !isHovered && "hidden",
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-1">
        <div className="flex flex-col gap-2">
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
