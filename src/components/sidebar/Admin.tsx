import React from "react";
import { UserCog, PlusCircle, ShieldCheck, Settings2 } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

// Dummy user (replace with context or Redux later)
const currentUser = {
  name: "Sabith",
  roles: ["admin", "staff"],
  permissions: ["manage_users", "assign_roles", "give_permissions"],
};

const adminMenuItems = [
  { title: "Manage Users", url: "/home/admin/manage-users", icon: UserCog },
  {
    title: "Manage Role",
    url: "/home/admin/manage-roles",
    icon: ShieldCheck,
  },
];

const hasAdminAccess = () => {
  return (
    currentUser.roles.includes("admin") &&
    currentUser.permissions.includes("manage_users")
  );
};

const Admin: React.FC = () => {
  if (!hasAdminAccess()) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm text-purple-500 uppercase mb-1">
        Admin
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {adminMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-500 hover:text-white transition-colors duration-200 text-white"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm hover:text-purple-200">
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Admin;
