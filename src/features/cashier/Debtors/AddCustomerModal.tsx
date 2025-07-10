import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "../../../components/ui/reusable/Modal";
import { addNewCreditCustomers } from "../../../services/api/cashierApi/cashierApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddCreditCustomerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
      companyName: Yup.string(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be a 10-digit number")
        .required("Phone number is required"),
      gstNumber: Yup.string(),
      place: Yup.string().required("Place is required"),
      openingBalance: Yup.number().required("Opening balance is required"),
    
      contactName: Yup.string().required("contactName is required"),
      bankName: Yup.string().required('please fill this Details'),
      accountNumber: Yup.string().required('please fill this Details'),
      ifscCode: Yup.string().required('please fill this Details'),
      upiId: Yup.string(),
      address: Yup.string(),
    }),
    onSubmit: (values) => {
      addNewCreditCustomers(values);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      head="Add Customer"
      subHead="Fill in the customer details"
      badge="Debtor"
      width="max-w-3xl"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
                { label: "Contact Name", name: "contactName" },
            { label: "Company Name",placeholder:"fill customer Is Company", name: "companyName" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "GST Number",placeholder:"fill customer Is Company", name: "gstNumber" },
            { label: "Place", name: "place" },
            { label: "Opening Balance",placeholder:"If any OpeningBlance", name: "openingBalance" },
            { label: " opening Balance Dr/Cr", name: "drCr" },
        
            { label: "Bank Name", name: "bankName" },
            { label: "Account Number", name: "accountNumber" },
            { label: "IFSC Code", name: "ifscCode" },
            { label: "UPI ID",placeholder:"optional...", name: "upiId" },
          ].map(({ label, name,placeholder, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={(formik.values as any)[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border px-3 py-2 rounded-md text-sm"
              />
              {formik.touched[name as keyof typeof formik.touched] &&
                formik.errors[name as keyof typeof formik.errors] && (
                  <p className="text-sm text-red-500">
                    {formik.errors[name as keyof typeof formik.errors]}
                  </p>
                )}
            </div>
          ))}

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"placeholder="optional..."
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-sm text-red-500">{formik.errors.address}</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button  type="button" onClick={onClose} className="mr-4 hover:bg-gray-200 p-2 rounded-lg">
            Cancel
              </button>
          <button  type="submit" className="bg-blue-700 text-white p-2 rounded-lg border hover:bg-blue-500" >
            Save Customer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCreditCustomerModal;
