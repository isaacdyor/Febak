import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { UserProvider } from "@/features/auth/auth-provider";
import { getUser } from "@/lib/supabase/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const { user } = await getUser();
  if (!user) return null;
  return (
    <>
      <UserProvider user={user}>
        <DashboardLayout>{children}</DashboardLayout>
      </UserProvider>
    </>
  );
};

export default RootLayout;
