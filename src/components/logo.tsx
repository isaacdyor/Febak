import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" as="/">
      <p className="text-xl">Febak</p>
    </Link>
  );
};
