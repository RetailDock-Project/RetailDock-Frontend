import React, { useState } from 'react';
import { PageHeader } from '../../../components/ui/reusable/PageHeader';
import { Button } from '../../../components/ui/reusable/Button';
import Modal from '../../../components/ui/reusable/Modal';
import { FaPlus } from 'react-icons/fa';

const DebtorsHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    gstNumber: "",
    place: "",
    address: "",
    openingBalance: "",
    drCr: "",
    contactName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Customer Data:", customerData);
    // 🔁 Call your API to save the data
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Customer"

        subtitle="View and manage All the Debtors"
        actions={
          <div className="flex gap-2">
            <Button
              size="lg"
              variant="primary"
              className="flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
               <FaPlus className='w-5 h-4'/> Add Customer
            </Button>
          </div>
        }
      />

      {/* Modal for Add Customer */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
                value={(customerData as any)[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
            </div>
          ))}
          {/* Full-width textarea for address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={customerData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="primary"
            className="px-6"
            onClick={handleSubmit}
          >
            Save Customer
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DebtorsHeader;
