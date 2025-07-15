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
type saleLedgerResponse={
    id:string;
    ledgerName:string;
}

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
        const saleResponse = await getSaleLedgerId(); // assuming this returns an array
        setSaleLedgerList(saleResponse.data);
      } catch (error) {
        console.error('Error fetching Saleledger IDs:', error);
      }
    };

    fetchAllLedgerIds();
    fetchSaleLedgers();
  }, []);

  return (
    <div className="p-4 mt-[72px] bg-white rounded-xl border border-gray-200 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Sale Ledgers :</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium">
        {/* Dr Side */}
        <div className="border shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Dr (Debit)</h3>
          <div className="space-y-4">
            <p className="w-full border border-gray-300 p-2 rounded-lg h-8">
              {customerName}
            </p>
            <p className="w-full border border-gray-300 p-2 rounded-lg">
              COGS A/c
            </p>
          </div>
        </div>

        {/* Cr Side */}
        <div className="border shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Cr (Credit)</h3>
          <div className="space-y-4">
            <select
              value={saleLedgerId}
              onChange={(e) => setSaleLedgerId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
             
              {saleLedgerList.map((curr: any, index: number) => (
                <option key={index} value={curr.id}>
                  {curr.ledgerName}
                </option>
              ))}
            </select>

            <p className="w-full border border-gray-300 p-2 rounded-lg">
              output GST A/c
            </p>
            <p className="w-full border border-gray-300 p-2 rounded-lg">
              Inventory A/c
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleLedgers;
