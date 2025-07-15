import React, { useEffect, useState } from "react";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import { SingleDatePicker } from "../../../components/ui/reusable/SingleDatePicker";
import type { SupplierFilterParams } from "../../../services/api/inventoryapi/inventoryApi";
import { useSuppliers } from "../../../hooks/useSuppliers";

type SupplierOption = {
  id: string;
  name: string;
  ledgerId: string;
};

type PurchaseInformationProps = {
  prefill?: {
    supplier?: string;
    ledgerId?: string;
    supplierId?: string;
    date?: string;
    notes?: string;
    supplierInvoiceNumber?: string;
    gstType?: "CGST_SGST" | "IGST" | "UGST_CGST";
  };
  onChange?: (data: {
    supplierId: string;
    date: Date | null;
    notes: string | null;
    supplierInvoiceNumber: string;
    gstType: "CGST_SGST" | "IGST" | "UGST_CGST";
    supplierLedgerId?: string; // NEW
  }) => void;
};

const PurchaseInformation: React.FC<PurchaseInformationProps> = ({
  prefill,
  onChange,
}) => {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>(
    prefill?.supplierId || ""
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    prefill?.date ? new Date(prefill.date) : null
  );
  const [notes, setNotes] = useState<string>(prefill?.notes || "");
  const [supplierInvoiceNumber, setSupplierInvoiceNumber] = useState<string>(
    prefill?.supplierInvoiceNumber || ""
  );
  const [gstType, setGstType] = useState<"CGST_SGST" | "IGST" | "UGST_CGST">(
    prefill?.gstType || "CGST_SGST"
  );

  const [filters] = useState<SupplierFilterParams>({
    search: null,
    isActive: true,
    pageNumber: 1,
    pageSize: 100,
  });

  const { data: suppliersData } = useSuppliers(filters);

  const supplierOptions: SupplierOption[] =
    suppliersData?.map((supplier: any) => ({
      id: supplier.id,
      name: supplier.name,
      ledgerId: supplier.ledgerId,
    })) || [];

  const [suppliers, setSuppliers] = useState<SupplierOption[]>(supplierOptions);

  useEffect(() => {
    if (suppliersData) {
      setSuppliers(supplierOptions);
    }
  }, [suppliersData]);

  useEffect(() => {
    if (prefill?.supplierId && prefill?.supplier) {
      const prefillSupplier: SupplierOption = {
        id: prefill.supplierId,
        name: prefill.supplier,
        ledgerId: prefill.ledgerId || "",
      };

      setSuppliers((prev) =>
        prev.some((s) => s.id === prefillSupplier.id)
          ? prev
          : [...prev, prefillSupplier]
      );
    }
  }, [prefill]);

  const [supplierError, setSupplierError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const handleChange = () => {
    setSupplierError(!selectedSupplierId ? "Supplier is required." : null);
    setDateError(!selectedDate ? "Purchase date is required." : null);

    const selectedSupplier = suppliers.find((s) => s.id === selectedSupplierId);

    onChange?.({
      supplierId: selectedSupplierId,
      date: selectedDate,
      notes,
      supplierInvoiceNumber,
      gstType,
      supplierLedgerId: selectedSupplier?.ledgerId, // NEW
    });
  };

  useEffect(() => {
    handleChange();
  }, [selectedSupplierId, selectedDate, notes, supplierInvoiceNumber, gstType]);

  return (
    <div className="p-6 rounded-xl shadow border bg-white space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">
        Purchase Information
      </h2>

      <div className="flex gap-2">
        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Supplier <span className="text-red-500">*</span>
          </label>
          <DropdownList
            options={suppliers}
            label="Select Supplier"
            defaultValue={selectedSupplierId}
            onSelect={(id) => setSelectedSupplierId(id || "")}
          />
          {supplierError && (
            <p className="text-sm text-red-500 mt-1">{supplierError}</p>
          )}
        </div>

        <div className="w-[50%]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Purchase Date <span className="text-red-500">*</span>
          </label>
          <SingleDatePicker onChange={(date) => setSelectedDate(date)} />
          {dateError && (
            <p className="text-sm text-red-500 mt-1">{dateError}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Supplier Invoice Number
        </label>
        <input
          type="text"
          value={supplierInvoiceNumber}
          onChange={(e) => setSupplierInvoiceNumber(e.target.value)}
          placeholder="Enter supplier invoice number"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          GST Type <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col space-y-2">
          {["CGST_SGST", "IGST", "UGST_CGST"].map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-blue-600"
                name="gstType"
                value={type}
                checked={gstType === type}
                onChange={() =>
                  setGstType(type as "CGST_SGST" | "IGST" | "UGST_CGST")
                }
              />
              <span className="ml-2 text-gray-700">
                {type === "CGST_SGST"
                  ? "CGST + SGST"
                  : type === "IGST"
                  ? "IGST"
                  : "UGST + CGST"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes..."
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
      </div>
    </div>
  );
};

export default PurchaseInformation;
