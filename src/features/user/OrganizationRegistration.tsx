import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/reusable/Button";
import { PageHeader } from "../../components/ui/reusable/PageHeader";
import { useNavigate } from "react-router-dom";
import { addOrganizationAndSubscription } from "../../services/api/developerApi/developerApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import toast from "react-hot-toast";

type Organization = {
  organizationName: string;
  address: string;
  licenceNumber: string;
  gstNumber: string;
  panNumber: string;
  financialYearStart: "jantodec" | "apriltomarch";
};

const initialData: Organization = {
  organizationName: "",
  address: "",
  licenceNumber: "",
  gstNumber: "",
  panNumber: "",
  financialYearStart: "apriltomarch", // default
};

const OrganizationRegistration: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState<Organization>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.organizationName) errs.organizationName = "Required";
    if (!formData.address) errs.address = "Required";
    if (!formData.licenceNumber) errs.licenceNumber = "Required";
    if (!formData.gstNumber) errs.gstNumber = "Required";
    if (!formData.panNumber) errs.panNumber = "Required";
    if (!formData.financialYearStart) errs.financialYearStart = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Organization Registered:", formData);
    console.log("Organization Registered:", user?.id);

    try {
      await addOrganizationAndSubscription(user?.id, formData);
      toast.success("Organization Registered");
      navigate("/home");
    } catch (error) {
      toast.error("Error in creating organization");
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <PageHeader
        title="Register Your Organization"
        subtitle="Provide details to get started"
      />

      <form onSubmit={handleSubmit} className="bg-white px-6 py-3  space-y-4">
        {/* Organization Name */}
        <InputField
          label="Organization Name"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          error={errors.organizationName}
        />

        {/* Address */}
        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        {/* Licence Number */}
        <InputField
          label="Licence Number"
          name="licenceNumber"
          value={formData.licenceNumber}
          onChange={handleChange}
          error={errors.licenceNumber}
        />

        {/* GST Number */}
        <InputField
          label="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          error={errors.gstNumber}
        />

        {/* PAN Number */}
        <InputField
          label="PAN Number"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          error={errors.panNumber}
        />

        {/* Financial Year Type (Dropdown) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Financial Year Type
          </label>
          <select
            name="financialYearStart"
            value={formData.financialYearStart}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value={"apriltomarch"}>April to March</option>
            <option value={"jantodec"}>January to December</option>
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4 text-right">
          <Button variant="primary">Register Organization</Button>
        </div>
      </form>
    </div>
  );
};

// 🔧 Reusable Input Field Component
type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded"
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

export default OrganizationRegistration;
