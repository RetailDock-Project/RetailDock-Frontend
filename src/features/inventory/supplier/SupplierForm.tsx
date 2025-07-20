import React, { useState } from "react";

export type SupplierDto = {
  name: string;
  openingBalance?: number;
  isDebit?: boolean | null;
  contactName?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pincode?: string | null;
  gstNumber?: string | null;
  bankName?: string | null;
  accountNumber?: string | null;
  ifscCode?: string | null;
  upiId?: string | null;
  email?: string | null;
};

type Props = {
  supplier: SupplierDto;
  setSupplier: React.Dispatch<React.SetStateAction<SupplierDto>>;
};

const SupplierForm: React.FC<Props> = ({ supplier, setSupplier }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier((prev) => ({
      ...prev,
      openingBalance: parseFloat(e.target.value),
    }));
  };

  const handleDebitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier((prev) => ({
      ...prev,
      isDebit: e.target.value === "debit",
    }));
  };

  const getSafeValue = (value: unknown): string | number => {
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    return "";
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!supplier.name || supplier.name.trim() === "") {
      newErrors.name = "Supplier name is required.";
    }

    if (
      supplier.openingBalance !== undefined &&
      isNaN(supplier.openingBalance)
    ) {
      newErrors.openingBalance = "Opening balance must be a number.";
    }

    if (supplier.email && !/^\S+@\S+\.\S+$/.test(supplier.email)) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      id="supplier-form"
      className="bg-white rounded-2xl border shadow-lg p-8 mt-6 space-y-8"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Supplier Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="Supplier Name"
              value={supplier.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 ring-red-300"
                  : "focus:ring-blue-500 focus:border-blue-500"
              } transition`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Opening Balance
            </label>
            <input
              name="openingBalance"
              type="number"
              placeholder="0.00"
              value={supplier.openingBalance ?? ""}
              onChange={handleBalanceChange}
              className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.openingBalance && (
              <p className="text-red-500 text-sm mt-1">
                {errors.openingBalance}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Balance Type
        </h3>
        <div className="flex gap-8">
          <label className="inline-flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              value="debit"
              checked={supplier.isDebit === true}
              onChange={handleDebitChange}
              className="accent-blue-600"
            />
            Debit
          </label>
          <label className="inline-flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              value="credit"
              checked={supplier.isDebit === false}
              onChange={handleDebitChange}
              className="accent-blue-600"
            />
            Credit
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Contact & Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["contactName", "Contact Name"],
            ["contactNumber", "Contact Number"],
            ["email", "Email"],
            ["address", "Address"],
            ["city", "City"],
            ["state", "State"],
            ["country", "Country"],
            ["pincode", "Pincode"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              <input
                name={name}
                placeholder={label}
                value={getSafeValue(supplier[name as keyof SupplierDto])}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Bank & Tax Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ["bankName", "Bank Name"],
            ["accountNumber", "Account Number"],
            ["ifscCode", "IFSC Code"],
            ["upiId", "UPI ID"],
            ["gstNumber", "GST Number"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              <input
                name={name}
                placeholder={label}
                value={getSafeValue(supplier[name as keyof SupplierDto])}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div> */}
    </form>
  );
};

export default SupplierForm;
