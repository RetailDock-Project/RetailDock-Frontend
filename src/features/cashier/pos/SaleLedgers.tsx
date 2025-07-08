import React from 'react';

const SaleLedgers: React.FC = () => {
  return (
    <div className="p-6 mt-6 bg-white rounded-xl border border-gray-200 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Sale Ledgers :</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium " >
        {/* Dr Side */}
        <div className='border shadow-md rounded-lg p-2'>
          <h3 className="text-lg font-medium text-gray-700 mb-2      ">Dr (Debit)</h3>
          <div className="space-y-4">
            <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Debtor A/c</option>
            </select>
            <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Cost of Goods Sold A/c</option>
            </select>
          </div>
        </div>

        {/* Cr Side */}
        <div className='border shadow-md rounded-lg p-2'>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Cr (Credit)</h3>
          <div className="space-y-4">
            <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Sales A/c</option>
            </select>
            <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Tax A/c</option>
            </select>
            <select className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Inventory A/c</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleLedgers;
