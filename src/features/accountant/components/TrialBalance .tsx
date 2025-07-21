import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllLedgers } from "../../../services/api/AccountsApi/accountsApi";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/ui/reusable/Loader";

const TrialBalance: React.FC = () => {
    const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    fromDate: null,
    toDate: null,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["allLedgers", dateRange.fromDate, dateRange.toDate],
    queryFn: () =>
      getAllLedgers(
        dateRange.fromDate ? dateRange.fromDate.toISOString() : null,
        dateRange.toDate ? dateRange.toDate.toISOString() : null
      ),
  });

  const closingData = data || [];

  const totalDebit = closingData
    .filter((item: any) => item.closingType === "Dr")
    .reduce((sum: number, item: any) => sum + item.closingBalance, 0);

  const totalCredit = closingData
    .filter((item: any) => item.closingType === "Cr")
    .reduce((sum: number, item: any) => sum + item.closingBalance, 0);

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex justify-between items-start md:items-center mb-4 flex-col md:flex-row gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Trial Balance</h2>
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
        <div className="text-center py-6 text-sm text-gray-500"><Loader/></div>
      ) : error ? (
        <div className="text-red-500 text-sm">Failed to fetch data</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-t border-gray-200">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-2">Account</th>
                <th className="px-4 py-2 text-right">Debit</th>
                <th className="px-4 py-2 text-right">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {closingData.map((item: any, index: number) => (
                <tr key={index} onClick={() =>
                            navigate(`/home/accountant/ledgertransactionhistory/${item.ledgerId}`)
                          }>
                  <td className="px-4 py-2 text-gray-700">{item.ledgerName}</td>
                  <td className="px-4 py-2 text-right text-gray-800">
                    {item.closingType === "Dr"
                      ? `₹${item.closingBalance.toLocaleString()}`
                      : ""}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-800">
                    {item.closingType === "Cr"
                      ? `₹${item.closingBalance.toLocaleString()}`
                      : ""}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold text-gray-900 bg-gray-50">
                <td className="px-4 py-2">Total</td>
                <td className="px-4 py-2 text-right">
                  ₹{totalDebit.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right">
                  ₹{totalCredit.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrialBalance;
