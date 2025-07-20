import React, { useState } from "react";
import { FilePlus, FileDown, Pencil } from "lucide-react";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";

import { useNavigate } from "react-router-dom";
import SalesInvoice from "./salesInvoice/SalesInvoice";
import SalesReturnInvoice from "./saleReturnInvoice/SalesReturnInvoice";

import Filter from "../../../components/ui/reusable/Filter";
import { Button } from "../../../components/ui/reusable/Button";

const InvoiceDetails: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });
  const [sales, setSales] = useState<boolean>(true);

  const [fullData,setFullData]=useState<boolean| null>(false);
  const [skipPage,SetSkipPage]=useState<number | null>(null);
  const [takePage,setTakePage]=useState<number|null>(null);
  const navigate = useNavigate();



  const purchaseId = "123"; // TODO: Replace with actual ID

  return (
    <div className="p-6">
      {/* Page Header */}
      <PageHeader
        title="Invoices"
        subtitle="View finalized Sales details and items"
        actions={
          <div className="flex gap-2">
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
              onClick={() => console.log("Download invoice")}
            >
              <FileDown size={16} />
              Download Invoice
            </Button>

            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate(`/home/inventory/purchases/edit/${purchaseId}`)}
            >
              <Pencil size={16} />
              Edit Invoice
            </Button>
          </div>
        }
      />

      {/* Filter Section + Toggle + Results */}
      <div >


        {/* Search + Date Filter */}

      <div>

           <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      </div>



        {/* Toggle Sales/Returns */}
        <div className="flex justify-between items-center mb-4 mt-8 px-4">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-md ${
                sales ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setSales(true)}
            >
              Sales
            </button>

            <button
              className={`px-4 py-2 rounded-md ${
                sales ? "bg-gray-200 text-gray-800" : "bg-gray-600 text-white"
              }`}
              onClick={() => setSales(false)}
            >
              Returns
            </button>
          </div>
        </div>

        {/* Render Invoices */}
        <div className="px-4 pb-4">
          {sales ? <SalesInvoice fullData={fullData} setFullData={setFullData} skipPage={skipPage} setSkipPage={SetSkipPage} takePage={takePage} setTakePage={setTakePage}/> : 
          <SalesReturnInvoice fullData={fullData} setFullData={setFullData} skipPage={skipPage} setSkipPage={SetSkipPage} takePage={takePage} setTakePage={setTakePage}/>}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
