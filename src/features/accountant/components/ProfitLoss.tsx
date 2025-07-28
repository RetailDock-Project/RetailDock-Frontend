import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfitAndTradingAc } from "../../../services/api/AccountsApi/accountsApi";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/ui/reusable/Loader";


type TransformedItem = {
  label: string;
  value: number;
  bold?: boolean;

}
const ProfitLoss: React.FC = () => {
  const navigate = useNavigate();

  
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
      {
        label: "Direct Income",
        value: data.grossProfitSection.netDirectIncome,
        groupId: data.grossProfitSection.directIncomeGroupId,
      },
      {
        label: "Direct Expense", value: data.grossProfitSection.netDirectExpense,
        groupId: data.grossProfitSection.directExpenseGroupId,
      },

      {
        label: "Gross Profit",
        value: data.grossProfitSection.grossProfit,
        bold: true,
      },
      {
        label: "Indirect Income",
        value: data.plAcoountsSection.netIndirectIncome,
        groupId: data.plAcoountsSection.indirectIncomeGroupId,
      },
      {
        label: "Indirect Expense",
        value: data.plAcoountsSection.netIndirectExpense,
        groupId: data.plAcoountsSection.indirectExpenseGroupId,
      },
      { label: "Net Profit", value: data.netProfit, bold: true },
    ]
    : [];



  const handleClick = (groupId: any) => {
    if (groupId) {
      navigate(`/home/accountant/financial-statement/groupAndLedgerDetails/${groupId}`); // Your route with ID
    }
  };




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
        <div className="text-center py-6 text-sm text-gray-500"><Loader/></div>
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
            <tbody>
              {transformedData.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => item.groupId && handleClick(item.groupId)}
                  className={`hover:bg-gray-100 ${item.groupId ? "cursor-pointer" : ""}`}
                >
                  <td className={`px-4 py-2 ${item.bold ? "font-semibold" : ""}`}>
                    {item.label}
                  </td>
                  <td
                    className={`px-4 py-2 text-right ${item.value < 0 ? "text-red-600" : "text-gray-800"
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
