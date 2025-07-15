export type PurchaseOrderItem = {
  productId: string;
  purchaseOrderItemId: string;
  productName: string;
  quantity: number;
  ratePerPiece: number;
  totalAmount: number;
  netTotal: number;
  taxAmount: number;
  gstRate: number;
  receivedQuantity: number;
};

export type Supplier = {
  id: string;
  ledgerId: string;
  name: string;
  contactNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
};

export type PurchaseOrder = {
  purchaseOrderId: string;
  purchaseOrderNumber: string;
  supplier: Supplier;
  orderDate: string;
  netAmount: number;
  totalAmount: number;
  taxAmount: number;
  orderStatus: "Pending" | "Completed" | "Cancelled";
  createdBy: string;
  items: PurchaseOrderItem[];
};

export type OrderItem = {
  purchaseOrderItemId: string;
  productName: string;
  quantity: number;
  receivedQuantity: number;
  ratePerPiece: number;
  taxAmount: number;
  netTotal: number;
  totalAmount: number;
};
