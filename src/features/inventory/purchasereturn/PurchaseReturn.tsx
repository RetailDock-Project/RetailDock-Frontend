import React, { useState } from "react";
import { FilePlus, FileDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/reusable/Button";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import PurchaseReturnsList from "./PurchaseReturnsList";
import { useQuery } from "@tanstack/react-query";
import { getPurchaseReturnsFilter } from "../../../services/api/inventoryapi/inventoryApi";

const PurchaseReturn: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Filter States
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });
  const [status, setStatus] = useState<string | undefined>();

  // 🔹 Fetch purchase returns with filters
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [
      "purchase-returns",
      search,
      dateRange.startDate,
      dateRange.endDate,
      status,
    ],
    queryFn: () =>
      getPurchaseReturnsFilter({
        search: search || undefined,
        fromDate: dateRange.startDate?.toISOString(),
        toDate: dateRange.endDate?.toISOString(),
        // Add pageNumber and pageSize here if needed
      }),
  });

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      {/* Header */}
      <PageHeader
        title="Purchase Return History"
        subtitle="View and manage all purchase returns"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-order/new")}
            >
              <FileDown size={16} />
              Export
            </Button>
            {/* <Button
              onClick={() => navigate("/home/inventory/purchase-return/new")}
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
            >
              <FilePlus size={16} />
              New Return
            </Button> */}
          </>
        }
      />

      {/* Filters */}
      <div className="rounded-xl shadow border bg-white p-3 mt-6">
        <h3 className="block text-lg">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm ">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <SearchInput onSearch={(value) => setSearch(value)} />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <DateRangePicker onChange={(range) => setDateRange(range)} />
          </div>
        </div>
      </div>

      {/* List */}
      <PurchaseReturnsList list={data?.data ?? []} />
    </div>
  );
};

export default PurchaseReturn;
