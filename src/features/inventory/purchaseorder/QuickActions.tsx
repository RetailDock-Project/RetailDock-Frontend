import React from "react";
import { RotateCcw, PackagePlus, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className=" p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>

      <div className="space-y-3">
        <button
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
          onClick={() =>
            navigate("/home/inventory/purchase/new", {
              state: {
                supplier: "Samsung",
                date: "2025-07-01",
                items: [
                  { product: "Galaxy S24", quantity: 10, unitCost: 25000 },
                  { product: "TV 55in", quantity: 2, unitCost: 45000 },
                ],
              },
            })
          }
        >
          <RotateCcw size={16} />
          Add To Purchase
        </button>
        <button
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
          onClick={() => alert("Return Created")}
        >
          <RotateCcw size={16} />
          Create Return
        </button>

        <button
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
          onClick={() => alert("New Purchase")}
        >
          <PackagePlus size={16} />
          New Purchase
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
