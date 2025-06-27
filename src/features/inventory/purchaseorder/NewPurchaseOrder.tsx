import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import PurchaseOrderInformation from "./PurchaseOrderInformation";
import OrderSummary from "./OrderSummary";
import AddItemSection from "./AddItemSection";
import { MdOutlineSave } from "react-icons/md";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";

const NewPurchaseOrder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <PageHeader
        backTo="/home/inventory/purchase-orders"
        title="New Purchase Order"
        subtitle="Create a new purchase order"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2 py-2"
              onClick={() => navigate("/purchase")}
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

      {/* <PurchaseOrderInformation /> */}
      {/* Layout for Info + Summary */}
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PurchaseOrderInformation />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
      <div className=" pt-6">
        {" "}
        <AddItemSection />
      </div>
    </div>
  );
};

export default NewPurchaseOrder;
