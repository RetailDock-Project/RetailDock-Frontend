import React from "react";
import { Gauge, Users, CreditCard, Settings } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

// Dummy user
const currentUser = {
  name: "Sabith",
  roles: ["manager", "superadmin"],
  permissions: ["view_superadmin"],
};

const superAdminMenuItems = [
  { title: "Dashboard", url: "super-admin/dashboard", icon: Gauge },
  { title: "Customers", url: "super-admin/customers", icon: Users },
  {
    title: "Subscription Plans",
    url: "super-admin/subscriptions",
    icon: CreditCard,
  },
  { title: "Settings", url: "super-admin/settings", icon: Settings },
];

const hasSuperAdminAccess = () => {
  return (
    currentUser.roles.includes("superadmin") &&
    currentUser.permissions.includes("view_superadmin")
  );
};

const SuperAdmin: React.FC = () => {
  if (!hasSuperAdminAccess()) return null;

  return (
    <SidebarGroup className="p-1">
      <SidebarGroupLabel className="text-sm text-blue-800 uppercase mb-1">
        Super Admin
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {superAdminMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-900 hover:bg-blue-700 hover:text-blue-700 transition-colors duration-200 text-white"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SuperAdmin;
