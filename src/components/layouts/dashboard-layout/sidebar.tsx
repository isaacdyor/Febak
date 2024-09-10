"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { dashboardConfig } from "@/config/dashboard-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { UserMenu } from "./user-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Sidebar: React.FC = () => {
  const segment = useSelectedLayoutSegment();
  const [isHovered, setIsHovered] = useState(true);

  const sidebarItems = useMemo(() => {
    return dashboardConfig.map((item) => {
      const Icon = Icons[item.icon as keyof typeof Icons];
      return (
        <Link
          href={item.url}
          key={item.label}
          className={cn(
            "flex h-10 items-center rounded-md text-sm text-muted-foreground hover:bg-secondary",
            item.url.startsWith(`/${segment}`) ? "bg-secondary" : "",
            isHovered ? "justify-start px-3" : "w-10 justify-center",
          )}
        >
          <Icon className="h-5 w-5" />
          {isHovered && <span className="ml-3">{item.label}</span>}
        </Link>
      );
    });
  }, [segment, isHovered]);

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col justify-between border-r bg-red-500 p-2 ease-in-out",
        isHovered ? "w-64" : "w-14 items-center",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex flex-col space-y-6 bg-blue-500",
          !isHovered && "items-center",
        )}
      >
        <div className="flex items-center">
          {isHovered ? (
            <Logo />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center text-2xl font-semibold">
              F
            </span>
          )}
        </div>
        <nav className="flex flex-col space-y-1">{sidebarItems}</nav>
      </div>

      <UserMenu isHovered={isHovered} />
    </div>
  );
};
