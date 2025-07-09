import { ArrowLeft, FileDown, FilePlus } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/reusable/Button";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../../../components/ui/reusable/SearchInput";
import { DropdownList } from "../../../components/ui/reusable/DropdownList";
import ProductList from "./ProductList";
import { PageHeader } from "../../../components/ui/reusable/PageHeader";
import { useProducts } from "../../../hooks/useProducts";
import { useCategory } from "../../../hooks/useCategory";
import {
  exportProductsExcel,
  getProductsOverview,
} from "../../../services/api/inventoryapi/inventoryApi";
import { useQuery } from "@tanstack/react-query";
import { downloadExcelFile } from "../../../utils/downloadExcel";

type Category = {
  organisationId: string;
  productCategoryId: number;
  productCategoryName: string;
};

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );

  const handleExport = () => {
    downloadExcelFile(exportProductsExcel, "ProductList.xlsx");
  };

  const { data: productOverview } = useQuery({
    queryKey: ["productOverview"],
    queryFn: () => getProductsOverview(),
    select: (data) => data.data,
  });

  const navigate = useNavigate();
  const filters = React.useMemo(
    () => ({
      search: searchTerm ?? undefined,
      categoryId:
        selectedCategory && selectedCategory !== 0
          ? selectedCategory
          : undefined,
      stockStatus: selectedStatus ?? undefined,
    }),
    [searchTerm, selectedCategory, selectedStatus]
  );

  const { data: productsData } = useProducts(filters);
  const { data: categories } = useCategory();

  console.log(productsData);

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
              onClick={handleExport}
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
          <h2 className="text-2xl font-bold">
            {productOverview?.totalProducts}
          </h2>
          <span className="text-gray-600">Total Products</span>
        </div>

        {/* Active */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">
            {" "}
            {productOverview?.activeProducts}
          </h2>
          <span className="text-gray-600">Active</span>
        </div>

        {/* Low Stock */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-yellow-400">
            {" "}
            {productOverview?.lowStockProducts}
          </h2>
          <span className="text-gray-600">Low Stock</span>
        </div>

        {/* Out of Stock */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-red-600">
            {" "}
            {productOverview?.outOfStockProducts}
          </h2>
          <span className="text-gray-600">Out of Stock</span>
        </div>

        {/* Inventory Value */}
        <div className="rounded-xl shadow border bg-white p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-green-600">
            ₹ {productOverview?.totalInventoryValue}
          </h2>
          <span className="text-gray-600">Inventory Value</span>
        </div>
      </div>
      <div className=" rounded-xl shadow border bg-white p-3 mt-6">
        <h3 className="block text-lg">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm ">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <SearchInput onSearch={(value) => setSearchTerm(value)} />{" "}
          </div>
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <DropdownList
              options={
                categories?.map((c: Category) => ({
                  id: c.productCategoryId,
                  name: c.productCategoryName,
                })) ?? []
              }
              includeDefaultOption={true}
              defaultOptionLabel="Select an option"
              onSelect={(val) => setSelectedCategory(Number(val) ?? null)}
              label="Choose Category"
            />
          </div>
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <DropdownList
              options={[
                { id: "InStock", name: "In Stock" },
                { id: "OutOfStock", name: "Out Of Stock" },
                { id: "LowStock", name: "Low Stock" },
              ]}
              includeDefaultOption={true}
              defaultOptionLabel="Select an option"
              onSelect={(val) => setSelectedStatus(val ?? null)}
              label="Choose Option"
            />
          </div>
        </div>
      </div>
      <ProductList products={productsData} />
    </div>
  );
};

export default Products;
