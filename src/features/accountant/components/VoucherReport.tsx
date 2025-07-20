import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { GetAllVoucherTypes, getVoucherReport } from "../../../services/api/AccountsApi/accountsApi";

const VoucherReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [voucherTypeId, setVoucherTypeId] = useState<string>("");

  // Fetch all voucher types
  const { data: GetAllVoucherType } = useQuery<any>({
    queryKey: ["voucherTypes"],
    queryFn: GetAllVoucherTypes,
  });

  // Fetch report data based on voucherTypeId and dateRange
  const { data: reportData, isLoading, isError } = useQuery({
    queryKey: ["voucherReport", dateRange, voucherTypeId],
    queryFn: () => {
      const fromDate = dateRange.startDate?.toISOString() ?? "";
      const toDate = dateRange.endDate?.toISOString() ?? "";
      return getVoucherReport(fromDate, toDate, voucherTypeId);
    },
    enabled: !!voucherTypeId,
  });

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Voucher Report</h2>

        <div className="flex items-center gap-4">
          <select
            className="border px-3 py-2 rounded text-sm text-gray-700"
            value={voucherTypeId}
            onChange={(e) => setVoucherTypeId(e.target.value)}
          >
            <option value="">-- Select Voucher Type --</option>
            {GetAllVoucherType?.map((type: any) => (
              <option key={type.id} value={type.id}>
                {type.displayName}
              </option>
            ))}
          </select>

          <div className="border px-3 py-2 rounded text-sm text-gray-700">
            <DateRangePicker

              onChange={(range) => setDateRange(range)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Voucher Number</th>
              <th className="px-4 py-2">LedgerAccount</th>

              <th className="px-4 py-2 text-right">Debit</th>
              <th className="px-4 py-2 text-right">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-red-600">
                  Failed to load report.
                </td>
              </tr>
            )}

            {!isLoading && !isError && reportData?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No data available for selected filters.
                </td>
              </tr>
            )}

            {reportData?.map((txn: any, i: number) => (
              <tr key={i}>
                <td className="px-4 py-2"> {new Date(txn.voucherDate).toISOString().split("T")[0]}</td>
                <td className="px-4 py-2">{txn.voucherNumber}</td>
                <td className="px-4 py-2">{txn.ledgerName}</td>

                <td className="px-4 py-2 text-right">
                  {txn.isDebit ? `₹${txn.amount.toLocaleString()}` : ""}
                </td>
                <td className="px-4 py-2 text-right">
                  {!txn.isDebit ? `₹${txn.amount.toLocaleString()}` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherReport;
