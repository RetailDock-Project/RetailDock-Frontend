import { useState } from "react";
import Modal from "../../../components/ui/reusable/Modal";
import type { ProductFormData } from "./NewProduct";
import {
  AddCategory,
  AddHsnCode,
  addUnitOfMeasurement,
} from "../../../services/api/inventoryapi/inventoryApi";
import { useUnits } from "../../../hooks/useUnits";
import { useHsn } from "../../../hooks/useHsn";
import { useCategory } from "../../../hooks/useCategory";

type Props = {
  productData: ProductFormData;
  setProductData: React.Dispatch<React.SetStateAction<ProductFormData>>;
};

const ProductBasicInfoForm: React.FC<Props> = ({
  productData,
  setProductData,
}) => {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isUnitModalOpen, setUnitModalOpen] = useState(false);
  const [isHsnModalOpen, setHsnModalOpen] = useState(false);
  const [newUnit, setNewUnit] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [newHsnCodeNumber, setNewHsnCodeNumber] = useState<string>("");
  const [newHsnCodeName, setNewHsnCodeName] = useState<string>("");
  const [newGstRate, setNewGstRate] = useState<number | "">("");

  const { data: unitsData, refetch: unitsRefetch } = useUnits();
  const { data: hsnCodes, refetch: hsnRefetch } = useHsn();
  const { data: categories, refetch: categoryRefetch } = useCategory();

  console.log(categories);

  const handleAddUnit = async () => {
    if (!newUnit.trim()) {
      setError("Unit name is required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      console.log(newUnit);
      const response = await addUnitOfMeasurement({ measurement: newUnit });
      console.log(response);

      // ✅ Optional: Add to local list of units
      // setUnits((prev) => [...prev, response.data]);
      unitsRefetch();
      setUnitModalOpen(false);
      setNewUnit("");
    } catch (err) {
      setError("Failed to add unit. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await AddCategory({ productCategoryName: newCategory });

      // Optional: show toast or confirmation
      console.log("Category added:", response);

      // Refetch categories (only works if useCategory uses SWR or React Query)
      // Otherwise you may need to reload or manually update the category list
      categoryRefetch();
      setNewCategory("");
      setCategoryModalOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHsnCode = async () => {
    if (
      !newHsnCodeNumber.trim() ||
      !newHsnCodeName.trim() ||
      newGstRate === ""
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const newHsn = {
        hsnCodeNumber: newHsnCodeNumber,
        hsnCodeName: newHsnCodeName,
        gstRate: Number(newGstRate),
      };

      const response = await AddHsnCode(newHsn);
      console.log("HSN added:", response);

      // Clear inputs and close modal
      setNewHsnCodeNumber("");
      setNewHsnCodeName("");
      setNewGstRate("");
      hsnRefetch();
      setHsnModalOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add HSN code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "hsnCodeId") {
      const selected = hsnCodes.find((h: any) => h.hsnCodeId === Number(value));
      setProductData((prev) => ({
        ...prev,
        hsnCodeId: Number(value),
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: name.includes("Id") ? Number(value) : value,
      }));
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
            name="productName"
            value={productData.productName}
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
            value={productData.sku}
            onChange={handleChange}
            placeholder="Enter SKU"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <div className="flex gap-2">
            <select
              name="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value={0}>Select category</option>
              {categories?.map((cat: any) => (
                <option
                  key={cat.productCategoryId}
                  value={cat.productCategoryId}
                >
                  {cat.productCategoryName}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setCategoryModalOpen(true)}
              className="text-xs px-2 py-1 border rounded text-blue-600 border-blue-500 hover:bg-blue-50"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium mb-1">Unit *</label>
          <div className="flex gap-2">
            <select
              name="unitId"
              value={productData.unitId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value={0}>Select unit</option>
              {unitsData?.data?.map((unit: any) => (
                <option key={unit.id} value={unit.id}>
                  {unit.measurement}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setUnitModalOpen(true)}
              className="text-xs px-2 py-1 border rounded text-blue-600 border-blue-500 hover:bg-blue-50"
            >
              + Add
            </button>
          </div>
        </div>

        {/* HSN Code */}
        <div>
          <label className="block text-sm font-medium mb-1">HSN Code *</label>
          <div className="flex gap-2">
            <select
              name="hsnCodeId"
              value={productData.hsnCodeId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value={0}>Select HSN Code</option>
              {hsnCodes?.map((h: any) => (
                <option key={h.hsnCodeId} value={h.hsnCodeId}>
                  {h.hsnCodeNumber} – {h.hsnCodeName} – {h.gstRate}%
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setHsnModalOpen(true)}
              className="text-xs px-2 py-1 border rounded text-blue-600 border-blue-500 hover:bg-blue-50"
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Enter product description..."
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        head="Add New Category"
        subHead="Add a new product category"
        width="max-w-md"
      >
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
          className="w-full border px-3 py-2 rounded mb-2"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-2 text-sm border rounded"
            onClick={() => {
              setCategoryModalOpen(false);
              setNewCategory("");
              setError("");
            }}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 text-sm text-white bg-blue-600 rounded disabled:opacity-50"
            disabled={isLoading}
            onClick={handleAddCategory}
          >
            {isLoading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </Modal>

      {/* Add HSN Modal */}
      <Modal
        isOpen={isHsnModalOpen}
        onClose={() => setHsnModalOpen(false)}
        head="Add HSN Code"
        subHead="Add a new HSN code with GST"
        width="max-w-md"
      >
        <div className="space-y-3">
          <input
            type="text"
            value={newHsnCodeNumber}
            onChange={(e) => setNewHsnCodeNumber(e.target.value)}
            placeholder="Enter HSN code number"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            value={newHsnCodeName}
            onChange={(e) => setNewHsnCodeName(e.target.value)}
            placeholder="Enter HSN code name"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            value={newGstRate}
            onChange={(e) =>
              setNewGstRate(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Enter GST %"
            className="w-full border px-3 py-2 rounded"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-3 py-2 text-sm border rounded"
              onClick={() => {
                setHsnModalOpen(false);
                setNewHsnCodeNumber("");
                setNewHsnCodeName("");
                setNewGstRate("");
                setError("");
              }}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 text-sm text-white bg-blue-600 rounded disabled:opacity-50"
              disabled={isLoading}
              onClick={handleAddHsnCode}
            >
              {isLoading ? "Adding..." : "Add HSN"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Unit Modal */}
      <Modal
        isOpen={isUnitModalOpen}
        onClose={() => setUnitModalOpen(false)}
        head="Add New Unit"
        subHead="Create a new unit of measure"
        width="max-w-md"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)}
            placeholder="Enter unit name (e.g., Kg, Piece, Litre)"
            className="w-full border px-3 py-2 rounded"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-2 text-sm border rounded"
              onClick={() => setUnitModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 text-sm text-white bg-blue-600 rounded disabled:opacity-50"
              disabled={isLoading}
              onClick={handleAddUnit}
            >
              {isLoading ? "Adding..." : "Add Unit"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductBasicInfoForm;
