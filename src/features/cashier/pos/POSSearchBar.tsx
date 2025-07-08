import React from "react";
import { Search } from "lucide-react";

const POSSearchBar: React.FC = () => {
  return (
    <div className="flex gap-2 items-center mb-4 border p-4 mt-6 shadow-lg rounded-xl ">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search products Name or ProductCode..."
          className="w-full pl-10 pr-4 py-2 border rounded-md text-sm"
        />
        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
        Scan
      </button>
      <button className="border px-4 py-2 rounded-md text-sm">Barcode</button>
    </div>
  );
};

export default POSSearchBar;
