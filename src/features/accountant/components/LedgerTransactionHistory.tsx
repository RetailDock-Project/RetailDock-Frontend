import React, { useState } from 'react'

import { Search } from "lucide-react";
import { DateRangePicker } from '../../../components/ui/reusable/DateRangePicker';
const LedgerTransactionHistory: React.FC = () => {
    const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
        startDate: null,
        endDate: null,
    });

    return (
        <div className="p-6">
            {/* Heading and Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                 
                    <h2 className="text-2xl font-bold text-gray-800">Ledger Transactions</h2>
                    <p className="text-sm text-gray-500">View all transactions for the selected ledger.</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="relative w-full sm:w-64">
                         <h5 className="text-sm font-bold text-gray-800">Ledger Name:- Sales Revenue</h5>
                    </div>

                    <div className="w-full sm:w-auto">
                        <DateRangePicker onChange={(range) => setDateRange(range)} />
                    </div>
                </div>
            </div>

            {/* Ledger Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
                <table className="min-w-full text-sm text-left table-auto">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-2 py-2 min-w-[100px]">Date</th>
                            <th className="px-2 py-2 min-w-[100px]">Voucher</th>
                            <th className="px-2 py-2 min-w-[200px]">Description</th>
                            <th className="px-2 py-2 min-w-[160px]">Related Account</th>
                            <th className="px-2 py-2 min-w-[100px]">Debit</th>
                            <th className="px-2 py-2 min-w-[100px]">Credit</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {/* Opening Balance */}
                        <tr className="bg-blue-50 font-semibold text-gray-700">
                            <td colSpan={4} className="px-2 py-2">Opening Balance</td>
                            <td className="px-2 py-2">$5,000.00</td>
                            <td className="px-2 py-2"></td>
                        </tr>

                        {/* Transactions */}
                        <tr className="hover:bg-gray-50">
                            <td className="px-2 py-2">2025-05-22</td>
                            <td className="px-2 py-2">SI-4587</td>
                            <td className="px-2 py-2">Sales Invoice #4587</td>
                            <td className="px-2 py-2">Sales Revenue</td>
                            <td className="px-2 py-2"></td>
                            <td className="px-2 py-2">$1,250.00</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-2 py-2">2025-05-21</td>
                            <td className="px-2 py-2">BP-1089</td>
                            <td className="px-2 py-2">Payment to Supplier #1089</td>
                            <td className="px-2 py-2">Accounts Payable</td>
                            <td className="px-2 py-2">$2,780.50</td>
                            <td className="px-2 py-2"></td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-2 py-2">2025-05-20</td>
                            <td className="px-2 py-2">EP-254</td>
                            <td className="px-2 py-2">Utility Bill Payment</td>
                            <td className="px-2 py-2">Utility Expenses</td>
                            <td className="px-2 py-2">$345.75</td>
                            <td className="px-2 py-2"></td>
                        </tr>

                        {/* Closing Balance */}
                        <tr className="bg-green-50 font-semibold text-gray-700">
                            <td colSpan={4} className="px-2 py-2">Closing Balance</td>
                            <td className="px-2 py-2"></td>
                            <td className="px-2 py-2">$3,124.25</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Export Button */}
            <div className="flex justify-end mt-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                    Export to Excel
                </button>
            </div>
        </div>
    )
}

export default LedgerTransactionHistory