import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import PurchaseOrderInformation from "./PurchaseOrderInformation";
import OrderSummary from "./OrderSummary";
import AddItemSection from "./AddItemSection";
import { MdOutlineSave } from "react-icons/md";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { useSuppliers } from "../../../hooks/useSuppliers";
import {
  createPurchaseOrder,
  type SupplierFilterParams,
} from "../../../services/api/inventoryapi/inventoryApi";
import {
  useProducts,
  type ProductFilterParams,
} from "../../../hooks/useProducts";
import { id } from "zod/v4/locales";
import toast from "react-hot-toast";

type Supplier = {
  id: string;
  name: string;
};

type Product = {
  id: number;
  name: string;
};

type ProductItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  taxRate: number;
};

const NewPurchaseOrder: React.FC = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [filters, setFilters] = useState<SupplierFilterParams>({
    search: null,
    isActive: undefined,
    pageNumber: undefined,
    pageSize: undefined,
  });

  const [productFilter, setProductFilter] = useState<ProductFilterParams>({
    search: null,
    categoryId: null,
    stockStatus: null,
  });
  const [formErrors, setFormErrors] = useState<{
    supplier?: string;
    items?: string;
  }>({});

  const [items, setItems] = useState<ProductItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const handleAddItem = (newItem: ProductItem) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.productId === newItem.productId
      );

      if (existingIndex !== -1) {
        // If product already exists, increase quantity and update unit cost/tax
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingIndex];

        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
          unitCost: newItem.unitCost, // optionally update cost
          taxRate: newItem.taxRate, // optionally update tax
        };

        return updatedItems;
      }

      // If product doesn't exist, add as new
      return [...prevItems, newItem];
    });
  };

  const { data: suppliers } = useSuppliers(filters);
  console.log(suppliers);
  const { data: productList } = useProducts(productFilter);
  console.log(productList);

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

  return (
    <div className="p-6">
      <PageHeader
        backTo="/home/inventory/purchase-orders"
        title="New Purchase Order"
        subtitle="Create a new purchase order"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2 py-2"
              onClick={() => navigate("/purchase")}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={<MdOutlineSave className="text-base" />}
              className="flex items-center gap-2 py-2"
              onClick={async () => {
                const errors: { supplier?: string; items?: string } = {};

                if (!selectedSupplier) {
                  errors.supplier = "Supplier is required.";
                }

                if (items.length === 0) {
                  errors.items = "At least one product must be added.";
                }

                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors);
                  toast.error("Please fix validation errors.");
                  return;
                }

                // Clear errors if valid
                setFormErrors({});

                const payload = {
                  supplierId: selectedSupplier?.id,
                  orderDate: selectedDate?.toISOString(),
                  items: items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    ratePerPiece: item.unitCost,
                  })),
                };

                try {
                  console.log(payload);

                  await createPurchaseOrder(payload);
                  toast.success("Purchase order created!");
                  //   navigate("/home/inventory/purchase-orders");
                } catch (err) {
                  toast.error("Failed to create purchase order.");
                  console.error(err);
                }
              }}
            >
              Save Purchase
            </Button>
          </>
        }
      />

      {/* <PurchaseOrderInformation /> */}
      {/* Layout for Info + Summary */}
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PurchaseOrderInformation
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
            setSelectedSupplier={setSelectedSupplier}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            notes={notes}
            setNotes={setNotes}
          />{" "}
          <AddItemSection
            products={productList?.map((product: any) => ({
              id: product.id,
              name: product.productName,
              taxRate: product.taxRate,
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
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{item.productName}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">₹{item.unitCost}</td>
                      <td className="p-2 border">
                        ₹{(item.unitCost * item.quantity * item.taxRate) / 100}{" "}
                      </td>
                      <td className="p-2 border">
                        ₹
                        {item.unitCost * item.quantity +
                          (item.unitCost * item.quantity * item.taxRate) / 100}
                      </td>
                    </tr>
                  ))}
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
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseOrder;
