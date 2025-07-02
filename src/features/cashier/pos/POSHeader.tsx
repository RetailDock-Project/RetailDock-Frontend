import React, { useState } from "react";

type Customer = {
  id: number;
  name: string;
  phone: string;
};

const mockCustomers: Customer[] = [
  { id: 1, name: "Priya Sharma", phone: "9876543210" },
  { id: 2, name: "Rahul Singh", phone: "9123456789" },
];

const POSHeader: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("Walk-in");

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.phone.includes(searchTerm)
  );

  const handleCustomerSelect = (customerName: string) => {
    setSelectedCustomer(customerName);
    setSearchTerm("");
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">Point of Sale</h1>

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Customer:</span>
          <input
            type="text"
            placeholder="Enter mobile or type 'walk'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm w-48"
          />
        </div>

        {/* Dropdown */}
        {(searchTerm.length > 0 || selectedCustomer === "") && (
          <div className="absolute bg-white border rounded-md mt-1 w-full z-10 max-h-40 overflow-auto shadow-lg text-sm">
            <button
              onClick={() => handleCustomerSelect("Walk-in")}
              className="w-full text-left px-3 py-2 hover:bg-gray-100"
            >
              Walk-in
            </button>

            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((cust) => (
                <button
                  key={cust.id}
                  onClick={() => handleCustomerSelect(cust.name)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  {cust.name} - {cust.phone}
                </button>
              ))
            ) : (
              <p className="px-3 py-2 text-gray-400">No customer found</p>
            )}
          </div>
        )}

        {/* Selected customer display */}
        {selectedCustomer && (
          <p className="text-sm text-blue-600 mt-1 ml-16">
            {selectedCustomer === "Walk-in"
              ? "Selected: Walk-in"
              : `Selected: ${selectedCustomer}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default POSHeader;
