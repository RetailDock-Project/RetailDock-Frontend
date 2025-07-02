import React from "react";
import OverviewCard from "./OverviewCard";

const OverviewSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <OverviewCard
        title="Today's Sales"
        value="₹20,460"
        subtitle="3 transactions"
        change="↑ 18% from yesterday"
        changeColor="text-green-600"
      />
      <OverviewCard
        title="This Week"
        value="₹1,40,000"
        subtitle="Weekly target: ₹1,50,000"
        change="↑ 12% from last week"
        changeColor="text-green-600"
      />
      <OverviewCard
        title="Avg. Transaction"
        value="₹1,800"
        subtitle="Per sale average"
        change="↑ 5% from last month"
        changeColor="text-green-600"
      />
      <OverviewCard
        title="Returns"
        value="3.2%"
        subtitle="Return rate this week"
        change="↓ 1.5% from last week"
        changeColor="text-red-600"
      />
    </div>
  );
};

export default OverviewSection;
