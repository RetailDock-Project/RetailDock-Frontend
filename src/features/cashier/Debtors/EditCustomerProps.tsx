import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/reusable/Modal";
import { Button } from "../../../components/ui/reusable/Button";

type Customer = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  totalPurchase: string;
  totalPending: string;
};

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCustomer: Customer) => void;
  customer: Customer | null;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  customer,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setEmail(customer.email);
      setMobile(customer.mobile);
    }
  }, [customer]);

  const handleSubmit = () => {
    if (!customer) return;

    const updatedCustomer: Customer = {
      ...customer,
      name,
      email,
      mobile,
    };

    onSave(updatedCustomer);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      head="Edit Customer"
      subHead="Update Name, Email, and Mobile"
      width="max-w-md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mobile</label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="tel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="text-right">
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCustomerModal;
