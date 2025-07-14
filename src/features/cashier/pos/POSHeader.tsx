import React, { useEffect, useState } from "react";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";
import { getCustomerByMobile } from "../../../services/api/cashierApi/cashierApi";
import type { Customer } from "./PointOfSale";


type POSHeaderProps = {
  mobile: string;
  setMobile: (value: string) => void;

  businessType: string;
  setBusinessType: (value: string) => void;

  gstType: string;
  setGstType: (value: string) => void;

  paymentMode: string;
  setPaymentMode: (value: string) => void;

  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;

  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
};

const POSHeader: React.FC<POSHeaderProps> = ({   mobile ,setMobile,  businessType ,setBusinessType ,gstType,setGstType,paymentMode ,setPaymentMode,selectedDate ,setSelectedDate,selectedCustomer ,setSelectedCustomer}) => {
 

  useEffect(() => {
    const fetchCustomer = async () => {
      if (mobile.length === 10) {
        try {
          const response = await getCustomerByMobile(mobile);
          setSelectedCustomer(response.data);
        } catch (error) {
          console.error("Error fetching customer:", error);
        }
      } else {
        setSelectedCustomer(null);
      }
    };

    fetchCustomer();
  }, [mobile]);

  return (
    <div className="px-6 py-4 mt-2 bg-white rounded-lg border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Customer Mobile</label>
          <input
            type="text"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border rounded-md px-3 py-2 w-full text-sm border-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name</label>
          <input
            type="text"
            value={selectedCustomer?.customerName || ""}
            disabled
            className="border rounded-md px-3 py-2 w-full text-sm bg-gray-100 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            value={selectedCustomer?.email || ""}
            disabled
            className="border rounded-md px-3 py-2 w-full text-sm bg-gray-100 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Place</label>
          <input
            type="text"
            value={selectedCustomer?.place || ""}
            disabled
            className="border rounded-md px-3 py-2 w-full text-sm bg-gray-100 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">GST No</label>
          <input
            type="text"
            value={selectedCustomer?.gstNumber || ""}
            disabled
            className="border rounded-md px-3 py-2 w-full text-sm bg-gray-100 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Sale Type</label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="border rounded-md px-3 py-2 w-full text-sm border-gray-400"
          >
            <option value="B2C">To Customer</option>
            <option value="B2B">To Company</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Sale Location</label>
          <select
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
            className="border rounded-md px-3 py-2 w-full text-sm border-gray-400"
          >
            <option value="SGST">Inter state</option>
            <option value="CGST">Other state</option>
            <option value="UGST">Union Territory</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="border rounded-md px-3 py-2 w-full text-sm border-gray-400"
          >
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
            <option value="BankTransfer">Bank</option>
          </select>
        </div>

        {paymentMode === "Credit" && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
            <div className="w-full">
              <SingleDatePicker onChange={(date) => setSelectedDate(date)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default POSHeader;
