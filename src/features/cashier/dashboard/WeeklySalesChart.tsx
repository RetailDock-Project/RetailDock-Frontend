import React from "react";
import BarChartWithSideLabels from "../../../components/ui/reusable/BarChartWithSideLabels";

const WeeklySalesChart: React.FC = () => (
  <div className="bg-white p-6 rounded-xl border shadow-sm min-h-[300px]">
    <h2 className="text-lg font-semibold mb-4">Weekly Sales</h2>
    <div className="text-gray-400 text-center pt-6">
      <BarChartWithSideLabels />
    </div>
  </div>
);

export default WeeklySalesChart;
