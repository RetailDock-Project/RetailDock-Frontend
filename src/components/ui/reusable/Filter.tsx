import React, { useState } from 'react'
import { DateRangePicker } from './DateRangePicker'
import { SearchInput } from './SearchInput'


interface FilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  dateRange: { startDate: Date | null; endDate: Date | null };
  setDateRange: (range: { startDate: Date | null; endDate: Date | null }) => void;
}

const Filter: React.FC<FilterProps> = ({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
}) => {
  const handleRangeChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDateRange({
      startDate: range.startDate,
      endDate: range.endDate,
    });
  };
  return (
    <div className="rounded-xl shadow border bg-white p-3 mt-6">
      <h3 className="block text-lg">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <SearchInput onSearch={(value) => setSearchTerm(value)} />
        </div>

        <div></div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <DateRangePicker onChange={handleRangeChange} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
