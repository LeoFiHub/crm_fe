import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AllEmployees from './pages/employee/AllEmployees';
import './App.css';
import AddEmployee from './pages/employee/AddEmployee';
import DetailEmployee from './pages/employee/DetailEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<AllEmployees />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/detail" element={<DetailEmployee />} />

          {/* Payroll for Finance role */}
          <Route path="payroll" element={<AddEmployee />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
