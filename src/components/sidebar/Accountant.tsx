import React from "react";
import {
  Gauge,
  FileText,
  FileCheck,
  ScrollText,
  Coins,
  ClipboardList,
  NotebookPen,
} from "lucide-react";

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
  roles: ["accountant", "staff"],
  permissions: ["view_accountant"],
};

const accountantMenuItems = [
  { title: "Dashboard", url: "/home/accountant/dashboard", icon: Gauge },
  {
    title: "Financial Statements",
    url: "/home/accountant/financial-statements",
    icon: FileText,
  },
  { title: "Tax Report", url: "/home/accountant/tax-report", icon: FileCheck },
  { title: "Invoice", url: "/home/accountant/invoices", icon: ScrollText },
  {
    title: "Voucher Entry",
    url: "/home/accountant/transaction",
    icon: Coins,
  },
  {
    title: "Voucher Report",
    url: "/home/accountant/voucher-report",
    icon: ClipboardList,
  },
  {
    title: "Ledger Report",
    url: "/home/accountant/ledger-details",
    icon: NotebookPen,
  },
];

const hasAccountantAccess = () => {
  return (
    currentUser.roles.includes("accountant") &&
    currentUser.permissions.includes("view_accountant")
  );
};

const Accountant: React.FC = () => {
  if (!hasAccountantAccess()) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm text-blue-500 uppercase mb-1">
        Accountant
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {accountantMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-500 hover:text-white transition-colors duration-200 text-white"
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

export default Accountant;
