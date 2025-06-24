import React from "react";
import { Bell } from "lucide-react";

const AppHeader: React.FC = () => {
  return (
    <header className="flex justify-end px-6 py-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">Sabith</span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
