import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";
import { type Dispatch, type SetStateAction } from "react";

import { DEFAULT_EASE } from "@/lib/framer";

import { NavButtons } from "./nav-buttons";
import { X } from "lucide-react";
import { Logo } from "../logo";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

interface MenuItemType {
  label: string;
  url: string;
}

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navItems: MenuItemType[];
}

export const MobileMenu = ({ open, setOpen, navItems }: Props) => {
  const segment = useSelectedLayoutSegment();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.15, staggerChildren: 0.05, ease: DEFAULT_EASE },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: DEFAULT_EASE },
    },
    exit: { opacity: 0, transition: { duration: 0.05 } },
  };
  const Menu = () => (
    <>
      {navItems.map((menuItem: MenuItemType) => (
        <m.div variants={listItem} key={menuItem.label}>
          <Link
            href={menuItem.url}
            onMouseDown={() => setOpen(false)}
            className={cn(
              "hover:bg-background/10 text-muted-foreground block py-1.5 pl-3 pr-4 text-base font-medium",
              menuItem.url.startsWith(`/${segment}`) ? "text-foreground" : "",
            )}
          >
            {menuItem.label}
          </Link>
        </m.div>
      ))}
    </>
  );

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-secondary fixed inset-0 z-50 h-screen max-h-screen w-screen transform overflow-hidden supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]"
          >
            <div className="bg-overlay before:content[''] before:from-background-overlay absolute left-0 top-0 z-50 flex h-16 w-screen items-center justify-between px-6 before:absolute before:inset-0 before:top-full before:h-3 before:w-full before:bg-gradient-to-b before:to-transparent">
              <Logo />
              <button
                onMouseDown={() => setOpen(false)}
                type="button"
                className="text-foreground-lighter focus:ring-brand bg-surface-100 hover:bg-surface-200 inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset"
              >
                <span className="sr-only">Close menu</span>
                <X className="text-muted-foreground" />
              </button>
            </div>
            <div className="max-h-screen overflow-y-auto px-4 pb-32 pt-20 supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]">
              <Menu />
            </div>
            <div className="bg-background absolute bottom-0 left-0 right-0 top-auto flex w-full items-stretch gap-4 p-4">
              <NavButtons isOpen={open} />
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {open && (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="bg-background fixed inset-0 z-40 h-screen w-screen transform overflow-hidden"
          />
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};
