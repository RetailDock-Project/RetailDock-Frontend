import React from "react";
import { FilePlus, RotateCcw, FileDown } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import PurchaseList from "./PurchaseList";

// Dummy data type and list
type Purchase = {
  id: string;
  date: string;
  supplier: string;
  items: number;
  totalAmount: number;
  status: "Completed" | "Pending" | "Cancelled";
};

const samplePurchases = [
  {
    id: "PUR-001",
    supplier: "Samsung Electronics",
    invoiceNumber: "INV-2458",
    date: "May 12, 2025",
    items: 12,
    totalAmount: 124500,
    status: "Paid",
  },
  {
    id: "PUR-002",
    supplier: "Sony India",
    invoiceNumber: "INV-3211",
    date: "May 18, 2025",
    items: 5,
    totalAmount: 78400,
    status: "Pending",
  },
];

const Purchase: React.FC = () => {
  const navigate = useNavigate();

  const handleRangeChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    console.log("Selected Range:", range);
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
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-return/new")}
            >
              <RotateCcw size={16} />
              Return
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
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
            <SearchInput onSearch={() => {}} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <DateRangePicker onChange={handleRangeChange} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <DropdownList
              options={["Completed", "Pending", "Cancelled"]}
              onSelect={(val) => console.log("Selected:", val)}
              label="Choose Status"
            />
          </div>
        </div>
      </div>
      <PurchaseList purchases={samplePurchases} />
      {/* Overview section (optional) */}
      <div className="mt-4">
        {/* You can add <PurchaseOverview /> component here */}
      </div>
    </div>
  );
};

export default Purchase;
