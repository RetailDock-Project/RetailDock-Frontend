import React from "react";
import { Search, FilePlus, RotateCcw, FileDown } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";
import { useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { ArrowLeft } from "lucide-react";
import PurchaseOrderDetailInfo from "./PurchaseOrderDetailInfo";
import SupplierDetail from "./SupplierDetail";
import OrderItems from "./OrderItems";
import QuickActions from "./QuickActions";
import AuditTrail from "./AuditTrail";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";

const PurchaseOrderDetail: React.FC = () => {
  const { invoicenumber } = useParams();
  const navigate = useNavigate();
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/inventory/purchase-orders"
        title="Purchase Order - PO-2025-0001"
        subtitle="View purchase order details and items"
        actions={
          <>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => console.log("Print clicked")}
            >
              <FilePlus size={16} />
              Print
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FileDown size={16} />
              Download PDF
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <AiOutlineEdit size={16} />
              Edit
            </Button>
          </>
        }
      />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
        <div className="md:col-span-2">
          <PurchaseOrderDetailInfo />
          <OrderItems />
        </div>
        <div>
          <SupplierDetail />
          <QuickActions />
          <AuditTrail />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
