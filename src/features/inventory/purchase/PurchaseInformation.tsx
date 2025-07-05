import React, { useEffect, useState } from "react";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";

type PurchaseInformationProps = {
  prefill?: {
    supplier?: string;
    date?: string; // e.g. "2025-07-01"
  };
};

const suppliers = ["Samsung", "Sony", "Apple", "Realme"];

const PurchaseInformation: React.FC<PurchaseInformationProps> = ({
  prefill,
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (prefill?.supplier) {
      setSelectedSupplier(prefill.supplier);
    }

    if (prefill?.date) {
      const parsedDate = new Date(prefill.date);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      }
    }
  }, [prefill]);

  return (
    <div className="p-6 rounded-xl shadow border bg-white space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Purchase Information
      </h2>

      <div className="flex gap-2">
        {/* Supplier */}
        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Supplier <span className="text-red-500">*</span>
          </label>
          <DropdownList
            options={suppliers}
            label="Select Supplier"
            onSelect={(val) => setSelectedSupplier(val)}
          />
        </div>

        {/* Date */}
        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Purchase Date <span className="text-red-500">*</span>
          </label>
          <SingleDatePicker onChange={(date) => setSelectedDate(date)} />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes..."
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
      </div>
    </div>
  );
};

export default PurchaseInformation;
