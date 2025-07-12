import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllEmployees from './pages/employee/AllEmployees';
import './App.css';
import AddEmployee from './pages/employee/AddEmployee';
import DetailEmployee from './pages/employee/DetailEmployee';
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
          
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Employee Management */}
          <Route path="employees" element={<AllEmployees />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/detail" element={<DetailEmployee />} />

          {/* Payroll for Finance role */}
          <Route path="payroll" element={<PayrollList />} />

          {/* Deposit for Finance role */}
          <Route path="deposit" element={<DepositCoinsPage />} />
          
          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
