export interface PurchaseRequest {
  supplierId: string;
  purchasedate: string | null; // ISO date-time
  purchaseOrderId?: string;
  dueDate?: string | null;
  narration?: string | null;
  supplierInvoiceNumber: string;
  gstType: "CGST_SGST" | "IGST" | "UGST_CGST"; // Extend if needed
  purchaseItems: PurchasePayload[];
  voucher: Voucher;
}

export interface PurchasePayload {
  productId: string;
  quantity: number;
  ratePerPiece: number;
  discount?: number | null;
  expiryDate?: string | null; // ISO date
}

export interface PurchaseItem {
  productId: string;
  product: string;
  quantity: number;
  unitCost: number;
  gstRate: number;
  discount?: number | null;
  expiryDate?: string | null; // ISO date
}

export interface Voucher {
  voucherDate: string;
  remarks?: string | null;
  transactionsDebit: VoucherTransaction[];
  transactionsCredit: VoucherTransaction[];
}

export interface VoucherTransaction {
  ledgerId: string;
  narration?: string | null;
}
