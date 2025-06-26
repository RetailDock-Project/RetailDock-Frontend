import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

type SearchInputProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  className,
}) => {
  const [value, setValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className={`relative w-full max-w-md ${className} `}>
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        className="w-full pl-10 pr-4 shadow py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
      />
    </div>
  );
};
