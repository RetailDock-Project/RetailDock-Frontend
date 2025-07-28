import React, { useEffect, useState } from "react";
import { FilePlus, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import ProductBasicInfoForm from "./ProductBasicInfoForm";
import ProductImageUploader from "./ProductImageUploader";
import ProductPricing from "./ProductPricing";
import ProductStockInfo from "./ProductStockInfo";
import toast from "react-hot-toast";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "../../../services/api/inventoryapi/inventoryApi";

export type ProductImage = {
  id: number;
  image: string;
};

export type ProductFormData = {
  productName: string;
  sku: string;
  categoryId: number;
  unitId: number;
  hsnCodeId: number;
  description: string;
  reorderLevel: number;
  mrp: number;
  sellingPrice: number;
  productImages: File[] | string[] | ProductImage[]; // Only new image files
  existingImageIds?: number[]; // For update: retained existing image IDs
};

const NewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [existingImageIds, setExistingImageIds] = useState<number[]>([]);

  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [productData, setProductData] = useState<ProductFormData>({
    productName: "",
    sku: "",
    categoryId: 0,
    unitId: 0,
    hsnCodeId: 0,
    description: "",
    reorderLevel: 0,
    mrp: 0,
    sellingPrice: 0,
    productImages: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEditMode && id) {
        try {
          const response = await getProductById(id);
          console.log(response, "repjdnvkdfjzbn ,sng");

          const p = response.data;
          console.log(p);

          const images: ProductImage[] = p.productImagesBase64 || [];

          setProductData({
            productName: p.productName,
            sku: p.productCode,
            categoryId: p.productCategoryId,
            unitId: p.unitOfMeasuresId,
            hsnCodeId: p.hsnCodeId,
            description: p.description || "",
            reorderLevel: p.reOrderLevel,
            mrp: p.mrp,
            sellingPrice: p.sellingPrice,
            productImages: [...images], // store for form submission
          });

          setExistingImages(images);
        } catch (err) {
          console.error("Failed to fetch product:", err);
          toast.error("Failed to load product data");
        }
      }
    };
    fetchProduct();
  }, [id, isEditMode]);

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!productData.productName.trim())
      errors.push("Product name is required.");
    if (!productData.sku.trim()) errors.push("SKU is required.");
    if (!productData.categoryId) errors.push("Category is required.");
    if (!productData.unitId) errors.push("Unit of measurement is required.");
    if (!productData.hsnCodeId) errors.push("HSN code is required.");
    if (!productData.description.trim())
      errors.push("Description is required.");
    if (productData.mrp <= 0) errors.push("MRP must be greater than 0.");
    if (productData.sellingPrice <= 0)
      errors.push("Selling price must be greater than 0.");
    if (productData.reorderLevel < 0)
      errors.push("Reorder level cannot be negative.");
    if (existingImages.length + newImages.length === 0)
      errors.push("At least one product image is required.");

    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach((err) => toast.error(err));
      return;
    }

    setIsSaving(true);
    try {
      const existingImageIds = existingImages.map((img) => img.id); // ⬅️ retain only these
      const productToSave = {
        ...productData,
        productImages: newImages,
        existingImageIds: existingImageIds,
      };

      //   toString;

      if (isEditMode && id) {
        console.log(productToSave, "products to saveee", id);

        await updateProduct(id, productToSave);
        toast.success("Product updated successfully");
      } else {
        console.log(productToSave, "products to saveee");

        await createProduct(productToSave);
        toast.success("Product created successfully");
      }

      navigate("/home/inventory/products");
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen">
      <PageHeader
        backTo="/home/inventory/products"
        title={isEditMode ? "Edit Product" : "Add New Product"}
        subtitle={
          isEditMode
            ? "Update product details in your inventory"
            : "Create a new product in your inventory"
        }
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate("/home/inventory/products")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <span className="animate-spin mr-1">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  {isEditMode ? <Save size={16} /> : <FilePlus size={16} />}
                  {isEditMode ? "Update Product" : "Save Product"}
                </>
              )}
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
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            newImages={newImages}
            setNewImages={setNewImages}
            setExistingImageIds={setExistingImageIds} // 👈 pass this
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
