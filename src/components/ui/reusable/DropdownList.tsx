import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

type DropdownProps = {
  options: string[];
  onSelect: (value: string) => void;
  label?: string;
  defaultValue?: string; // 👈 new prop
};

export const DropdownList: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label,
  defaultValue, // 👈 fallback to "All" if not provided
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("null"); // 👈 use defaultValue as initial

  useEffect(() => {
    onSelect(defaultValue); // 👈 notify parent initially
  }, [defaultValue]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block w-64">
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border text-sm rounded-xl flex justify-between items-center bg-white shadow hover:shadow-md transition"
      >
        {selected || label || "Select an option"}
        <FaChevronDown
          className={`ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
