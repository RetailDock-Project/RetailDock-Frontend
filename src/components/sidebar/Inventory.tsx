import React from "react";
import { Gauge, PackagePlus, ShoppingCart, RotateCcw } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";

// Dummy user data (can move to context later)
const currentUser = {
  name: "Sabith",
  roles: ["inventory", "staff"],
  permissions: ["view_inventory"],
};

const inventoryMenuItems = [
  { title: "Dashboard", url: "/inventory/dashboard", icon: Gauge },
  {
    title: "Purchase Order",
    url: "/inventory/purchase-orders",
    icon: PackagePlus,
  },
  { title: "Purchase", url: "/inventory/purchases", icon: ShoppingCart },
  {
    title: "Purchase Return",
    url: "/inventory/purchase-returns",
    icon: RotateCcw,
  },
];

const hasInventoryAccess = () => {
  return (
    currentUser.roles.includes("inventory") &&
    currentUser.permissions.includes("view_inventory")
  );
};

const Inventory: React.FC = () => {
  if (!hasInventoryAccess()) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm text-yellow-500 uppercase mb-1">
        Inventory
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {inventoryMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors duration-200 text-white"
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

export default Inventory;
