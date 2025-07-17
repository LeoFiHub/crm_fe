import axios from "axios"

// Login:
export const authenticateUser = (userData) =>
    axios.post('/api/auth/login', userData)

// Register:
export const registerUser = (userData) =>
    axios.post('/api/auth/register', userData)