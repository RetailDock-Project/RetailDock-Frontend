import React from "react";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRecentInventoryTransaction } from "../../../services/api/inventoryapi/inventoryApi";
import { useNavigate } from "react-router-dom";

const RecentInventoryTransactions = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recentInventoryTransactions"],
    queryFn: getRecentInventoryTransaction,
    select: (data) => data.data,
  });
  console.log(data);

  const navigate = useNavigate();

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }); // Example: 21 July 2025
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong while fetching data.</div>;

  return (
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
            {data.map((tx: any, idx: any) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-2">
                  <span className="bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {tx.type}
                  </span>
                </td>
                <td className="p-2 font-medium">{tx.supplierOrSource}</td>
                <td className="p-2">{tx.itemCount} items</td>
                <td className="p-2 whitespace-nowrap">{formatDate(tx.date)}</td>
                <td className="p-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                      tx.type === "Return"
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "bg-green-100 text-green-700 border-green-300"
                    }`}
                  >
                    {tx.type === "Return" ? "Processed" : "Completed"}
                  </span>
                </td>
                <td
                  className={`p-2 font-semibold ${
                    tx.type === "Return" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹{tx.amount.toLocaleString("en-IN")}
                </td>
                <td className="p-2">
                  <Eye
                    onClick={() =>
                      tx.type === "Return"
                        ? navigate(`/home/inventory/purchase-return/${tx.id}`)
                        : navigate(`/home/inventory/purchase/${tx.id}`)
                    }
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
};

export default RecentInventoryTransactions;
