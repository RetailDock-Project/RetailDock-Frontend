import React, { useState } from "react";
import Modal from "../../../components/ui/reusable/Modal";
import { Button } from "../../../components/ui/reusable/Button";

type Customer = {
  name: string;
  email: string;
  mobile: string;
  LedgerId: string;
};

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newCustomer: Customer) => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [ledgerId, setLedgerId] = useState("");

  const handleSubmit = () => {
    const newCustomer: Customer = {
      name,
      email,
      mobile,
      LedgerId: ledgerId,
    };

    onSave(newCustomer);
    onClose();

    // Clear fields after save
    setName("");
    setEmail("");
    setMobile("");
    
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      head="Add Customer"
      subHead="Enter Name, Email, and Mobile"
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
            Save Customer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
