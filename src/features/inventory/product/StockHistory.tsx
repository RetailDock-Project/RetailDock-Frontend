import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProductStockHistory } from "../../../services/api/inventoryapi/inventoryApi";
import Loader from "../../../components/ui/reusable/Loader";

type StockHistoryEntry = {
  date: string;
  type: "Sale" | "Purchase" | "Sale Return" | "Purchase Return";
  quantity: number;
  reference: string;
};

const StockHistory: React.FC<{ id: string }> = ({ id }) => {
  const {
    data: productStockHistory,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productStockHistory", id],
    queryFn: () => getProductStockHistory(id),
    select: (res) => res.data as StockHistoryEntry[],
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Stock Movement History</h2>

      <div className="overflow-auto w-full border rounded">
        {isLoading ? (
          <div className="p-6 flex justify-center items-center">
            <Loader />{" "}
          </div>
        ) : isError || !productStockHistory ? (
          <div className="p-4 text-center text-red-600">
            Failed to load stock history.
          </div>
        ) : productStockHistory.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No stock history available.
          </div>
        ) : (
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100 text-gray-700 font-medium">
              <tr>
                <th className="p-2 border text-left whitespace-nowrap">Date</th>
                <th className="p-2 border text-left">Type</th>
                <th className="p-2 border text-right">Quantity</th>
                <th className="p-2 border text-left">Reference</th>
              </tr>
            </thead>
            <tbody>
              {productStockHistory.map((entry, i) => {
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
                    <td className="p-2 border whitespace-nowrap">
                      {new Date(entry.date).toLocaleString()}
                    </td>
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
                    <td className="p-2 border break-words">
                      {entry.reference}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StockHistory;
