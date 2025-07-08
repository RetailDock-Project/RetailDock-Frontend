import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";

import React from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../../components/ui/reusable/PageHeader";

import { SalesDetails } from "./SalesDetails";
import {  SelectItemsToSaleReturn } from "./SelectItemsToSaleReturn";
import SalesReturnSummary from "./SalesReturnSummary";
import SalesReturnQuickActions from "./SalesReturnQuickAction";
import SalesReturnInformation from "./SalesReturnInformation";

const NewSalesReturn: React.FC = () => {
  const navigate = useNavigate();
  const handleBrowseSales = () => {
    navigate("/home/cashier/invoices");
  };

  const handleSelectAllItems = () => {
    console.log("Selecting all items...");
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
      <div className=" pt-6 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SalesReturnInformation
            Sold={["PO-2025-0001", "PO-2025-0002"]}
            reasons={[
              "Defective item",
              "Wrong item delivered",
              "Excess quantity",
            ]}
          />
          <SalesDetails />
          <SelectItemsToSaleReturn/>
        </div>
        <div className="space-y-6">
          {/* Return Summary & Quick Actions components can go here */}
          <SalesReturnSummary itemCount={2} totalQuantity={5} totalValue={90900} />
          <SalesReturnQuickActions
            onBrowsePurchases={handleBrowseSales}
            onSelectAllItems={handleSelectAllItems}
          />
        </div>
      </div>
    </div>
  );
};

export default NewSalesReturn;
