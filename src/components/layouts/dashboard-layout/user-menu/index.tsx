import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisIcon } from "lucide-react";

import { useUser } from "@/features/auth/use-user";
import { cn } from "@/lib/utils";
import { useDashboard } from "../use-dashboard";
import { LogoutButton } from "./logout-button";
import { ToggleTheme } from "./toggle-theme";

export const UserMenu = () => {
  const { user } = useUser();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { isOpen } = useDashboard();

  useEffect(() => {
    if (!isOpen) {
      setPopoverOpen(false);
    }
  }, [isOpen, popoverOpen]);

  const handleOpenChange = (open: boolean) => {
    setPopoverOpen(open);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild onClick={() => setPopoverOpen(!popoverOpen)}>
        <div
          className={cn(
            "group flex items-center gap-2 rounded-md px-1 py-1 transition-all duration-300 ease-in-out",
            isOpen ? "w-full hover:cursor-pointer hover:bg-secondary" : "w-9",
          )}
        >
          <Avatar
            className={cn(
              "h-7 w-7 transition-all duration-300 ease-in-out",
              !isOpen && "hover:cursor-pointer",
            )}
          >
            <AvatarFallback
              className={cn(
                "border bg-background text-sm transition-colors duration-300 ease-in-out",
                !isOpen && "hover:bg-secondary",
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
              isOpen ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0",
            )}
          >
            {user.email}
          </p>
          <EllipsisIcon
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 ease-in-out",
              isOpen ? "max-w-[16px] opacity-100" : "max-w-0 opacity-0",
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("w-48 p-1", !isOpen && "hidden")}>
        <div className="flex flex-col gap-1">
          <ToggleTheme />
          <LogoutButton />
        </div>
      </PopoverContent>
    </Popover>
  );
};
