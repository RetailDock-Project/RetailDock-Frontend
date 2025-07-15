import React, { useState } from "react";
import Modal from "../../../components/ui/reusable/Modal";
import { Button } from "../../../components/ui/reusable/Button";
import {  addNewCashCustomers, getLedgerByName } from "../../../services/api/cashierApi/cashierApi";
import toast from "react-hot-toast";

type Customer = {
  companyName: string;
  email: string;
  mobile: string;
  LedgerId: string;
};

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // 1. Fetch ledger ID
      const ledgerData = await getLedgerByName("cash customers");

      const ledgerId = ledgerData.data;

      // 2. Create new customer object
      const newCustomer = {
        companyName:name,
        email,
        phoneNumber: mobile,
        ledgerId,
      };

      // 3. Send customer to backend
      const customerAdded=await addNewCashCustomers(newCustomer);
      toast.success(customerAdded.message);

      // 4. Reset state and close modal
      setName("");
      setEmail("");
      setMobile("");
      onClose();
    } catch (error) {
      console.error("Error saving customer:", error);
      // Optionally show error to user
    } finally {
      setIsLoading(false);
    }
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
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Customer"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
