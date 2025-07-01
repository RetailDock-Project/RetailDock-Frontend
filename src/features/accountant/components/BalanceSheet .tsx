import React from 'react'

const BalanceSheet:React.FC  = () => {
    const assets = [
    { label: "Current Assets", amount: 175250.75 },
    { label: "Fixed Assets", amount: 285430.5 },
    { label: "Other Assets", amount: 34590.25 },
  ];
  const liabilities = [
    { label: "Current Liabilities", amount: 87540.25 },
    { label: "Long-term Liabilities", amount: 145720.3 },
  ];
  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);

  return (
     <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Balance Sheet</h2>
      <p className="text-sm text-gray-500 mb-4">Current Financial Year</p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y">

            {/* ASSETS Section */}
            <tr className="bg-gray-100">
              <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 uppercase">
                Assets
              </td>
            </tr>
            {assets.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-gray-700">{item.label}</td>
                <td className="px-4 py-2 text-right text-gray-800">
                  ${item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 font-semibold text-gray-900">Total Assets</td>
              <td className="px-4 py-2 font-semibold text-right text-gray-900">
                ${totalAssets.toLocaleString()}
              </td>
            </tr>

            {/* LIABILITIES Section */}
            <tr className="bg-gray-100">
              <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 uppercase">
                Liabilities
              </td>
            </tr>
            {liabilities.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-gray-700">{item.label}</td>
                <td className="px-4 py-2 text-right text-gray-800">
                  ${item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 font-semibold text-gray-900">Total Liabilities</td>
              <td className="px-4 py-2 font-semibold text-right text-gray-900">
                ${totalLiabilities.toLocaleString()}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BalanceSheet 