import React from 'react'
import { DateRangePicker } from './DateRangePicker'
import { SearchInput } from './SearchInput'

const Filter: React.FC = () => {
  return (
    <div className="rounded-xl shadow border bg-white p-3 mt-6">
      <h3 className="block text-lg">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <SearchInput onSearch={() => {}} />
        </div>
<div></div>
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <DateRangePicker onChange={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default Filter
