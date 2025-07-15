import React from "react";
import { formatDate } from "../../../utils/formatDate";
import type { PurchaseOrder } from "./PurchaseOrderTypes";

type Props = {
  data: PurchaseOrder;
};

const PurchaseOrderDetailInfo: React.FC<Props> = ({ data }) => {
  return (
    <div className="p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        📄 Purchase Information
      </h2>

      <div className="grid md:grid-cols-2 gap-y-3 text-sm">
        <div>
          <span className="font-medium">Purchase Order:</span>{" "}
          {data?.purchaseOrderNumber}
        </div>

        <div>
          <span className="font-medium">Order Status:</span>{" "}
          <span
            className={`${
              data?.orderStatus === "Completed"
                ? "bg-green-100 text-green-700"
                : data?.orderStatus === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-700"
            } px-2 py-0.5 rounded-full text-xs`}
          >
            {data?.orderStatus}
          </span>
        </div>
        {/* 
        {data?.invoiceNumber && (
          <div>
            <span className="font-medium">Invoice Number:</span>{" "}
            {data?.invoiceNumber}
          </div>
        )} */}

        <div>
          <span className="font-medium">Order Date:</span>{" "}
          {formatDate(data?.orderDate).humanReadable}
        </div>
      </div>

      {/* {data.notes && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Notes:</span> {data.notes}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default PurchaseOrderDetailInfo;
