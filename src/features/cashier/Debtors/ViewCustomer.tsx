import React from "react";
import Modal from "../../../components/ui/reusable/Modal";

type Customer = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  totalPurchase: string;
  totalPending: string;
};

interface ViewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

const ViewCustomerModal: React.FC<ViewCustomerModalProps> = ({
  isOpen,
  onClose,
  customer,
}) => {
  if (!customer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      head="Customer Info"
      subHead={customer.name}
      width="max-w-md"
    >
      <div className="space-y-3 text-sm text-gray-700">
        <p><strong>Mobile:</strong> {customer.mobile}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Total Purchase:</strong> {customer.totalPurchase}</p>
        <p><strong>Total Pending:</strong> {customer.totalPending}</p>
      </div>
    </Modal>
  );
};

export default ViewCustomerModal;
