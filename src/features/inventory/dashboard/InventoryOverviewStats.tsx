import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsOverview } from "../../../services/api/inventoryapi/inventoryApi";
import { Loader2 } from "lucide-react";

const InventoryOverviewStats = () => {
  const {
    data: productOverview,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productOverview"],
    queryFn: getProductsOverview,
    select: (res) => res.data,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  if (isError || !productOverview) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load inventory overview.
      </div>
    );
  }

  const stats = [
    {
      label: "Total Products",
      value: productOverview.totalProducts,
      note: `${productOverview.activeProducts} active`,
      icon: "📦",
    },
    {
      label: "Inventory Value",
      value: `₹${productOverview.totalInventoryValue.toLocaleString()}`,
      note: "Total stock value",
      icon: "💰",
    },
    {
      label: "Out of Stock",
      value: productOverview.outOfStockProducts,
      note: "Items requiring restock",
      icon: "❌",
    },
    {
      label: "Low Stock",
      value: productOverview.lowStockProducts,
      note: "Below minimum threshold",
      icon: "⚠️",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
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
};

export default InventoryOverviewStats;
