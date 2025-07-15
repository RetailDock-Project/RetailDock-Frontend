import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import type { Supplier } from "./PurchaseOrderTypes";

type Props = {
  supplier: Supplier | null;
};

const SupplierDetail: React.FC<Props> = ({ supplier }) => {
  if (!supplier) {
    return (
      <div className="p-6 rounded-xl shadow border bg-white">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🏢 Supplier Details
        </h2>
        <p className="text-sm text-gray-500">
          Supplier information not available.
        </p>
      </div>
    );
  }

  const {
    name,
    gstNumber,
    address,
    city,
    state,
    pincode,
    contactNumber,
    email,
  } = supplier;

  const fullAddress =
    address || city || state || pincode
      ? [address, city, state, pincode].filter(Boolean).join(", ")
      : "Address not available";

  return (
    <div className="p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🏢 Supplier Details
      </h2>

      <div className="text-sm text-gray-800 space-y-1">
        <p className="font-medium text-black">{name || "Name not available"}</p>

        {gstNumber && <p className="text-gray-600">GST: {gstNumber}</p>}

        <div className="mt-3 space-y-2 text-gray-700">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5" />
            {fullAddress}
          </p>

          {contactNumber && (
            <p className="flex items-center gap-2">
              <Phone size={16} />
              +91 {contactNumber}
            </p>
          )}

          {email && (
            <p className="flex items-center gap-2">
              <Mail size={16} />
              {email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
