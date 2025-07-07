import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/reusable/Button";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import ProductList from "./ProductList";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";

const Products: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className=" p-6 overflow-auto scrollbar-hide max-h-screen scrollbar-hidden">
      <PageHeader
        backTo="/home/inventory/dashboard"
        title="Product Catalog"
        subtitle="Manage your product inventory"
        actions={
          <>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => navigate("/home/inventory/purchase-order/new")}
            >
              <FileDown size={16} />
              Export
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/home/inventory/product/new")}
              variant="primary"
              className="flex items-center gap-2"
            >
              <FilePlus size={16} />
              Add Product
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Total Products */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">5</h2>
          <span className="text-gray-600">Total Products</span>
        </div>

        {/* Active */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">4</h2>
          <span className="text-gray-600">Active</span>
        </div>

        {/* Low Stock */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">2</h2>
          <span className="text-gray-600">Low Stock</span>
        </div>

        {/* Out of Stock */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">1</h2>
          <span className="text-gray-600">Out of Stock</span>
        </div>

        {/* Inventory Value */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-green-600">₹2,54,750</h2>
          <span className="text-gray-600">Inventory Value</span>
        </div>
      </div>
      <div className=" rounded-xl shadow border bg-white p-3 mt-6">
        <h3 className="block text-lg">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm ">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>

            <SearchInput onSearch={() => {}} />
          </div>
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <DropdownList
              options={[]}
              onSelect={(val) => console.log("Selected:", val)}
              label="Choose Category"
            />
          </div>
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <DropdownList
              options={[]}
              onSelect={(val) => console.log("Selected:", val)}
              label="Choose Option"
            />
          </div>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Products;
