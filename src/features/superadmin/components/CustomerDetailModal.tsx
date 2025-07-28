import React, { useState } from "react";
import Modal from "../../../components/ui/reusable/Modal";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationDatailById } from "../../../services/api/developerApi/developerApi";

interface CustomerDetailModalProps {
  selectedOrganization: string | null;
  setSelectedOrganization: (value: string | null) => void;
  customerModalOpen: boolean;
  setCustomerModalOpen: (value: boolean) => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  selectedOrganization,
  setSelectedOrganization,
  customerModalOpen,
  setCustomerModalOpen,
}) => {
  const [activeTab, setActiveTab] = useState<"business" | "subscription">(
    "business"
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization-detail", selectedOrganization],
    queryFn: () => getOrganizationDatailById(selectedOrganization),
    select: (res) => res.data,
    enabled: !!selectedOrganization,
  });

  const handleClose = () => {
    setCustomerModalOpen(false);
    setSelectedOrganization(null);
  };

  // Helper function for date formatting
  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr || dateStr.startsWith("0001")) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  function formatDateSubscription(dateString: any) {
    const options = { month: "long", day: "numeric" }; // e.g., July 23
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  return (
    <Modal
      isOpen={customerModalOpen}
      onClose={handleClose}
      head={data?.organizationName || "Organization Details"}
      subHead={`Customer ID: ${data?.organizationId}`}
      badge={data?.subscriptions?.subscriptionName || ""}
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === "business"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("business")}
        >
          Business Details
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === "subscription"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("subscription")}
        >
          Subscription History
        </button>
      </div>

      {isLoading && <p>Loading details...</p>}
      {isError && <p className="text-red-500">Failed to fetch data.</p>}

      {/* Business Tab */}
      {activeTab === "business" && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <Detail label="Organization ID" value={data.organizationId} />
          <Detail label="User ID" value={data.userId} />
          <Detail label="Organization Name" value={data.organizationName} />
          <Detail label="Address" value={data.address} />
          <Detail label="Licence Number" value={data.licenceNumber} />
          <Detail label="GST Number" value={data.gstNumber} />
          <Detail label="PAN Number" value={data.panNumber} />
          <Detail
            label="Financial Year Start"
            value={formatDateSubscription(data.financialYearStart)}
          />
          <Detail
            label="Financial Year End"
            value={formatDateSubscription(data.financialYearEnd)}
          />
          <Detail label="Is Active" value={data.isActive ? "Yes" : "No"} />
          <Detail label="Created At" value={formatDate(data.createdAt)} />
          <Detail label="Updated At" value={formatDate(data.updatedAt)} />
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === "subscription" && data?.subscriptions && (
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <Detail
            label="Transaction ID"
            value={data.subscriptions.transactionId}
          />
          <Detail
            label="Subscription Name"
            value={data.subscriptions.subscriptionName}
          />
          <Detail
            label="Amount"
            value={`₹${data.subscriptions.amount.toLocaleString("en-IN")}`}
          />
          <Detail
            label="Start Date"
            value={formatDate(data.subscriptions.createdAt)}
          />
          <Detail
            label="Expiry Date"
            value={formatDate(data.subscriptions.expiryDate)}
          />
        </div>
      )}
    </Modal>
  );
};

// Reusable detail renderer
const Detail: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium break-words">{value || "-"}</p>
  </div>
);

export default CustomerDetailModal;
