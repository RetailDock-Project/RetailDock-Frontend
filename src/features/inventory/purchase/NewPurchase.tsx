import React, { useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineSave } from "react-icons/md";
import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import PurchaseInformation from "./PurchaseInformation";
import PurchaseSummary from "./PurchaseSummary";
import AddPurchaseItem from "./AddPurchaseItem";
import { createPurchase } from "../../../services/api/inventoryapi/inventoryApi";
import type {
  PurchaseItem,
  PurchaseRequest,
  Voucher,
  VoucherTransaction,
} from "./PurchaseTypes";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getInventoryTransactionLedgerId } from "../../../services/api/cashierApi/cashierApi";
import { getInputGstLedger } from "../../../services/api/AccountsApi/accountsApi";

const NewPurchase: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaving, setIsSaving] = useState(false);

  const purchaseState = location.state || {};

  const [purchaseInfo, setPurchaseInfo] = useState<{
    supplierId: string;
    date: Date | null;
  }>({
    supplierId: purchaseState?.supplierId || "",
    date: purchaseState?.date || null,
  });

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

  const [notes, setNotes] = useState<string | null>(null);
  const [supplierInvoiceNumber, setSupplierInvoiceNumber] =
    useState<string>("");
  const [gstType, setGstType] = useState<"CGST_SGST" | "IGST" | "UGST_CGST">(
    "CGST_SGST"
  );
  const [supplierLedgerId, setSupplierLedgerId] = useState<string | null>(
    purchaseState?.ledgerId || null
  );
  const [dueDate, setDueDate] = useState<string | null>(
    purchaseState?.dueDate || null
  );
  const [narration, setNarration] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>("");

  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>(
    purchaseState?.items || []
  );
  const [voucher, setVoucher] = useState<Voucher>({
    voucherDate: new Date().toISOString(),
    remarks: "",
    transactionsDebit: [],
    transactionsCredit: [],
  });

  const memoizedPrefillItems = useMemo(() => {
    return purchaseState?.items || [];
  }, [purchaseState?.items]);

  const purchaseOrderId = purchaseState?.purchaseOrderId || null;
  const isFromPurchaseOrder = !!purchaseOrderId;

  const handlePurchaseInfoChange = useCallback(
    (info: {
      supplierId: string;
      date: Date | null;
      notes: string | null;
      supplierInvoiceNumber: string;
      gstType: "CGST_SGST" | "IGST" | "UGST_CGST";
      supplierLedgerId?: string;
    }) => {
      setPurchaseInfo({ supplierId: info.supplierId, date: info.date });
      setNotes(info.notes);
      setSupplierInvoiceNumber(info.supplierInvoiceNumber);
      setGstType(info.gstType);
      setSelectedDate(info.date ? info.date.toISOString() : null);
      setSupplierLedgerId(info.supplierLedgerId || null);
    },
    []
  );

  const handleItemsChange = useCallback((items: PurchaseItem[]) => {
    setPurchaseItems((prev) =>
      JSON.stringify(prev) === JSON.stringify(items) ? prev : items
    );
  }, []);

  const handleSubmit = useCallback(async () => {
    if (
      !purchaseInfo.supplierId ||
      !purchaseInfo.date ||
      purchaseItems.length === 0
    ) {
      toast.error("Please fill all required fields and add at least one item.");
      return;
    }

    setIsSaving(true); // 🟡 Start loading

    const shouldAddSupplierCredit =
      !voucher.transactionsCredit.length && supplierLedgerId;

    const updatedVoucher: Voucher = {
      ...voucher,
      transactionsCredit: [
        ...(shouldAddSupplierCredit
          ? [
              {
                ledgerId: supplierLedgerId!,
                narration: "Supplier Ledger",
              },
            ]
          : []),
        ...voucher.transactionsCredit,
      ],
    };

    const payload: PurchaseRequest = {
      supplierId: purchaseInfo.supplierId,
      purchasedate: selectedDate,
      purchaseOrderId: purchaseOrderId ?? null,
      dueDate: dueDate || null,
      narration: narration || null,
      supplierInvoiceNumber: supplierInvoiceNumber ?? null,
      gstType: gstType,
      purchaseItems: purchaseItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        ratePerPiece: item.unitCost,
        discount: item.discount ?? null,
        expiryDate: item.expiryDate ?? null,
      })),
      voucher: {
        voucherDate: updatedVoucher.voucherDate,
        remarks: updatedVoucher.remarks || null,
        transactionsDebit: [
          ...(inventoryLedgerId
            ? [
                {
                  ledgerId: inventoryLedgerId,
                  narration: narration || "Inventory Purchase",
                },
              ]
            : []),
          ...(inputGstLedgerId
            ? [
                {
                  ledgerId: inputGstLedgerId,
                  narration: narration || "Input GST",
                },
              ]
            : []),
        ],
        transactionsCredit: updatedVoucher.transactionsCredit.map(
          (t: VoucherTransaction) => ({
            ledgerId: t.ledgerId,
            narration: t.narration || null,
          })
        ),
      },
    };

    try {
      await createPurchase(payload);
      toast.success("Purchase saved successfully!");
      navigate("/home/inventory/purchases");
    } catch (error) {
      console.error("Error saving purchase:", error);
      toast.error("Failed to save purchase.");
    } finally {
      setIsSaving(false); // 🔴 End loading
    }
  }, [
    purchaseInfo,
    purchaseItems,
    purchaseOrderId,
    dueDate,
    narration,
    supplierInvoiceNumber,
    gstType,
    voucher,
    selectedDate,
    supplierLedgerId,
    inventoryLedgerId,
    inputGstLedgerId,
    navigate,
  ]);

  return (
    <div className="p-6">
      <PageHeader
        backTo="/home/inventory/purchases"
        title="New Purchase"
        subtitle="Create a new purchase entry"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2 py-2"
              onClick={() => navigate("/home/inventory/purchases")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={<MdOutlineSave className="text-base" />}
              className="flex items-center gap-2 py-2"
              onClick={handleSubmit}
              disabled={isSaving} // disable button while saving
            >
              {isSaving ? "Saving..." : "Save Purchase"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2">
          <PurchaseInformation
            prefill={{
              supplier: purchaseState?.supplier,
              supplierId: purchaseState?.supplierId,
              date: purchaseState?.date,
              ledgerId: purchaseState.ledgerId,
            }}
            onChange={handlePurchaseInfoChange}
            disableSupplierSelect={isFromPurchaseOrder} // ✅ Disable selection
          />

          <AddPurchaseItem
            prefillItems={memoizedPrefillItems}
            onChange={handleItemsChange}
          />
        </div>
        <div className="lg:col-span-1">
          <PurchaseSummary
            key={purchaseItems
              .map((i) => `${i.productId}-${i.product}`)
              .join(",")}
            items={purchaseItems}
            gstType="CGST_SGST"
          />
        </div>
      </div>
    </div>
  );
};

export default NewPurchase;
