import React from "react";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";

type ReturnInformationProps = {
  invoiceNumber: string;
  selectedPurchaseId: string;
  supplier: any;
  reasons: string[];
  returnDate: Date | string | null;
  setReturnDate: (date: Date | null) => void;
  reason: string;
  setReason: (reason: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
};

const ReturnInformation: React.FC<ReturnInformationProps> = ({
  invoiceNumber,
  selectedPurchaseId,
  supplier,
  reasons,
  returnDate,
  setReturnDate,
  reason,
  setReason,
  notes,
  setNotes,
}) => {
  console.log(supplier);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
      <h2 className="text-lg font-semibold">Return Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Invoice Number */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Invoice Number
          </label>
          <input
            type="text"
            value={invoiceNumber}
            disabled
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Supplier Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Supplier</label>
          <input
            type="text"
            value={supplier?.name || ""}
            disabled
            className="w-full border rounded-md px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <SingleDatePicker onChange={setReturnDate} />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Overall Return Reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select reason</option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="Additional notes about the return..."
        />
      </div>
    </div>
  );
};

export default ReturnInformation;
