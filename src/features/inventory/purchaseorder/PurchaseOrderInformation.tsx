import React from "react";
import SearchSelect from "../../../components/ui/reusable/SearchSelect";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";

type Supplier = {
  id: string;
  name: string;
};

type Props = {
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
  setSelectedSupplier: (supplier: Supplier) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  notes: string;
  setNotes: (notes: string) => void;
  formErrors?: {
    supplier?: string;
  };
};

const PurchaseOrderInformation: React.FC<Props> = ({
  suppliers,
  selectedSupplier,
  setSelectedSupplier,
  selectedDate,
  setSelectedDate,
  notes,
  setNotes,
  formErrors,
}) => {
  const supplierOptions = suppliers?.map((s) => ({
    id: s.id,
    label: s.name,
    value: s,
  }));

  return (
    <div className="p-6 rounded-xl shadow border bg-white space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Purchase Information
      </h2>

      <div className="flex gap-4">
        {/* Supplier */}
        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Supplier <span className="text-red-500">*</span>
          </label>
          <SearchSelect
            label=""
            placeholder="Search supplier..."
            options={supplierOptions}
            selected={
              selectedSupplier
                ? {
                    id: selectedSupplier.id,
                    label: selectedSupplier.name,
                    value: selectedSupplier,
                  }
                : null
            }
            setSelected={(option) => setSelectedSupplier(option.value)}
          />
          {formErrors?.supplier && (
            <p className="text-red-500 text-sm mt-1">{formErrors.supplier}</p>
          )}
        </div>

        {/* Purchase Date */}
        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Select Date <span className="text-red-500">*</span>
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
          placeholder="Optional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        ></textarea>
      </div>
    </div>
  );
};

export default PurchaseOrderInformation;
