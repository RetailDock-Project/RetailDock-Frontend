import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";

import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnInformation from "./ReturnInformation";
import ReturnSummary from "./ReturnSummary";
import ReturnQuickActions from "./ReturnQuickActions";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { PurchaseOrderDetails } from "./PurchaseOrderDetails";
import { SelectItemsToReturn } from "./SelectItemsToReturn";
import { createPurchaseReturn } from "../../../services/api/inventoryapi/inventoryApi";

const NewPurchaseReturn: React.FC = () => {
  const navigate = useNavigate();
  const handleBrowsePurchases = () => {
    navigate("/home/inventory/purchases");
  };

  const handleSelectAllItems = () => {
    console.log("Selecting all items...");
  };

  const addPurchaseReturn = async () => {
    try {
      //   await createPurchaseReturn(data);
    } catch (error) {}
  };
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      {/* Header */}
      <PageHeader
        backTo="/home/inventory"
        title="New Purchase Return"
        subtitle="Process a return to supplier"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-order/new")}
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
          <ReturnInformation
            purchaseOrders={[
              { id: "1", invoiceNumber: "PO-2025-0001" },
              { id: "2", invoiceNumber: "PO-2025-0002" },
            ]}
            reasons={[
              "Defective item",
              "Wrong item delivered",
              "Excess quantity",
            ]}
          />

          <PurchaseOrderDetails />
          <SelectItemsToReturn />
        </div>
        <div className="space-y-6">
          {/* Return Summary & Quick Actions components can go here */}
          <ReturnSummary itemCount={2} totalQuantity={5} totalValue={90900} />
          <ReturnQuickActions
            onBrowsePurchases={handleBrowsePurchases}
            onSelectAllItems={handleSelectAllItems}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseReturn;
