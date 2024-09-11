import { Menu, X } from "lucide-react";
import { useDashboard } from "./use-dashboard";
import { Logo } from "@/components/logo";

export const TopbarMobile = () => {
  const { isOpen, setIsOpen } = useDashboard();
  return (
    <div className="flex shrink-0 items-center justify-between border-b px-5 py-4 text-muted-foreground md:hidden">
      <Logo />
      <div className="rounded-md p-1 hover:cursor-pointer hover:bg-secondary">
        {isOpen ? (
          <X onClick={() => setIsOpen(false)} />
        ) : (
          <Menu onClick={() => setIsOpen(true)} />
        )}
      </div>
    </div>
  );
};
