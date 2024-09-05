import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const NavButtons: React.FC<{ isOpen?: boolean }> = ({ isOpen }) => {
  const isLoggedIn = false;
  return (
    <>
      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "h-8 w-full",
            !isOpen ? "lg:w-auto lg:text-xs" : "null",
          )}
        >
          Dashboard
        </Link>
      ) : (
        <>
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "h-8 w-full",
              !isOpen ? "lg:w-auto lg:text-xs" : "null",
            )}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "sm" }),
              "h-8 w-full",
              !isOpen ? "lg:w-auto lg:text-xs" : "null",
            )}
          >
            Get started
          </Link>
        </>
      )}
    </>
  );
};
