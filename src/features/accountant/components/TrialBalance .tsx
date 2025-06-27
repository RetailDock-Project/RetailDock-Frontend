import React from 'react'
interface TrialBalanceRow {
  account: string;
  debit?: number;
  credit?: number;
}
const trialBalanceData: TrialBalanceRow[] = [
  { account: "Cash and Cash Equivalents", debit: 50000 },
  { account: "Inventory", debit: 30000 },
  { account: "Accounts Payable", credit: 20000 },
  { account: "Revenue", credit: 60000 },
];

const TrialBalance:React.FC  = () => {
 const totalDebit = trialBalanceData.reduce((sum, row) => sum + (row.debit || 0), 0);
  const totalCredit = trialBalanceData.reduce((sum, row) => sum + (row.credit || 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trial Balance</h1>
      <p className="text-sm text-gray-500 mb-4">Current Financial Year</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4 border-b">Account</th>
              <th className="text-right py-2 px-4 border-b">Debit</th>
              <th className="text-right py-2 px-4 border-b">Credit</th>
            </tr>
          </thead>
          <tbody>
            {trialBalanceData.map((row, idx) => (
              <tr key={idx}>
                <td className="py-2 px-4 border-b">{row.account}</td>
                <td className="py-2 px-4 border-b text-right">
                  {row.debit ? `$${row.debit.toFixed(2)}` : ""}
                </td>
                <td className="py-2 px-4 border-b text-right">
                  {row.credit ? `$${row.credit.toFixed(2)}` : ""}
                </td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td className="py-2 px-4 border-t">TOTAL</td>
              <td className="py-2 px-4 border-t text-right">${totalDebit.toFixed(2)}</td>
              <td className="py-2 px-4 border-t text-right">${totalCredit.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrialBalance 