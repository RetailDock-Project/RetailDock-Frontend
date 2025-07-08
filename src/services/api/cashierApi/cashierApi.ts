import cashierClient from "./cashierClient";

export const getCashLedgerId = async (data:string) => {
  const response = await cashierClient.get(`/Ledger/get/ledgers/ByName?Name=${data}`);
  console.log(response,"response from GetCashLedgerId");
  return response.data;
};