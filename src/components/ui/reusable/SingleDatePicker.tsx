import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type SingleDatePickerProps = {
  onChange: (date: Date | null) => void;
};

export const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange(date);
  };

  const clearDate = () => {
    setSelectedDate(null);
    onChange(null);
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="w-full flex items-center justify-between px-4 py-2 border rounded-xl bg-white shadow hover:shadow-md">
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          placeholderText="Select a date"
          dateFormat="dd MMM yyyy"
          className="text-sm text-gray-700 bg-transparent outline-none w-full"
          calendarClassName="rounded-xl border shadow-lg"
        />
        <div className="flex items-center gap-2 ml-2">
          {selectedDate && (
            <FaTimes
              className="text-gray-400 hover:text-red-500 cursor-pointer"
              onClick={clearDate}
            />
          )}
          <FaCalendarAlt className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};
