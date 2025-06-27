import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const SupplierDetail: React.FC = () => {
  return (
    <div className=" p-6 rounded-xl shadow border bg-white">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🏢 Supplier Details
      </h2>

      <div className="text-sm">
        <p className="font-medium">Samsung Electronics</p>
        <p className="text-gray-600">GST: 27AABCS1234C1Z5</p>

        <div className="mt-3 space-y-2 text-gray-700">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5" />
            123 Tech Park, Mumbai, Maharashtra 400001
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} /> +91 9876543210
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} /> contact@samsung.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
