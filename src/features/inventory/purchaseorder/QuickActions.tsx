import React from "react";
import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PurchaseOrder } from "./PurchaseOrderTypes";

type Props = {
  purchaseOrder: PurchaseOrder | null;
};

const QuickActions: React.FC<Props> = ({ purchaseOrder }) => {
  const navigate = useNavigate();

  const handleAddToPurchase = () => {
    if (!purchaseOrder) return;

    navigate("/home/inventory/purchase/new", {
      state: {
        supplierId: purchaseOrder.supplier.id,
        ledgerId: purchaseOrder.supplier.ledgerId,

        supplier: purchaseOrder.supplier.name,
        date: purchaseOrder.orderDate,
        purchaseOrderId: purchaseOrder.purchaseOrderId,
        items: purchaseOrder.items.map((item) => ({
          product: item.productName,
          productId: item.productId,
          quantity: item.quantity,
          unitCost: item.ratePerPiece,
          gstRate: item.gstRate,
          receivedQuantity: item.receivedQuantity,
        })),
      },
    });
  };

  return (
    <div className="p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">⚡ Quick Actions</h2>

      <div className="space-y-3">
        <button
          className="w-full flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-gray-100 transition disabled:opacity-50"
          onClick={handleAddToPurchase}
          disabled={!purchaseOrder}
        >
          <RotateCcw size={16} />
          Add To Purchase
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
