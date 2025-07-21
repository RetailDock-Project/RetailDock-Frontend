import React from "react";
import { Printer, FileDown, RotateCcw } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import { useNavigate } from "react-router-dom";
import { downloadExcelFile } from "../../../utils/downloadExcel";
import { exportPurchasePdf } from "../../../services/api/inventoryapi/inventoryApi";

const PurchaseQuickActions: React.FC<{ id: any }> = ({ id }) => {
  const navigate = useNavigate();
  console.log(id);

  const handlePurchaseDownload = async () => {
    console.log("working");

    downloadExcelFile(() => exportPurchasePdf(id), "PurchaseDetail.pdf");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow border mt-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        ⚡ Quick Actions
      </h2>

      <div className="space-y-2">
        {/* <Button
          size="sm"
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => console.log("Print Invoice")}
        >
          <Printer size={16} />
          Print Invoice
        </Button> */}

        <Button
          size="sm"
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={handlePurchaseDownload}
        >
          <FileDown size={16} />
          Download PDF
        </Button>

        <Button
          size="sm"
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => navigate(`/home/inventory/purchase-return/new/${id}`)}
        >
          <RotateCcw size={16} />
          Return Items
        </Button>
      </div>
    </div>
  );
};

export default PurchaseQuickActions;
