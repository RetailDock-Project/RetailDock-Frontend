import React from "react";
import { Eye, FileDown } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import { useNavigate } from "react-router-dom";

type Purchase = {
  id: string;
  supplier: string;
  invoiceNumber: string;
  date: string;
  items: number;
  totalAmount: number;
  status: string;
};

type PurchaseListProps = {
  purchases: Purchase[];
};

const PurchaseList: React.FC<PurchaseListProps> = ({ purchases }) => {
  const navigate = useNavigate();

  const handleDownload = (purchaseId: string) => {
    // Replace with your actual PDF generation or download logic
    alert(`Downloading PDF for ${purchaseId}`);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Purchases ({purchases.length})</h2>

      <div className="overflow-x-auto rounded-md border shadow bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 font-medium text-gray-600">Supplier</th>
              <th className="p-3 font-medium text-gray-600">Invoice No</th>
              <th className="p-3 font-medium text-gray-600 text-center">
                Items
              </th>
              <th className="p-3 font-medium text-gray-600 text-right">
                Amount
              </th>
              <th className="p-3 font-medium text-gray-600 text-center">
                Status
              </th>
              <th className="p-3 font-medium text-gray-600 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="p-3">{purchase.supplier}</td>
                <td className="p-3">{purchase.invoiceNumber}</td>
                <td className="p-3 text-center">{purchase.items}</td>
                <td className="p-3 text-right font-medium text-green-600">
                  ₹{purchase.totalAmount.toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      purchase.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      navigate(`/home/inventory/purchase/invoicenumber`)
                    }
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDownload(purchase.id)}
                  >
                    <FileDown size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {purchases.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No purchase records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseList;
