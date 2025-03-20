// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your backend URL

export const signup = async (fullName, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      fullName,
      email,
      password,
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return { success: true, token: response.data.token };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};
