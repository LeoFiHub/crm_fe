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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          {/* Auth */}
          <Route path="login" element={<Login />} />

          {/* General Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Employee Routes */}
          <Route path="employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="employee/wallet" element={<EmployeeWalletPage />} />
          <Route path="employee/salary-history" element={<SalaryHistoryPage />} />
          <Route path="employees" element={<AllEmployees />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/detail" element={<DetailEmployee />} />

          {/* Accounting Routes */}
          <Route path="accounting/dashboard" element={<AccountingDashboard />} />
          <Route path="accounting/company-wallet" element={<CompanyWalletPage />} />
          <Route path="accounting/transactions" element={<TransactionHistoryPage />} />
          <Route path="accounting/payroll-approval" element={<PayrollList />} />
          <Route path="accounting/deposit" element={<DepositCoinsPage />} />

          {/* Legacy Routes */}
          <Route path="payroll" element={<PayrollList />} />
          <Route path="deposit" element={<DepositCoinsPage />} />

          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
