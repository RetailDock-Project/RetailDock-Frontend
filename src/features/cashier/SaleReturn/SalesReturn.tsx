import React from "react";
import { FilePlus, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";


import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import SalesReturnsList from "./SalesReturnsList";
import Filter from "../../../components/ui/reusable/Filter";

const SalesReturn: React.FC = () => {
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
    <Filter/>


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
      <SalesReturnsList/>
    </div>
  );
};

export default SalesReturn;
