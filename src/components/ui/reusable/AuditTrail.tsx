import React from "react";

type AuditInfo = {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

const audit: AuditInfo = {
  createdBy: "Admin",
  createdAt: "2025-05-10 09:00 AM",
  updatedBy: "Warehouse Manager",
  updatedAt: "2025-05-12 10:30 AM",
};

const AuditTrail: React.FC = () => {
  return (
    <div className="p-6 rounded-xl shadow border bg-white mt-6">
      <h2 className="text-lg font-semibold mb-4">🕓 Audit Trail</h2>

      <div className="text-sm space-y-3 text-gray-700">
        <div>
          <span className="font-medium">Created By:</span> {audit.createdBy}
          <br />
          <span className="text-xs text-gray-500">on {audit.createdAt}</span>
        </div>

        <div>
          <span className="font-medium">Last Updated By:</span>{" "}
          {audit.updatedBy}
          <br />
          <span className="text-xs text-gray-500">on {audit.updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
