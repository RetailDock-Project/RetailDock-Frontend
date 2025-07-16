import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfitAndTradingAc } from "../../../services/api/AccountsApi/accountsApi";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";

const ProfitLoss: React.FC = () => {
  const [dateRange, setDateRange] = useState<{
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    fromDate: null,
    toDate: null,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["profitLoss", dateRange.fromDate, dateRange.toDate],
    queryFn: () =>
      getProfitAndTradingAc(
       dateRange.fromDate ? dateRange.fromDate.toISOString() : "",
      dateRange.toDate ? dateRange.toDate.toISOString() : ""
      ),
  
  });

  const transformedData = data
    ? [
        { label: "Direct Income", value: data.grossProfitSection.netDirectIncome },
        { label: "Direct Expense", value: data.grossProfitSection.netDirectExpense },
        {
          label: "Gross Profit",
          value: data.grossProfitSection.grossProfit,
          bold: true,
        },
        {
          label: "Indirect Income",
          value: data.plAcoountsSection.netIndirectIncome,
        },
        {
          label: "Indirect Expense",
          value: data.plAcoountsSection.netIndirectExpense,
        },
        { label: "Net Profit", value: data.netProfit, bold: true },
      ]
    : [];

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Profit & Loss Statement
          </h2>
          <p className="text-sm text-gray-500">
            Select a date range to view the report
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full sm:w-auto">
          <DateRangePicker
            onChange={(range) =>
              setDateRange({
                fromDate: range.startDate,
                toDate: range.endDate,
              })
            }
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-6 text-sm text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-sm">Failed to load data</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-t border-gray-200">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transformedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className={`px-4 py-2 ${item.bold ? "font-semibold" : ""}`}>
                    {item.label}
                  </td>
                  <td
                    className={`px-4 py-2 text-right ${
                      item.value < 0 ? "text-red-600" : "text-gray-800"
                    } ${item.bold ? "font-semibold" : ""}`}
                  >
                    {item.value < 0
                      ? `- ₹${Math.abs(item.value).toLocaleString()}`
                      : `₹${item.value.toLocaleString()}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfitLoss;
