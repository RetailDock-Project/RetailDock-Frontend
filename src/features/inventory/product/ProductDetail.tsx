import React from "react";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { Button } from "../../../components/ui/reusable/Button";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "lucide-react";
import PurchaseOrderInformation from "../purchaseorder/PurchaseOrderInformation";
import OrderSummary from "../purchaseorder/OrderSummary";
import ProductStockDetails from "./ProductStockDetailsTabs";
import ProductDetailsTabs from "./ProductStockDetailsTabs";
import InventorySummary from "./InventorySummary";
import AdditionalInformation from "./AdditionalInformation";

const ProductDetail = () => {
  const navigate = useNavigate();
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/inventory/products"
        title="Samsung Galaxy M13"
        subtitle="Product detail"
        actions={
          <>
            <Button
              size="sm"
              icon={<Edit size={16} />}
              variant="secondary"
              onClick={() => navigate("/home/inventory")}
            >
              Edit
            </Button>
            <Button size="sm" variant="danger" icon={<Delete size={16} />}>
              Delete
            </Button>
          </>
        }
      />
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductDetailsTabs />
        </div>
        <div className="lg:col-span-1">
          <InventorySummary />
          <AdditionalInformation />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
