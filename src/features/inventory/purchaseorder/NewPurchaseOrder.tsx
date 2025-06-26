import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import PurchaseOrderInformation from "./PurchaseOrderInformation";
import OrderSummary from "./OrderSummary";
import AddItemSection from "./AddItemSection";
import { MdOutlineSave } from "react-icons/md";

const NewPurchaseOrder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-6 pb-2 flex justify-between">
        <div className="flex">
          {/* Back Link */}
          <button
            onClick={() => navigate("/home/inventory/purchase-orders")}
            className="flex items-center text-sm text-blue-600 hover:underline mb-4"
          >
            <ArrowLeft className="mr-1" size={16} /> Back to Purchases
          </button>

          {/* Header */}
          <div className="mb-6 ml-6">
            <h1 className="text-xl font-bold">New Purchase Order</h1>
            <p className="text-sm text-gray-500">Create a new purchase order</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
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
        </div>
      </div>
      {/* <PurchaseOrderInformation /> */}
      {/* Layout for Info + Summary */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PurchaseOrderInformation />
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
      <div className="p-9 pt-3">
        {" "}
        <AddItemSection />
      </div>
    </div>
  );
};

export default NewPurchaseOrder;
