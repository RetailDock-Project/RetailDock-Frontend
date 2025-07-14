import React, { useEffect, useState } from "react";
import POSHeader from "./POSHeader";
import POSSearchBar from "./POSSearchBar";
// import POSCategories from "./POSCategories";
import POSProductList from "./POSProductList";
import CurrentSale from "./CurrentSale";
import { Button } from "../../../components/ui/reusable/Button";
import SaleLedgers from "./SaleLedgers";
// import { useNavigate } from "react-router-dom";
import AddCreditCustomerModal from "../Debtors/AddCustomerModal";
import AddCustomerModal from "./AddCustomer";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import toast from "react-hot-toast";
import { addNewSale } from "../../../services/api/cashierApi/cashierApi";

export type Customer = {
  id: number;
  customerName: string;
  phone: string;
  place: string;
  email: string;
  gstNumber: string;
  
 
};
export type saleItem={
  productId:string;
  unitPrice:number;
  discountAmount:number;
  quantity:number;

}
export type Product = {
  id:string;
  productName: string;
  gstRate:number;
  productCategory: string;
  stock: number;
  mrp: number;
  sellingPrice: number;
};


const PointOfSale: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);


  const [mobileNum, setMobileNum] = useState("");
  const [salesMode, setSalesMode] = useState("B2C");
  const [gst_Type, setGst_Type] = useState("SGST");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [saleItems, setSaleItems] = useState<saleItem[]>([]);


  const [saleLedgerId,setSaleLedgerId]=useState('');
  const [COGS_LedgerId,setCOGS_LedgerId]=useState('');
  const [taxLedgerId,setTaxLedgerId]=useState('');
  const [inventoryLedgerId,setInventoryLedgerId]=useState('');

const [productSelected,setProductSelected]=useState<Product[]>([]);

  const [searchText, setSearchText] = useState("");


  const [isCreditModalOpen,setIsCreditModalOpen]=useState(false);
  const [isCashModalOpen,setIsCashModalOpen]=useState(false);
  
const handleProductAdd = (product: Product) => {
  const alreadyExists = productSelected.find((x) => x.id === product.id);

  if (!alreadyExists) {
    setProductSelected((prev) => [...prev, product]);
  }else{
    toast.error("Product Already Exists");
  }
  

  setSearchText("");
};


const buildSalePayload = () => {
  const payload = {
    paymentType: paymentMode,
    mobileNum: mobileNum,
    text: null, // or "" or any other optional field
    salesMode: salesMode,
    gsT_Type: gst_Type,
    dueDate: dueDate?.toISOString() || null,
    saleItems: saleItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discountAmount: item.discountAmount
    })),
    saleVoucher: {
      voucherTypeId: null, // or pass the actual voucherTypeId if you have one
      remarks: '',       // or pass remarks string
      transactionsDebit: [  
        {
          ledgerId: COGS_LedgerId,
          narration: `COGS for sale to ${selectedCustomer?.customerName || "customer"}`
        }
      ],
      transactionsCredit: [
        {
          ledgerId: saleLedgerId,
          narration: `Sale to ${selectedCustomer?.customerName || "customer"}`
        },
        {
          ledgerId: taxLedgerId,
          narration: `Tax for sale`
        },
        {
          ledgerId: inventoryLedgerId,
          narration: `Inventory reduced`
        }
      ]
    }
  };

  return payload;
};

const createNewSale=async()=>{
  try{
     setIsLoading(true);
  const payload=buildSalePayload();
  await addNewSale(payload);


  }catch(error){
    console.log(error,"error from createNewSale")
  }
  finally{
    setIsLoading(false);
  }

}

  return (
    <div className="grid p-6 grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">
   
      <div className="w-full ">
        <div className="flex  justify-between">
           <PageHeader backTo="/home/cashier/pos" title="Add new Sale" />
      
           <div className="flex  gap-3">
                 <Button size="sm" className="bg-blue-600 p-2 h-6 mt-10" variant="primary" onClick={() => setIsCashModalOpen(true)}>
                   + Add Cash Customer
                 </Button>
                 <Button size="sm" variant="primary"  className=" h-6 p-2 mt-10" onClick={() => { setIsCreditModalOpen(true) }}>
                   + Add Credit Customer
                 </Button>

               </div>
               </div>
<POSHeader
  mobile={mobileNum}
  setMobile={setMobileNum}
  businessType={salesMode}
  setBusinessType={setSalesMode}
  gstType={gst_Type}
  setGstType={setGst_Type}
  paymentMode={paymentMode}
  setPaymentMode={setPaymentMode}
  selectedDate={dueDate}
  setSelectedDate={setDueDate}
  selectedCustomer={selectedCustomer}
  setSelectedCustomer={setSelectedCustomer}
/>

 
        <POSSearchBar setSearchText={setSearchText} searchText={searchText}/>
        {/* <POSCategories /> */}
        <POSProductList searchText={searchText} handleProductAdd={handleProductAdd} />
      </div>
      
      <div className="w-full">
        <div>
         <SaleLedgers
  saleLedgerId={saleLedgerId}
  setSaleLedgerId={setSaleLedgerId}

  setCOGS_LedgerId={setCOGS_LedgerId}
 customerName={selectedCustomer?.customerName ||""}
 
  setTaxLedgerId={setTaxLedgerId}

  setInventoryLedgerId={setInventoryLedgerId}
/>
        </div>
        <div className=" ">
        <CurrentSale productSelected={productSelected} setProductSelected={setProductSelected} saleItems={saleItems} setSaleItems={setSaleItems} newSale={createNewSale} isLoading={isLoading}/>
        </div>
      </div>


<AddCustomerModal
      isOpen={isCashModalOpen}
        onClose={() => setIsCashModalOpen(false)}
/>


                     <AddCreditCustomerModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
      />
    </div>
  );
};

export default PointOfSale;
