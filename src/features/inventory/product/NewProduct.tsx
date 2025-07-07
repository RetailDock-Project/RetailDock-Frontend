import { useState } from "react";
import { FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import ProductBasicInfoForm from "./ProductBasicInfoForm";
import ProductImageUploader from "./ProductImageUploader";
import ProductPricing from "./ProductPricing";
import ProductStockInfo from "./ProductStockInfo";
import {
  createProduct,
  getAllHsnCode,
} from "../../../services/api/inventoryapi/inventoryApi";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export type ProductFormData = {
  productName: string;
  sku: string;
  categoryId: number;
  unitId: number;
  hsnCodeId: number;
    description: string;
  reorderLevel: number;
  mrp: number;
  costPrice: number;
  sellingPrice: number;
  productImages: File[]; // or string[] or { url: string }[] depending on usage
};

const NewProduct: React.FC = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductFormData>({
    productName: "",
    sku: "",
    categoryId: 0,
    unitId: 0,
    hsnCodeId: 0,
    description: "",
    reorderLevel: 0,
    mrp: 0,
    costPrice: 0,
    sellingPrice: 0,
    productImages: [],
  });

  console.log(productData);

  const setProductImages: React.Dispatch<React.SetStateAction<File[]>> = (
    action
  ) => {
    setProductData((prev) => ({
      ...prev,
      productImages:
        typeof action === "function"
          ? (action as (prev: File[]) => File[])(prev.productImages)
          : action,
    }));
  };

  const handleSave = async () => {
    console.log("Saving Product:", productData);
    // TODO: Add validation & call API here
    try {
      const response = await createProduct(productData);
      console.log("Product created successfully", response);
      toast.success("Product saved!");
      navigate("/home/inventory/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen">
      <PageHeader
        backTo="/home/inventory/dashboard"
        title="Add New Product"
        subtitle="Create a new product in your inventory"
        actions={
          <>
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
              onClick={handleSave}
            >
              <FilePlus size={16} />
              Save Product
            </Button>
          </>
        }
      />

      <div className="pt-6 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ProductBasicInfoForm
            productData={productData}
            setProductData={setProductData}
          />
          <ProductPricing
            pricingData={{
              costPrice: productData.costPrice,
              sellingPrice: productData.sellingPrice,
              mrp: productData.mrp,
            }}
            setPricingData={(updatedFields) =>
              setProductData((prev) => ({ ...prev, ...updatedFields }))
            }
          />
        </div>

        <div className="space-y-6">
          <ProductImageUploader
            images={productData.productImages}
            setImages={setProductImages}
          />
          <ProductStockInfo
            reorderLevel={productData.reorderLevel}
            setReorderLevel={(value) =>
              setProductData((prev) => ({ ...prev, reorderLevel: value }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
