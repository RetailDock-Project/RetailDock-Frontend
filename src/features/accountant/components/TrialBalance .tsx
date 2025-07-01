import React from 'react'


const TrialBalance:React.FC  = () => {
  const data = [
    { account: "Cash and Cash Equivalents", debit: 87350.25, credit: 0 },
    { account: "Accounts Payable", debit: 0, credit: 37840.25 },
    { account: "Fixed Assets", debit: 285430.5, credit: 0 },
    { account: "Owner’s Capital", debit: 0, credit: 207936.7 },
    { account: "Revenue", debit: 0, credit: 258750.5 },
    { account: "Operating Expenses", debit: 68790.25, credit: 0 },
  ];

   const totalDebit = data.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = data.reduce((sum, item) => sum + item.credit, 0);
  return (
     <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Trial Balance</h2>
      <p className="text-sm text-gray-500 mb-4">Current Financial Year</p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2">Account</th>
              <th className="px-4 py-2 text-right">Debit</th>
              <th className="px-4 py-2 text-right">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-gray-700">{item.account}</td>
                <td className="px-4 py-2 text-right text-gray-800">
                  {item.debit > 0 ? `$${item.debit.toLocaleString()}` : ""}
                </td>
                <td className="px-4 py-2 text-right text-gray-800">
                  {item.credit > 0 ? `$${item.credit.toLocaleString()}` : ""}
                </td>
              </tr>
            ))}
            <tr className="font-semibold text-gray-900 bg-gray-50">
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2 text-right">${totalDebit.toLocaleString()}</td>
              <td className="px-4 py-2 text-right">${totalCredit.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrialBalance 