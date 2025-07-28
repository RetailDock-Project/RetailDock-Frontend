import React, { useState } from "react";
import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";

import ReturnInformation from "./ReturnInformation";
import ReturnSummary from "./ReturnSummary";
import ReturnQuickActions from "./ReturnQuickActions";
import { PurchaseOrderDetails } from "./PurchaseOrderDetails";
import { SelectItemsToReturn } from "./SelectItemsToReturn";

import {
  getPurchaseById,
  createPurchaseReturn,
} from "../../../services/api/inventoryapi/inventoryApi";
import toast from "react-hot-toast";
import { getInputGstLedger } from "../../../services/api/AccountsApi/accountsApi";
import { getInventoryTransactionLedgerId } from "../../../services/api/cashierApi/cashierApi";

// Types
type ReturnItem = {
  originalPurchaseItemId: string;
  productId: string;
  returnedQuantity: number;
};

const NewPurchaseReturn: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Track return information (passed from ReturnInformation)
  const [returnDate, setReturnDate] = useState<Date | null>(new Date());
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  // Track selected return items
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  const handleItemSelection = ({
    items,
    totalAmount,
    totalTax,
  }: {
    items: any[];
    totalAmount: number;
    totalTax: number;
  }) => {
    setSelectedItems(items);
    setTotalAmount(totalAmount);
    setTotalTax(totalTax);
  };

  const handleBrowsePurchases = () => {
    navigate("/home/inventory/purchases");
  };

  const {
    data: purchase,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchase", id],
    queryFn: () => getPurchaseById(id),
    enabled: !!id,
    select: (data) => data.data,
  });

  console.log(purchase, "purchaseeee");

  const { data: inventoryLedgerId } = useQuery({
    queryKey: ["inventoryLedgerId"],
    queryFn: getInventoryTransactionLedgerId,
    select: (data) => data.data.id,
  });

  const { data: inputGstLedgerId } = useQuery({
    queryKey: ["inputGstLedgerId"],
    queryFn: getInputGstLedger,
    select: (data) => data.data,
  });

  const supplierLedgerId = purchase?.supplierDetails?.ledgerId;
  console.log(supplierLedgerId);

  console.log(purchase);

  const handleProcessReturn = async () => {
    if (!purchase) return;

    if (selectedItems.length < 1) {
      toast.error("Must add at least one item");
      return;
    }

    if (!supplierLedgerId || !inventoryLedgerId || !inputGstLedgerId) {
      toast.error("Missing ledger information");
      return;
    }

    const payload = {
      originalPurchaseId: purchase.purchaseId,
      returnDate: returnDate?.toISOString().split("T")[0] || "",
      supplierId: purchase.supplierDetails?.id,
      reason,
      notes,
      items: selectedItems
        .filter((item) => item.returnQty > 0)
        .map((item) => ({
          originalPurchaseItemId: item.id,
          productId: item.productId,
          returnedQuantity: item.returnQty,
        })),
      voucher: {
        voucherDate: new Date().toISOString(),
        remarks: "Purchase return voucher",
        transactionsDebit: [
          {
            ledgerId: supplierLedgerId, // ✅ Supplier's ledger ID
            narration: "Debit to supplier for purchase return",
          },
        ],
        transactionsCredit: [
          {
            ledgerId: inventoryLedgerId, // ✅ Inventory ledger
            narration: "Credit inventory for returned items",
          },
          {
            ledgerId: inputGstLedgerId, // ✅ Input GST ledger
            narration: "Credit input GST for returned items",
          },
        ],
      },
    };

    try {
      console.log(payload); // For debugging

      await createPurchaseReturn(payload);
      navigate("/home/inventory/purchase-returns");
    } catch (error) {
      console.error("Failed to process return", error);
      toast.error("Error processing return");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !purchase) return <div>Error loading purchase</div>;

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/inventory"
        title="New Purchase Return"
        subtitle="Process a return to supplier"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-order/new")}
            >
              <FileDown size={16} />
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={handleProcessReturn}
            >
              <FilePlus size={16} />
              Process Return
            </Button>
          </>
        }
      />

      <div className="pt-6 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ReturnInformation
            invoiceNumber={purchase.purchaseInvoiceNumber}
            selectedPurchaseId={purchase.id}
            supplier={purchase.supplierDetails}
            reasons={[
              "Defective item",
              "Wrong item delivered",
              "Excess quantity",
            ]}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            reason={reason}
            setReason={setReason}
            notes={notes}
            setNotes={setNotes}
          />

          <PurchaseOrderDetails purchase={purchase} />

          <SelectItemsToReturn
            items={purchase.items}
            selectedItems={selectedItems}
            onSelectionChange={handleItemSelection}
          />
        </div>

        <div className="space-y-6">
          <ReturnSummary
            itemCount={selectedItems.length}
            totalQuantity={selectedItems.reduce(
              (sum, item) => sum + item.returnQty,
              0
            )}
            totalValue={totalAmount}
            totalTax={totalTax}
          />

          <ReturnQuickActions onBrowsePurchases={handleBrowsePurchases} />
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseReturn;
