import React from "react";
import SideBar from "./components//SideBar";
import AppHeader from "./components/AppHeader";
import { SidebarProvider } from "../components/ui/sidebar"; // ✅ Make sure the path is correct
import { Outlet } from "react-router-dom";

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      {" "}
      {/* ✅ Wrap the layout in SidebarProvider */}
      <div className="flex min-h-screen bg-gray-50 w-[100%]">
        {/* Sidebar */}
        <div className="w-64">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <AppHeader />
          <main className="p-6 flex-1 overflow-y-auto">{children}</main>
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
