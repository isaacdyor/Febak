"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { dashboardConfig } from "@/config/dashboard-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useMemo } from "react";
import { useDashboard } from "./use-dashboard";
import { UserMenu } from "./user-menu";

export const MainNav: React.FC = () => {
  const segment = useSelectedLayoutSegment();
  const { isOpen, setIsOpen } = useDashboard();

  const sidebarItems = useMemo(() => {
    return dashboardConfig.map((item) => {
      const Icon = Icons[item.icon as keyof typeof Icons];
      return (
        <Link
          href={item.url}
          key={item.label}
          className={cn(
            "flex h-10 items-center rounded-md px-2.5 text-sm text-muted-foreground hover:bg-secondary",
            item.url.startsWith(`/${segment}`) ? "bg-secondary" : "",
          )}
        >
          <div className="flex w-full items-center overflow-hidden">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                "ml-3 transition-all duration-300",
                isOpen ? "w-auto opacity-100" : "w-0 opacity-0",
              )}
            >
              {item.label}
            </span>
          </div>
        </Link>
      );
    });
  }, [segment, isOpen]);

  return (
    <div
      className={cn(
        "absolute z-40 flex h-full bg-background transition-transform duration-300 ease-in-out md:static",
        "w-52 md:w-auto",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className="hidden h-screen w-14 md:block" />
      <div
        className={cn(
          "absolute z-40 flex h-screen flex-col justify-between border-r bg-background px-2 py-4 transition-all duration-300",
          isOpen ? "w-52 max-w-52" : "w-14",
        )}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="h flex flex-col justify-center space-y-6">
          <div className="flex w-full items-center px-3">
            <Logo full={isOpen} />
          </div>

          <nav className="flex flex-col space-y-1">{sidebarItems}</nav>
        </div>

        <UserMenu />
      </div>
    </div>
  );
};
