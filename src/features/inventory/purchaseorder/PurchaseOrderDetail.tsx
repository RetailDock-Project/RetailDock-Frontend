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
import { useQuery } from "@tanstack/react-query";
import {
  exportPurchaseOrderPdf,
  getPurchaseOrderById,
} from "../../../services/api/inventoryapi/inventoryApi";
import { downloadExcelFile } from "../../../utils/downloadExcel";

const PurchaseOrderDetail: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["purchaseOrder", id],
    queryFn: () => getPurchaseOrderById(id!),
    select: (data) => data.data,
    enabled: !!id,
  });

  console.log(order);

  const handleExport = () => {
    downloadExcelFile(() => exportPurchaseOrderPdf(id), "PurchaseOrder.pdf");
  };

  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/inventory/purchase-orders"
        title={`Purchase Order - ${order?.purchaseOrderNumber}`}
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
              onClick={() =>
                navigate(`/home/inventory/purchase-order/edit/${id}`, {
                  state: {
                    purchaseOrderNumber: `${order?.purchaseOrderNumber}`,
                  },
                })
              }
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handleExport}
            >
              <FileDown size={16} />
              Download PDF
            </Button>
            {/* <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <AiOutlineEdit size={16} />
              Edit
            </Button> */}
          </>
        }
      />
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 min-h-screen">
        <div className="md:col-span-2">
          <PurchaseOrderDetailInfo data={order} />
          <OrderItems items={order?.items} />
        </div>
        <div>
          <SupplierDetail supplier={order?.supplier} />
          <QuickActions purchaseOrder={order} />
          {/* <AuditTrail /> */}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
