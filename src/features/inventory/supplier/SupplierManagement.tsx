import React, { useState } from "react";
import { FilePlus, FileDown } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { useNavigate } from "react-router-dom";
import { useSuppliers } from "../../../hooks/useSuppliers";
import type { SupplierFilterParams } from "../../../services/api/inventoryapi/inventoryApi";

export const SupplierManagement: React.FC = () => {
  const navigate = useNavigate();

  // State for filters
  const [filters, setFilters] = useState<SupplierFilterParams>({
    search: null,
    isActive: undefined,
    pageNumber: undefined,
    pageSize: undefined,
  });

  const { data, isLoading, isError } = useSuppliers(filters);

  const handleSearch = (term: string) => {
    setFilters((prev) => ({
      ...prev,
      search: term || null,
    }));
  };

  const handleStatusChange = (statusOption: any) => {
    let value: boolean | undefined = undefined;
    if (statusOption === "active") value = true;
    else if (statusOption === "inactive") value = false;
    else value = undefined;

    setFilters((prev) => ({
      ...prev,
      isActive: value,
    }));
  };
  console.log(filters.isActive);

  return (
    <div className="p-6 overflow-auto max-h-screen scrollbar-hide">
      <PageHeader
        title="Supplier Management"
        actions={
          <>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/suppliers/new")}
            >
              <FilePlus size={16} />
              Add Supplier
            </Button>
          </>
        }
      />

      {/* Filters */}
      <div className="rounded-xl shadow border bg-white p-3 mt-4">
        <h3 className="block text-lg">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <SearchInput onSearch={handleSearch} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <DropdownList
              options={[
                { id: "active", name: "Active" },
                { id: "inactive", name: "Inactive" },
              ]}
              label="Select Status"
              onSelect={(val) => {
                handleStatusChange(val);
              }}
            />
          </div>
        </div>
      </div>

      {/* Supplier Table */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">
          Suppliers ({data?.length || 0})
        </h2>

        <div className="overflow-x-auto rounded-xl border bg-white shadow">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center">
                    Loading suppliers...
                  </td>
                </tr>
              )}

              {isError && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-red-500"
                  >
                    Error loading suppliers.
                  </td>
                </tr>
              )}

              {data?.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center">
                    No suppliers found.
                  </td>
                </tr>
              )}

              {data?.map((supplier: any) => (
                <tr key={supplier.id} className="border-t">
                  <td className="px-4 py-2">{supplier.contactName || "N/A"}</td>
                  <td className="px-4 py-2">{supplier.name || "N/A"}</td>
                  <td className="px-4 py-2">
                    {supplier.contactNumber || "N/A"}
                  </td>
                  <td className="px-4 py-2">{supplier.email || "N/A"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        supplier.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {supplier.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupplierManagement;
