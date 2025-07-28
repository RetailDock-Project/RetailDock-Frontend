import React, { useState } from "react";
import { FilePlus, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";


import { PageHeader } from "../../../components/ui/reusable/PageHeader";

import Filter from "../../../components/ui/reusable/Filter";
import SalesList from "./SalesList";

const Sales: React.FC = () => {
  const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
   const [dateRange, setDateRange] = useState<{
     startDate: Date | null;
     endDate: Date | null;
   }>({ startDate: null, endDate: null });
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      {/* Header */}
      <PageHeader
        title="Sales History"
        subtitle="View and manage all Sales "
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
           
            >
              <FileDown size={16} />
              Export
            </Button>
            <Button
              onClick={() => navigate("/home/cashier/pos/new")}
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
            >
              <FilePlus size={16} />
              New Sale
            </Button>
          </>
        }
      />

     
        <div>
    <Filter dateRange={dateRange} setDateRange={setDateRange} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>


          {/* Search */}
    

          {/* Date Range */}
       

          {/* Status Dropdown */}
          <div>
            {/* <label className="block text-sm font-medium mb-1">Status</label>
            <DropdownList
              options={["Option A", "Option B", "Option C"]}
              onSelect={(val) => console.log("Selected:", val)}
              label="Choose Option"
            /> */}

        </div>
      </div>
      <SalesList fromDate={dateRange.startDate} toDate={dateRange.endDate} searchTerm={searchTerm}/>
    </div>
  );
};

export default Sales;
