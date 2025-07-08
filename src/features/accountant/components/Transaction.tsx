import { useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import {
  addTransactionEntry,
  getDebitCreditLedgersForTransaction,
  getVoucherTypes,
} from "../../../services/api/AccountsApi/accountsApi";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/reusable/Button";

type LedgerRow = {
  id: number;
  account: string; // this is ledgerId
  amount: string;  // string for input, convert to number before post
};
const Transaction: React.FC = () => {
  const [voucherTypeId, setVoucherTypeId] = useState<string | null>(null);
  const [voucherDate, setVoucherDate] = useState<Date | null>(null);
  const [remarks, setRemarks] = useState("");


  const [drRows, setDrRows] = useState<LedgerRow[]>([
    { id: Date.now(), account: "", amount: "" },
  ]);
  const [crRows, setCrRows] = useState<LedgerRow[]>([
    { id: Date.now() + 1, account: "", amount: "" },
  ]);





  // api for get all ledgers
  const { data: ledgerData } = useQuery({
    queryKey: ["ledgersByVoucher", voucherTypeId],
    queryFn: () => getDebitCreditLedgersForTransaction(voucherTypeId!),
    enabled: !!voucherTypeId,
  });

  const drLedgers = ledgerData?.drSideLedgers || [];
  const crLedgers = ledgerData?.crSideLedgers || [];






  // api for get all vouchers

  const { data: voucherTypes } = useQuery({
    queryKey: ["voucherTypes"],
    queryFn: getVoucherTypes,
  });






  //row amount and data change
  const handleRowChange = (
    setRows: React.Dispatch<React.SetStateAction<LedgerRow[]>>,
    id: number,
    field: keyof LedgerRow,
    value: string
  ) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };



  //add a row 
  const handleAddRow = (
    setRows: React.Dispatch<React.SetStateAction<LedgerRow[]>>
  ) => {
    setRows((prev) => [...prev, { id: Date.now(), account: "", amount: "" }]);
  };


  //remove a row
  const handleRemoveRow = (
    setRows: React.Dispatch<React.SetStateAction<LedgerRow[]>>,
    id: number
  ) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };






  //submit function

  const handleSubmit = async () => {
    if (!voucherTypeId || !voucherDate) {
      toast.error("Please select voucher type and date");
      return;
    }

    const payload = {
      voucherTypeId: voucherTypeId,
      voucherDate: voucherDate.toISOString(),
      remarks: remarks,
      transactionsDebit: drRows.map((row) => ({
        ledgerId: row.account,
        amount: parseFloat(row.amount),
        narration: "Dr narration",
      })),
      transactionsCredit: crRows.map((row) => ({
        ledgerId: row.account,
        amount: parseFloat(row.amount),
        narration: "Cr narration",
      })),
    };

    try {
      const result = await addTransactionEntry(payload);

      toast.success("Voucher saved successfully");

      // Optionally reset form here
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Error saving voucher");
    }
  };








  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Voucher Entry</h1>

      {/* Voucher Type Section */}
      <div className="mb-6 w-full relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          {/* Date Picker on top right */}
          <div className="w-full md:w-auto md:ml-auto mb-4 md:mb-0">
            <SingleDatePicker onChange={(date) => setVoucherDate(date)} />


          </div>
        </div>

        {/* Label and Select Box */}
        <label className="text-sm font-medium text-gray-700 block mb-1">Voucher Type</label>
        <div className="w-full md:w-1/3">
          <select
            onChange={(e) => setVoucherTypeId(e.target.value)}
            className="w-full border px-4 py-2 rounded text-sm"
          >
            <option value="">Select voucher type</option>
            {voucherTypes?.map((type: any) => (
              <option key={type.id} value={type.id}>
                {type.displayName}
              </option>
            ))}
          </select>
        </div>
      </div>




      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* DR SIDE */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">From Ledger (Dr)</label>
          <div className="space-y-3">
            {drRows.map((row, index) => (
              <div key={row.id} className="flex gap-2 items-center">
                <select
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  value={row.account}
                  onChange={(e) =>
                    handleRowChange(setDrRows, row.id, "account", e.target.value)
                  }
                >
                  <option value="">Select from account</option>
                  {drLedgers.map((ledger: any) => (
                    <option key={ledger.id} value={ledger.id}>
                      {ledger.ledgerName}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={row.amount}
                  onChange={(e) =>
                    handleRowChange(setDrRows, row.id, "amount", e.target.value)
                  }
                  placeholder="Amount"
                  className="w-32 border rounded px-3 py-2 text-sm"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(setDrRows, row.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddRow(setDrRows)}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add another Dr
            </button>
          </div>
        </div>

        {/* CR SIDE */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">To Ledger (Cr)</label>
          <div className="space-y-3">
            {crRows.map((row, index) => (
              <div key={row.id} className="flex gap-2 items-center">
                <select
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  value={row.account}
                  onChange={(e) =>
                    handleRowChange(setCrRows, row.id, "account", e.target.value)
                  }
                >
                  <option value="">Select to account</option>
                  {crLedgers.map((ledger: any) => (
                    <option key={ledger.id} value={ledger.id}>
                      {ledger.ledgerName}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={row.amount}
                  onChange={(e) =>
                    handleRowChange(setCrRows, row.id, "amount", e.target.value)
                  }
                  placeholder="Amount"
                  className="w-32 border rounded px-3 py-2 text-sm"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(setCrRows, row.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          

            <button
              type="button"
              onClick={() => handleAddRow(setCrRows)}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add another Cr
            </button>
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter any notes or remarks..."
          className="w-full border rounded px-4 py-2 text-sm"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 border text-sm rounded">Cancel</button>
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded"
          onClick={handleSubmit}
        >
          Save Voucher
        </button>

      </div>
    </div>
  );
};

export default Transaction;
