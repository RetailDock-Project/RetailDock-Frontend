import React from "react";
import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FaUserCircle } from "react-icons/fa";

interface AppHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  sidebarOpen,
  toggleSidebar,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      {/* Sidebar Toggle - Visible only on mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          {sidebarOpen ? (
            <PanelLeftClose size={24} />
          ) : (
            <PanelLeftOpen size={24} />
          )}
        </button>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center  gap-2">
          <div className="">
            <FaUserCircle className="text-2xl text-gray-500" />
          </div>
          <div className="d-flex flex-col">
            <strong className="text-sm block font-medium text-gray-700">
              {"Rahbar"}
            </strong>
            <small className="text-xs block font-medium text-gray-500">
              {"Inventory Manager"}
            </small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
