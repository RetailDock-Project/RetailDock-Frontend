import React from "react";

type PurchaseItem = {
  name: string;
  model: string;
  description: string;
  batch: string;
  quantity: number;
  unitCost: number;
  tax: number;
  total: number;
};

const purchaseItems: PurchaseItem[] = [
  {
    name: "Samsung Galaxy M13",
    model: "SM-M13-BLK",
    description: "128GB, Black Color",
    batch: "SG240510",
    quantity: 10,
    unitCost: 9500,
    tax: 17100,
    total: 95000,
  },
  {
    name: "Samsung Galaxy Charger",
    model: "SM-CHG-25W",
    description: "25W Fast Charger",
    batch: "CH240510",
    quantity: 15,
    unitCost: 1200,
    tax: 3240,
    total: 18000,
  },
];

const SaleItems: React.FC = () => {
  const subtotal = purchaseItems.reduce((acc, item) => acc + item.total, 0);
  const totalTax = purchaseItems.reduce((acc, item) => acc + item.tax, 0);

  return (
    <div className="p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">
        🛒 Purchase Items ({purchaseItems.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-medium border">Product Details</th>
              <th className="p-3 font-medium border text-center">Quantity</th>
              <th className="p-3 font-medium border text-right">Unit Cost</th>
              <th className="p-3 font-medium border text-right">Tax</th>
              <th className="p-3 font-medium border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {purchaseItems.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 border">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">
                    {item.model}, {item.description}
                  </p>
                  <p className="text-xs text-gray-500">Batch: {item.batch}</p>
                </td>
                <td className="p-3 text-center border font-medium text-green-700">
                  {item.quantity}
                </td>
                <td className="p-3 text-right border">
                  ₹{item.unitCost.toLocaleString()}
                </td>
                <td className="p-3 text-right border">
                  ₹{item.tax.toLocaleString()}
                </td>
                <td className="p-3 text-right border font-semibold">
                  ₹{item.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 text-sm">
        <div className="space-y-1 text-right">
          <p>
            <span className="font-medium">Subtotal:</span> ₹
            {subtotal.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Total Tax:</span> ₹
            {totalTax.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaleItems;
