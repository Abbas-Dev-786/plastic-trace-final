import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopHeader } from "./TopHeader";
import { Toaster } from "@/components/ui/toaster";
import useRole from "@/hooks/use-role";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function AppLayout() {
  const { data, isLoading } = useRole();
  const navigate = useNavigate();

  console.log("User Data:", data);

  useEffect(() => {
    if (!data?.user) {
      // toast({
      //   title: "Access Denied",
      //   description:
      //     "You do not have the required role to access this application.",
      //   variant: "destructive",
      // });

      navigate("/register", { replace: true });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar role={data?.user?.role} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopHeader />
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
