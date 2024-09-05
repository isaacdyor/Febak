import { Nav } from "@/components/nav";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <>
      <Nav />

      {children}
    </>
  );
};

export default RootLayout;
