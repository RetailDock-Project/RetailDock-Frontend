import React from "react";

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabs = ["Sales Activity", "Returns"];

const DashboardTabs: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-4 text-sm text-gray-600 font-medium">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 ${
            activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : ""
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabs;
