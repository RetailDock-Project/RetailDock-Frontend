import React from "react";
import { FiFileText } from "react-icons/fi";

interface Props {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const StatementCard: React.FC<Props> = ({ title, description, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
        isActive ? "bg-blue-50 border-blue-600" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <FiFileText className="text-3xl text-blue-600 mb-2" />
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default StatementCard;
