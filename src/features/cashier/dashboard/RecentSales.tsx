import React from "react";

const sales = [
  {
    id: "INV-2389",
    name: "Walk-in Customer",
    amount: "₹4,320",
    method: "Cash",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "INV-2388",
    name: "Priya Sharma",
    amount: "₹8,900",
    method: "Card",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "INV-2387",
    name: "Rahul Singh",
    amount: "₹1,200",
    method: "UPI",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "INV-2386",
    name: "Walk-in Customer",
    amount: "₹6,750",
    method: "Cash",
    color: "bg-green-100 text-green-700",
  },
  {
    id: "INV-2385",
    name: "Neha Gupta",
    amount: "₹3,590",
    method: "Card",
    color: "bg-blue-100 text-blue-700",
  },
];

const RecentSales: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Invoice</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Method</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{sale.id}</td>
                <td className="py-2">{sale.name}</td>
                <td className="py-2">{sale.amount}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${sale.color}`}
                  >
                    {sale.method}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSales;
