import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../../components/ui/reusable/PageHeader";

import { SalesDetails } from "./SalesDetails";
import {  SelectItemsToSaleReturn } from "./SelectItemsToSaleReturn";
import SalesReturnSummary from "./SalesReturnSummary";

import SalesReturnInformation from "./SalesReturnInformation";

import { addNewSalesReturn, getSaleByInvoiceNumber } from "../../../services/api/cashierApi/cashierApi";
import SalesReturnLedger from "./SalesReturnLedger";
import ProceedToReturn from "./ProceedToReturn";




type SaleItem = {
  productId: string;
  productName: string | null;
  quantity: number;
  unitName:string;
  unitPrice:number;
  returnQuantity: number;
  reason: string;
  selected: boolean;
  [key: string]: any; // allow other props
};


const NewSalesReturn: React.FC = () => {
  const [selectedSale, setSelectedSale] = useState<any>();
   const [searchTerm, setSearchTerm] = useState("");
   const [returnCondition,setReturnCondition]=useState("Good");
    const [returnDate, setReturnDate] = useState<Date| null>(new Date());
     const [returnReason, setReturnReason] = useState("");
  const [items, setItems] = useState<SaleItem[]>([]);


  const [isLoading,setIsLoading]=useState(false)

  const [saleLedgerId,setSaleLedgerId]=useState('');
  const [COGS_LedgerId,setCOGS_LedgerId]=useState('');
  const [taxLedgerId,setTaxLedgerId]=useState('');
  const [inventoryLedgerId,setInventoryLedgerId]=useState('');


  const navigate = useNavigate();

  const handleBrowseSales = () => {
    navigate("/home/cashier/invoices");
  };

const selectedItems = items.filter(item => item.selected && item.returnQuantity > 0);

const itemCount = selectedItems.length;

const totalQuantity = selectedItems.reduce((sum, item) => sum + item.returnQuantity, 0);

const totalValue = selectedItems.reduce(
  (sum, item) => sum + item.returnQuantity * item.unitPrice,
  0
);



useEffect(() => {
  if (selectedSale?.saleItems) {
    const extendedItems = selectedSale?.saleItems.map((item: any) => ({
      ...item,
      selected: false,
      returnQuantity: 0,
      reason: "",

    }));
    setItems(extendedItems);
  }
}, [selectedSale]);


    useEffect(()=>{
  
  const fetchSaleDetails=async(searchTerm:string)=>{
  
    try{
  
  const data=await getSaleByInvoiceNumber(searchTerm);
  setSelectedSale(data.data);
  
    }catch(error){
      console.log(error,"error from fetch SaleDetails");
    }
  
  
  }
  fetchSaleDetails(searchTerm);
    },[searchTerm])
   



const handleChangeReason=(id:string,reason:string)=>{
 const updatedItems = items?.map(item =>
  item.productId === id
    ? { ...item, reason }
    : item
);
setItems(updatedItems);

}

const handleChangeQuantity=(id:string,quantity:number)=>{
  const updatedItems=items?.map(item=>
    
    item.productId===id ? {...item,returnQuantity:quantity} :item 

  )
  setItems(updatedItems);
}

const handleSelectItem = (id: string) => {
  const updatedItems = items?.map(item =>
    item.productId === id
      ?{ ...item, selected: !item.selected } 
      : item
  );
  setItems(updatedItems);
};

const handleSelectAllItems = () => {
  const allSelected = items.every(item => item.selected);

  const updated = items.map(item => ({
    ...item,
    selected: !allSelected, 
    returnQuantity: !allSelected ? item.quantity : 0, 
  }));

  setItems(updated);
};




const payload = {
  saleInvoiceNumber: selectedSale?.invoiceNumber,
  returnPayment: "Cash", 
  returnDate,
  text: returnReason,
  returnCondition,
  returnItems: items
    .filter(item => item.selected && item.returnQuantity > 0)
    .map(item => ({
      productId: item.productId,
      quantity: item.returnQuantity,
      reason: item.reason
    })),
  voucher: {
    voucherTypeId: "", 
    remarks: `Sales return for invoice ${selectedSale?.invoiceNumber}`,
    transactionsDebit: [
      {
        ledgerId: saleLedgerId,
        narration: "Sales Return A/c"
      },
      {
        ledgerId: taxLedgerId,
        narration: "Reversal of Output Tax"
      },
      {
        ledgerId: inventoryLedgerId,
        narration: "Inventory Returned"
      }
    ],
    transactionsCredit: [
      {
        ledgerId: COGS_LedgerId,
        narration: "Reversal of Cost of Goods Sold"
      }
    ]
  }
};

const addSalesReturn=async()=>{
try{
setIsLoading(true);
await addNewSalesReturn(payload);

}catch(error){
  console.log("error from addNewSalesReturn");

}finally{
  setIsLoading(false);
}
}

  return (

    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      {/* Header */}
      <PageHeader
        backTo="/home/cashier/sales-Returns"
        title="New Sales Return"
        subtitle="Process a return to Customer"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/cashier/sales-returns")}
            >
              <FileDown size={16} />
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
            >
              <FilePlus size={16} />
              Process Return
            </Button>
          </>
        }
      />
      <div className=" pt-6 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SalesReturnInformation
          returncondition={returnCondition}
          setReturnCondition={setReturnCondition}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setReturnDate={setReturnDate}
          returnReason={returnReason}
          setReturnReason={setReturnReason}
          
          />
          <SalesDetails customerInfo={selectedSale}/>
          <SelectItemsToSaleReturn saleItems={items} handleChangeReason={handleChangeReason} handleChangeQuantity={handleChangeQuantity} handleSelectedItem={handleSelectItem} handleSelectAllItems={handleSelectAllItems}/>
        </div>
        <div className="space-y-6">
                <SalesReturnLedger
  saleLedgerId={saleLedgerId}
  setSaleLedgerId={setSaleLedgerId}

  setCOGS_LedgerId={setCOGS_LedgerId}
 customerName={selectedSale?.customerName ||""}
 
  setTaxLedgerId={setTaxLedgerId}

  setInventoryLedgerId={setInventoryLedgerId}
/>
          <SalesReturnSummary isLoading={isLoading} onClick={addSalesReturn} itemCount={itemCount} totalQuantity={totalQuantity} totalValue={totalValue} />
        
        
        </div>
      </div>
    </div>
  );
};

export default NewSalesReturn;
