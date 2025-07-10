import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { Button } from "../../../components/ui/reusable/Button";
import type { SupplierDto } from "./SupplierForm";
import SupplierForm from "./SupplierForm";
import { createSupplier } from "../../../services/api/inventoryapi/inventoryApi";
import toast from "react-hot-toast";

const NewSupplier: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // 🔁 loading state

  const [supplier, setSupplier] = useState<SupplierDto>({
    name: "",
    openingBalance: 0,
    isDebit: true,
    contactName: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    gstNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    email: "",
  });

  const handleSubmit = async () => {
    if (!supplier.name || supplier.name.trim() === "") {
      toast.error("Supplier name is required.");
      return;
    }

    try {
      setLoading(true); // ⏳ Start loading
      console.log("Submitted Supplier:", supplier);

      await createSupplier(supplier); // ✅ call API

      toast.success("Supplier created successfully!");
      navigate("/home/inventory/suppliers");

      //   Optionally reset form
      setSupplier({
        name: "",
        openingBalance: 0,
        isDebit: true,
        contactName: "",
        contactNumber: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        gstNumber: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        upiId: "",
        email: "",
      });
    } catch (error: any) {
      console.error("Error creating supplier:", error);
      const message =
        error?.response?.data?.message || "Failed to create supplier.";
      toast.error(message);
    } finally {
      setLoading(false); // ✅ Done loading
    }
  };

  return (
    <div className="p-6 overflow-auto max-h-screen scrollbar-hide">
      <PageHeader
        title="Add New Supplier"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)} size="sm">
              Back
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={loading}
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Supplier"
              )}
            </Button>
          </div>
        }
      />
      <SupplierForm
        supplier={supplier}
        setSupplier={setSupplier}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewSupplier;
