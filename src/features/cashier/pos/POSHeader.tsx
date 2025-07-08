import React, { useState } from "react";
import { Button } from "../../../components/ui/reusable/Button";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";

type Customer = {
  id: number;
  name: string;
  phone: string;
  place: string;
  email: string;
  gstNo: string;
};

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Priya Sharma",
    phone: "9876543210",
    place: "Delhi",
    email: "priya@example.com",
    gstNo: "29ABCDE1234F1Z5",
  },
  {
    id: 2,
    name: "Rahul Singh",
    phone: "9123456789",
    place: "Mumbai",
    email: "rahul@example.com",
    gstNo: "27XYZDE7890G2Z3",
  },
];

const POSHeader: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [businessType, setBusinessType] = useState("B2C");
  const [gstType, setGstType] = useState("SGST");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [selectedState,setSelectedDate ]=useState();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.phone ==(mobile)
  );

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
   
  };

  return (
    <div className="pl-10  p-4 mt-4 bg-white rounded-xl border shadow-lg   ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-start">
        <div>
          <label className="block text-sm font-medium mb-1">Customer Mobile</label>
          <input
            type="text"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border rounded-md px-3 py-3 w-56 text-sm border-gray-600"
          />
          {(mobile.length === 10 || filteredCustomers.length > 0) && (
            <div className="absolute bg-white border rounded mt-1 w-56 z-10 shadow max-h-40 overflow-auto text-sm">
              <button
                onClick={() =>
                  handleCustomerSelect({
                    id: 0,
                  name:"",
                    phone: "",
                    place: "",
                    email: "",
                    gstNo: "",
                  })
                }
                className="w-full text-left px-3 py-3 hover:bg-gray-100 border-gray-600"
              >
              
              </button>
              {filteredCustomers.map((cust) => (
                <button
                  key={cust.id}
                  onClick={() => handleCustomerSelect(cust)}
                  className="w-full text-left px-3 py-3 hover:bg-gray-100 border-gray-600"
                >
                  {cust.name} 
                </button>
              ))}
              {filteredCustomers.length === 0 && (
                <p className="px-3 py-3 text-gray-400">No customer found</p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Customer Name</label>
          <input
            type="text"
            value={selectedCustomer?.name || ""}
            disabled
            className="border rounded-md px-3 py-3 w-56 text-sm bg-gray-100 border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            value={selectedCustomer?.email || ""}
            disabled
            className="border rounded-md px-3 py-3 w-56 text-sm bg-gray-100 border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Place</label>
          <input
            type="text"
            value={selectedCustomer?.place || ""}
            disabled
            className="border rounded-md px-3 py-3 w-56 text-sm bg-gray-100 border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GST No</label>
          <input
            type="text"
            value={selectedCustomer?.gstNo || ""}
            disabled
            className="border rounded-md px-3 py-3 w-56 text-sm bg-gray-100 border-gray-600"
          />
        </div>

          <div>
          <label className="block text-sm font-medium mb-1 ">Sale Type</label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="border rounded-md px-3 py-3 w-56 text-sm border-gray-600"
          >
            <option value="B2C">To Customer</option>
            <option value="B2B">To Company</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sale Location</label>
          <select
            value={gstType}
            onChange={(e) => setGstType(e.target.value)}
            className="border rounded-md px-3 py-3 w-56 text-sm border-gray-600"
          >
            <option value="SGST">Inter state</option>
            <option value="CGST">Other state</option>
            <option value="UGST">Union Territory</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="border rounded-md px-3 py-3 w-56 text-sm border-gray-600"
          >
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
            <option value="BankTransfer">Bank</option>
          </select>
        </div>


{paymentMode==="Credit"?(
          <div>
             <label className="block text-sm font-medium mb-1">DueDate</label>
            <div className="w-56  ">

<SingleDatePicker onChange={()=>setSelectedDate(selectedState)} />
            </div>
         
        </div>
):<div></div>}

      
      </div>

   
    </div>
  );
};

export default POSHeader;
