import React from "react";
import { Search, CheckSquare } from "lucide-react";

type QuickActionsProps = {
  onBrowsePurchases: () => void;
  onSelectAllItems: () => void;
};

const SalesReturnQuickActions: React.FC<QuickActionsProps> = ({
  onBrowsePurchases,
  onSelectAllItems,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="space-y-3">
        {/* Browse Purchases */}
        <button
          onClick={onBrowsePurchases}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
        >
          <Search size={16} />
          Browse Purchases
        </button>

        {/* Select All Items */}
        <button
          onClick={onSelectAllItems}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition"
        >
          <CheckSquare size={16} />
          Select All Items
        </button>
      </div>
    </div>
  );
};

export default SalesReturnQuickActions;
