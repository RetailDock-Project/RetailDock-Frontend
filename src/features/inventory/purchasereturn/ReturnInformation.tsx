import React, { useMemo, useState } from "react";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";
import SearchSelect from "../../../components/ui/reusable/SearchSelect";

type PurchaseOrder = {
  id: string;
  invoiceNumber: string;
};

type ReturnInformationProps = {
  purchaseOrders: PurchaseOrder[];
  reasons: string[];
};

const ReturnInformation: React.FC<ReturnInformationProps> = ({
  purchaseOrders,
  reasons,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<{
    id: string | number;
    label: string;
    value: string;
  } | null>(null);

  const [returnDate, setReturnDate] = useState<Date | null>(new Date());
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  // Map purchaseOrders to SearchSelect-friendly format
  const purchaseOptions = useMemo(
    () =>
      purchaseOrders.map((order) => ({
        id: String(order.id), // ✅ Force id to string
        label: order.invoiceNumber,
        value: order.id,
      })),
    [purchaseOrders]
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
      <h2 className="text-lg font-semibold">Return Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Purchase Order */}
        <div>
          <SearchSelect
            label="Purchase *"
            options={purchaseOptions}
            selected={selectedOrder}
            setSelected={setSelectedOrder}
            placeholder="Search by invoice number..."
          />
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <SingleDatePicker onChange={setReturnDate} />
        </div>
      </div>

      {/* Return Reason */}
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
