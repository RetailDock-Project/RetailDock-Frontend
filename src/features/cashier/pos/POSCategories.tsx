import React from "react";

const categories = [
  "All",
  "Electronics",
  "Accessories",
  "Storage",
  "Networking",
];

const POSCategories: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-1 text-sm rounded-full border hover:bg-blue-100 text-gray-600"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default POSCategories;
