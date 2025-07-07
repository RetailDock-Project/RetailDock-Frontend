import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/reusable/Button";
import Modal from "../../../components/ui/reusable/Modal";
import { HiPencil } from "react-icons/hi";
import EditCustomerModal from "./EditCustomerProps";
import ViewCustomerModal from "./ViewCustomer";

type Customer = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  totalPurchase: string;
  totalPending: string;
};

const customersData: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    mobile: "9876543210",
    totalPurchase: "₹14,000",
    totalPending: "₹4,000",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    mobile: "9123456780",
    totalPurchase: "₹10,000",
    totalPending: "₹2,500",
  },
  {
    id: "3",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    mobile: "9988776655",
    totalPurchase: "₹25,000",
    totalPending: "₹0",
  },
];

const Debtors: React.FC = () => {
  const [localCustomers, setLocalCustomers] = useState<Customer[]>(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDeleteConfirm = () => {
    if (!selectedCustomer) return;
    setLocalCustomers((prev) =>
      prev.filter((cust) => cust.id !== selectedCustomer.id)
    );
    setIsDeleteOpen(false);
    setSelectedCustomer(null);
  };

  const openViewModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };
 const handleEdit = (customer: Customer) => {
  setSelectedCustomer(customer);
  setIsEditOpen(true);
};

const handleUpdateCustomer = (updatedCustomer: Customer) => {
  setLocalCustomers((prev) =>
    prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
  );
};

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">
        Customers ({localCustomers.length})
      </h2>

      <div className="overflow-x-auto rounded-md border shadow bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Email</th>
              <th className="p-3">Total Purchase</th>
              <th className="p-3">Total Pending</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {localCustomers.map((cust) => (
              <tr key={cust.id}>
                <td className="p-3 font-medium">{cust.name}</td>
                <td className="p-3">{cust.mobile}</td>
                <td className="p-3">{cust.email}</td>
                <td className="p-3 text-green-700 font-semibold">{cust.totalPurchase}</td>
                <td className="p-3 text-red-600 font-semibold">{cust.totalPending}</td>
                <td className="p-3 text-right space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openViewModal(cust)}
                  >
                    <Eye size={16} />
                  </Button>

                       <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>handleEdit(cust)}
                  >
                    <HiPencil size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openDeleteModal(cust)}
                  >
                    <Trash2 size={16} />
                  </Button>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {localCustomers.length === 0 && (
          <div className="text-center py-8 text-gray-500">No customers found.</div>
        )}
      </div>

      {/* View Modal */}
    <ViewCustomerModal
  isOpen={isViewOpen}
  onClose={() => setIsViewOpen(false)}
  customer={selectedCustomer}
/>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        head="Delete Customer"
        subHead="This action cannot be undone."
        badge={selectedCustomer?.email}
      >
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-medium text-black">{selectedCustomer?.name}</span>?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
              Delete
            </Button>
        
          </div>
        </div>
      </Modal>

      <EditCustomerModal
  isOpen={isEditOpen}
  onClose={() => setIsEditOpen(false)}
  onSave={handleUpdateCustomer}
  customer={selectedCustomer}
/>
    </div>
  );
};

export default Debtors;
