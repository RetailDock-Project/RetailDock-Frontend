import React from "react";
import { Eye } from "lucide-react";

const transactions = [
  {
    type: "Purchase",
    supplier: "Samsung Electronics",
    items: 50,
    date: "1/21/2024",
    status: "Completed",
    amount: "₹4,75,000",
  },
  {
    type: "Return",
    supplier: "HP India",
    items: 5,
    date: "1/20/2024",
    status: "Processed",
    amount: "₹12,000",
  },
  {
    type: "Purchase",
    supplier: "Cipla Ltd",
    items: 200,
    date: "1/19/2024",
    status: "Completed",
    amount: "₹35,000",
  },
  {
    type: "Purchase",
    supplier: "Apple India",
    items: 8,
    date: "1/18/2024",
    status: "Pending",
    amount: "₹5,20,000",
  },
  {
    type: "Adjustment",
    supplier: "Stock Audit",
    items: 15,
    date: "1/17/2024",
    status: "Completed",
    amount: "-",
  },
];

const RecentInventoryTransactions = () => (
  <div className="bg-white p-6 shadow rounded-xl border mt-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-1">
      Recent Inventory Transactions
    </h2>
    <p className="text-sm text-gray-500 mb-4">
      Latest purchase orders, returns, and stock adjustments
    </p>
    <div className="overflow-auto">
      <table className="w-full text-sm table-auto">
        <thead>
          <tr className="text-left bg-gray-50">
            <th className="p-2">Type</th>
            <th className="p-2">Supplier/Source</th>
            <th className="p-2">Items</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="p-2">
                <span className="bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {tx.type}
                </span>
              </td>
              <td className="p-2 font-medium">{tx.supplier}</td>
              <td className="p-2">{tx.items} items</td>
              <td className="p-2 whitespace-nowrap">{tx.date}</td>
              <td className="p-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                    tx.status === "Completed"
                      ? "bg-slate-800 text-white"
                      : tx.status === "Pending"
                      ? "bg-slate-200 text-slate-800"
                      : "bg-white border text-gray-600"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
              <td
                className={`p-2 font-semibold ${
                  tx.type === "Return" ? "text-red-600" : "text-green-600"
                }`}
              >
                {tx.amount}
              </td>
              <td className="p-2">
                <Eye
                  size={16}
                  className="text-gray-500 hover:text-black cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentInventoryTransactions;
