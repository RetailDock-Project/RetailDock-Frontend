import type { ProductFormData } from "../../../features/inventory/product/NewProduct";
import type { PurchaseRequest } from "../../../features/inventory/purchase/PurchaseTypes";
import type { SupplierDto } from "../../../features/inventory/supplier/SupplierForm";
import accountsClient from "../AccountsApi/accountsClient";
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

interface PurchaseOrderFilters {
  searchString?: string;
  status?: string;
  startDate?: string; // ISO format e.g. '2025-07-14T00:00:00'
  endDate?: string; // ISO format e.g. '2025-07-14T23:59:59'
}

export type SupplierFilterParams = {
  search?: string | null;
  isActive?: boolean;
  pageNumber?: number;
  pageSize?: number;
};

type PurchaseOrderRequest = {
  supplierId?: string;
  orderDate?: string | null;

  items: {
    productId: string;
    quantity: number;
    ratePerPiece: number;
  }[];
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
  const formData = new FormData();

  // Append basic fields
  formData.append("ProductName", productData.productName);
  formData.append("ProductCode", productData.sku);
  formData.append("ProductCategoryId", productData.categoryId.toString());
  formData.append("UnitOfMeasuresId", productData.unitId.toString());
  formData.append("HsnCodeId", productData.hsnCodeId.toString());
  formData.append("Description", productData.description);
  formData.append("ReOrderLevel", productData.reorderLevel.toString());
  formData.append("MRP", productData.mrp.toString());
  formData.append("CostPrice", productData.costPrice.toString());
  formData.append("SellingPrice", productData.sellingPrice.toString());

  // Append new product images (files only)
  productData.productImages.forEach((img, index) => {
    if (img instanceof File) {
      formData.append("ProductImages", img); // Field name should match backend expectation
    }
  });

  // Append existing image IDs (if any)
  if (productData.existingImageIds && productData.existingImageIds.length > 0) {
    productData.existingImageIds.forEach((id) => {
      formData.append("ExistingImageIds", id.toString()); // field name may vary based on backend
    });
  }

  // Send the request
  const response = await inventoryClient.put(
    `/Product/update/product?id=${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  console.log(response, "update product reponse");
  return response.data;
};

export const createSupplier = async (data: SupplierDto) => {
  const response = await inventoryClient.post("/Supplier/create", data);
  console.log(response.data);

  return response.data;
};
export const getSupplierWithFilters = async (data: SupplierFilterParams) => {
  console.log(data);

  const response = await inventoryClient.get("/Supplier/supplier-filter", {
    params: data,
  });
  console.log(response.data);

  return response.data;
};

export const createPurchaseOrder = async (data: PurchaseOrderRequest) => {
  const response = await inventoryClient.post("/PurchaseOrder/Create", data); // Adjust endpoint
  return response.data;
};

export const fetchFilteredPurchaseOrders = async (
  filters: PurchaseOrderFilters
) => {
  const response = await inventoryClient.get("/PurchaseOrder/all/filters", {
    params: filters,
  });
  console.log(response.data);

  return response.data;
};

export const getPurchaseOrderById = async (id: string) => {
  const response = await inventoryClient.get(`/PurchaseOrder/${id}`);
  return response.data;
};

export const createPurchase = async (data: PurchaseRequest) => {
  const response = await inventoryClient.post("/Purchase/create", data);
  console.log(response.data);

  return response.data;
};

export interface GetPurchasesParams {
  searchTerm?: string;
  fromDate?: string; // ISO date string like '2025-07-15T00:00:00Z'
  toDate?: string;
}

export const getPurchasesWithFilter = async (params: GetPurchasesParams) => {
  const query = new URLSearchParams();

  if (params.searchTerm) query.append("searchTerm", params.searchTerm);
  if (params.fromDate) query.append("fromDate", params.fromDate);
  if (params.toDate) query.append("toDate", params.toDate);

  const response = await inventoryClient.get(
    `/Purchase/purchases-filter?${query.toString()}`
  );
  return response.data;
};

export const exportPurchaseExcel = async () => {
  return await inventoryClient.get("/Purchase/organizationId/export", {
    responseType: "blob",
  });
};

export const getPurchaseById = async (id: any) => {
  const response = await inventoryClient.get(`/Purchase/get/${id}`);
  return response.data;
};

export const exportPurchaseOrderPdf = async (id: any) => {
  return await inventoryClient.get(`/PurchaseOrder/${id}/export-pdf`, {
    responseType: "blob",
  });
};
