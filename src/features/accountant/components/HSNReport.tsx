import React from "react";

interface HSNReportProps {
  dateRange: { startDate: Date | null; endDate: Date | null };
  selectedType: string;
}

const mockHSNData = [
  { hsn: "1001", description: "Office Chair", quantity: 10, taxable: 5000, tax: 500, type: "Sales", date: "2025-06-10" },
  { hsn: "2002", description: "Laptop Table", quantity: 5, taxable: 3000, tax: 300, type: "Sales", date: "2025-06-11" },
  { hsn: "3003", description: "Bookshelf", quantity: 3, taxable: 2400, tax: 240, type: "Purchase", date: "2025-06-07" },
];

const HSNReport: React.FC<HSNReportProps> = ({ dateRange, selectedType }) => {
  const filtered = mockHSNData.filter((item) => {
    const matchType = item.type === selectedType;
    const matchDate =
      (!dateRange.startDate || new Date(item.date) >= dateRange.startDate) &&
      (!dateRange.endDate || new Date(item.date) <= dateRange.endDate);
    return matchType && matchDate;
  });

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
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-2 px-3">{item.hsn}</td>
               
                <td className="py-2 px-3 text-right">₹{item.taxable.toFixed(2)}</td>
                <td className="py-2 px-3 text-right">₹{item.tax.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-500 py-4">
                No data for selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default HSNReport;
