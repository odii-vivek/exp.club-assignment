import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Login User
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
  }
  return response;
};

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
  }
  return response;
};

// Logout User
export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/auth/logout`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
};

// Create Book
export const createBook = async (bookData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/book/create`, bookData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Handle file uploads
    }
  });
  return response;
};

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/book`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
