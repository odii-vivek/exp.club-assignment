import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};
