import React from "react";

interface HSNReportProps {
  dateRange: { startDate: Date | null; endDate: Date | null };
  selectedType: string;
}



const HSNReport: React.FC<HSNReportProps> = () => {
 
  return (
    <div className="p-6 bg-white mt-6 shadow rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">HSN Report</h3>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b text-left text-gray-600 uppercase text-xs">
          <tr>
            <th className="py-2 px-3">HSN Code</th>
           
            <th className="py-2 px-3 text-right">Taxable Value</th>
            <th className="py-2 px-3 text-right">Tax</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>
      
    </div>
  );
};

export default HSNReport;
