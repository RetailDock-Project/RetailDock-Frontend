import React, { useEffect, useState } from "react";
import { FilePlus, FileDown } from "lucide-react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../../components/ui/reusable/Button";
import { PageHeader } from "../../../../components/ui/reusable/PageHeader";


import Loader from "../../../../components/ui/reusable/Loader";

import SaleReturnItemDetail from "./SaleReturnItemDetail";
import ReturnItems from "./ReturnItems";
import CustomerDetails from "../../Invoice/salesInvoice/CustomerDetails";
import { useSaleReturnInvoiceInfo } from "../../Hooks/useSaleReturnInvoiceInfo";
import SalesReturnQuickActions from "./SalesReturnQuickAction";



const SaleReturnItemViewInfo:React.FC = () => {
  const [returnInfo,setReturnInfo]=useState<any>();
  const { ReturninvoiceNumber } = useParams();

  const [customerName,setCustomerName]=useState<string| null>(null);
  const [gstNumber,setGstNumber]=useState<string | null>(null);
  const [mobileNum,setMobileNum]=useState<string| null>(null);
  const [address,setAddress]=useState<string | null>(null);
  const [Email,setEmail]=useState<string | null>(null);
  
  const navigate = useNavigate();
  const {data,isLoading,error}=useSaleReturnInvoiceInfo(ReturninvoiceNumber);

useEffect(()=>{
if(data){
setReturnInfo(data);
setCustomerName(data.customerName);
setGstNumber(data.gstNumber?? null);
setMobileNum(data.contactNumber);
setAddress(data.place);
setEmail(data.email);
}
},[data])
if(isLoading) return<p><Loader/></p>
if(error) return<p>error While fetching..</p>
  return (

    <div className="p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/cashier/sales-returns"
        title={`SaleReturn - ${ReturninvoiceNumber}`}
        subtitle="View finalized Sale Return details and items"
        actions={
          <>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
            >
              <FilePlus size={16} />
              Print
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FileDown size={16} />
              Download Invoice
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() =>
                navigate(`/home/inventory/purchases/edit/`)
              }
            >
              <AiOutlineEdit size={16} />
              Edit
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
        <div className="md:col-span-2">
        <SaleReturnItemDetail SaleReturnDetails={returnInfo}/>
          <ReturnItems items={returnInfo?.saleReturnItems} totalAmount={returnInfo?.totalAmount} subTotal={returnInfo?.taxableAmount} taxAmount={returnInfo?.totalTaxAmount}/>
        </div>
        <div>
          <CustomerDetails  name ={customerName} gstNumber={gstNumber} mobileNumber={mobileNum} address={address} email={Email}/>
          <SalesReturnQuickActions  invoiceNumber={ReturninvoiceNumber}/>
         
        </div>
      </div>
    </div>
  );
};

export default SaleReturnItemViewInfo;
