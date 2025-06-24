import { Sidebar, SidebarContent } from "../../components/ui/sidebar";
import SuperAdmin from "../../components/sidebar/SuperAdmin";
import Inventory from "../../components/sidebar/Inventory";
import Cashier from "../../components/sidebar/Cashier";

const currentUser = {
  name: "Sabith",
  roles: ["superadmin", "inventory"],
  permissions: ["view_superadmin", "view_inventory"],
};

const hasRole = (role: string) => currentUser.roles.includes(role);
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
        {hasRole("superadmin") && hasPermission("view_superadmin") && (
          <SuperAdmin />
        )}
        {hasRole("inventory") && hasPermission("view_inventory") && (
          <Inventory />
        )}
        {hasRole("cashier") && hasPermission("view_cashier") && <Cashier />}
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
