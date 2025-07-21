import React from "react";
import { FilePlus, FileDown } from "lucide-react";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import PurchaseDetailInfo from "./PurchaseDetailInfo";
import SupplierDetail from "../purchaseorder/SupplierDetail";
import QuickActions from "../purchaseorder/QuickActions";
import AuditTrail from "../purchaseorder/AuditTrail";
import PurchaseItems from "./PurchaseItems";
import PurchaseQuickActions from "./PurchaseQuickActions";
import { useQuery } from "@tanstack/react-query";
import { getPurchaseById } from "../../../services/api/inventoryapi/inventoryApi";

const PurchaseDetail: React.FC = () => {
  const { id } = useParams(); // if route uses param like /purchase/:purchaseId
  const navigate = useNavigate();

  const {
    data: purchase,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchase", id],
    queryFn: () => getPurchaseById(id),
    enabled: !!id, // ensures query only runs if id exists
    select: (data) => data.data, // optional: if your API wraps the response in { data }
  });

  console.log(purchase);

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/inventory/purchases"
        title={`Purchase - PUR-2025-0042`}
        subtitle="View finalized purchase details and items"
        actions={
          <>
            {/* <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => console.log("Print purchase")}
            >
              <FilePlus size={16} />
              Print
            </Button> */}
            {/* <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FileDown size={16} />
              Download Invoice
            </Button> */}
            {/* <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate(`/home/inventory/purchases/edit/${id}`)}
            >
              <AiOutlineEdit size={16} />
              Edit
            </Button> */}
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
        <div className="md:col-span-2">
          <PurchaseDetailInfo purchase={purchase} />
          <PurchaseItems items={purchase?.items || []} />
        </div>
        <div>
          <SupplierDetail supplier={purchase?.supplierDetails || null} />
          <PurchaseQuickActions id={id} />
          {/* <AuditTrail /> */}
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetail;
