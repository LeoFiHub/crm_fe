import axios from "axios"

// GET: 
// All users
export const getUsers = () => axios.get('http://localhost:3000/api/users');
// Detail user by ID
export const getUserById = (id) => axios.get(`/api/users/${id}`);

// POST:
// Create a new user
export const createUser = (userData) => axios.post('/api/users', userData);


