
import axios from "axios";

// =========GET=========:
// All payrolls
export const getPayrolls = () => axios.get('/api/payrolls', {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});
// Detail payroll by EmployeeID
export const getPayrollByEmployeeId = (EmployeeID) => axios.get(`/api/payrolls/employee/${EmployeeID}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});
// By Status
export const getPayrollsByStatus = (status) => axios.get(`/api/payrolls/status/${status}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});


// =========POST=========:
// Create a new payroll
export const createPayroll = (payrollData) => axios.post('/api/payrolls', payrollData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});

// Update payroll by ID
export const updatePayroll = (id, payrollData) => axios.put(`/api/payrolls/${id}`, payrollData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});


// Approve payroll by ID
export const approvePayroll = (id) => axios.put(`/api/payrolls/approve/${id}`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});

