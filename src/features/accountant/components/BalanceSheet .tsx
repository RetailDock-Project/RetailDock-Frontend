import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBalanceSheet } from "../../../services/api/AccountsApi/accountsApi";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";

const BalanceSheet: React.FC = () => {
  const [dateRange, setDateRange] = useState<{
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    fromDate: null,
    toDate: null,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["balanceSheet", dateRange.fromDate, dateRange.toDate],
    queryFn: () =>
      getBalanceSheet(
        dateRange.fromDate ? dateRange.fromDate.toISOString() : null,
        dateRange.toDate ? dateRange.toDate.toISOString() : null
      ),
  });

  const assets = data?.items?.filter((item: any) => item.side === "Asset") || [];
  const liabilities = data?.items?.filter((item: any) => item.side === "Liability") || [];
  const totalAssets = data?.totalAssets || 0;
  const totalLiabilities = data?.totalLiabilities || 0;

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start md:items-center mb-4 flex-col md:flex-row gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Balance Sheet
          </h2>
          <p className="text-sm text-gray-500">Select date range to filter report</p>
        </div>
        <div className="w-full sm:w-auto">
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
        <div className="text-center text-sm text-gray-500 py-4">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-sm">Failed to fetch data</div>
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
              {/* Assets */}
              <tr className="bg-gray-100">
                <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 uppercase">
                  Assets
                </td>
              </tr>
              {assets.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-gray-700">{item.groupName}</td>
                  <td className="px-4 py-2 text-right text-gray-800">
                    ₹{item.netAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-2 font-semibold text-gray-900">Total Assets</td>
                <td className="px-4 py-2 font-semibold text-right text-gray-900">
                  ₹{totalAssets.toLocaleString()}
                </td>
              </tr>

              {/* Liabilities */}
              <tr className="bg-gray-100">
                <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 uppercase">
                  Liabilities
                </td>
              </tr>
              {liabilities.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-gray-700">{item.groupName}</td>
                  <td className="px-4 py-2 text-right text-gray-800">
                    ₹{item.netAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-2 font-semibold text-gray-900">Total Liabilities</td>
                <td className="px-4 py-2 font-semibold text-right text-gray-900">
                  ₹{totalLiabilities.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BalanceSheet;
