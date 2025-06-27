import { X } from 'lucide-react';
import React, { useState } from 'react'



const Transaction: React.FC = () => {
  const [drRows, setDrRows] = useState([{ id: Date.now(), account: '', amount: '' }]);
  const [crRows, setCrRows] = useState([{ id: Date.now() + 1, account: '', amount: '' }]);

  const handleAddDr = () => {
    setDrRows([...drRows, { id: Date.now(), account: '', amount: '' }]);
  };

  const handleAddCr = () => {
    setCrRows([...crRows, { id: Date.now(), account: '', amount: '' }]);
  };

  const handleRemoveDr = (id: number) => {
    setDrRows(drRows.filter((row) => row.id !== id));
  };

  const handleRemoveCr = (id: number) => {
    setCrRows(crRows.filter((row) => row.id !== id));
  };
  
    return (
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Voucher Entry</h1>

      <div className="mb-6 w-full md:w-1/3">
        <label className="text-sm font-medium text-gray-700 block mb-1">Voucher Type</label>
        <select className="w-full border px-4 py-2 rounded text-sm">
          <option>Select voucher type</option>
          <option>Payment</option>
          <option>Receipt</option>
          <option>Journal</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* DR SIDE */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">From Ledger (Dr)</label>
          <div className="space-y-3">
            {drRows.map((row, index) => (
              <div key={row.id} className="flex gap-2 items-center">
                <select className="flex-1 border rounded px-3 py-2 text-sm">
                  <option>Select from account</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-32 border rounded px-3 py-2 text-sm"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDr(row.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDr}
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
                <select className="flex-1 border rounded px-3 py-2 text-sm">
                  <option>Select to account</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-32 border rounded px-3 py-2 text-sm"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCr(row.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddCr}
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
          placeholder="Enter any notes or remarks..."
          className="w-full border rounded px-4 py-2 text-sm"
        ></textarea>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 border text-sm rounded">Cancel</button>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded">Save Voucher</button>
      </div>
    </div>
    )
}

export default Transaction