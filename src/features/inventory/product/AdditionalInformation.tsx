import React from "react";
import { formatDate } from "../../../utils/formatDate";

export interface ProductAudit {
  createdAt: string;
  lastPurchase: string | null;
  lastUpdate: string | null;
  lastSale: string | null;
}

interface AdditionalInformationProps {
  productAudit: ProductAudit;
}

const isValidDate = (value: string | null): boolean =>
  value !== null && value !== "0001-01-01T00:00:00";

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  productAudit,
}) => {
  if (!productAudit) {
    return <div className="text-gray-500">No audit data available</div>;
  }
  return (
    <div className="bg-white border shadow rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Additional Information
      </h2>
      <div className="grid grid-cols-1 text-sm">
        <div className="rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Created On:</p>
          <p className="font-medium text-gray-800">
            {isValidDate(productAudit?.createdAt)
              ? formatDate(productAudit.createdAt).fullDate
              : "N/A"}
          </p>
        </div>
        <div className="rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Last Updated:</p>
          <p className="font-medium text-gray-800">
            {isValidDate(productAudit.lastUpdate)
              ? formatDate(productAudit.lastUpdate!).humanReadable
              : "N/A"}
          </p>
        </div>
        <div className="rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Last Purchase:</p>
          <p className="font-medium text-gray-800">
            {isValidDate(productAudit.lastPurchase)
              ? formatDate(productAudit.lastPurchase!).humanReadable
              : "N/A"}
          </p>
        </div>
        <div className="rounded-lg p-1 shadow-sm">
          <p className="text-gray-500">Last Sale:</p>
          <p className="font-medium text-gray-800">
            {isValidDate(productAudit.lastSale)
              ? formatDate(productAudit.lastSale!).humanReadable
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
