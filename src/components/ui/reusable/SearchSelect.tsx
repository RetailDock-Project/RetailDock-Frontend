import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  id: string | number;
  label: string;
  value: any;
};

type SearchSelectProps = {
  label: string;
  placeholder?: string;
  options: Option[];
  selected: Option | null;
  setSelected: (option: Option) => void;
};

const SearchSelect: React.FC<SearchSelectProps> = ({
  label,
  placeholder = "Search...",
  options,
  selected,
  setSelected,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  // 🔄 Keep input in sync with selected
  useEffect(() => {
    if (selected) {
      setSearchTerm(selected.label);
    }
  }, [selected]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleShowAllClick = () => {
    setFilteredOptions(options);
  };

  const handleSelect = (option: Option) => {
    setSelected(option);
    setSearchTerm(option.label); // Set input to selected label
    setFilteredOptions([]); // Hide list
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div className="flex items-center relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => {
            if (searchTerm.trim() === "") {
              setFilteredOptions([]);
            }
          }}
          placeholder={placeholder}
          className="px-4 py-2 border rounded-md w-full pr-10"
        />

        {searchTerm.trim() === "" && (
          <button
            onClick={handleShowAllClick}
            className="absolute right-2 text-gray-500 text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
            title="Show all options"
          >
            <ChevronDown size={14} className="text-gray-500" />
          </button>
        )}
      </div>

      {filteredOptions?.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-1 w-full rounded-md shadow max-h-40 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
