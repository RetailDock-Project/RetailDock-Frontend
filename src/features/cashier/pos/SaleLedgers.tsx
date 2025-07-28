import React, { useEffect, useState } from 'react';
import {
  getCOGS_LedgerId,
  getInventoryTransactionLedgerId,
  getLedgerByName,
  getSaleLedgerId
} from '../../../services/api/cashierApi/cashierApi';

type SaleLedgersProps = {
  customerName?: string;
  saleLedgerId: string;
  setSaleLedgerId: (id: string) => void;
  setCOGS_LedgerId: (id: string) => void;
  setTaxLedgerId: (id: string) => void;
  setInventoryLedgerId: (id: string) => void;
};

type saleLedgerResponse = {
  id: string;
  ledgerName: string;
};

const SaleLedgers: React.FC<SaleLedgersProps> = ({
  saleLedgerId,
  setSaleLedgerId,
  setCOGS_LedgerId,
  customerName,
  setTaxLedgerId,
  setInventoryLedgerId,
}) => {
  const [saleLedgerList, setSaleLedgerList] = useState<saleLedgerResponse[]>([]);

  useEffect(() => {
    if (saleLedgerList && saleLedgerList.length > 0) {
      setSaleLedgerId(saleLedgerList[0].id);
    }
  }, [saleLedgerList]);

  useEffect(() => {
    const fetchAllLedgerIds = async () => {
      try {
        const [taxRes, inventoryRes, cogsRes] = await Promise.all([
          getLedgerByName('output gst'),
          getInventoryTransactionLedgerId(),
          getCOGS_LedgerId()
        ]);

        setTaxLedgerId(taxRes.data);
        setInventoryLedgerId(inventoryRes.data.id);
        setCOGS_LedgerId(cogsRes.data.id);
      } catch (error) {
        console.error('Error fetching ledger IDs:', error);
      }
    };

    const fetchSaleLedgers = async () => {
      try {
        const saleResponse = await getSaleLedgerId();
        setSaleLedgerList(saleResponse.data);
      } catch (error) {
        console.error('Error fetching Sale ledger IDs:', error);
      }
    };

    fetchAllLedgerIds();
    fetchSaleLedgers();
  }, []);
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Sale Ledgers</h2>
        <div className="flex space-x-1">
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Dr</span>
          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">Cr</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Debit Side - Compact */}
        <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></div>
            <h3 className="text-sm font-medium text-gray-700">Debit</h3>
          </div>
          
          <div className="space-y-2">
            <div className="py-1.5 px-2 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-500 mb-0.5">Customer</p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {customerName || 'Select customer'}
              </p>
            </div>
            
            <div className="py-1.5 px-2 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-500 mb-0.5">Account</p>
              <p className="text-sm font-medium text-gray-800">COGS A/c</p>
            </div>
          </div>
        </div>

        {/* Credit Side - Compact */}
        <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
            <h3 className="text-sm font-medium text-gray-700">Credit</h3>
          </div>
          
          <div className="space-y-2">
            <div className="py-1.5 px-2 bg-white rounded border border-gray-200">
              <label className="text-xs text-gray-500 mb-0.5 block">Sale Account</label>
              <select
                value={saleLedgerId}
                onChange={(e) => setSaleLedgerId(e.target.value)}
                className="w-full p-1 text-sm rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                {saleLedgerList.map((curr, index) => (
                  <option key={index} value={curr.id}>
                    {curr.ledgerName}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="py-1.5 px-2 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-500 mb-0.5">Tax Account</p>
              <p className="text-sm font-medium text-gray-800">Output GST A/c</p>
            </div>
            
            <div className="py-1.5 px-2 bg-white rounded border border-gray-200">
              <p className="text-xs text-gray-500 mb-0.5">Inventory Account</p>
              <p className="text-sm font-medium text-gray-800">Inventory A/c</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleLedgers;