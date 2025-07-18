import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { DateRangePicker } from '../../../components/ui/reusable/DateRangePicker'
import { getLedgerReportById } from '../../../services/api/AccountsApi/accountsApi'


const LedgerTransactionHistory: React.FC = () => {
  const { id: ledgerId } = useParams<{ id: string }>()
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  })

  const {
    data: ledgerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['ledger-report', ledgerId, dateRange.startDate, dateRange.endDate],
    queryFn: () =>
      getLedgerReportById(
        ledgerId!,
        dateRange.startDate?.toISOString().split('T')[0],
        dateRange.endDate?.toISOString().split('T')[0]
      ),
    enabled: !!ledgerId,
  })

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError) return <div className="p-6 text-red-600">Failed to load ledger data.</div>

  return (
    <div className="p-6">
      {/* Heading and Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Ledger Transactions</h2>
          <p className="text-sm text-gray-500">View all transactions for the selected ledger.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative w-full sm:w-64">
            <h5 className="text-sm font-bold text-gray-800">
              Ledger Name: {ledgerData?.ledgerName || '-'}
            </h5>
          </div>
          <div className="w-full sm:w-auto">
            <DateRangePicker onChange={(range) => setDateRange(range)} />
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-2 py-2 min-w-[100px]">Date</th>
              <th className="px-2 py-2 min-w-[100px]">Voucher</th>
              <th className="px-2 py-2 min-w-[200px]">Description</th>
              <th className="px-2 py-2 min-w-[160px]">Related Account</th>
              <th className="px-2 py-2 min-w-[100px]">Debit</th>
              <th className="px-2 py-2 min-w-[100px]">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Opening Balance */}
            <tr className="bg-blue-50 font-semibold text-gray-700">
              <td colSpan={4} className="px-2 py-2">Opening Balance</td>
              <td className="px-2 py-2">
                {ledgerData?.openingType === 'Dr' ? ledgerData?.openingBalance?.toFixed(2) : ''}
              </td>
              <td className="px-2 py-2">
                {ledgerData?.openingType === 'Cr' ? ledgerData?.openingBalance?.toFixed(2) : ''}
              </td>
            </tr>

            {/* Transactions */}
            {ledgerData?.transactions?.map((txn:any, index:any) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-2">{new Date(txn.voucherDate).toLocaleDateString()}</td>
                <td className="px-2 py-2">{txn.voucherNumber}</td>
                <td className="px-2 py-2">{txn.typeName}</td>
                <td className="px-2 py-2">{txn.oppositeLedger}</td>
                <td className="px-2 py-2">{txn.isDebit ? txn.amount.toFixed(2) : ''}</td>
                <td className="px-2 py-2">{!txn.isDebit ? txn.amount.toFixed(2) : ''}</td>
              </tr>
            ))}

            {/* Closing Balance */}
            <tr className="bg-green-50 font-semibold text-gray-700">
              <td colSpan={4} className="px-2 py-2">Closing Balance</td>
              <td className="px-2 py-2">
                {ledgerData?.closingType === 'Dr' ? ledgerData?.closingBalance?.toFixed(2) : ''}
              </td>
              <td className="px-2 py-2">
                {ledgerData?.closingType === 'Cr' ? ledgerData?.closingBalance?.toFixed(2) : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <div className="flex justify-end mt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
          Export to Excel
        </button>
      </div>
    </div>
  )
}

export default LedgerTransactionHistory
