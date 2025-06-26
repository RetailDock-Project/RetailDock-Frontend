import React from "react";

type OverviewCard = {
  title: string;
  primary: string;
  secondary: string;
  color?: string;
};

const stats: OverviewCard[] = [
  {
    title: "Total Orders",
    primary: "5",
    secondary: "0 this month",
  },
  {
    title: "Total Value",
    primary: "₹2,20,400",
    secondary: "Avg. ₹44,080",
  },
  {
    title: "Pending Orders",
    primary: "2",
    secondary: "₹55,400 value",
    color: "text-yellow-600",
  },
];

export const PurchaseOrderOverview: React.FC = () => {
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
