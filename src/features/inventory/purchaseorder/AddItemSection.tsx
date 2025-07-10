import React, { useState } from "react";
import { Button } from "../../../components/ui/reusable/Button";
import SearchSelect from "../../../components/ui/reusable/SearchSelect"; // Adjust path as needed

type Product = {
  id: number;
  name: string;
};

type ProductItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  taxRate: number;
};

type AddItemSectionProps = {
  products: Product[];
  onAddItem: (item: ProductItem) => void;
};

const AddItemSection: React.FC<AddItemSectionProps> = ({
  products,
  onAddItem,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string | number;
    label: string;
    value: any;
  } | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [taxRate, setTaxRate] = useState(0);

  const [unitCost, setUnitCost] = useState(0);
  console.log(products);

  const productOptions = products?.map((p) => ({
    id: p.id,
    label: p.name,
    value: p,
  }));

  const handleAddItem = () => {
    if (!selectedProduct) return alert("Please select a product");
    if (quantity < 1) return alert("Quantity must be at least 1");
    if (unitCost < 0) return alert("Unit cost can't be negative");

    onAddItem({
      productId: selectedProduct.value.id,
      productName: selectedProduct.value.name,
      quantity,
      unitCost,
      taxRate,
    });

    // Reset
    setSelectedProduct(null);
    setQuantity(1);
    setUnitCost(0);
  };

  return (
    <div className="p-6 bg-white border rounded-xl shadow space-y-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-700">Add Items</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* SearchSelect Product Dropdown */}
        <div className="md:col-span-2">
          <SearchSelect
            label="Product"
            placeholder="Search product"
            options={productOptions}
            selected={selectedProduct}
            setSelected={setSelectedProduct}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={1}
          />
        </div>

        {/* Unit Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Unit Cost
          </label>
          <input
            type="number"
            value={unitCost}
            onChange={(e) => setUnitCost(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={0}
          />
        </div>
      </div>

      <div className="text-right">
        <Button
          size="sm"
          variant="primary"
          className="py-2"
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default AddItemSection;
