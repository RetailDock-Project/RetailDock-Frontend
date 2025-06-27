import { Download, Eye, Search } from "lucide-react";
import React, { useState } from "react";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";

const Invoices: React.FC = () => {
    const [activeTab, setActiveTab] = useState("sales");
    const [dateRange, setDateRange] = useState<{
        startDate: Date | null;
        endDate: Date | null;
    }>({
        startDate: null,
        endDate: null,
    });

    const tabs = [
        { key: "sales", label: "Sales Invoices" },
        { key: "purchase", label: "Purchase Invoices" },
        { key: "SalesReturn", label: "Sales Return Invoices" },
        { key: "PurchaseReturn", label: "Purchase Return Invoices" },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-gray-800">Invoices</h2>

            {/* Tabs */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 w-full">
               <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search invoices..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                {/* Tabs (Left) */}
                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab.key
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search Input (Right) */}
                
            </div>



            <div className="w-full sm:w-auto flex justify-end">
                <DateRangePicker onChange={(range) => setDateRange(range)} />
            </div>
            {/* Table */}
            <div className="bg-white rounded-2xl shadow border overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Invoice #</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Customer / Supplier</th>
                            <th className="px-4 py-3">Gross Amount</th>
                            <th className="px-4 py-3">Tax Amount</th>
                            <th className="px-4 py-3">Total Amount</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-blue-600">INV-001</td>
                            <td className="px-4 py-3 text-gray-700">2025-06-27</td>
                            <td className="px-4 py-3 text-gray-700">John Doe</td>
                            <td className="px-4 py-3 text-gray-700">₹5,000</td>
                            <td className="px-4 py-3 text-gray-700">₹500</td>
                            <td className="px-4 py-3 font-semibold text-gray-800">₹5,500</td>
                            <td className="px-4 py-3 flex gap-3 text-gray-500">
                                <Eye className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                                <Download className="w-4 h-4 cursor-pointer hover:text-green-600" />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot className="bg-gray-50 text-base font-semibold text-gray-800">
                        <tr>
                            <td colSpan={3} className="px-4 py-3 text-center">
                                Total
                            </td>
                            <td className="px-4 py-3">₹5,000</td>
                            <td className="px-4 py-3">₹500</td>
                            <td className="px-4 py-3">₹5,500</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Footer: Date picker right & export button left */}
            <div className=" items-center pt-4  flex justify-end">
                <button className="bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
                    Export to Excel
                </button>

            </div>
        </div>
    );
};

export default Invoices;
