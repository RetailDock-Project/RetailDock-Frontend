import React, { useState } from "react";
import { FilePlus, RotateCcw, FileDown } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import PurchaseList from "./PurchaseList";
import { usePurchases } from "../../../hooks/usePurchases"; // ✅ adjust path
import { exportPurchaseExcel } from "../../../services/api/inventoryapi/inventoryApi";
import { downloadExcelFile } from "../../../utils/downloadExcel";

const Purchase: React.FC = () => {
  const navigate = useNavigate();

  // 🔸 Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  // 🔹 API Call via React Query
  const {
    data: purchases,
    isLoading,
    isError,
  } = usePurchases({
    searchTerm,
    fromDate: dateRange.startDate?.toISOString(),
    toDate: dateRange.endDate?.toISOString(),
  });

  console.log(purchases);

  const handleRangeChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDateRange(range);
  };

  const handleExport = () => {
    downloadExcelFile(exportPurchaseExcel, "PurchaseList.xlsx");
  };

  return (
    <div className="p-6 overflow-auto scrollbar-hide max-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Purchases"
        actions={
          <>
            <Button
              size="sm"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase/new")}
            >
              <FilePlus size={16} />
              New Purchase
            </Button>
            {/* <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-return/new")}
            >
              <RotateCcw size={16} />
              Return
            </Button> */}
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={handleExport}
            >
              <FileDown size={16} />
              Export
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
            <SearchInput onSearch={(term) => setSearchTerm(term)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <DateRangePicker onChange={handleRangeChange} />
          </div>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <p className="mt-4">Loading purchases...</p>
      ) : isError ? (
        <p className="mt-4 text-red-600">Failed to load purchases.</p>
      ) : (
        <PurchaseList purchases={purchases || []} />
      )}

      {/* Overview section */}
      <div className="mt-4">{/* <PurchaseOverview /> */}</div>
    </div>
  );
};

export default Purchase;
