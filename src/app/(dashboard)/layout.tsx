import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { UserProvider } from "@/features/auth/auth-provider";
import { VisitorChat } from "@/features/visitor-chat/components";
import { getUser } from "@/lib/supabase/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const { user } = await getUser();
  if (!user) return null;
  return (
    <>
      <UserProvider user={user}>
        <DashboardLayout>
          <VisitorChat />
          {children}
        </DashboardLayout>
      </UserProvider>
    </>
  );
};

export default RootLayout;
