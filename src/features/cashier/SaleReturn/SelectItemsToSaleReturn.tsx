import React, { useState } from "react";

type ReturnItem = {
  id: number;
  name: string;
  sku: string;
  available: number;
  selected: boolean;
  returnQty: number;
  reason: string;
  condition: string;
};

const initialItems: ReturnItem[] = [
  {
    id: 1,
    name: "Samsung Galaxy M13",
    sku: "SM-M13-BLK",
    available: 10,
    selected: true,
    returnQty: 0,
    reason: "",
    condition: "Damaged",
  },
  {
    id: 2,
    name: "Samsung Galaxy Charger",
    sku: "SM-CHG-25W",
    available: 13,
    selected: false,
    returnQty: 0,
    reason: "",
    condition: "Damaged",
  },
];

export const SelectItemsToSaleReturn: React.FC = () => {
  const [items, setItems] = useState(initialItems);

  const handleChange = <K extends keyof ReturnItem>(
    index: number,
    field: K,
    value: ReturnItem[K]
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
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
              <th className="p-2 text-left">Reason</th>
              <th className="p-2 text-left">Condition</th>
              <th className="p-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
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
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-2 text-center">{item.available}</td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    value={item.returnQty}
                    disabled={!item.selected}
                    className="w-16 text-center border rounded px-2 py-1"
                    min={0}
                    max={item.available}
                    onChange={(e) =>
                      handleChange(index, "returnQty", Number(e.target.value))
                    }
                  />
                </td>
                <td className="p-2">
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={item.reason}
                    disabled={!item.selected}
                    onChange={(e) =>
                      handleChange(index, "reason", e.target.value)
                    }
                  >
                    <option value="">Reason</option>
                    <option value="Damaged">Damaged</option>
                    <option value="Incorrect Item">Incorrect Item</option>
                  </select>
                </td>
                <td className="p-2">
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={item.condition}
                    disabled={!item.selected}
                    onChange={(e) =>
                      handleChange(index, "condition", e.target.value)
                    }
                  >
                    <option value="Damaged">Damaged</option>
                    <option value="Good">Good</option>
                  </select>
                </td>
                <td className="p-2 text-right">₹0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
