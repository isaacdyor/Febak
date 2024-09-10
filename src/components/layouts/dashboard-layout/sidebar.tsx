"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { dashboardConfig } from "@/config/dashboard-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useMemo, useState } from "react";
import { UserMenu } from "./user-menu";

export const Sidebar: React.FC = () => {
  const segment = useSelectedLayoutSegment();
  const [isHovered, setIsHovered] = useState(false);

  const sidebarItems = useMemo(() => {
    return dashboardConfig.map((item) => {
      const Icon = Icons[item.icon as keyof typeof Icons];
      return (
        <Link
          href={item.url}
          key={item.label}
          className={cn(
            "flex h-10 items-center rounded-md px-2 text-sm text-muted-foreground hover:bg-secondary",
            item.url.startsWith(`/${segment}`) ? "bg-secondary" : "",
          )}
        >
          <div className="flex w-full items-center overflow-hidden">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                "ml-3 transition-all duration-300",
                isHovered ? "w-auto opacity-100" : "w-0 opacity-0",
              )}
            >
              {item.label}
            </span>
          </div>
        </Link>
      );
    });
  }, [segment, isHovered]);

  return (
    <div className="flex">
      <div className="h-screen w-14" />
      <div
        className={cn(
          "absolute z-40 flex h-screen flex-col justify-between border-r bg-background px-2 py-4 transition-all duration-300",
          isHovered ? "w-52 max-w-52" : "w-14",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn("h flex flex-col justify-center space-y-6")}>
          <div className="flex w-full items-center px-3">
            <Logo full={isHovered} />
          </div>

          <nav className="flex flex-col space-y-1">{sidebarItems}</nav>
        </div>

        <UserMenu isHovered={isHovered} />
      </div>
    </div>
  );
};
