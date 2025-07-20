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
export interface LedgerDetails {
  contactName: string;
  contactNumber: string;
  address: string;
  gstNumber: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
}


export interface LedgerForm {
  ledgerName: string;
  groupId: string;
  openingBalance: number;
  drCr: "Dr" | "Cr"; // Assuming only "Dr" or "Cr" are valid
  details: LedgerDetails;
}


export interface groupDetails {
  groupName: string
  parentId: string
}
export const getVoucherTypes = async () => {
  const response = await accountsClient.get("/Voucher/get/all/vouchertypes");
  return response.data.data
}




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
  const response = await accountsClient.get("/Ledger/get/ledgers/fortransaction", { params: { VoucherTypeId: TypeId } });

  return response.data.data

}

export const getAllGroupForLedgerCreation = async () => {
  const response = await accountsClient.get("/Accounts/get/all/groups");

  return response.data.data

}



//add ledger api
export const addLedger = async (data: LedgerForm) => {

  const response = await accountsClient.post("/Ledger/add/new/ledger", data);

  return response.data;

};
// add new ledger
export const addNewSubGroup = async (data: groupDetails) => {

  const response = await accountsClient.post("/Accounts/add/new/sub/group", data);

  return response.data;

};


//GetallVouchersIncluding item Vouchers
export const GetAllVoucherTypes = async () => {

  const response = await accountsClient.get("/Voucher/get/all/vouchertypes/with/items");


  return response.data.data;

};


//get voucher report by passing voucher typeid with dater range
export const getVoucherReport = async (
  fromDate: string,
  toDate: string,
  voucherTypeId?: string // Optional if backend allows
) => {
  const response = await accountsClient.get("/Voucher/get/voucher/report", {
    params: {
      fromDate,
      toDate,
      voucherTypeId, // Will be undefined if not passed
    },
  });


  return response.data.data;
};



export const getAllLedgers = async (
  fromDate: string | null,
  toDate: string | null,
  // Optional if backend allows
) => {
  const response = await accountsClient.get("/LedgerReport/all/ledger/report", {
    params: {
      fromDate,
      toDate,
      // Will be undefined if not passed
    },
  });


  return response.data.data;
};



//p/l aaccount 
export const getProfitAndTradingAc = async (
  fromDate: string | null,
  toDate: string | null,

  // Optional if backend allows
) => {
  const response = await accountsClient.get("/AccountsReport/get/pandl/account", {
    params: {
      fromDate,
      toDate,


      // Will be undefined if not passed
    },
  });
  console.log(fromDate)


  return response.data.data;
};





//get balance sheet
export const getBalanceSheet = async (
  fromDate: string | null,
  toDate: string | null,


) => {
  const response = await accountsClient.get("/AccountsReport/get/balacesheet/report", {
    params: {
      fromDate,
      toDate,


      // Will be undefined if not passed
    },
  });



  return response.data.data;
};




//get input gst ledgers by name

export const getInputGstLedger = async () => {
  const response = await accountsClient.get(
    "/Ledger/get/ledgers/ByName?Name=input%20gst"
  );


  return response.data;
};



// get ledger transactions
export const getLedgerReportById = async (
  ledgerId: string,
  startDate?: string | null,
  endDateid?: string | null
) => {
  const response = await accountsClient.get("/LedgerReport/ledger/report/byid", {
    params: {
      ledgerId,
      startDate,
      endDateid,
    },
  });
  console.log(response.data.data);



  return response.data.data;
};

//get taxreport and invoice of sales

export const getTaxAndInvoiceSales = async (
  fromDate: string | null,
  toDate: string | null,
) => {
  const response = await accountsClient.get("/Sale/getSaleTaxReport", {
    params: {
      fromDate,
      toDate,
     },
  })
  return response.data.data
}

//get taxreport and invoice of salesreturns
export const getTaxAndInvoiceSalesReturns = async (
  fromDate: string | null,
  toDate: string | null,
) => {
  const response = await accountsClient.get("/SaleReturn/GetAllSaleReturnTaxReport", {
    params: {
      fromDate,
      toDate,
    },
  })
   return response.data.data
}


//get taxreport and invoice of purchases
export const getTaxAndInvoicePurchase = async (
  fromDate: string | null,
  toDate: string | null,
) => {
  const response = await accountsClient.get("/Sale/getSaleTaxReport", {
    params: {
      fromDate,
      toDate,
    },
  })
   return response.data.data
}

export const getTaxAndInvoicePurchaseReturns = async (
  fromDate: string | null,
  toDate: string | null,
) => {
  const response = await accountsClient.get("/SaleReturn/GetAllSaleReturnTaxReport", {
    params: {
      fromDate,
      toDate,
    },
  })
   return response.data.data
}