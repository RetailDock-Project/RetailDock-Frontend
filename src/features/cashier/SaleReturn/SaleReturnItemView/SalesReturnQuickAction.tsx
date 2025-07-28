import React from "react";
import { Search, CheckSquare, Printer } from "lucide-react";
import { Button } from "../../../../components/ui/reusable/Button";
import { downloadExcelFile } from "../../../../utils/downloadExcel";
import { downloadSaleReturnInvoice } from "../../../../services/api/cashierApi/cashierApi";


type QuickActionsProps = {
invoiceNumber:string | undefined;
};

const SalesReturnQuickActions: React.FC<QuickActionsProps> = ({
invoiceNumber
}) => {

   const downloadInvoice= async ()=>{
     await downloadExcelFile(()=>downloadSaleReturnInvoice(invoiceNumber),`SaleReturnInvoice${invoiceNumber}.Pdf`)
    }
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="space-y-2">
        <Button
          size="sm"
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => downloadInvoice()}
        >
          <Printer size={16} />
                 Download PDF
        </Button>

      </div>
    </div>
  );
};

export default SalesReturnQuickActions;
