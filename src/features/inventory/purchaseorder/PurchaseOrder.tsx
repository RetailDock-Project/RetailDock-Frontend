import React from "react";
// import { Input } from "@/components/ui/input";
// import { DatePicker } from "@/components/ui/datepicker"; // Assume you have one
// import { Select, SelectItem } from "@/components/ui/select";
import { Search, FilePlus, RotateCcw, FileDown } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { PurchaseOrderList, type PurchaseOrder } from "./PurchaseOrderList";
import { PurchaseOrderOverview } from "./PurchaseOrderOverview";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
const sampleOrders: PurchaseOrder[] = [
  {
    poNumber: "PO-2025-0001",
    orderedDate: "May 10, 2025",
    receivedDate: "May 12, 2025",
    supplier: "Samsung Electronics",
    invoice: "INV-2458",
    paymentMethod: "Bank Transfer",
    items: 12,
    amount: 124500,
    orderStatus: "Completed" as const,
  },
  {
    poNumber: "PO-2025-0002",
    orderedDate: "May 20, 2025",
    supplier: "Sony India",
    invoice: "INV-3211",
    paymentMethod: "UPI",
    items: 5,
    amount: 78400,
    orderStatus: "Pending" as const,
  },
];

const PurchaseOrder: React.FC = () => {
  const handleRangeChange = (range: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    console.log("Selected Range:", range);
  };
  const navigate = useNavigate();

  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      {" "}
      {/* Header */}
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
              New Purchase
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Purchase Return
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
      <div className=" rounded-xl shadow border bg-white p-3">
        <h3 className="block text-lg">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm ">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>

            <SearchInput onSearch={() => {}} />
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
              options={["Option A", "Option B", "Option C"]}
              onSelect={(val) => console.log("Selected:", val)}
              label="Choose Option"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-lg font-bold mb-4">
          Purchase Orders ({sampleOrders.length})
        </h2>
        <PurchaseOrderList data={sampleOrders} />
      </div>
      <div className="mt-4">
        <PurchaseOrderOverview />
      </div>
    </div>
  );
};

export default PurchaseOrder;
