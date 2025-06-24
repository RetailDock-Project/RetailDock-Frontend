import React from "react";
import { Gauge, ShoppingBag, FileText, Users, Undo2 } from "lucide-react";

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
  roles: ["cashier", "staff"],
  permissions: ["view_cashier"],
};

const cashierMenuItems = [
  { title: "Dashboard", url: "/cashier/dashboard", icon: Gauge },
  { title: "POS", url: "/cashier/pos", icon: ShoppingBag },
  { title: "Invoices", url: "/cashier/invoices", icon: FileText },
  { title: "Customers", url: "/cashier/customers", icon: Users },
  { title: "Sales Return", url: "/cashier/sales-returns", icon: Undo2 },
];

const hasCashierAccess = () => {
  return (
    currentUser.roles.includes("cashier") &&
    currentUser.permissions.includes("view_cashier")
  );
};

const Cashier: React.FC = () => {
  if (!hasCashierAccess()) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm text-green-500 uppercase mb-1">
        Cashier
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {cashierMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 hover:bg-green-500 hover:text-white transition-colors duration-200 text-white"
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

export default Cashier;
