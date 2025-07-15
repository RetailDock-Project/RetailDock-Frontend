import type { string } from "zod";
import accountsClient from "./accountsClient";

interface Transaction {
  ledgerId: string;
  amount: number;
  narration: string;
}

interface addVoucher {
  voucherTypeId: string;
  voucherDate: string;
  remarks: string;
  transactionsDebit: Transaction[];
  transactionsCredit: Transaction[];
}

export const getVoucherTypes = async () => {
  const response = await accountsClient.get("/Voucher/get/all/vouchertypes");
  return response.data.data;
};

//Create A transaction

export const addTransactionEntry = async (data: addVoucher) => {
  const response = await accountsClient.post(
    "/Voucher/add/new/voucherentry",
    data
  );
  return response.data;
};

//for getting all cr dr side ledgers
export const getDebitCreditLedgersForTransaction = async (TypeId: string) => {
  const response = await accountsClient.get(
    "/Ledger/get/ledgers/fortransaction",
    { params: { VoucherTypeId: TypeId } }
  );

  return response.data.data;
};
export const getAllGroupForLedgerCreation = async () => {
  const response = await accountsClient.get("/Accounts/get/all/groups");
  console.log(response.data.data);
  return response.data.data;
};
