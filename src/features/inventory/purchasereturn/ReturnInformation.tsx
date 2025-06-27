import React, { useState } from "react";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";

type ReturnInformationProps = {
  purchaseOrders: string[];
  reasons: string[];
};

const ReturnInformation: React.FC<ReturnInformationProps> = ({
  purchaseOrders,
  reasons,
}) => {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [returnDate, setReturnDate] = useState("2025-06-27");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
      <h2 className="text-lg font-semibold">Return Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Purchase Order */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Purchase Order *
          </label>
          {/* <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select purchase order</option>
            {purchaseOrders.map((order) => (
              <option key={order} value={order}>
                {order}
              </option>
            ))}
          </select> */}
          <DropdownList options={purchaseOrders} onSelect={() => {}} />
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <SingleDatePicker onChange={() => {}} />
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
