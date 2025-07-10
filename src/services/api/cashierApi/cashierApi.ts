import toast from "react-hot-toast";
import accountsClient from "../AccountsApi/accountsClient";
import cashierClient from "./cashierClient";
interface cashCustomers{
  companyName:string,
  email:string,
  phoneNumber:string,
  ledgerId:string
}



export const getCashLedgerId = async (data:string) => {
  const response = await accountsClient.get(`/Ledger/get/ledgers/ByName?Name=${data}`);

  return response.data;
};
export const getCustomerByMobile= async (data:string) => {
  const response = await accountsClient.get(`/api/Customers/viewCustomerByMobile?mobile=${data}`);
  return response.data;
};

export const addNewCashCustomers= async (data:cashCustomers) => {
  const response = await cashierClient.post("/Customers/addNewCashCustomer",data);
 toast.success(response.data.message);
  return response.data;
};
export const addNewCreditCustomers= async (formData:FormData) => {
  const response = await cashierClient.post("/Customers/addNewCreditCustomer",formData);
 toast.success(response.data.message);
  return response.data;
};