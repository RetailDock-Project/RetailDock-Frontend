import React from "react";

const ProceedToPayment: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md font-medium text-sm"
    >
      Proceed to Payment
    </button>
  );
};

export default ProceedToPayment;
