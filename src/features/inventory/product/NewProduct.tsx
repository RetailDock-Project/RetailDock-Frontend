import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/reusable/Button";
import { useNavigate } from "react-router-dom";
import ProductBasicInfoForm from "./ProductBasicInformation";
import ProductImageUploader from "./ProductImageUploader";
import ProductPricing from "./ProductPricing";
import ProductStockInfo from "./ProductStockInfo";

const NewProduct: React.FC = () => {
  const categoryList = ["Smartphones", "Laptops", "Accessories"];
  const supplierList = ["Samsung Electronics", "Sony India", "Apple Inc."];
  const navigate = useNavigate();
  return (
    <div className=" p-6 overflow-auto  scrollbar-hide max-h-screen scrollbar-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate("/home/inventory")}
            className="flex items-center text-xs text-blue-600 hover:underline mb-4"
          >
            <ArrowLeft className="mr-1" size={16} /> Back to Inventory
          </button>
          <div className="pl-3">
            <h1 className="text-xl font-semibold mb-0">Add New Product</h1>
            <span className="text-xs text-gray-500">
              Create a new product in your inventory
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => navigate("/home/inventory/purchase-order/new")}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            className="flex items-center gap-2"
          >
            <FilePlus size={16} />
            Save Product
          </Button>
        </div>
      </div>
      <div className=" pt-6 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProductBasicInfoForm
            categories={["Electronics", "Gadgets", "Home Appliances"]}
            suppliers={["Samsung", "Sony", "LG"]}
            units={["Piece", "Kg", "Box", "Litre"]}
            hsnCodes={[
              { code: "8517", gst: 18 },
              { code: "8542", gst: 12 },
              { code: "8528", gst: 28 },
            ]}
          />
          <ProductPricing />
        </div>
        <div className="space-y-6">
          {/* Return Summary & Quick Actions components can go here */}
          <ProductImageUploader />
          <ProductStockInfo />
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
