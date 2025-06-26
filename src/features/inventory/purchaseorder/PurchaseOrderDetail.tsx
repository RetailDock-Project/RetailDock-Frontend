import React from "react";
import { Search, FilePlus, RotateCcw, FileDown } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";
import { useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { ArrowLeft } from "lucide-react";

const PurchaseOrderDetail: React.FC = () => {
  const { invoicenumber } = useParams();
  const navigate = useNavigate();
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate("/home/inventory/purchase-orders")}
            className="flex items-center text-sm text-blue-600 hover:underline mb-4 mb-0"
          >
            <ArrowLeft className="mr-1" size={16} /> Back to Purchases
          </button>
          <div className="pl-3">
            <h1 className="text-xl font-semibold ">
              Purchase Order - PO-2025-0001
            </h1>
            <span className="text-xs text-gray-500">
              View purchase order details and items
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => navigate("/home/inventory/purchase-order/new")}
          >
            <FilePlus size={16} /> Print
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
            <AiOutlineEdit size={16} /> Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetail;
