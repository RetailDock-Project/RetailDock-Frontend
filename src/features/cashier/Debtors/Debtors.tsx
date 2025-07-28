import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCreditCustomer } from "../../../services/api/cashierApi/cashierApi";

type Customer = {
  customerId: string;
  customerName: string;
  contactNumber: string;
  email: string;
  place: string;
  creditCustomer: boolean;
  gstNumber: string;
  numberOfSale: number;
  totalSale: number;
  ledgerId: string;
};

const Debtors: React.FC = () => {
  const { data: customers = [], isLoading, isError } = useQuery<Customer[]>({
    queryKey: ["fetchCustomers"],
    queryFn: getAllCreditCustomer,
    select: (response) => response,
  });


  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">
        Customers ({customers.length})
      </h2>

      <div className="overflow-x-auto rounded-md border shadow bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Email</th>
              <th className="p-3">Number of Sales</th>
              <th className="p-3">Total Sale (₹)</th>
             
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-red-500">
                  Failed to load customers.
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <tr key={cust.customerId}>
                  <td className="p-3 font-medium">{cust.customerName}</td>
                  <td className="p-3">{cust.contactNumber}</td>
                  <td className="p-3">{cust.email}</td>
                  <td className="p-3">{cust.numberOfSale}</td>
                  <td className="p-3 text-green-700 font-semibold">
                    ₹{cust.totalSale.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Debtors;
