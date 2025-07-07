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

export const getProductsFilters = async () => {
  const response = await inventoryClient.get("/Product/filtered-products");
  console.log(response);
  return response.data;
};

export const createProduct = async (productData: any) => {
  const formData = new FormData();

  // Append regular fields
  formData.append("productName", productData.productName);
  formData.append("ProductCode", productData.sku);
  formData.append("ProductCategoryId", productData.categoryId.toString());
  formData.append("UnitOfMeasuresId ", productData.unitId.toString());
  formData.append("hsnCodeId", productData.hsnCodeId.toString());
  formData.append("gst", productData.gst.toString());
  formData.append("description", productData.description);
  formData.append("ReOrderLevel", productData.reorderLevel.toString());
  formData.append("mrp", productData.mrp.toString());
  formData.append("costPrice", productData.costPrice.toString());
  formData.append("sellingPrice", productData.sellingPrice.toString());

  // Append images
  productData.productImages.forEach((img: File, index: number) => {
    formData.append("productImages", img);
  });

  console.log(formData);

  const response = await inventoryClient.post("/Product/AddProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const addUnitOfMeasurement = async (data: UnitOfMeasure) => {
  const response = await inventoryClient.post("/UnitOfMeasurement/Add", data);
  console.log(response);
  return response.data;
};

export const getAllUnits = async () => {
  console.log("fetching unitssss");

  const response = await inventoryClient.get("/UnitOfMeasurement/GetAll");
  console.log(response);
  return response.data;
};

export const getAllHsnCode = async () => {
  const response = await inventoryClient.get("/HsnCode/get-All");
  console.log(response);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await inventoryClient.get("/ProductCategory/GetAll");
  console.log(response);
  return response.data;
};

export const AddCategory = async (data: ProductCategory) => {
  const response = await inventoryClient.post("/ProductCategory/Add", data);
  console.log(response);
  return response.data;
};

export const AddHsnCode = async (data: HsnCode) => {
  const response = await inventoryClient.post("/HsnCode/Hsn&Gst", data);
  console.log(response);
  return response.data;
};
