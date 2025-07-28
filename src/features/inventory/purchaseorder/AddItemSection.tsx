import React, { useState } from "react";
import { Button } from "../../../components/ui/reusable/Button";
import SearchSelect from "../../../components/ui/reusable/SearchSelect";
import toast from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  taxRate: number;
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
    value: Product;
  } | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);

  const productOptions = products?.map((p) => ({
    id: `product-${p.id}`, // Ensures unique key format
    label: p.name,
    value: p,
    taxRate: p.taxRate,
  }));

  const handleAddItem = () => {
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (unitCost < 0) {
      toast.error("Unit cost can't be negative");
      return;
    }
    console.log(selectedProduct.value.id.toString(), "id");
    console.log(selectedProduct.value.name, "name");
    console.log(quantity, "qty");
    console.log(unitCost, "cost");
    console.log(selectedProduct.value.taxRate);

    onAddItem({
      productId: selectedProduct.value.id.toString(),
      productName: selectedProduct.value.name,
      quantity,
      unitCost,
      taxRate: selectedProduct.value.taxRate,
    });

    // Reset fields
    setSelectedProduct(null);
    setQuantity(1);
    setUnitCost(0);
  };

  return (
    <div className="p-6 bg-white border rounded-xl shadow space-y-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-700">Add Items</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Product dropdown */}
        <div className="md:col-span-3">
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
            min={1}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            min={0}
            step="0.01"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tax Rate
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            min={0}
            step="0.01"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
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
