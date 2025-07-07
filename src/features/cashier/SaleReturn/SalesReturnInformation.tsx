import React, { useState } from "react";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";
import { ChevronDown } from "lucide-react";
import { date } from "zod";

type Sale = {
  id: string;
  amount: number;
};

type ReturnInformationProps = {
  Sold: string[];
  reasons: string[];
};

const SalesData: Sale[] = [
  { id: "PO-001", amount: 1000 },
  { id: "PO-002", amount: 2500 },
  { id: "INV-003", amount: 1800 },
  { id: "INV-004", amount: 1200 },
];

const SalesReturnInformation: React.FC<ReturnInformationProps> = ({
  Sold,
  reasons
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSales, setFilteredSales] = useState<Sale[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [returnDate, setReturnDate] = useState<Date| null>(new Date("2025-06-27"));
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredSales([]); // hide until show button is clicked
    } else {
      const filtered = SalesData.filter((s) =>
        s.id.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSales(filtered);
    }
  };

  const handleShowAllClick = () => {
    setFilteredSales(SalesData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
      <h2 className="text-lg font-semibold">Return Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sales Search with Show Button */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Sales*</label>
          <div className="flex items-center relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => {
                if (searchTerm.trim() === "") {
                  setFilteredSales([]); // Don't show on focus if not requested
                }
              }}
              placeholder="Search sales by ID"
              className="px-4 py-2 border rounded-md w-full pr-10"
            />

            {/* Show All Button */}
            {searchTerm.trim() === "" && (
              <button
                onClick={handleShowAllClick}
                className="absolute right-2 text-gray-500 text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                title="Show all sales"
              >
              <ChevronDown size={14} className="text-gray-500" />

              </button>
            )}
          </div>

          {/* Dropdown List */}
          {filteredSales.length > 0 && (
            <ul className="absolute z-10 bg-white border mt-1 w-full rounded-md shadow max-h-40 overflow-y-auto">
              {filteredSales.map((sale) => (
                <li
                  key={sale.id}
                  onClick={() => {
                    setSelectedSale(sale);
                    setSearchTerm(`${sale.id} - ₹${sale.amount}`);
                    setFilteredSales([]);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {sale.id} - ₹{sale.amount}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <SingleDatePicker
           
            onChange={(date: null| Date) => setReturnDate(date)}
          />
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

      {/* Display Selected */}
      {selectedSale && (
        <div className="text-sm text-gray-600">
          Selected Sale: <strong>{selectedSale.id}</strong> – ₹
          {selectedSale.amount}
        </div>
      )}
    </div>
  );
};

export default SalesReturnInformation;
