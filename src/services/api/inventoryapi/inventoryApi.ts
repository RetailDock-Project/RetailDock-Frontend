import type { ProductFormData } from "../../../features/inventory/product/NewProduct";
import inventoryClient from "./inventoryClient";

interface UnitOfMeasure {
  measurement: string;
}
interface ProductCategory {
  productCategoryName: string;
}
interface HsnCode {
  hsnCodeNumber: string;
  hsnCodeName: string;
  gstRate: number;
}

type ProductFilterParams = {
  search?: string | null;
  categoryId?: number | null;
  stockStatus?: string | null;
};

export const getProductsFilters = async (filters: ProductFilterParams = {}) => {
  console.log(filters);

  const queryParams = new URLSearchParams();

  if (filters.search) {
    queryParams.append("search", filters.search);
  }

  if (filters.categoryId !== undefined && filters.categoryId !== null) {
    queryParams.append("categoryId", filters.categoryId.toString());
  }

  if (filters.stockStatus) {
    queryParams.append("stockStatus", filters.stockStatus);
  }

  const response = await inventoryClient.get(
    `/Product/filtered-products?${queryParams.toString()}`
  );
  console.log(response.data);

  return response.data;
};

export const createProduct = async (productData: ProductFormData) => {
  const formData = new FormData();

  // Append regular fields
  formData.append("productName", productData.productName);
  formData.append("ProductCode", productData.sku);
  formData.append("ProductCategoryId", productData.categoryId.toString());
  formData.append("UnitOfMeasuresId", productData.unitId.toString());
  formData.append("hsnCodeId", productData.hsnCodeId.toString());
  formData.append("description", productData.description);
  formData.append("ReOrderLevel", productData.reorderLevel.toString());
  formData.append("mrp", productData.mrp.toString());
  formData.append("costPrice", productData.costPrice.toString());
  formData.append("sellingPrice", productData.sellingPrice.toString());

  // Append images
  productData.productImages.forEach((img: File, index: number) => {
    formData.append("productImages", img);
  });

  const response = await inventoryClient.post("/Product/AddProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const addUnitOfMeasurement = async (data: UnitOfMeasure) => {
  const response = await inventoryClient.post("/UnitOfMeasurement/Add", data);
  return response.data;
};

export const getAllUnits = async () => {
  console.log("fetching unitssss");

  const response = await inventoryClient.get("/UnitOfMeasurement/GetAll");
  return response.data;
};

export const getAllHsnCode = async () => {
  const response = await inventoryClient.get("/HsnCode/get-All");
  return response.data;
};

export const getAllCategories = async () => {
  const response = await inventoryClient.get("/ProductCategory/GetAll");
  return response.data;
};

export const AddCategory = async (data: ProductCategory) => {
  const response = await inventoryClient.post("/ProductCategory/Add", data);
  return response.data;
};

export const AddHsnCode = async (data: HsnCode) => {
  const response = await inventoryClient.post("/HsnCode/Hsn&Gst", data);
  return response.data;
};

// export const getProductsWithFilters = async () => {
//   const response = await inventoryClient.get("/Product/filtered-products");
// //   return response.data;
// };

export const getProductsOverview = async () => {
  console.log("fetching unitssss");

  const response = await inventoryClient.get("/Product/products-overview");
  return response.data;
};

export const exportProductsExcel = async () => {
  return await inventoryClient.get("/Product/export/products/excel", {
    responseType: "blob",
  });
};

export const getProductById = async (productId: string) => {
  const response = await inventoryClient.get("/Product/get/product/byid", {
    params: { productId },
  });
  console.log(response);

  return response.data;
};

export const getProductStockHistory = async (productId: string) => {
  const response = await inventoryClient.get(
    `/Product/stock/${productId}/history`
  );
  console.log(response);

  return response.data;
};

export const deleteProductById = async (productId: any) => {
  const response = await inventoryClient.delete("/Product/delete", {
    params: { productId },
  });
  console.log(response);

  return response.data;
};

export const updateProduct = async (
  productId: any,
  productData: ProductFormData
) => {
  const response = await inventoryClient.put(
    `/Product/update/product?id=${productId}`,
    productData
  );
  console.log(response);

  return response.data;
};
