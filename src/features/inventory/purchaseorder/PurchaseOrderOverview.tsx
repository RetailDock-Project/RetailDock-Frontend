import React from "react";
import { getPurchaseOrderStats } from "../../../services/api/inventoryapi/inventoryApi";
import { useQuery } from "@tanstack/react-query";

type OverviewCard = {
  title: string;
  primary: string;
  secondary: string;
  color?: string;
};

export const PurchaseOrderOverview: React.FC = () => {
  const { data: purchaseOrderStats, isLoading } = useQuery({
    queryKey: ["purchaseOrderStats"],
    queryFn: () => getPurchaseOrderStats(),
    select: (data) => data.data,
  });

  if (isLoading || !purchaseOrderStats) {
    return <div>Loading...</div>;
  }

  const stats: OverviewCard[] = [
    {
      title: "Total Orders",
      primary: purchaseOrderStats.totalOrders.toString(),
      secondary: `${purchaseOrderStats.currentMonthOrders} this month`,
    },
    {
      title: "Total Value",
      primary: `₹${purchaseOrderStats.totalValue.toLocaleString("en-IN")}`,
      secondary: `Avg. ₹${purchaseOrderStats.avgValue.toFixed(2)}`,
    },
    {
      title: "Pending Orders",
      primary: purchaseOrderStats.pendingOrders.toString(),
      secondary: `₹${purchaseOrderStats.pendingValue.toLocaleString(
        "en-IN"
      )} value`,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((card, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl border bg-white shadow hover:shadow-md transition"
        >
          <h3 className="text-sm text-gray-500 font-medium mb-1">
            {card.title}
          </h3>
          <div
            className={`text-2xl font-bold text-gray-800 ${card.color || ""}`}
          >
            {card.primary}
          </div>
          <div className="text-xs text-gray-500 mt-1">{card.secondary}</div>
        </div>
      ))}
    </div>
  );
};
