import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineSave } from "react-icons/md";
import toast from "react-hot-toast";

import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import PurchaseOrderInformation from "./PurchaseOrderInformation";
import OrderSummary from "./OrderSummary";
import AddItemSection from "./AddItemSection";

import { useSuppliers } from "../../../hooks/useSuppliers";
import { useProducts } from "../../../hooks/useProducts";
import {
  createPurchaseOrder,
  updatePurchaseOrder,
  getPurchaseOrderById,
} from "../../../services/api/inventoryapi/inventoryApi";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  productName: string;
  taxRate: number;
}

interface Item {
  purchaseOrderItemId?: string | null;
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  taxRate: number;
}

export interface PurchaseOrderItem {
  purchaseOrderItemId?: string;
  productId: string;
  productName: string;
  quantity: number;
  ratePerPiece: number;
  gstRate: number;
  totalAmount?: number;
  netTotal?: number;
  taxAmount?: number;
  receivedQuantity?: number;
}

export interface Supplier {
  id: string;
  ledgerId?: string;
  name: string;
  contactNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstNumber?: string;
}

export interface PurchaseOrderData {
  purchaseOrderId?: string;
  purchaseOrderNumber?: string;
  supplier: Supplier;
  orderDate: string;
  netAmount?: number;
  totalAmount?: number;
  taxAmount?: number;
  orderStatus?: "Pending" | "Completed" | "Partial" | string;
  createdBy?: string;
  items: PurchaseOrderItem[];
}

interface FormErrors {
  supplier?: string;
  items?: string;
}

const PurchaseOrderForm = ({
  mode = "create",
}: {
  mode?: "create" | "edit";
}) => {
  const { id } = useParams<{ id?: string }>();
  console.log(id);

  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<PurchaseOrderData | null>(
    null
  );
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { data: suppliers } = useSuppliers({});
  const { data: productList } = useProducts({});

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["purchaseOrder", id],
    queryFn: () => getPurchaseOrderById(id!),
    select: (data) => data.data,
    enabled: mode === "edit" && !!id,
  });
  console.log(order);

  useEffect(() => {
    if (order && mode === "edit") {
      setInitialData(order);

      setSelectedSupplier({
        id: order.supplier.id,
        name: order.supplier.name,
      });

      setSelectedDate(new Date(order.orderDate));

      setItems(
        order.items.map((item: any) => ({
          purchaseOrderItemId: item.purchaseOrderItemId ?? null,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitCost: item.ratePerPiece,
          taxRate: item.gstRate,
        }))
      );

      console.log("Order inside useEffect:", order);
    }
  }, [order, mode]);

  console.log(initialData);
  console.log(selectedSupplier);

  const handleAddItem = (newItem: Item) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.productId === newItem.productId
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];

        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
          unitCost: newItem.unitCost,
          taxRate: newItem.taxRate,
        };

        return updatedItems;
      }

      return [...prevItems, newItem];
    });
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const itemsCount = items.length;
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitCost * item.quantity,
    0
  );
  const totalTax = items.reduce(
    (sum, item) => sum + (item.unitCost * item.quantity * item.taxRate) / 100,
    0
  );
  const grandTotal = subtotal + totalTax;

  const handleSave = async () => {
    const errors: FormErrors = {};
    if (!selectedSupplier) errors.supplier = "Supplier is required.";
    if (items.length === 0) errors.items = "Add at least one product.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fix validation errors.");
      return;
    }

    const payload = {
      purchaseOrderId: initialData?.purchaseOrderId,
      supplierId: selectedSupplier?.id,
      orderDate: selectedDate?.toISOString(),
      items: items.map((item) => ({
        purchaseOrderItemId: item.purchaseOrderItemId ?? null,
        productId: item.productId,
        quantity: item.quantity,
        ratePerPiece: item.unitCost,
      })),
    };

    try {
      if (mode === "edit") {
        console.log(payload);

        // await updatePurchaseOrder(payload);
        toast.success("Purchase order updated!");
      } else {
        // await createPurchaseOrder(payload);
        toast.success("Purchase order created!");
      }
      //   navigate("/home/inventory/purchase-orders");
    } catch (err) {
      toast.error("Failed to save purchase order.");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <PageHeader
        backTo="/home/inventory/purchase-orders"
        title={mode === "edit" ? "Edit Purchase Order" : "New Purchase Order"}
        subtitle={
          mode === "edit"
            ? "Modify an existing purchase order"
            : "Create a new purchase order"
        }
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate("/home/inventory/purchase-orders")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={<MdOutlineSave />}
              onClick={handleSave}
            >
              {mode === "edit" ? "Update Purchase" : "Save Purchase"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PurchaseOrderInformation
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
            setSelectedSupplier={setSelectedSupplier}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            notes={notes}
            setNotes={setNotes}
            formErrors={formErrors}
          />

          <AddItemSection
            products={productList?.map((p: any) => ({
              id: p.id,
              name: p.productName,
              taxRate: p.taxRate,
            }))}
            onAddItem={handleAddItem}
          />

          <div className="bg-white shadow border rounded-xl mt-6 p-4">
            <h3 className="text-lg font-semibold mb-2">Added Items</h3>
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">No items added yet.</p>
            ) : (
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Product</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Unit Cost</th>
                    <th className="p-2 border">Tax</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => {
                    const tax =
                      (item.unitCost * item.quantity * item.taxRate) / 100;
                    const total = item.unitCost * item.quantity + tax;

                    return (
                      <tr key={i}>
                        <td className="p-2 border">{item.productName}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">₹{item.unitCost}</td>
                        <td className="p-2 border">₹{tax.toFixed(2)}</td>
                        <td className="p-2 border">₹{total.toFixed(2)}</td>
                        <td className="p-2 border">
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleRemoveItem(i)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            itemsCount={itemsCount}
            subtotal={subtotal}
            totalTax={totalTax}
            grandTotal={grandTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderForm;
