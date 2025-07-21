import React, { useEffect, useState } from "react";

type PurchaseItem = {
  id: string;
  productId: string;
  productName: string;
  ratePerPiece: number;
  quantity: number;
  totalAmount: number;
  taxAmount: number;
};

type ReturnItem = PurchaseItem & {
  selected: boolean;
  returnQty: number;
};

type Props = {
  items: PurchaseItem[];
  selectedItems: ReturnItem[];
  onSelectionChange: (updated: {
    items: ReturnItem[];
    totalAmount: number;
    totalTax: number;
  }) => void;
};

export const SelectItemsToReturn: React.FC<Props> = ({
  items,
  selectedItems,
  onSelectionChange,
}) => {
  const [localItems, setLocalItems] = useState<ReturnItem[]>([]);

  useEffect(() => {
    // initialize when purchase items change
    const mapped: ReturnItem[] = items.map((item) => ({
      ...item,
      selected: false,
      returnQty: 0,
    }));
    setLocalItems(mapped);
  }, [items]);

  useEffect(() => {
    const filtered = localItems.filter((i) => i.selected && i.returnQty > 0);

    const totalAmount = filtered.reduce(
      (acc, item) => acc + item.returnQty * item.ratePerPiece,
      0
    );

    const totalTax = filtered.reduce(
      (acc, item) => acc + (item.taxAmount / item.quantity) * item.returnQty,
      0
    );

    onSelectionChange({
      items: filtered,
      totalAmount,
      totalTax,
    });
  }, [localItems]);

  const handleChange = <K extends keyof ReturnItem>(
    index: number,
    field: K,
    value: ReturnItem[K]
  ) => {
    const updated = [...localItems];
    updated[index][field] = value;
    setLocalItems(updated);
  };

  return (
    <div className="bg-white border rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Select Items to Return</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Available</th>
              <th className="p-2 text-center">Return Qty</th>
              <th className="p-2 text-right">Value</th>
              <th className="p-2 text-right">Tax</th>
            </tr>
          </thead>
          <tbody>
            {localItems.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={(e) =>
                        handleChange(index, "selected", e.target.checked)
                      }
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.productName}
                      </p>
                      {/* <p className="text-xs text-gray-500">{item.}</p> */}
                    </div>
                  </div>
                </td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={item.returnQty}
                    disabled={!item.selected}
                    className="w-16 text-center border rounded px-2 py-1"
                    min={0}
                    max={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "returnQty", Number(e.target.value))
                    }
                  />
                </td>

                <td className="p-2 text-right">
                  ₹{item.selected ? item.returnQty * item.ratePerPiece : 0}
                </td>
                <td className="p-2 text-right">
                  ₹
                  {item.selected
                    ? (item.taxAmount / item.quantity) * item.returnQty
                    : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
