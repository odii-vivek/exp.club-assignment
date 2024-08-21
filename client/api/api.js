import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

// Function to handle logout
export const logoutUser = async (token) => {
  return await axios.post(`${API_URL}/auth/logout`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
