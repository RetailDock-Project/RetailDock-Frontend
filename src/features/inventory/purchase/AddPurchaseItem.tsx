import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Button } from "../../../components/ui/reusable/Button";
import type { PurchaseItem } from "./PurchaseTypes";
import {
  useProducts,
  type ProductFilterParams,
} from "../../../hooks/useProducts";

type InternalItem = PurchaseItem & {
  receivedQuantity?: number;
  maxQuantity?: number;
};

type AddPurchaseItemProps = {
  prefillItems?: (PurchaseItem & { receivedQuantity?: number })[];
  onChange?: (items: PurchaseItem[]) => void;
};

// const allProducts = [
//   { id: "1", name: "iPhone 15" },
//   { id: "2", name: "Samsung Galaxy" },
//   { id: "3", name: "Pixel 8" },
//   { id: "4", name: "Realme Narzo" },
// ];

const AddPurchaseItem: React.FC<AddPurchaseItemProps> = ({
  prefillItems = [],
  onChange,
}) => {
  const [productFilter, setProductFilter] = useState<ProductFilterParams>({
    search: null,
    categoryId: null,
    stockStatus: null,
  });

  const { data: productList } = useProducts(productFilter);
  console.log(productList);
  const simplifiedProducts = productList?.map((product: any) => ({
    id: product.id,
    name: product.productName,
    gstRate: product.gstRate, // ✅ include GST rate from backend
  }));

  const hasPrefilled = useRef(false);
  const [items, setItems] = useState<InternalItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);
  const [gstRate, setGstRate] = useState(18);

  const isFromPurchaseOrder = prefillItems.length > 0;

  useEffect(() => {
    if (!hasPrefilled.current && prefillItems.length > 0) {
      const mapped = prefillItems.map((item) => ({
        ...item,
        receivedQuantity: item.receivedQuantity ?? 0,
        maxQuantity: item.quantity - (item.receivedQuantity ?? 0),
      }));
      setItems(mapped);
      hasPrefilled.current = true;
    }
  }, [prefillItems]);

  const prevItemsRef = useRef<InternalItem[]>([]);
  useEffect(() => {
    if (JSON.stringify(items) === JSON.stringify(prevItemsRef.current)) return;

    // Strip out internal fields before passing to onChange
    const simplified: PurchaseItem[] = items.map(
      ({ receivedQuantity, maxQuantity, ...rest }) => rest
    );

    onChange?.(simplified);
    prevItemsRef.current = items;
  }, [items, onChange]);

  const handleQuantityChange = useCallback(
    (index: number, value: number) => {
      setItems((prev) => {
        return prev.map((item, i) => {
          if (i !== index) return item;

          const newQuantity =
            isFromPurchaseOrder && item.maxQuantity !== undefined
              ? Math.min(Math.max(value, 1), item.maxQuantity)
              : Math.max(value, 1);

          return { ...item, quantity: newQuantity };
        });
      });
    },
    [isFromPurchaseOrder]
  );
  const handleAddManualItem = useCallback(() => {
    const selected = simplifiedProducts.find(
      (p: any) => p.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (!selected || quantity <= 0 || unitCost < 0) return;

    const selectedGstRate = selected.gstRate ?? 0;

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === selected.id
      );

      if (existingIndex !== -1) {
        // Increase quantity if product already exists
        const updated = [...prev];
        const existingItem = updated[existingIndex];

        updated[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
        return updated;
      } else {
        // Add new item with gstRate from API
        const newItem: InternalItem = {
          productId: selected.id,
          product: selected.name,
          quantity,
          unitCost,
          gstRate: selectedGstRate, // ✅ use API gstRate here
          discount: null,
          expiryDate: null,
        };

        return [...prev, newItem];
      }
    });

    // Reset input fields
    setSearchTerm("");
    setQuantity(1);
    setUnitCost(0);
  }, [searchTerm, quantity, unitCost, simplifiedProducts]);

  const filteredProducts = useMemo(() => {
    return simplifiedProducts?.filter((p: any) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="p-6 mt-6 bg-white border rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">
        {isFromPurchaseOrder
          ? "Items from Purchase Order"
          : "Add Items Manually"}
      </h2>

      {!isFromPurchaseOrder && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product
            </label>
            <input
              type="text"
              placeholder="Search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <ul className="absolute z-10 bg-white border rounded-md mt-1 max-h-40 overflow-auto shadow text-sm w-full">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product: any) => (
                    <li
                      key={product.id}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => setSearchTerm(product.name)}
                    >
                      {product.name}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-400">No products found</li>
                )}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Unit Cost
            </label>
            <input
              type="number"
              value={unitCost}
              onChange={(e) => setUnitCost(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
            />
          </div>

          <div className="text-right">
            <Button
              size="sm"
              variant="primary"
              className="w-full py-2"
              onClick={handleAddManualItem}
            >
              Add Item
            </Button>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="pt-4 overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left">Product</th>
                <th className="p-2 border text-left">Quantity</th>
                {isFromPurchaseOrder && (
                  <th className="p-2 border text-left">Remaining</th>
                )}
                <th className="p-2 border text-left">Unit Cost</th>
                <th className="p-2 border text-left">GST Rate</th>
                <th className="p-2 border text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 border">
                    {item?.product || item.productId}
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min={1}
                      max={item.maxQuantity ?? undefined}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                      className="w-20 border rounded px-2 py-1"
                      disabled={
                        isFromPurchaseOrder && (item.maxQuantity ?? 0) <= 0
                      }
                    />
                    {isFromPurchaseOrder && item.maxQuantity !== undefined && (
                      <div className="text-xs text-gray-500 mt-1">
                        Max: {item.maxQuantity}
                      </div>
                    )}
                  </td>
                  {isFromPurchaseOrder && (
                    <td className="p-2 border">{item.maxQuantity ?? "-"}</td>
                  )}
                  <td className="p-2 border">₹{item?.unitCost?.toFixed(2)}</td>
                  <td className="p-2 border">{item.gstRate}%</td>
                  <td className="p-2 border">
                    ₹
                    {(
                      item?.quantity *
                      item?.unitCost *
                      (1 + item?.gstRate / 100)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddPurchaseItem;
