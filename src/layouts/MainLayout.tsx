import React, { useState } from "react";
import SideBar from "./components/SideBar";
import AppHeader from "./components/AppHeader";
import { SidebarProvider } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 w-full relative">
        {/* Sidebar */}
        <div
          className={`
              fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0 md:static
            `}
        >
          <SideBar />
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <div className="flex flex-col flex-1 transition-all">
          <AppHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          {/* <main className="p-6 flex-1 overflow-y-auto">{children}</main> */}
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
