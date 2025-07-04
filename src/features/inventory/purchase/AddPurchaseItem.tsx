import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/reusable/Button";

type PurchaseItem = {
  product: string;
  quantity: number;
  unitCost: number;
  total: number;
  maxQuantity?: number; // only for prefill (from PO)
};

type AddPurchaseItemProps = {
  prefillItems?: {
    product: string;
    quantity: number;
    unitCost: number;
  }[];
};

const allProducts = ["iPhone 15", "Samsung Galaxy", "Pixel 8", "Realme Narzo"];

const AddPurchaseItem: React.FC<AddPurchaseItemProps> = ({
  prefillItems = [],
}) => {
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);

  const isFromPurchaseOrder = prefillItems.length > 0;

  // Handle prefill (from PO)
  useEffect(() => {
    if (isFromPurchaseOrder) {
      const mappedItems = prefillItems.map((item) => ({
        ...item,
        total: item.quantity * item.unitCost,
        maxQuantity: item.quantity,
      }));
      setItems(mappedItems);
    }
  }, [prefillItems]);

  const handleQuantityChange = (index: number, newQty: number) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = updated[index];

      if (item.maxQuantity && newQty > item.maxQuantity) return prev;
      item.quantity = newQty;
      item.total = newQty * item.unitCost;
      return updated;
    });
  };

  const handleAddManualItem = () => {
    if (!searchTerm || quantity <= 0 || unitCost < 0) return;

    const newItem: PurchaseItem = {
      product: searchTerm,
      quantity,
      unitCost,
      total: quantity * unitCost,
    };

    setItems([...items, newItem]);
    setSearchTerm("");
    setQuantity(1);
    setUnitCost(0);
  };

  const filteredProducts = allProducts.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 mt-6 bg-white border rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">
        {isFromPurchaseOrder
          ? "Items from Purchase Order"
          : "Add Items Manually"}
      </h2>

      {/* Manual Add Form if NOT from PO */}
      {!isFromPurchaseOrder && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Product Search */}
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
                  filteredProducts.map((product) => (
                    <li
                      key={product}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => setSearchTerm(product)}
                    >
                      {product}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-gray-400">No products found</li>
                )}
              </ul>
            )}
          </div>

          {/* Quantity */}
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

          {/* Unit Cost */}
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

          {/* Add Button */}
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

      {/* Table */}
      {items.length > 0 && (
        <div className="pt-4">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border">Product</th>
                <th className="text-left p-2 border">Quantity</th>
                <th className="text-left p-2 border">Unit Cost</th>
                <th className="text-left p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2 border">{item.product}</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min={1}
                      max={item.maxQuantity || undefined}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                      className="w-20 border rounded px-2 py-1"
                    />
                    {item.maxQuantity && (
                      <p className="text-xs text-gray-500">
                        max: {item.maxQuantity}
                      </p>
                    )}
                  </td>
                  <td className="p-2 border">₹{item.unitCost}</td>
                  <td className="p-2 border">₹{item.total}</td>
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
