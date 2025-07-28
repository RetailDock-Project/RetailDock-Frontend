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

  return response.data;
};
export const getSaleByInvoiceNumber= async (data:string| undefined) => {
  const response = await cashierClient.get(`/Sale/GetsaleByInvoice?invoiceNum=${data}`);
 
  return response.data;
};

export const getSaleReturnByInvoiceNumber= async (data:string| undefined) => {
  const response = await cashierClient.get(`/Invoice/getsaleReturnByInvoiceNum?invoiceNum=${data}`);
 console.log(response.data.data,`saleReturn From invoice ${data}`)
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

  return response.data;
};


export const addNewSalesReturn = async (data: any) => {
  const response = await cashierClient.post("/SaleReturn/AddSaleReturn", data);

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
  if (skip !== null) params.append("pageNo", skip.toString());
  if (take !== null) params.append("pageSize", take.toString());

  const response = await cashierClient.get(`/Invoice/GetAllSaleInoices?${params}`);

  return response.data;
};

export const getAllCreditCustomer=async ()=>{
  const response= await cashierClient.get("/Customers/getCreditCustomers");
    return response.data;
}


export const getAllSaleReturnInvoices = async (
  fullData: boolean | null,
  skip: number | null,
  take: number | null
) => {
  const params = new URLSearchParams();

  if (fullData !== null) params.append("isFullData", fullData.toString());
  if (skip !== null) params.append("pageNo", skip.toString());
  if (take !== null) params.append("pageSize", take.toString());

  const response = await cashierClient.get(`/Invoice/getallSaleReturnInvoice?${params}`);
  return response.data;
};

export const getSaleInvoiceDetails=async(invoice:string|undefined)=>{
  const response= await cashierClient.get(`/Invoice/getSaleInvoiceNumber?invoiceNum=${invoice}`);
  console.log(response.data.data,"getSaleInvoiceDetails");
  return response.data;
}

export const getSaleInvoiceNumber=async(saleMode:string|undefined)=>{
  const response= await cashierClient.get(`/Sale/GetsaleInvoiceNumber?saleMode=${saleMode}`);
  return response.data;
}
export const getSaleReturnInvoiceNumber=async(saleMode:string|undefined)=>{
  const response= await cashierClient.get(`/SaleReturn/GetsalesReturnInvoice?saleMode=${saleMode}`);

  return response.data;
}

export const getCustomerByName_Mobile=async(name:string)=>{
   const response= await cashierClient.get(` /Customers/viewCustomerByMobile?mobile=${name}`);

  return response.data;
 
}

export const getUserSaleReturnDetails=async(  fullData: boolean | null,
  skip: number | null,
  take: number | null
)=>{
  const params = new URLSearchParams();

  if (fullData !== null) params.append("isFullData", fullData.toString());
  if (skip !== null) params.append("pageNo", skip.toString());
  if (take !== null) params.append("pageSize", take.toString());

  const response = await cashierClient.get(`/SaleReturn/GetAllSaleReturn${params}`);
  return response.data;
};


export const downloadSaleInvoice = async (invoiceNum: string |undefined) => {

    const response = await cashierClient.get(`/Invoice/export-SalePdf?invoiceNum=${invoiceNum}`, {
      responseType: 'blob', 
    });
    return response.data;
    
  }
export const downloadSaleReturnInvoice = async (invoiceNum: string| undefined) => {

    const response = await cashierClient.get(`/Invoice/export-ReturnPdf?invoiceNum=${invoiceNum}`, {
      responseType: 'blob', 
    });
    return response.data;
  }

export const getSaleReturnDetailsByDate = async (
  fromDate: Date | null,
  toDate: Date | null,
  isFullData: boolean | null
) => {
  const params: Record<string, string> = {};

  if (isFullData !== null) params["isFullData"] = isFullData.toString();
  if (fromDate !== null) params["fromDate"] = fromDate.toISOString();
  if (toDate !== null) params["toDate"] = toDate.toISOString();

  const response = await cashierClient.get(`/SaleReturn/GetAllSaleReturnByDate`, {
    params,
  });
  console.log(response.data.data, "✅ return from getSaleReturnDetailsByDate");
  return response.data;
};



export const getSaleListByDate = async (
  fromDate: Date | null,
  toDate: Date | null,
  isFullData: boolean | null,
  skip:number | null,
  take:number | null
) => {
  const params: Record<string, any> = {};

  if (isFullData !== null) params["isFullData"] = isFullData.toString();
  if (fromDate !== null) params["fromDate"] = fromDate.toISOString();
  if (toDate !== null) params["toDate"] = toDate.toISOString();
  if (skip !== null) params["pageNo"] = skip;
  if (take !== null) params["pageSize"] = take;

  const response = await cashierClient.get(`/Sale/GetAllSaleByDate`, {
    params,
  });
  console.log(response.data.data, "✅ return from getSaleReturnDetailsByDate");
  return response.data;
};

