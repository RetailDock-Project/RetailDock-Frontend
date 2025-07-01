import React, { useState } from "react";


import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";

const voucherTypes = ["All", "Sales Invoice", "Payment", "Expense"];

const mockTransactions = [
  {
    date: "2025-05-22",
    voucher: "SI-4587",
    description: "Sales Invoice #4587",
    relatedAccount: "Sales Revenue",
    debit: 0,
    credit: 1250.0,
  },
  {
    date: "2025-05-21",
    voucher: "BP-1089",
    description: "Payment to Supplier #1089",
    relatedAccount: "Accounts Payable",
    debit: 2780.5,
    credit: 0,
  },
  {
    date: "2025-05-20",
    voucher: "EP-254",
    description: "Utility Bill Payment",
    relatedAccount: "Utility Expenses",
    debit: 345.75,
    credit: 0,
  },
  {
    date: "2025-05-19",
    voucher: "SI-4586",
    description: "Sales Invoice #4586",
    relatedAccount: "Sales Revenue",
    debit: 0,
    credit: 970.25,
  },
  {
    date: "2025-05-18",
    voucher: "BP-1088",
    description: "Payment to Supplier #1088",
    relatedAccount: "Accounts Payable",
    debit: 1850.0,
    credit: 0,
  },
  {
    date: "2025-05-17",
    voucher: "SI-4585",
    description: "Sales Invoice #4585",
    relatedAccount: "Sales Revenue",
    debit: 0,
    credit: 1430.5,
  },
];

const VoucherReport: React.FC = () => {
  const [selectedVoucherType, setSelectedVoucherType] = useState("All");
   const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
          startDate: null,
          endDate: null,
      });

  const filtered = mockTransactions.filter((txn) =>
    selectedVoucherType === "All"
      ? true
      : txn.voucher.startsWith(selectedVoucherType.split(" ")[0])
  );

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Voucher Report</h2>
        <div className="flex items-center gap-4">
          <select
            className="border px-3 py-2 rounded text-sm text-gray-700"
            value={selectedVoucherType}
            onChange={(e) => setSelectedVoucherType(e.target.value)}
          >
            {voucherTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {/* Replace this div with your actual date range picker */}
          <div className="border px-3 py-2 rounded text-sm text-gray-700">
            <DateRangePicker onChange={(range) => setDateRange(range)} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Voucher</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Related Account</th>
              <th className="px-4 py-2 text-right">Debit</th>
              <th className="px-4 py-2 text-right">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((txn, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{txn.date}</td>
                <td className="px-4 py-2">{txn.voucher}</td>
                <td className="px-4 py-2">{txn.description}</td>
                <td className="px-4 py-2">{txn.relatedAccount}</td>
                <td className="px-4 py-2 text-right">
                  {txn.debit > 0 ? `$${txn.debit.toLocaleString()}` : ""}
                </td>
                <td className="px-4 py-2 text-right">
                  {txn.credit > 0 ? `$${txn.credit.toLocaleString()}` : ""}
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
