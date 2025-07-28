import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  blockOrUnblockOrg,
  getFilteredOrganizations,
} from "../../../services/api/developerApi/developerApi";
import { HiEye, HiBan } from "react-icons/hi";
import CustomerDetailModal from "./CustomerDetailModal";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { Button } from "../../../components/ui/reusable/Button";
import toast from "react-hot-toast";

interface Organization {
  organizationId: string;
  organizationName: string;
  planName: string;
  planStatus: "Active" | "Inactive" | "Expired";
  signUpDate: string;
  expiryDate: string;
  isActive: boolean;
}

const Customers: React.FC = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<
    string | null
  >(null);

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["filtered-organizations", search, status],
    queryFn: () => getFilteredOrganizations(search, status),
    select: (res) => res.data,
  });

  console.log(data);

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr || dateStr.startsWith("0001")) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const blockOrUnblockOrganization = async (id: string) => {
    try {
      await blockOrUnblockOrg(id);
      toast.success(`Organization with id-${id} status changed`);
      refetch();
    } catch (error) {
      console.log(error);

      toast.error("Error in Organization status change");
    }
  };

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="text-2xl font-bold text-gray-800">
          Customer Management
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Manage all subscribed retail businesses
        </p>

        {/* 🔍 Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by business name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 text-sm placeholder:text-xs rounded-md w-full sm:w-80"
          />
          <DropdownList
            onSelect={(id: any) => setStatus(id)}
            includeDefaultOption
            defaultOptionLabel="Choose status"
            options={[
              { id: "active", name: "Active" },
              { id: "inactive", name: "Inactive" },
              { id: "expired", name: "Expired" },
            ]}
            className="w-full sm:w-60"
          />
        </div>

        {/* 📄 Data Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-2">Business Name</th>
                <th className="text-left px-4 py-2">Plan Name & Status</th>
                <th className="text-left px-4 py-2">Sign Up Date</th>
                <th className="text-left px-4 py-2">Expiry</th>
                <th className="text-left px-4 py-2">Status</th>

                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-red-500">
                    Failed to load data.
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No organizations found.
                  </td>
                </tr>
              ) : (
                data.map((org: Organization) => (
                  <tr key={org.organizationId} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {org.organizationName}
                      <div className="text-gray-500 text-xs">
                        {/* Email is not in response, skip or add if needed */}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-xs border rounded px-2 py-1 text-gray-600 bg-gray-100">
                          {org.planName}
                        </span>
                        <span
                          className={`text-xs rounded px-2 py-1 text-white ${
                            org.planStatus === "Active"
                              ? "bg-green-400"
                              : org.planStatus === "Expired"
                              ? "bg-gray-400"
                              : "bg-yellow-400"
                          }`}
                        >
                          {org.planStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{formatDate(org.signUpDate)}</td>
                    <td className="px-4 py-2">{formatDate(org.expiryDate)}</td>
                    <td className="px-4 py-2">
                      <Button
                        size="sm"
                        className={`${org?.isActive && "bg-red-500"}`}
                        onClick={() =>
                          blockOrUnblockOrganization(org.organizationId)
                        }
                      >
                        {org?.isActive ? "Block" : "Unblock"}
                      </Button>
                    </td>

                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedOrganization(org.organizationId);
                            setCustomerModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerDetailModal
        selectedOrganization={selectedOrganization}
        setSelectedOrganization={setSelectedOrganization}
        customerModalOpen={customerModalOpen}
        setCustomerModalOpen={setCustomerModalOpen}
      />
    </>
  );
};

export default Customers;
