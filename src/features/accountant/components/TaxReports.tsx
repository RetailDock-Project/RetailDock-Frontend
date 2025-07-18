import React, { useState } from "react";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { Download } from "lucide-react";
import TaxSummaryCards from "./TaxSummaryCards";
import HSNReport from "./HSNReport";
import { getTaxAndInvoicePurchase, getTaxAndInvoicePurchaseReturns, getTaxAndInvoiceSales, getTaxAndInvoiceSalesReturns } from "../../../services/api/AccountsApi/accountsApi";
import { useQuery } from "@tanstack/react-query";



// Mock data now includes voucher type for filtering


const TaxReports: React.FC = () => {
    const [type, setType] = useState("Sales");

    const [dateRange, setDateRange] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({ startDate: null, endDate: null });


    const formattedFromDate = dateRange.startDate
  ? dateRange.startDate.toISOString()
  : null;
const formattedToDate = dateRange.endDate
  ? dateRange.endDate.toISOString()
  : null;


   const { data: apiData, isLoading, error } = useQuery({

  queryKey: ["taxReport", type, formattedFromDate, formattedToDate],
  queryFn: () => {
    switch (type) {
      case "Sales":
        return getTaxAndInvoiceSales(formattedFromDate, formattedToDate);
      case "Purchase":
        return getTaxAndInvoicePurchase(formattedFromDate, formattedToDate);
      case "Sales Return":
        return getTaxAndInvoiceSalesReturns(formattedFromDate, formattedToDate);
      case "Purchase Return":
        return getTaxAndInvoicePurchaseReturns(formattedFromDate, formattedToDate);
      default:
        return Promise.resolve([]);
    }
  },
  enabled: !!type,
});


  
    return (
        <div className="scroll-m-0 max-h-[600px] overflow-y-auto">
            <TaxSummaryCards inputTax={220.5} outputTax={640.12} />

            <div className="p-6 bg-white shadow rounded-md mt-4 s">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Tax Reports</h2>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export to Excel
                    </button>
                </div>

                <div className="p-4 bg-gray-50 rounded">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-4">
                        <div className="text-sm text-gray-600">
                            <strong className="block text-base text-gray-800">
                                Tax Transaction Details
                            </strong>
                            Detailed view of all tax transactions with filtering options
                        </div>

                        <div className="flex gap-3 items-center">
                            <DateRangePicker onChange={(range) => setDateRange(range)} />
                            <select
                                className="border rounded px-3 py-1.5 text-sm"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Sales">Sales</option>
                                <option value="Purchase">Purchase</option>
                                <option value="Sales Return">Sales Return</option>
                                <option value="Purchase Return">Purchase Return</option>
                            </select>
                        </div>
                    </div>

                    <table className="w-full text-sm mt-4">
                        <thead className="bg-white border-b">
                            <tr className="text-left text-gray-600">
                                <th className="py-2 px-3">Date</th>
                                <th className="py-2 px-3">Customer/Supplier</th>
                                <th className="py-2 px-3">Reference</th>
                                <th className="py-2 px-3 text-right">Amount</th>
                                <th className="py-2 px-3 text-right">Tax</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((item, idx) => (
                                    <tr key={idx} className="border-t hover:bg-gray-50">
                                        <td className="py-2 px-3">{item.date}</td>
                                        <td className="py-2 px-3">
                                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                                {item.customer}
                                            </span>
                                        </td>
                                        <td className="py-2 px-3">{item.reference}</td>
                                        <td className="py-2 px-3 text-right">
                                            ${item.amount.toFixed(2)}
                                        </td>
                                        <td className="py-2 px-3 text-right">
                                            ${item.tax.toFixed(2)}
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">
                                        No transactions found for selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="flex justify-between mt-4 bg-gray-100 px-4 py-3 rounded">
                        <div>
                            <div className="text-xs text-gray-600">Transactions</div>
                            <div className="text-lg font-bold">{filtered.length}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-600">Total Amount</div>
                            <div className="text-lg font-bold">
                                ${totalAmount.toFixed(2)}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-600">Total Tax</div>
                            <div className="text-lg font-bold">${totalTax.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 bg-white p-4 rounded shadow space-y-4">
                {/* HSN Report Section */}
                <HSNReport dateRange={dateRange} selectedType={type} />

                {/* Summary Cards */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 bg-gray-100 px-4 py-3 rounded">
                    <div>
                        <div className="text-xs text-gray-600">Transactions</div>
                        <div className="text-lg font-bold">2</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-600">Total Amount</div>
                        <div className="text-lg font-bold">$8000</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-600">Total Tax</div>
                        <div className="text-lg font-bold">$800</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TaxReports;
