import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Sample weekly sales data
const data = [
  { name: "Mon", sales: 12000 },
  { name: "Tue", sales: 17000 },
  { name: "Wed", sales: 15000 },
  { name: "Thu", sales: 19000 },
  { name: "Fri", sales: 24000 },
  { name: "Sat", sales: 32000 },
  { name: "Sun", sales: 14000 },
];

const BarChartWithSideLabels: React.FC = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 50, left: 30, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            axisLine={false}
            tickLine={false}
            stroke="#64748b"
            fontSize={12}
          />
          <Tooltip
            formatter={(value) =>
              typeof value === "number" ? `₹${value.toLocaleString()}` : value
            }
          />
          <Bar
            dataKey="sales"
            fill="#2563eb"
            radius={[6, 6, 0, 0]}
            barSize={30}
          >
            {/* Label above bar */}
            <LabelList
              dataKey="sales"
              position="top"
              formatter={(label) =>
                typeof label === "number" ? `₹${label.toLocaleString()}` : label
              }
              fill="#1e40af"
              style={{ fontSize: "12px" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartWithSideLabels;
