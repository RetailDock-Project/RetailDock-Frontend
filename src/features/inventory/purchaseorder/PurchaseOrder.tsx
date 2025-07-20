import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, FilePlus, RotateCcw, FileDown } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { PurchaseOrderList, type PurchaseOrders } from "./PurchaseOrderList";
import { PurchaseOrderOverview } from "./PurchaseOrderOverview";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { fetchFilteredPurchaseOrders } from "../../../services/api/inventoryapi/inventoryApi";

const PurchaseOrder: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: string | undefined;
    endDate: string | undefined;
  }>({ startDate: undefined, endDate: undefined });

  // -------------- Query ----------------
  const {
    data: purchaseOrders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchaseOrders", searchTerm, selectedStatus, dateRange],
    queryFn: () =>
      fetchFilteredPurchaseOrders({
        searchString: searchTerm,
        status: selectedStatus ?? undefined,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
    select: (data) => data.data,
  });

  console.log(purchaseOrders);

  const handleRangeChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDateRange({
      startDate: range.startDate?.toISOString(),
      endDate: range.endDate?.toISOString(),
    });
  };

  console.log(purchaseOrders);

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        title="Purchase Orders"
        actions={
          <>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-order/new")}
            >
              <FilePlus size={16} />
              New
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-returns")}
            >
              <RotateCcw size={16} />
              Purchase Return
            </Button>

            {/* <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FileDown size={16} />
              Export
            </Button> */}
          </>
        }
      />

      {/* Filters */}
      <div className="rounded-xl shadow border bg-white p-3">
        <h3 className="block text-lg">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <SearchInput onSearch={(value) => setSearchTerm(value)} />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <DateRangePicker onChange={handleRangeChange} />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <DropdownList
              options={[
                { id: "Pending", name: "Pending" },
                { id: "Partial", name: "Partial" },
                { id: "Complete", name: "Completed" },
              ]}
              includeDefaultOption={true}
              defaultOptionLabel="Select an option"
              onSelect={(val) => setSelectedStatus(val ?? null)}
              label="Choose Option"
            />
          </div>
        </div>
      </div>

      {/* Data List */}
      <div className="mt-3">
        <h2 className="text-lg font-bold mb-4">
          {/* Purchase Orders ({purchaseOrders.length}) */}
        </h2>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load purchase orders.</p>
        ) : (
          <PurchaseOrderList data={purchaseOrders} />
        )}
      </div>

      <div className="mt-4">
        <PurchaseOrderOverview />
      </div>
    </div>
  );
};

export default PurchaseOrder;
