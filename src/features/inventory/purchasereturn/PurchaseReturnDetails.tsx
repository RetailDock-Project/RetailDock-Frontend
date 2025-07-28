import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { getPurchaseReturnDetail } from "../../../services/api/inventoryapi/inventoryApi";

const PurchaseReturnDetail = () => {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchase-return", id],
    queryFn: () => getPurchaseReturnDetail(id!),
    enabled: !!id,
    select: (data) => data.data,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError || !data)
    return <div className="p-4 text-red-500">Error loading data</div>;

  const {
    invoiceNumber,
    originalInvoiceNumber,
    returnDate,
    purchaseDate,
    supplierDetails,
    returnedQuantity,
    purchaseReturnItemsDetails,
  } = data;

  console.log(data);

  console.log("Purchase Return Details:", {
    invoiceNumber,
    originalInvoiceNumber,
    returnDate,
    purchaseDate,
    supplierDetails,
    returnedQuantity,
    // grossTotalAmount,
    purchaseReturnItemsDetails,
  });

  const grossTotalAmount = purchaseReturnItemsDetails.reduce(
    (acc: any, item: any) => acc + item.totalAmount,
    0
  );

  return (
    <div className="p-6">
      <PageHeader
        backTo="/home/inventory/purchase-returns"
        title={`Return Invoice: ${invoiceNumber}`}
        subtitle={`Original Invoice: ${originalInvoiceNumber}`}
      />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Supplier Info */}
        <div>
          <h2 className="font-semibold text-sm text-gray-600 mb-1">Supplier</h2>
          <p className="text-base font-medium">{supplierDetails?.name}</p>
          <p className="text-xs text-gray-500">
            GST: {supplierDetails?.gstNumber || "N/A"}
          </p>
        </div>

        {/* Return Info */}
        <div>
          <h2 className="font-semibold text-sm text-gray-600 mb-1">
            Return Info
          </h2>
          <p className="text-sm">
            <span className="font-medium">Return Date:</span>{" "}
            {new Date(returnDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="text-sm">
            <span className="font-medium">Purchase Date:</span>{" "}
            {new Date(purchaseDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="text-sm">
            <span className="font-medium">Returned Quantity:</span>{" "}
            {returnedQuantity}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Returned Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Original Qty</th>
                <th className="p-2 border">Returned Qty</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Tax</th>
              </tr>
            </thead>
            <tbody>
              {purchaseReturnItemsDetails?.map((item: any, index: number) => (
                <tr key={item.productName + index} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.productName}</td>
                  <td className="p-2 border">{item.originalQuantity}</td>
                  <td className="p-2 border">{item.returnedQuantity}</td>
                  <td className="p-2 border">{item.reason}</td>
                  <td className="p-2 border">
                    ₹{item.totalAmount - item.igst - item.cgst - item.sgst}
                  </td>
                  <td className="p-2 border">
                    {item.igst > 0 ? (
                      <span>IGST: ₹{item.igst.toFixed(2)}</span>
                    ) : (
                      <>
                        CGST: ₹{item.cgst.toFixed(2)}, SGST: ₹
                        {item.sgst.toFixed(2)}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-right font-semibold text-lg">
          Total: ₹{grossTotalAmount}
        </div>
      </div>
    </div>
  );
};

export default PurchaseReturnDetail;
