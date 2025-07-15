import React, { useEffect, useState } from "react";
import { FilePlus, FileDown } from "lucide-react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../../components/ui/reusable/Button";
import { PageHeader } from "../../../../components/ui/reusable/PageHeader";

import AuditTrail from "../../../../components/ui/reusable/AuditTrail";
import CustomerDetails from "./CustomerDetails";
import SalesQuickActions from "./SalesQuickActions";
import SaleItems from "./SaleItems";
import SaleDetailInfo from "./SaleDetailsInfo";
import { getAllSaleInvoices, getSaleByInvoiceNumber, getSaleInvoiceDetails } from "../../../../services/api/cashierApi/cashierApi";



const SaleInformation:React.FC = () => {
  const [invoiceInfo,setSaleInfo]=useState<any>();
  const { invoiceNumber } = useParams();
  
  const navigate = useNavigate();
  useEffect(()=>{

   const fetchInvoiceByInvoiceNumber=async (invoiceNumber:string|undefined)=>{
    try{
const response=await getSaleInvoiceDetails(invoiceNumber);
setSaleInfo(response.data);

    }catch(error){
      console.log(error,"error from get saleByInvoice")
    }
   }
   fetchInvoiceByInvoiceNumber(invoiceNumber);
  },[invoiceNumber])

  return (

    <div className="p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/cashier/invoices"
        title={`Sale - ${invoiceNumber}`}
        subtitle="View finalized Sale details and items"
        actions={
          <>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => console.log("Print purchase")}
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
        <SaleDetailInfo invoiceDetails={invoiceInfo}/>
          <SaleItems />
        </div>
        <div>
          <CustomerDetails />
          <SalesQuickActions />
          <AuditTrail />
        </div>
      </div>
    </div>
  );
};

export default SaleInformation;
