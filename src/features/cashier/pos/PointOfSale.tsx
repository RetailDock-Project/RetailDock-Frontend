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
import { addNewSale, downloadSaleInvoice, getSaleInvoiceNumber } from "../../../services/api/cashierApi/cashierApi";
import { downloadExcelFile } from "../../../utils/downloadExcel";
import SalesInvoice from "../Invoice/salesInvoice/SalesInvoice";

export type Customer = {
  id: number;
  customerName: string;
  phone: string;
  place: string;
  email: string;
  gstNumber: string;
  ledgerId:string;
  creditCustomer:boolean;
 
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
  costPrice:number;
  sellingPrice: number;
};


const PointOfSale: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);


  const [mobileNum, setMobileNum] = useState("");
  const [salesMode, setSalesMode] = useState("B2C");
  const [gst_Type, setGst_Type] = useState("SGST");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [invoiceNumber,setInvoiceNumber]=useState('');
  const [creditCustomer,setCreditCustomer]=useState<boolean>(false);

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

    if(product.stock <= 0)
      {
      toast.error("no stock");
      
    }
    setProductSelected((prev) => [product,...prev ]);
  }else{
    toast.error("Product Already Exists");
  }

  setSearchText("");
};



useEffect(() => {
  const fetchInvoice = async () => {
    try {
      const response = await getSaleInvoiceNumber(salesMode);
      setInvoiceNumber(response.data);
    } catch (error) {
      toast.error("Failed to fetch invoice number");
    }
  };

  fetchInvoice();
}, [salesMode,mobileNum]);

useEffect(()=>{

   if(selectedCustomer?.creditCustomer){
            setPaymentMode("Credit");
            setCreditCustomer(true);
          }

},[selectedCustomer])

const handlePayment=()=>{

}

const buildSalePayload = () => {
  const payload = {
    paymentType: paymentMode,
    creditCustomer:creditCustomer,
    invoiceNumber:invoiceNumber,
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
      
      transactionsDebit: [  
        {
          ledgerId: COGS_LedgerId,
        
        }
      ],
      transactionsCredit: [
        {
          ledgerId: saleLedgerId,
      
        },
        {
          ledgerId: taxLedgerId,
        
        },
        {
          ledgerId: inventoryLedgerId,
    
        }
      ]
    }
  };

  return payload;
};

const createNewSale=async()=>{
  try{

    const isValidSale=()=>
 saleItems.some(item => (item.quantity>0 &&  item.productId));
    
    
    if(isValidSale()){

    
     setIsLoading(true);
  const payload=buildSalePayload();
  const response=await addNewSale(payload);
  toast.success(response.message)
  downloadExcelFile(()=> downloadSaleInvoice(invoiceNumber),`SaleInvoice${invoiceNumber}.pdf`);
  setMobileNum("");
    }else{
      toast.error(" select atleast one product");
    }

  }catch(error:any){
   const errorMessage= error?.response?.data?.message || "Something went wrong!";
    toast.error(errorMessage);
  }
  finally{
    setIsLoading(false);
  }

}

  return (
    <div className="grid p-6 grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 h-screen ">
   
      <div className="w-full ">
        <div className="flex  justify-between">
           <PageHeader backTo="/home/cashier/pos" title="Add new Sale " />
              
 
       <div className="flex items-center gap-2 text-sm ">
    

                 <Button size="sm" className="bg-blue-600 p-2 h-6 mt-10" variant="primary" onClick={() => setIsCashModalOpen(true)}>
                   + Add Cash Customer
                 </Button>
                 <Button size="sm" variant="primary"  className=" h-6 p-2 mt-10" onClick={() => { setIsCreditModalOpen(true) }}>
                   + Add Credit Customer
                 </Button>

               </div>
               </div>
 <div className="mt-4 px-4 py-2 bg-gray-100 rounded-md shadow text-sm text-gray-700 font-medium flex items-center gap-2">
  🧾 <span className="text-gray-900">Invoice Number:</span> <span className="font-semibold text-blue-600">{invoiceNumber}</span>
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
  setCreditCustomer={setCreditCustomer}
/>


<POSSearchBar setSearchText={setSearchText} searchText={searchText}/>
        {/* <POSCategories /> */}
        <POSProductList searchText={searchText} handleProductAdd={handleProductAdd} />

      </div>
      
      <div className="w-full">
         <div className=" ">
        <CurrentSale productSelected={productSelected} setProductSelected={setProductSelected} saleItems={saleItems} setSaleItems={setSaleItems} newSale={createNewSale} isLoading={isLoading} creditCustomer={creditCustomer} paymentMode={paymentMode}/>
        </div>
      </div>
        <div className=" ">
         <SaleLedgers
  saleLedgerId={saleLedgerId}
  setSaleLedgerId={setSaleLedgerId}

  setCOGS_LedgerId={setCOGS_LedgerId}
 customerName={selectedCustomer?.customerName ||""}
 
  setTaxLedgerId={setTaxLedgerId}

  setInventoryLedgerId={setInventoryLedgerId}
/>
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
