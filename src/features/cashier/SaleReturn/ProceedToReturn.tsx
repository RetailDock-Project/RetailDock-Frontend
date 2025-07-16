import React from "react";

const ProceedToReturn: React.FC<{ onClick: () => void ;isLoading:boolean}> = ({ onClick,isLoading }) => {
  return (
    <button
    disabled={isLoading}
      onClick={onClick}
      className={isLoading?"opacity-50 cursor-not-allowed":"w-full mt-4 bg-blue-600 text-white py-2 rounded-md font-medium text-sm"}
    >
     {isLoading?"Adding New Sale Return..":"Add New SalesReturn"}
    </button>
  );
};

export default ProceedToReturn;
