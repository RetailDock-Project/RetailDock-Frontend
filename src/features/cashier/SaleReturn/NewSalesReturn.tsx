import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../../components/ui/reusable/PageHeader";

import { SalesDetails } from "./SalesDetails";
import {  SelectItemsToSaleReturn } from "./SelectItemsToSaleReturn";
import SalesReturnSummary from "./SalesReturnSummary";

import SalesReturnInformation from "./SalesReturnInformation";

import { addNewSalesReturn, downloadSaleReturnInvoice, getReturnedProductCount, getSaleByInvoiceNumber } from "../../../services/api/cashierApi/cashierApi";
import SalesReturnLedger from "./SalesReturnLedger";
import ProceedToReturn from "./ProceedToReturn";
import { useSaleInvoiceInfo } from "../Hooks/UseSaleInvoice";
import toast from "react-hot-toast";
import { useSaleReturnInvoice } from "../Hooks/useSaleReturnInvoice";
import { downloadExcelFile } from "../../../utils/downloadExcel";




type SaleItem = {
  productId: string;
  productName: string | null;
  quantity: number;
  unitName:string;
  unitPrice:number;
  taxRate:number;
  returnQuantity: number;
  alreadyReturnedQuantity: number;
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
     const [returnedQuantities, setReturnedQuantities] = useState<Record<string, number>>({});
const [paymentMode,setPaymentMode]=useState("Cash");
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
const taxAmount = selectedItems.reduce(
  (sum, item) => sum + (item.returnQuantity * item.taxRate/100),
  0
);





useEffect(() => {
  const fetchReturnedQuantities = async () => {
    if (!selectedSale?.saleId || !selectedSale?.saleItems) return;

    const result: Record<string, number> = {};

    await Promise.all(
      selectedSale.saleItems.map(async (item: any) => {
        try {
          const response = await getReturnedProductCount(selectedSale.saleId, item.productId);
          result[item.productId] = response?.data?? 0; 
        } catch (err) {
          console.error(err,"Error fetching returned count for");
          result[item.productId] = 0;
        }
      })
    );

    setReturnedQuantities(result);
  };

  fetchReturnedQuantities();
}, [selectedSale]);


useEffect(() => {
  if (selectedSale?.saleItems) {
    const extendedItems = selectedSale?.saleItems.map((item: any) => ({
      ...item,
      selected: false,
      alreadyReturnedQuantity:returnedQuantities[item.productId] || 0,
      returnQuantity: 0,
      reason: "",

    }));
    setItems(extendedItems);
  }
}, [selectedSale,returnedQuantities]);



const {data}=useSaleInvoiceInfo(searchTerm);
 const {data:saleReturnInvoice}=useSaleReturnInvoice(data?.salesMode);

    useEffect(()=>{
  
  setSelectedSale(data);


    },[data])
   

   

const handleReturnDate = (date: Date) => {
  const saleDate = new Date(selectedSale?.saleDate ?? '');

  
  if (isNaN(saleDate.getTime())) {
    toast.error("Invalid sale date");
    return;
  }
 setReturnDate(date);
  // if (date < saleDate || date > new Date()) {
  //   toast.error("Select correct Return Date");
  // } else {
   
  // }
};




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
    returnQuantity: !allSelected ? (item.quantity - item.alreadyReturnedQuantity) : 0, 
  }));

  setItems(updated);
};




const payload = {
  saleInvoiceNumber: selectedSale?.invoiceNumber,
  returnInvoiceNumber:saleReturnInvoice,
  returnPayment: paymentMode, 
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

const addSalesReturn = async () => {
  try {
    const hasValidReturnItems = () =>
  items.some(item => item.selected && item.returnQuantity > 0);
    if(hasValidReturnItems()){
 setIsLoading(true);
    const response = await addNewSalesReturn(payload);
    
 toast.success(response.message); 
//  await downloadExcelFile(()=>downloadSaleReturnInvoice(saleReturnInvoice),`SaleReturn${saleReturnInvoice}.Pdf`)
 setSearchTerm('');
 setSelectedSale(null);
 setItems([]);
    }else{
       toast.error('select atleast one quantity'); 
    }
   
   // on success
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "Something went wrong!";
    toast.error(errorMessage); // on error
  } finally {
    setIsLoading(false);
  }
};


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
       <div className="mt-4 px-4 py-2 bg-gray-100 rounded-md shadow text-sm text-gray-700 font-medium flex items-center gap-2">
  🧾 <span className="text-gray-900">Return Invoice Number:</span> <span className="font-semibold text-blue-600">{saleReturnInvoice}</span>
</div>
      <div className=" pt-6 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SalesReturnInformation
          returncondition={returnCondition}
          setReturnCondition={setReturnCondition}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleReturnDate={handleReturnDate}
          returnReason={returnReason}
          setReturnReason={setReturnReason}
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
          isCreditCustomer={selectedSale?.isCreditCustomer}
          
          />
          <SalesDetails customerInfo={selectedSale}/>
          <SelectItemsToSaleReturn saleItems={items} handleChangeReason={handleChangeReason} handleChangeQuantity={handleChangeQuantity} handleSelectedItem={handleSelectItem} handleSelectAllItems={handleSelectAllItems}/>
        </div>
        <div className="space-y-6">
                <SalesReturnLedger
  saleLedgerId={saleLedgerId}
  setSaleLedgerId={setSaleLedgerId}
returnCondition={returnCondition}
  setCOGS_LedgerId={setCOGS_LedgerId}
 customerName={selectedSale?.customerName ||""}
 
  setTaxLedgerId={setTaxLedgerId}

  setInventoryLedgerId={setInventoryLedgerId}
/>
          <SalesReturnSummary isLoading={isLoading} onClick={addSalesReturn} itemCount={itemCount} totalQuantity={totalQuantity} totalValue={totalValue} taxAmount={taxAmount}/>
        
        
        </div>
      </div>
    </div>
  );
};

export default NewSalesReturn;
