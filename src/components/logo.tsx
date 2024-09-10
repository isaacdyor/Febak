import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" as="/">
      <h1 className="text-2xl font-semibold tracking-tighter text-primary">
        Febak
      </h1>
    </Link>
  );
};
