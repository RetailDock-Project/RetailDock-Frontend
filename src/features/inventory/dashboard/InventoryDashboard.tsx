import React from "react";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { Button } from "../../../components/ui/reusable/Button";
import InventoryOverviewStats from "./InventoryOverviewStats";
import RecentInventoryTransactions from "./RecentInventoryTransactions";
import { DateRangePicker } from "../../../components/ui/reusable/DateRangePicker";
import { useNavigate } from "react-router-dom";

const InventoryDashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <PageHeader
        title="Inventory Management"
        subtitle="Comprehensive inventory tracking, analytics, and warehouse management"
        actions={
          <>
            <div className="flex gap-2">
              {/* <DateRangePicker onChange={() => {}} /> */}
              <Button
                onClick={() => navigate("/home/inventory/product/new")}
                size="sm"
              >
                Add Product
              </Button>
            </div>
          </>
        }
      />
      <InventoryOverviewStats />
      <RecentInventoryTransactions />
    </div>
  );
};

export default InventoryDashboard;
