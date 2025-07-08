import { Routes, Route, useNavigate } from "react-router-dom";
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
import PurchaseReturn from "../features/inventory/purchasereturn/PurchaseReturn";
import NewPurchaseReturn from "../features/inventory/purchasereturn/NewPurchaseReturn";
import Products from "../features/inventory/product/Products";
import NewProduct from "../features/inventory/product/NewProduct";
import ProductDetail from "../features/inventory/product/ProductDetail";
import InventoryDashboard from "../features/inventory/dashboard/InventoryDashboard";

import Customers from "../features/superadmin/components/Customers";
import Dashboard from "../features/superadmin/components/Dashboard";
import AccountantDashboard from "../features/accountant/components/AccountantDashboard";
import Transaction from "../features/accountant/components/Transaction";
import Invoices from "../features/accountant/components/Invoices";
import LedgerDetails from "../features/accountant/components/LedgerDetails";
import LedgerTransactionHistory from "../features/accountant/components/LedgerTransactionHistory";
import Statements from "../features/accountant/components/FinancialStatements";
import FinancialStatements from "../features/accountant/components/FinancialStatements";
import VoucherReport from "../features/accountant/components/VoucherReport";

import TaxReports from "../features/accountant/components/TaxReports";
import CashierDashboard from "../features/cashier/dashboard/CashierDashboard";
import PointOfSale from "../features/cashier/pos/PointOfSale";
import Purchase from "../features/inventory/purchase/Purchase";
import NewPurchase from "../features/inventory/purchase/NewPurchase";
import PurchaseDetail from "../features/inventory/purchase/PurchaseDetail";
import Users from "../features/admin/Users";
import RolePermissions from "../features/admin/RolePermissions";
import OrganizationRegistration from "../features/user/OrganizationRegistration";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { UserInfo } from "../services/api/authApi";
import { setUser } from "../features/user/userSlice";
import { login, logOut } from "../features/auth/authSice";
import AddLedger from "../features/accountant/components/AddLedger";

const PageRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserInfo();
        dispatch(setUser(res)); // Save user in Redux/Context
        dispatch(login());
      } catch (err) {
        console.error("User not authenticated");
        dispatch(logOut());
        navigate("/auth/login");
      }
    };

    fetchUser();
  }, []);

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
          <Route path="super-admin">
            <Route path="customers" element={<Customers />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
          </Route>

          <Route path="user">
            <Route
              path="organization-registration"
              element={<OrganizationRegistration />}
            ></Route>
          </Route>

          <Route path="inventory">
            <Route path="dashboard" element={<InventoryDashboard />}></Route>
            <Route path="products" element={<Products />} />

            <Route path="purchase-orders" element={<PurchaseOrder />}></Route>
            <Route path="purchase-order">
              <Route path="new" element={<NewPurchaseOrder />}></Route>
              <Route path="invoicenumber" element={<PurchaseOrderDetail />} />
            </Route>

            <Route path="purchase-returns" element={<PurchaseReturn />}></Route>
            <Route path="purchase-return">
              <Route path="new" element={<NewPurchaseReturn />}></Route>
            </Route>

            <Route path="purchases" element={<Purchase />}></Route>
            <Route path="purchase">
              <Route path="new" element={<NewPurchase />}></Route>
              <Route path="invoicenumber" element={<PurchaseDetail />} />
            </Route>

            <Route path="product">
              <Route path="new" element={<NewProduct />}></Route>
              <Route path="productid" element={<ProductDetail />} />
            </Route>
          </Route>

          {/* <Route path="accountant">
            <Route path="accountant-dashboard" element={<AccountantDashboard />}></Route>
            <Route path="accountant-transaction" element={<Transaction />}></Route>
            <Route path="accountant-invoices" element={<Invoices />}></Route>
            <Route path="accountant-ledgerdetails" element={<LedgerDetails />}></Route>
            <Route path="accountant-ledgertransactionhistory" element={<LedgerTransactionHistory />}></Route>
            <Route path="accountant-financialstatements" element={<FinancialStatements />}></Route>
            <Route path="accountant-voucherreport" element={<VoucherReport />}></Route>
            <Route path="accountant-taxreport" element={<TaxReports />}></Route> */}

          <Route path="accountant">
            <Route path="dashboard" element={<AccountantDashboard />}></Route>
            <Route path="transaction" element={<Transaction />}></Route>
            <Route path="invoices" element={<Invoices />}></Route>
            <Route path="ledger-details" element={<LedgerDetails />}></Route>
            <Route
              path="ledgertransactionhistory/id"
              element={<LedgerTransactionHistory />}
            ></Route>
            <Route
              path="financial-statements"
              element={<FinancialStatements />}
            ></Route>
            <Route path="voucher-report" element={<VoucherReport />}></Route>
            <Route path="tax-report" element={<TaxReports />}></Route>
            <Route path="add-ledger" element={<AddLedger/>}></Route>
          </Route>

          <Route path="cashier">
            <Route path="dashboard" element={<CashierDashboard />} />
            <Route path="pos" element={<PointOfSale />} />
          </Route>

          <Route path="admin">
            <Route path="manage-users" element={<Users />} />
            <Route path="manage-roles" element={<RolePermissions />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default PageRoutes;
