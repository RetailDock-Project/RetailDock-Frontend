import React, { useState } from "react";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { Button } from "../../../components/ui/reusable/Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import ProductDetailsTabs from "./ProductStockDetailsTabs";
import AdditionalInformation from "./AdditionalInformation";
import { useQuery } from "@tanstack/react-query";
import {
  deleteProductById,
  getProductById,
} from "../../../services/api/inventoryapi/inventoryApi";
import Loader from "../../../components/ui/reusable/Loader";
import Modal from "../../../components/ui/reusable/Modal";

export interface ProductAudit {
  createdAt: string;
  lastPurchase: string | null;
  lastUpdate: string | null;
  lastSale: string | null;
}

export interface ProductDetails {
  id: string;
  productName: string;
  productCode: string;
  description: string;
  productCategory: string;
  stock: number;
  unitOfMeasures: string;
  reOrderLevel: number;
  lastStockUpdate: string;
  mrp: number;
  sellingPrice: number;
  costPrice: number;
  taxRate: number;
  createdBy: string;
  barCodeImageBase64: string;
  productImagesBase64: { image: string; id: number }[]; // ✅ updated this line
  productAudit: ProductAudit;
}
  

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => getProductById(id!), // force-cast only after null check below
    enabled: !!id, // only run the query if `id` exists
    select: (data) => data.data,
  });
  if (!id) {
    return <Navigate to={"/home/inventory/products"} />;
  }

  const handleDelete = async () => {
    try {
      await deleteProductById(id);
      setShowDeleteModal(false);
      navigate("/home/inventory/products");
    } catch (err) {
      console.error("Delete failed", err);
      // Optionally show a toast here
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading product.</p>;
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
              onClick={() =>
                navigate(`/home/inventory/product/edit/${productDetail.id}`)
              }
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="danger"
              icon={<Trash2 size={16} />}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </>
        }
      />
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProductDetailsTabs product={productDetail} />
        </div>
        <div className="lg:col-span-1">
          {/* <InventorySummary /> */}
          <AdditionalInformation productAudit={productDetail?.productAudit} />
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        head="Delete Product?"
        subHead={`Are you sure you want to delete "${productDetail.productName}"? This cannot be undone.`}
        width="max-w-md"
      >
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;
