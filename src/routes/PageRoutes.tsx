import { Routes, Route } from "react-router-dom";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import AuthLayout from "../layouts/AuthLayout";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import EmailVerificationStatus from "../features/auth/components/EmailVerificationStatus";
import MainLayout from "../layouts/MainLayout";
import PurchaseOrder from "../features/inventory/purchaseorder/PurchaseOrder";
import NewPurchaseOrder from "../features/inventory/purchaseorder/NewPurchaseOrder";
import PurchaseOrderDetail from "../features/inventory/purchaseorder/PurchaseOrderDetail";

import Customers from "../features/superadmin/components/Customers";
import Dashboard from "../features/superadmin/components/Dashboard";
import AccountantDashboard from "../features/accountant/components/AccountantDashboard";
import Transaction from "../features/accountant/components/Transaction";
import Invoices from "../features/accountant/components/Invoices";
import LedgerDetails from "../features/accountant/components/LedgerDetails";
import LedgerTransactionHistory from "../features/accountant/components/LedgerTransactionHistory";
import Statements from "../features/accountant/components/FinancialStatements";
import FinancialStatements from "../features/accountant/components/FinancialStatements";

const PageRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route
            path="email-verification-status"
            element={<EmailVerificationStatus />}
          />
        </Route>
        <Route path="home" element={<MainLayout />}>

          <Route path="super-admin" >
            <Route path="customers" element={<Customers />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>

          </Route>
          <Route path="inventory">
            <Route path="purchase-orders" element={<PurchaseOrder />}></Route>
            <Route path="purchase-order">
              <Route path="new" element={<NewPurchaseOrder />}></Route>
              <Route path="invoicenumber" element={<PurchaseOrderDetail />} />
            </Route>

          </Route>
          <Route path="accountant">
            <Route path="accountant-dashboard" element={<AccountantDashboard />}></Route>
            <Route path="accountant-transaction" element={<Transaction />}></Route>
            <Route path="accountant-invoices" element={<Invoices />}></Route>
            <Route path="accountant-ledgerdetails" element={<LedgerDetails />}></Route>
             <Route path="accountant-ledgertransactionhistory" element={<LedgerTransactionHistory />}></Route>
             <Route path="accountant-financialstatements" element={<FinancialStatements />}></Route>
          </Route>
        </Route>


      </Route>


    </Routes>
  );
};

export default PageRoutes;
