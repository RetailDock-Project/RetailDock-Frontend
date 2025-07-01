import React from 'react'

const ProfitLoss:React.FC = () => {
      const data = [
    { label: "Revenue", value: 258750.5 },
    { label: "Cost of Goods Sold", value: -120345.75 },
    { label: "Gross Profit", value: 138404.75, bold: true },
    { label: "Operating Expenses", value: -68790.25 },
    { label: "Depreciation", value: -12450.0 },
    { label: "Interest Expense", value: -5840.5 },
    { label: "Other Income", value: 22156.25 },
    { label: "Net Income", value: 54074.25, bold: true },
  ];
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Profit & Loss Statement
      </h2>
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
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className={`px-4 py-2 ${item.bold ? "font-semibold" : ""}`}>
                  {item.label}
                </td>
                <td
                  className={`px-4 py-2 text-right ${
                    item.value < 0 ? "text-red-600" : "text-gray-800"
                  } ${item.bold ? "font-semibold" : ""}`}
                >
                  {item.value < 0 ? `- $${Math.abs(item.value).toLocaleString()}` : `$${item.value.toLocaleString()}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProfitLoss