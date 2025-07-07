import React from "react";
import { Eye, Download, Printer } from "lucide-react";



const InvoiceTable: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Invoices</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Invoices</button>
          <button className="px-4 py-2 text-gray-600 hover:text-black">Returns</button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search invoices..."
          className="border border-gray-300 px-4 py-2 rounded-md w-1/3"
        />
        <select className="border border-gray-300 px-3 py-2 rounded-md">
          <option>All Time</option>
          <option>Today</option>
          <option>This Week</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Invoice #</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-3 font-semibold text-blue-700">{inv.id}</td>
                <td className="px-4 py-3">{inv.date}</td>
                <td className="px-4 py-3">{inv.customer}</td>
                <td className="px-4 py-3">{inv.total}</td>
                <td className="px-4 py-3">{inv.payment}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      inv.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2 items-center text-gray-600">
                  <Eye className="cursor-pointer w-5 h-5 hover:text-black" />
                  <Download className="cursor-pointer w-5 h-5 hover:text-black" />
                  <Printer className="cursor-pointer w-5 h-5 hover:text-black" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
