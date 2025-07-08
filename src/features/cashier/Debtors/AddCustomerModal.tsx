import React, { useState } from "react";
import Modal from "../../../components/ui/reusable/Modal";
import { Button } from "../../../components/ui/reusable/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const AddCreditCustomerModal: React.FC<Props> = ({ isOpen, onClose }) => {


  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    gstNumber: "",
    place: "",
    openingBalance: "",
    drCr: "",
    contactName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Customer:", formData);
    // Optionally: send to backend API here
   onClose();

  };

  return (
    <>
     

      <Modal
          isOpen={isOpen}
      onClose={onClose}
        head="Add Customer"
        subHead="Fill in the customer details"
        badge="Debtor"
        width="max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Company Name", name: "companyName" },
            { label: "Email", name: "email" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "GST Number", name: "gstNumber" },
            { label: "Place", name: "place" },
            { label: "Opening Balance", name: "openingBalance" },
            { label: "Dr/Cr", name: "drCr" },
            { label: "Contact Name", name: "contactName" },
            { label: "Bank Name", name: "bankName" },
            { label: "Account Number", name: "accountNumber" },
            { label: "IFSC Code", name: "ifscCode" },
            { label: "UPI ID", name: "upiId" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>
          ))}

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <Button variant="secondary"  onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Customer
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddCreditCustomerModal;
