import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/landingPage/landingPage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import Profile from "./pages/profile/profile";
import TransfersPage from "./pages/transfer/transfer";
import Transactions from "./pages/transactionHistory/transactionHistory";
import AIAssistantPage from "./pages/AIAssistant/AIAssistant";
import Settings from "./pages/settings/settings";
import Loans from "./pages/LoanApplyPage/LoanApplyPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import SetTransactionPin from "./pages/Security/SetTransactionPin";
import Security from "./pages/Security/Security";
import ChangeTransactionPin from "./pages/Security/ChangeTransactionPin";
import ProtectedRoute from "./components/ProtectedRoute";
import LoanHistoryPage from "./pages/LoanHistoryPage/LoanHistoryPage";
import LoanDetailsPage from "./pages/LoanDetailsPage/LoanDetailsPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import AdminTransactions from "./pages/AdminTransactions/AdminTransactions";
import AdminSettings from "./pages/AdminSettings/AdminSettings";
import AdminLoans from "./pages/AdminLoans/AdminLoans";
import AdminAccount from "./pages/AdminAccount/AdminAccount";


function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transfers"
          element={
            <ProtectedRoute>
              <TransfersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
    path="/admin/account"
    element={<AdminAccount />}
/>

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
<Route
    path="/admin/loans"
    element={<AdminLoans />}
/>        

        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
  path="/loans/:id"
  element={
    <ProtectedRoute>
      <LoanDetailsPage />
    </ProtectedRoute>
  }
/>
<Route
    path="/admin/settings"
    element={<AdminSettings />}
/>

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIAssistantPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route
          path="/security"
          element={
            <ProtectedRoute>
              <Security />
            </ProtectedRoute>
          }
        />

        <Route
          path="/security/set-pin"
          element={
            <ProtectedRoute>
              <SetTransactionPin />
            </ProtectedRoute>
          }
        />


        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
          
        />
        <Route
  path="/admin/transactions"
  element={<AdminTransactions />}
/>
                <Route
            path="/security/change-pin"
            element={
                <ProtectedRoute>
                    <ChangeTransactionPin />
                </ProtectedRoute>
            }

        />
        <Route path="/loans/history" element={<LoanHistoryPage />} />

        <Route
          path="/messagepage"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
          
        />
      </Routes>
    </>
  );
}

export default App;