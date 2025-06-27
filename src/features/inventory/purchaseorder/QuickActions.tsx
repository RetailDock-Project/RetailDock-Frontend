import React from "react";
import { RotateCcw, PackagePlus, CalendarClock } from "lucide-react";

const QuickActions: React.FC = () => {
  return (
    <div className=" p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>

      <div className="space-y-3">
        <button
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
          onClick={() => alert("Return Created")}
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

        <button
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
          onClick={() => alert("Follow-up Scheduled")}
        >
          <CalendarClock size={16} />
          Schedule Follow-up
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
