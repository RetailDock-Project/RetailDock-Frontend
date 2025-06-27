import React from "react";
import { Eye } from "lucide-react";

const inventoryStats = [
  {
    label: "Total Products",
    value: "1,247",
    note: "+12% from last month",
    icon: "📦",
  },
  {
    label: "Inventory Value",
    value: "₹28,45,000",
    note: "+8% from last month",
    icon: "💰",
  },
  {
    label: "Turnover Rate",
    value: "4.2x",
    note: "+0.3x from last month",
    icon: "📈",
  },
  {
    label: "Warehouse Capacity",
    value: "85%",
    note: "Near capacity limit",
    icon: "🏢",
  },
  {
    label: "Out of Stock",
    value: "5",
    note: "Items requiring immediate restocking",
    icon: "❌",
  },
  {
    label: "Low Stock",
    value: "23",
    note: "Below minimum threshold",
    icon: "⚠️",
  },
  { label: "Expiring Soon", value: "7", note: "Within 30 days", icon: "⏰" },
  {
    label: "Optimal Stock",
    value: "1219",
    note: "Well-stocked items",
    icon: "✅",
  },
];

const InventoryOverviewStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {inventoryStats.map((stat, i) => (
      <div
        key={i}
        className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-1"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-gray-500 font-medium">{stat.label}</h3>
          <span className="text-xl">{stat.icon}</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
        <p className="text-xs text-gray-400">{stat.note}</p>
      </div>
    ))}
  </div>
);

export default InventoryOverviewStats;
