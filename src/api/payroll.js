
import axios from "axios";

// =========GET=========:
// All payrolls
export const getPayrolls = () => axios.get('/api/payrolls');
// Detail payroll by EmployeeID
export const getPayrollByEmployeeId = (EmployeeID) => axios.get(`/api/payrolls/employee/${EmployeeID}`);
// By Status
export const getPayrollsByStatus = (status) => axios.get(`/api/payrolls/status/${status}`);


// =========POST=========:
// Create a new payroll
export const createPayroll = (payrollData) => axios.post('/api/payrolls', payrollData);

// Update payroll by ID
export const updatePayroll = (id, payrollData) => axios.put(`/api/payrolls/${id}`, payrollData);
