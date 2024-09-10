import React from "react";
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
            "group flex items-center gap-2 rounded-md px-1 py-1 transition-all duration-300 ease-in-out",
            isHovered
              ? "w-full hover:cursor-pointer hover:bg-secondary"
              : "w-9",
          )}
        >
          <Avatar
            className={cn(
              "h-7 w-7 transition-all duration-300 ease-in-out",
              !isHovered && "hover:cursor-pointer",
            )}
          >
            <AvatarFallback
              className={cn(
                "border bg-background text-sm transition-colors duration-300 ease-in-out",
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
              "truncate text-sm text-muted-foreground transition-all duration-300 ease-in-out",
              isHovered ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0",
            )}
          >
            {user.email}
          </p>
          <EllipsisIcon
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 ease-in-out",
              isHovered ? "max-w-[16px] opacity-100" : "max-w-0 opacity-0",
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
