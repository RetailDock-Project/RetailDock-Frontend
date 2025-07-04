import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineSave } from "react-icons/md";
import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import PurchaseInformation from "./PurchaseInformation";
import PurchaseSummary from "./PurchaseSummary";
import AddPurchaseItem from "./AddPurchaseItem";

const NewPurchase: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const purchaseState = location.state || {}; // This contains data sent via navigate(..., { state })

  return (
    <div className="p-6">
      <PageHeader
        backTo="/home/inventory/purchases"
        title="New Purchase"
        subtitle="Create a new purchase entry"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2 py-2"
              onClick={() => navigate("/home/inventory/purchases")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={<MdOutlineSave className="text-base" />}
              className="flex items-center gap-2 py-2"
              onClick={() => alert("Saving purchase...")}
            >
              Save Purchase
            </Button>
          </>
        }
      />

      {/* Layout for Form + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2">
          <PurchaseInformation prefill={purchaseState} />
          <AddPurchaseItem prefillItems={purchaseState?.items || []} />
        </div>
        <div className="lg:col-span-1">
          <PurchaseSummary />
        </div>
      </div>
    </div>
  );
};

export default NewPurchase;
