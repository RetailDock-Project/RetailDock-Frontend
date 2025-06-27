import { useState } from "react";

type HSN = {
  code: string;
  gst: number;
};

type ProductBasicInfoFormProps = {
  categories: string[];
  suppliers: string[];
  units: string[];
  hsnCodes: HSN[];
};

const ProductBasicInfoForm: React.FC<ProductBasicInfoFormProps> = ({
  categories,
  suppliers,
  units,
  hsnCodes,
}) => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    supplier: "",
    barcode: "",
    unit: "",
    hsnCode: "",
    gst: 0,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // For HSN dropdown: set both code and GST %
    if (name === "hsnCode") {
      const selected = hsnCodes.find((h) => h.code === value);
      setForm((prev) => ({
        ...prev,
        hsnCode: value,
        gst: selected ? selected.gst : 0,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium mb-1">SKU *</label>
          <input
            type="text"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-sm font-medium mb-1">Supplier</label>
          <select
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select supplier</option>
            {suppliers.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Barcode */}
        <div>
          <label className="block text-sm font-medium mb-1">Barcode</label>
          <input
            type="text"
            name="barcode"
            value={form.barcode}
            onChange={handleChange}
            placeholder="Enter barcode"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unit</label>
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select unit</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        {/* HSN Code + GST % */}
        <div>
          <label className="block text-sm font-medium mb-1">HSN Code</label>
          <select
            name="hsnCode"
            value={form.hsnCode}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select HSN Code</option>
            {hsnCodes.map((h) => (
              <option key={h.code} value={h.code}>
                {h.code} – {h.gst}%
              </option>
            ))}
          </select>
          {form.gst > 0 && (
            <p className="text-xs text-gray-500 mt-1">GST Rate: {form.gst}%</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter product description..."
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
};

export default ProductBasicInfoForm;
