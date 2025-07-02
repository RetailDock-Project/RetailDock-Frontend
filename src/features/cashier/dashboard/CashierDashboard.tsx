import React, { useState } from "react";
import OverviewSection from "./OverviewSection";
import DashboardTabs from "./DashboardTabs";
import WeeklySalesChart from "./WeeklySalesChart";
import RecentSales from "./RecentSales";
import ReturnList from "./ReturnList";

const CashierDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Sales Activity");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Welcome Cashier</h1>

      <OverviewSection />
      <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Sales Activity" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklySalesChart />
          <RecentSales />
        </div>
      )}

      {activeTab === "Returns" && <ReturnList />}
    </div>
  );
};

export default CashierDashboard;
