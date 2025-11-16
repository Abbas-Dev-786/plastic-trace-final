import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  QrCode,
  Camera,
  Wallet,
  Users,
  Trophy,
  Recycle,
  Leaf,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ROLES } from "@/constants";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.MANUFACTURER, ROLES.RECYCLER],
  },
  {
    title: "QR Manager",
    url: "/qr-manager",
    icon: QrCode,
    roles: [ROLES.ADMIN, ROLES.MANUFACTURER],
  },
  {
    title: "Scanner",
    url: "/scanner",
    icon: Camera,
    roles: [ROLES.RAG_PICKER, ROLES.ADMIN],
  },
  {
    title: "Wallet",
    url: "/wallet",
    icon: Wallet,
    roles: [
      ROLES.RAG_PICKER,
      ROLES.RECYCLER,
      ROLES.CITIZEN,
      ROLES.ADMIN,
      ROLES.MANUFACTURER,
    ],
  },
  {
    title: "Verification",
    url: "/verification",
    icon: Recycle,
    roles: [ROLES.MANUFACTURER, ROLES.RECYCLER],
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Trophy,
    roles: Object.values(ROLES),
  },
  // {
  //   title: "Profile",
  //   url: "/profile",
  //   icon: Users,
  //   roles: Object.values(ROLES),
  // },
];

export function AppSidebar({ role }: { role?: string }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const filteredItems = navigationItems.filter(
    (item) => item.roles.includes("all") || item.roles.includes(role || "")
  );

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-foreground">
                PlasticTrace
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">v1.0</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-2 sm:px-3 py-2 rounded-lg transition-colors min-h-[44px] ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && (
                        <span className="text-sm sm:text-base">
                          {item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 sm:p-4">
        <p className="text-sm text-center">Role:- {role}</p>
      </SidebarFooter>
    </Sidebar>
  );
}
