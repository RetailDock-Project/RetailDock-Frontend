import React from "react";
import { Printer, FileDown, RotateCcw } from "lucide-react";
import { Button } from "../../../../components/ui/reusable/Button";
import { downloadExcelFile } from "../../../../utils/downloadExcel";
import { downloadSaleInvoice } from "../../../../services/api/cashierApi/cashierApi";


type salesQuickActionProps={
  invoiceNumber:string | undefined;
  saleId:string;
}
const SalesQuickActions : React.FC<salesQuickActionProps> = ({saleId,invoiceNumber}) => {

  const downloadInvoice= async ()=>{
   await downloadExcelFile(()=>downloadSaleInvoice(invoiceNumber),`SaleInvoice${invoiceNumber}.Pdf`)
  }
  return (
    <div className="p-4 bg-white rounded-xl shadow border mt-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        ⚡ Quick Actions
      </h2>

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

        {/* <Button
          size="sm"
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => console.log("Download PDF")}
        >
          <FileDown size={16} />
  
        </Button> */}

        {/* <Button
          size="sm"
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => }
        >
          <RotateCcw size={16} />
          Return Items
        </Button> */}
      </div>
    </div>
  );
};

export default SalesQuickActions;
