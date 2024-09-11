import { ArrowUpRight, Bell } from "lucide-react";

export const TopbarDesktop = () => {
  return (
    <div className="hidden h-10 shrink-0 items-center justify-end gap-4 border-b px-6 text-muted-foreground md:flex">
      <p className="rounded-md border px-2 hover:cursor-pointer">Roadmap</p>
      <div className="flex items-center hover:cursor-pointer">
        <p>Docs</p>
        <ArrowUpRight className="h-5 w-5" />
      </div>
      <Bell className="h-5 w-5 hover:cursor-pointer" />
    </div>
  );
};
