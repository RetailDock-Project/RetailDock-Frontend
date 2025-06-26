import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type DateRangePickerProps = {
  onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      onChange({ startDate: start, endDate: end });
    }
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    onChange({ startDate: null, endDate: null });
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="w-full flex items-center justify-between px-4 py-2 border rounded-xl bg-white shadow hover:shadow-md">
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          placeholderText="Select date range"
          className="text-sm text-gray-700 bg-transparent outline-none w-full"
          calendarClassName="rounded-xl border shadow-lg"
          dateFormat="dd MMM yyyy"
        />
        <div className="flex items-center gap-2 ml-2">
          {startDate && endDate && (
            <FaTimes
              className="text-gray-400 hover:text-red-500 cursor-pointer"
              onClick={clearDates}
            />
          )}
          <FaCalendarAlt className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};
