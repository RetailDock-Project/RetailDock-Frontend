import React from "react";

type ReturnEntry = {
  id: string;
  date: string;
  customer: string;
  invoice: string;
  amount: string;
  reason: string;
};

const returns: ReturnEntry[] = [
  {
    id: "RET-1011",
    date: "2025-06-29",
    customer: "Priya Sharma",
    invoice: "INV-2388",
    amount: "₹1,200",
    reason: "Defective product",
  },
  {
    id: "RET-1010",
    date: "2025-06-27",
    customer: "Neha Gupta",
    invoice: "INV-2385",
    amount: "₹3,590",
    reason: "Ordered by mistake",
  },
  {
    id: "RET-1009",
    date: "2025-06-25",
    customer: "Rahul Singh",
    invoice: "INV-2387",
    amount: "₹2,000",
    reason: "Late delivery",
  },
  {
    id: "RET-1008",
    date: "2025-06-23",
    customer: "Walk-in Customer",
    invoice: "INV-2384",
    amount: "₹750",
    reason: "Changed mind",
  },
];

const ReturnList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="py-2">Return ID</th>
              <th className="py-2">Date</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Original Invoice</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{entry.id}</td>
                <td className="py-2">{entry.date}</td>
                <td className="py-2">{entry.customer}</td>
                <td className="py-2">{entry.invoice}</td>
                <td className="py-2">{entry.amount}</td>
                <td className="py-2">{entry.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnList;
