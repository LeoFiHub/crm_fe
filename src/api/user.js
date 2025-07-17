import axios from "axios"

// GET: 
// All users
export const getUsers = () => axios.get('/api/users');

// Employees
export const getEmployees = () => axios.get('/api/users/employees', {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});
// Detail user by ID
export const getUserById = (id) => axios.get(`/api/users/${id}`);

// POST:
// Create a new user
export const createUser = (userData) => axios.post('/api/users', userData);

// PUT:
// Update user by ID
export const updateProfile = (userData) => axios.put(`/api/auth/profile`, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
});


