"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  getLast7MonthIncome,
  getLast7MonthOrgRegistrations,
} from "../../../services/api/developerApi/developerApi";

// const usersData = [
//   { name: "Jan", users: 400 },
//   { name: "Feb", users: 300 },
//   { name: "Mar", users: 500 },
//   { name: "Apr", users: 278 },
//   { name: "May", users: 390 },
// ];

// const revenueData = [
//   { month: "Jan", revenue: 32000 },
//   { month: "Feb", revenue: 45000 },
//   { month: "Mar", revenue: 38000 },
//   { month: "Apr", revenue: 50000 },
//   { month: "May", revenue: 47000 },
// ];

const DashboardBarChart: React.FC = () => {
  const { data: usersData } = useQuery({
    queryKey: ["orgRegData"],
    queryFn: getLast7MonthOrgRegistrations,
    select: (res) => res.data,
  });

  const { data: revenueData } = useQuery({
    queryKey: ["revenueData"],
    queryFn: getLast7MonthIncome,
    select: (res) => res.data,
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 📊 Bar Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Monthly Orgnization Registrations
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={usersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 Line Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          Monthly Revenue Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="linear"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardBarChart;
