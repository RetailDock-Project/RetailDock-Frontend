import React, { useEffect, useState } from 'react';
import {
  getCOGS_LedgerId,
  getInventoryTransactionLedgerId,
  getLedgerByName,
  getSaleLedgerId
} from '../../../services/api/cashierApi/cashierApi';

type SalesReturnLedgerProps = {
  customerName?: string;
  saleLedgerId: string;
  setSaleLedgerId: (id: string) => void;
returnCondition :string;
  setCOGS_LedgerId: (id: string) => void;
  setTaxLedgerId: (id: string) => void;
  setInventoryLedgerId: (id: string) => void;
};
type saleReturnLedgerResponse={
    id:string;
    ledgerName:string;
}



const SalesReturnLedger: React.FC<SalesReturnLedgerProps> = ({
  saleLedgerId,
  setSaleLedgerId,
  setCOGS_LedgerId,
  customerName,
  returnCondition,
  setTaxLedgerId,
  setInventoryLedgerId,
}) => {
  const [saleLedgerList, setSaleLedgerList] = useState<saleReturnLedgerResponse[]>([]);

useEffect(() => {
  if (saleLedgerList && saleLedgerList.length > 0) {
    setSaleLedgerId(saleLedgerList[0].id);
  }
}, [saleLedgerList]);



useEffect(() => {
  const fetchAllLedgerIds = async () => {
    try {
      let inventoryLedgerId = null;

      if (returnCondition === "Good") {
        const inventoryRes = await getInventoryTransactionLedgerId();
        
        setInventoryLedgerId(inventoryRes.data.id);
      } else {
        const inventoryLoss = await getLedgerByName('Inventory Loss');
 
        setInventoryLedgerId(inventoryLoss.data);
      }

      const [taxRes, cogsRes] = await Promise.all([
        getLedgerByName('output gst'),
        getCOGS_LedgerId()
      ]);

      setTaxLedgerId(taxRes.data);
      setCOGS_LedgerId(cogsRes.data.id);



    } catch (error) {
      console.error('❌ Error fetching ledger IDs:', error);
    }
  };

  const fetchSaleLedgers = async () => {
    try {
      const saleResponse = await getSaleLedgerId();
      setSaleLedgerList(saleResponse.data);

   
    } catch (error) {
      console.error('❌ Error fetching Saleledger IDs:', error);
    }
  };

  fetchAllLedgerIds();
  fetchSaleLedgers();
}, [returnCondition]);
  return (
    <div className="p-4 py-6 bg-white rounded-xl border border-gray-200 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Sale Return Ledgers :</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-medium">
        

        {/* Dr Side */}
        <div className="border shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Dr (Debit)</h3>
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
           {returnCondition=="Good"?
            <p className="w-full border border-gray-300 p-2 rounded-lg">
              Inventory A/c
            </p>: <p className="w-full border border-gray-300 p-2 rounded-lg">
              Inventory Loss A/c
            </p>}
          </div>
        </div>

        {/* Cr Side */}
     
           <div className="border shadow-md rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Cr (cedit)</h3>
          <div className="space-y-4">
            <p className="w-full border border-gray-300 p-2 rounded-lg h-8">
              {customerName}
            </p>
            <p className="w-full border border-gray-300 p-2 rounded-lg">
              COGS A/c
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReturnLedger;
