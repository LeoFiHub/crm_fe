import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllEmployees from './pages/employee/AllEmployees';
import './App.css';
import AddEmployee from './pages/employee/AddEmployee';
import DetailEmployee from './pages/employee/DetailEmployee';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeWalletPage from './pages/employee/EmployeeWalletPage';
import SalaryHistoryPage from './pages/employee/SalaryHistoryPage';
import AccountingDashboard from './pages/accounting/AccountingDashboard';
import CompanyWalletPage from './pages/accounting/CompanyWalletPage';
import TransactionHistoryPage from './pages/accounting/TransactionHistoryPage';
import PayrollList from './pages/payroll/payrollList';
import DepositCoinsPage from './pages/deposit/DepositCoinsPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TestPayroll from './components/TestPayroll';
import TestPayrollLisk from './components/TestPayrollLisk';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="test-payroll-aptos" element={<TestPayroll />} />
            <Route path="test-payroll-lisk-evm" element={<TestPayrollLisk />} />

            <Route index element={<Navigate to="/login" replace />} />
            {/* Auth */}
            <Route path="login" element={<Login />} />

            {/* General Dashboard */}
            {/* <Route path="dashboard" element={<Dashboard />} /> */}

            {/* Employee Routes - Protected */}
            <Route path="employee/dashboard" element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            <Route path="employee/add" element={
              <ProtectedRoute requiredRole="employee">
                <AddEmployee />
              </ProtectedRoute>
            } />
            <Route path="employee/profile" element={
              <ProtectedRoute requiredRole="employee">
                <DetailEmployee />
              </ProtectedRoute>
            } />
            <Route path="employee/wallet" element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeWalletPage />
              </ProtectedRoute>
            } />
            <Route path="employee/salary-history" element={
              <ProtectedRoute requiredRole="employee">
                <SalaryHistoryPage />
              </ProtectedRoute>
            } />

            {/* Accounting Routes - Protected */}
            <Route path="accounting/dashboard" element={
              <ProtectedRoute requiredRole="accounting">
                <AccountingDashboard />
              </ProtectedRoute>
            } />
            <Route path="accounting/company-wallet" element={
              <ProtectedRoute requiredRole="accounting">
                <CompanyWalletPage />
              </ProtectedRoute>
            } />
            <Route path="accounting/transactions" element={
              <ProtectedRoute requiredRole="accounting">
                <TransactionHistoryPage />
              </ProtectedRoute>
            } />
            <Route path="accounting/payroll-approval" element={
              <ProtectedRoute requiredRole="accounting">
                <PayrollList />
              </ProtectedRoute>
            } />
            <Route path="accounting/deposit" element={
              <ProtectedRoute requiredRole="accounting">
                <DepositCoinsPage />
              </ProtectedRoute>
            } />

            {/* Legacy Routes */}
            {/* <Route path="payroll" element={<PayrollList />} />
            <Route path="deposit" element={<DepositCoinsPage />} /> */}
            {/* <Route path="employees" element={<AllEmployees />} /> */}

          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
