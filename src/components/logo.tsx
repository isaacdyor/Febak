import { cn } from "@/lib/utils";
import Link from "next/link";

export const Logo: React.FC<{ full?: boolean }> = ({ full = true }) => {
  return (
    <Link
      href="/"
      className="flex overflow-hidden text-2xl font-semibold tracking-tighter text-foreground"
    >
      <h1>F</h1>
      <div className="flex overflow-hidden">
        <h1
          className={cn(
            "ml-0 transition-all duration-300 ease-in-out",
            full
              ? "max-w-[4em] translate-x-0 opacity-100"
              : "max-w-0 -translate-x-2 opacity-0",
          )}
        >
          ebak
        </h1>
      </div>
    </Link>
  );
};
