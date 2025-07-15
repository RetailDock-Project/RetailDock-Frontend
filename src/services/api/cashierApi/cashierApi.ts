import toast from "react-hot-toast";
import accountsClient from "../AccountsApi/accountsClient";
import cashierClient from "./cashierClient";

interface cashCustomers{
  companyName:string,
  email:string,
  phoneNumber:string,
  ledgerId:string
}

 type DebtorFormData = {
  companyName: string;
  email: string;
  phoneNumber: string;
  gstNumber: string;
  place: string;
  openingBalance: string;
  drCr: string;
  contactName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  address: string;
};

export const getLedgerByName = async (data:string) => {
  const response = await accountsClient.get(`/Ledger/get/ledgers/ByName?Name=${data}`);

  return response.data;
};

export const getLedgerById= async (data:string) => {
  const response = await accountsClient.get(`/Ledger/get/ledger/byId?id=${data}`);

  return response.data;
};


export const getCOGS_LedgerId = async () => {
  const response = await accountsClient.get("/Ledger/get/COGS/ledger/byname");

  return response.data;
};
export const getInventoryTransactionLedgerId = async () => {
  const response = await accountsClient.get("/Ledger/get/inventrytransaction/ledger/byname");

  return response.data;
};
export const getSaleLedgerId = async () => {
  const response = await accountsClient.get("/Ledger/get/ledgers/sales");

  return response.data;
};

export const getCustomerByMobile= async (data:string) => {
  const response = await cashierClient.get(`/Customers/viewCustomerByMobile?mobile=${data}`);
  console.log(response.data.data,"log from customer fetch by mobile")
  return response.data;
};
export const getSaleByInvoiceNumber= async (data:string| undefined) => {
  const response = await cashierClient.get(`/Sale/GetsaleByInvoice?invoiceNum=${data}`);
  console.log(response.data.data,"log from get saleBy invoice")
  return response.data;
};
export const getReturnedProductCount= async (saleId:string,productId:string) => {
  const response = await cashierClient.get(`/SaleReturn/GetreturnedProductCount?saleId=${saleId}&productId=${productId}`);

  return response.data;
};

export const addNewCashCustomers= async (data:cashCustomers) => {
  const response = await cashierClient.post("/Customers/addNewCashCustomer",data);
 toast.success(response.data.message);
  return response.data;
};
export const addNewSale= async (data:any) => {
  const response = await cashierClient.post("/Sale/AddNewSale",data);
  console.log(response.data.message,"message from create new sale")
 toast.success(response.data.message);
  return response.data;
};


export const addNewSalesReturn= async (data:any) => {
  const response = await cashierClient.post("/SaleReturn/AddSaleReturn",data);
  console.log(response.data.message,"message from create new salesReturn")
 toast.success(response.data.message);
  return response.data;
};


export const addNewCreditCustomers= async (formData:DebtorFormData) => {
  const response = await cashierClient.post("/Customers/addNewCreditCustomer",formData);

 toast.success(response.data.message);
  return response.data;
};


export const getAllSaleInvoices = async (
  fullData: boolean | null,
  skip: number | null,
  take: number | null
) => {
  const params = new URLSearchParams();

  if (fullData !== null) params.append("isFullData", fullData.toString());
  if (skip !== null) params.append("skip", skip.toString());
  if (take !== null) params.append("take", take.toString());

  const response = await cashierClient.get(`/Invoice/GetAllSaleInoices?${params}`);
  return response;
};



export const getAllSaleReturnInvoices = async (
  fullData: boolean | null,
  skip: number | null,
  take: number | null
) => {
  const params = new URLSearchParams();

  if (fullData !== null) params.append("isFullData", fullData.toString());
  if (skip !== null) params.append("skip", skip.toString());
  if (take !== null) params.append("take", take.toString());

  const response = await cashierClient.get(`/Invoice/getallSaleReturnInvoice?${params}`);
  return response;
};

export const getSaleInvoiceDetails=async(invoice:string|undefined)=>{
  const response= await cashierClient.get(`/Invoice/getSaleInvoiceNumber?invoiceNum=${invoice}`);
  console.log(response.data.data,"getSaleInvoiceDetails");
  return response.data;
}