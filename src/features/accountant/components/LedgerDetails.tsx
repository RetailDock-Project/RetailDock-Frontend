import { useQuery } from "@tanstack/react-query";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { Download, Eye, Plus, Pencil } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLedgers } from "../../../services/api/AccountsApi/accountsApi";

const LedgerDetails: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ fromDate: Date | null; toDate: Date | null }>({
    fromDate: null,
    toDate: null,
  });

  const fromDate = dateRange.fromDate?.toISOString().split("T")[0] || "";
  const toDate = dateRange.toDate?.toISOString().split("T")[0] || "";

  const { data: allLedgers, error, isLoading } = useQuery({
    queryKey: ["allLedgers", fromDate, toDate],
    queryFn: () => getAllLedgers(fromDate, toDate),
    // will wait until both dates are selected
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ledger Accounts</h2>
        <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={() => navigate("/home/accountant/add-ledger")}>
          <Plus className="w-4 h-4" />
          Add New Ledger
        </button>
      </div>

      {/* Subheader */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Chart of Accounts
          </h3>
          <p className="text-sm text-gray-500">
            Manage all your ledger accounts in one place
          </p>
        </div>

        {/* Search + Date */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 mb-4">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search ledger accounts..."
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DateRangePicker */}
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

        {/* Table */}
        <div>
          {isLoading ? (
            <div className="text-center py-6 text-gray-600">Loading ledger data...</div>
          ) : (
            <table className="min-w-full text-sm text-left table-auto">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-2 py-3 min-w-[100px]">Account Name</th>
                  <th className="px-2 py-3 min-w-[100px]">Opening Balance </th>
                  <th className="px-2 py-3 min-w-[100px]">Total Dr Of Period</th>
                  <th className="px-2 py-3 min-w-[100px]">Total Cr  Of Period</th>
                  <th className="px-2 py-3 min-w-[100px]">Closing Balance</th>
               
                  <th className="px-2 py-3 min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {allLedgers?.map((ledger: any) => (
                  <tr key={ledger.ledgerId} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700 font-medium">{ledger.ledgerName}</td>
                    <td className="px-4 py-3 text-gray-700">
                      ₹{ledger.openingBalance?.toLocaleString()} {ledger.openingType}
                    </td>
                    <td className="px-4 py-3 text-gray-700">₹{ledger.periodDr?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-700">₹{ledger.periodCr?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-gray-700">
                      ₹{ledger.closingBalance?.toLocaleString()} {ledger.closingType}
                    </td>
                   
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/home/accountant/ledgertransactionhistory/${ledger.id}`)
                          }
                          className="relative group"
                        >
                          <Eye className="w-4 h-4 text-gray-500 hover:text-blue-600 cursor-pointer" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                            View Details
                          </div>
                        </button>
                        <div className="relative group">
                          <Pencil className="w-4 h-4 text-gray-500 hover:text-orange-600 cursor-pointer" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                            Update Ledger Details
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>

        {/* Export Button */}
        <div className="flex justify-end mt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LedgerDetails;
