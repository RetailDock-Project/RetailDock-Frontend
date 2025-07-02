import { Sidebar, SidebarContent } from "../../components/ui/sidebar";
import SuperAdmin from "../../components/sidebar/SuperAdmin";
import Inventory from "../../components/sidebar/Inventory";
import Cashier from "../../components/sidebar/Cashier";
import Accountant from "../../components/sidebar/Accountant";

const currentUser = {
  name: "Sabith",
  roles: ["superadmin", "inventory"],
  permissions: [
    "view_superadmin",
    "view_inventory",
    "view_cashier",
    "view_accounts",
  ],
};

const hasPermission = (permission: string) =>
  currentUser.permissions.includes(permission);

const SideBar: React.FC = () => {
  return (
    <Sidebar>
      <SidebarContent className="p-3 overflow-y-scroll hide-scrollbar">
        {/* App Title */}
        <div className="mb-3 text-left">
          <h1 className="text-2xl font-extrabold text-blue-600">RetailDock</h1>
          <p className="text-xs text-gray-500 leading-tight">
            Complete Retail Business <br /> Management Solution
          </p>
        </div>
        {/* Conditionally render role-based sections */}
        {hasPermission("view_superadmin") && <SuperAdmin />}
        {hasPermission("view_inventory") && <Inventory />}
        {hasPermission("view_cashier") && <Cashier />}
        {hasPermission("view_accounts") && <Accountant />}
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
