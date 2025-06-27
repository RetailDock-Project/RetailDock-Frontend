import React from "react";

type StockHistoryEntry = {
  date: string;
  type: "Sale" | "Purchase" | "Sale Return" | "Purchase Return";
  quantity: number;
  reference: string;
  notes: string;
  user: string;
};

const stockHistory: StockHistoryEntry[] = [
  {
    date: "5/20/2023, 10:15:00 AM",
    type: "Purchase",
    quantity: 10,
    reference: "PO-2023-0145",
    notes: "Regular stock purchase",
    user: "Rahul Sharma",
  },
  {
    date: "6/10/2023, 02:00:00 PM",
    type: "Sale",
    quantity: -5,
    reference: "INV-2023-0023",
    notes: "Online order",
    user: "Jane Smith",
  },
  {
    date: "6/15/2023, 12:00:00 PM",
    type: "Sale Return",
    quantity: 2,
    reference: "RET-2023-0041",
    notes: "Returned product",
    user: "Nikita Jain",
  },
];

const StockHistory: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Stock Movement History</h2>
      <div className="overflow-auto w-full">
        <table className="w-full text-sm border rounded table-auto">
          <thead className="bg-gray-100 text-gray-700 font-medium">
            <tr>
              <th className="p-2 border text-left whitespace-nowrap">Date</th>
              <th className="p-2 border text-left">Type</th>
              <th className="p-2 border text-right">Quantity</th>
              <th className="p-2 border text-left">Reference</th>
              <th className="p-2 border text-left">Notes</th>
              <th className="p-2 border text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {stockHistory.map((entry, i) => {
              const isPositive =
                entry.type === "Purchase" || entry.type === "Sale Return";
              return (
                <tr
                  key={i}
                  className={`border-t ${
                    isPositive
                      ? "bg-green-50 hover:bg-green-100"
                      : "bg-red-50 hover:bg-red-100"
                  }`}
                >
                  <td className="p-2 border whitespace-nowrap">{entry.date}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        entry.type === "Purchase"
                          ? "bg-green-100 text-green-700"
                          : entry.type === "Sale"
                          ? "bg-red-100 text-red-700"
                          : entry.type === "Sale Return"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {entry.type}
                    </span>
                  </td>

                  <td
                    className={`p-2 border text-right font-semibold ${
                      isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {entry.quantity > 0 ? "+" : ""}
                    {entry.quantity}
                  </td>
                  <td className="p-2 border break-words">{entry.reference}</td>
                  <td className="p-2 border break-words">{entry.notes}</td>
                  <td className="p-2 border break-words">{entry.user}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockHistory;
