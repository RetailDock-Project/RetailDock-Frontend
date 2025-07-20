import React, { useState } from "react";
import { FilePlus, FileDown } from "lucide-react";
import { data, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";


import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import SalesReturnsList from "./SalesReturnsList";
import Filter from "../../../components/ui/reusable/Filter";
import { toDate } from "date-fns";

const SalesReturn: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });
  const navigate = useNavigate();
 
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      {/* Header */}
      <PageHeader
        title="Sales Return History"
        subtitle="View and manage all Sales returns"
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
              onClick={() => navigate("/home/cashier/sales-return/new")}
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
            >
              <FilePlus size={16} />
              New Return
            </Button>
          </>
        }
      />

     
        <div>
     <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

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
       <SalesReturnsList
        searchTerm={searchTerm}
        fromDate={dateRange.startDate}
        toDate={dateRange.endDate}
      />
    </div>
  );
};

export default SalesReturn;
