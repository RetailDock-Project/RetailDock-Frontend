import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

type Option = {
  id: string | null;
  name: string;
};

type DropdownProps = {
  options?: Option[];
  onSelect: (id: string | null) => void;
  label?: string;
  defaultValue?: string;
  className?: string;
  includeDefaultOption?: boolean;
  defaultOptionLabel?: string;
};

export const DropdownList: React.FC<DropdownProps> = ({
  options,
  onSelect,
  label,
  defaultValue = "",
  className = "",
  includeDefaultOption = false,
  defaultOptionLabel = "All",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    defaultValue || null
  );

  console.log("optionsssss", options);

  const baseOptions = Array.isArray(options) ? options : [];
  console.log("base   optionsssss", baseOptions);

  const safeOptions: Option[] = includeDefaultOption
    ? [{ id: null, name: defaultOptionLabel }, ...baseOptions]
    : baseOptions;

  const selectedOption = safeOptions.find((opt) => opt.id === selectedId);

  useEffect(() => {
    onSelect(selectedId);
  }, [selectedId]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setSelectedId(option.id);
    setIsOpen(false);
    onSelect(option.id); // This will be null for "All"
  };

  return (
    <div className={`relative w-full inline-block ${className}`}>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border text-sm rounded-xl flex justify-between items-center bg-white shadow hover:shadow-md transition"
      >
        {selectedOption?.name || label || "Select an option"}
        <FaChevronDown
          className={`ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-auto">
          {safeOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
