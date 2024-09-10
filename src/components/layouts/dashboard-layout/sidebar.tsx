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
  const [isHovered, setIsHovered] = useState(true);

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
          <Icon className="h-5 w-5" />
          {isHovered && <span className="ml-3">{item.label}</span>}
        </Link>
      );
    });
  }, [segment, isHovered]);

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col justify-between border-r px-2 py-4 ease-in-out",
        isHovered ? "w-52 max-w-52" : "w-14",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex flex-col justify-center space-y-6",
          // !isHovered && "items-center",
        )}
      >
        <div className="flex w-full items-center px-3">
          {isHovered ? (
            <Logo />
          ) : (
            <Link href="/" as="/">
              <h1 className="text-2xl font-semibold tracking-tighter text-primary">
                F
              </h1>
            </Link>
          )}
        </div>
        <nav className="flex flex-col space-y-1">{sidebarItems}</nav>
      </div>

      <UserMenu isHovered={isHovered} />
    </div>
  );
};
