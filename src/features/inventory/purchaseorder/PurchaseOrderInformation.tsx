import React, { useState } from "react";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";

const PurchaseOrderInformation: React.FC = () => {
  //   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="p-6 rounded-xl shadow border bg-white  ml-4 space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Purchase Information
      </h2>

      <div className="flex gap-2">
        {/* Supplier */}
        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Supplier <span className="text-red-500">*</span>
          </label>
          <DropdownList options={["jhsabc"]} onSelect={() => {}} />
        </div>
        {/* Purchase Date */}
        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Select Date <span className="text-red-500">*</span>
          </label>
          <SingleDatePicker onChange={() => {}} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Notes
        </label>
        <textarea
          placeholder="Optional notes..."
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        ></textarea>
      </div>
    </div>
  );
};

export default PurchaseOrderInformation;
