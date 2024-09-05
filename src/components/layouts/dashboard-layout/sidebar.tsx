"use client";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";
import { dashboardConfig } from "@/config/dashboard-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { UserMenu } from "./user-menu";

export const Sidebar: React.FC = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex h-screen w-60 flex-col justify-between border-r p-4">
      <div className="flex flex-col gap-8">
        <Logo />
        <div className="flex flex-col gap-1">
          {dashboardConfig.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons];
            return (
              <Link
                href={item.url}
                key={item.label}
                className={cn(
                  "text-muted-foreground hover:bg-secondary flex w-full items-center gap-2 rounded-md px-2 py-2 hover:cursor-pointer",
                  item.url.startsWith(`/${segment}`) ? "bg-secondary" : "",
                )}
              >
                <Icon stroke="hsl(var(--muted-foreground))" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <UserMenu />
    </div>
  );
};
