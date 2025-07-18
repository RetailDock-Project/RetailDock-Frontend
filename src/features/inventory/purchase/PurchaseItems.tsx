import React from "react";

type PurchaseItem = {
  id: string;
  productName: string;
  ratePerPiece: number;
  quantity: number;
  taxAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  ugst: number;
};

type Props = {
  items: PurchaseItem[];
};

const PurchaseItems: React.FC<Props> = ({ items }) => {
  const subtotal = items.reduce((acc, item) => acc + item.totalAmount, 0);
  const totalTax = items.reduce((acc, item) => acc + item.taxAmount, 0);

  return (
    <div className="p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">
        🛒 Purchase Items ({items.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-medium border">Product Name</th>
              <th className="p-3 font-medium border text-center">Quantity</th>
              <th className="p-3 font-medium border text-right">Rate</th>
              <th className="p-3 font-medium border text-right">CGST</th>
              <th className="p-3 font-medium border text-right">SGST</th>
              <th className="p-3 font-medium border text-right">Tax</th>
              <th className="p-3 font-medium border text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 border font-medium">{item.productName}</td>
                <td className="p-3 text-center border font-medium text-green-700">
                  {item.quantity}
                </td>
                <td className="p-3 text-right border">
                  ₹{item.ratePerPiece.toLocaleString()}
                </td>
                <td className="p-3 text-right border">{item.cgst}</td>
                <td className="p-3 text-right border">{item.sgst}</td>
                <td className="p-3 text-right border">
                  ₹{item.taxAmount.toLocaleString()}
                </td>
                <td className="p-3 text-right border font-semibold">
                  ₹{item.totalAmount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 text-sm">
        <div className="space-y-1 text-right">
          <p>
            <span className="font-medium">Total Tax:</span> ₹
            {totalTax.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Sub Total:</span> ₹
            {subtotal - totalTax}
          </p>
          <p>
            <span className="font-medium">Total(including tax):</span> ₹
            {subtotal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseItems;
