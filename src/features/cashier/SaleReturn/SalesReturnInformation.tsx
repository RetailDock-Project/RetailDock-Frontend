import React, { useEffect, useState } from "react";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";
import { ChevronDown } from "lucide-react";
import { any, date } from "zod";
import { getSaleByInvoiceNumber } from "../../../services/api/cashierApi/cashierApi";

type SaleToSR = {
  saleId: string;
  invoiceNumber:string
  customerName: string;
  salesDate:Date;
};
type saleItemsToSR={
  productId:string;
  productName:string;
  quantity:number;
}

type ReturnInformationProps = {
  returncondition:string ;
  setReturnCondition: React.Dispatch<React.SetStateAction<string>>;
  searchTerm:string;
setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
handleReturnDate:(date:Date )=>void;
returnReason:string;
setReturnReason: React.Dispatch<React.SetStateAction<string>>;
};


const SalesReturnInformation: React.FC<ReturnInformationProps> = ({
 searchTerm,setSearchTerm,handleReturnDate,returnReason,setReturnReason,returncondition,setReturnCondition
}) => {




 
 
  const [notes, setNotes] = useState("");

  // const handleSearchChange = (value: string) => {
  //   setSearchTerm(value);
  //   if (value.trim() === "") {
  //     setFilteredSales([]); // hide until show button is clicked
  //   } else {
  //     const filtered = SalesData.filter((s) =>
  //       s.id.toLowerCase().includes(value.toLowerCase())
  //     );
   
  //   }
  // };

  // const handleShowAllClick = () => {
  //   setFilteredSales(SalesData);
  // };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
      <h2 className="text-lg font-semibold">Return Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sales Search with Show Button */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Sales*</label>
          <div className="flex items-center relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
              // onFocus={() => {
              //   if (searchTerm.trim() === "") {
              //     setFilteredSales([]); // Don't show on focus if not requested
              //   }
              // }}
              placeholder="type your SaleInvoice..."
              className="px-4 py-2 border rounded-md w-full pr-10"
            />

            {/* Show All Button */}
            {/* {searchTerm.trim() === "" && (
              <button
                onClick={handleShowAllClick}
                className="absolute right-2 text-gray-500 text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                title="Show all sales"
              >
              <ChevronDown size={14} className="text-gray-500" />

              </button>
            )} */}
          </div>

          {/* Dropdown List */}
          {/* {selectedSale?.length > 0 && (
            <ul className="absolute z-10 bg-white border mt-1 w-full rounded-md shadow max-h-40 overflow-y-auto">
              {selectedSale.map((sale:any) => (
                <li
                  key={sale.id}
                  onClick={() => {
                    setSelectedSale(sale);
                    setSearchTerm(`${sale.id} - ₹${sale.amount}`);
              
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {sale.id} - ₹{sale.amount}
                </li>
              ))}
            </ul>
          )} */}
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <SingleDatePicker
           
            onChange={(date: Date | null) => handleReturnDate(date??new Date())}
          />
        </div>
      </div>

 
  <div className="flex flex-wrap gap-6 mb-4">
  {/* Return Reason */}
  <div className="flex-1 min-w-[250px]">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Overall Return Reason
    </label>
    <textarea
      value={returnReason}
      onChange={(e) => setReturnReason(e.target.value)}
      placeholder="Overall reason for the return..."
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
      rows={4}
    />
  </div>

  {/* Return Condition */}
  <div className="w-60">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Return Condition
    </label>
    <select
      value={returncondition}
      onChange={(e) => setReturnCondition(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
    >
      <option value="Good">Good</option>
      <option value="Damaged">Damaged</option>
    </select>
  </div>
</div>

      {/* Notes */}
      {/* <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="Additional notes about the return..."
        />
      </div> */}

      {/* Display Selected */}
      {/* {selectedSale && (
        <div className="text-sm text-gray-600">
          Selected Sale: <strong>{selectedSale.id}</strong> – ₹
          {selectedSale.totalAmount}
        </div>
      )} */}
    </div>
  );
};

export default SalesReturnInformation;
