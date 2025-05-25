import axios from 'axios';

// FIXED: Use your correct backend URL
const API_URL = import.meta.env.VITE_API_URL || 'https://search-in-map.vercel.app/api';

console.log('Using API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to catch deployment issues
  timeout: 10000
});

// Enhanced error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
      fullError: error
    });
    return Promise.reject(error);
  }
);

// Profiles API
export const getProfiles = async (searchParams = {}) => {
  try {
    console.log('Fetching profiles with params:', searchParams);
    const response = await api.get('/profiles', { params: searchParams });
    console.log('Profiles response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export const getProfileById = async (id) => {
  const response = await api.get(`/profiles/${id}`);
  return response.data;
};

export const createProfile = async (profileData) => {
  const response = await api.post('/profiles', profileData);
  return response.data;
};

export const updateProfile = async (id, profileData) => {
  const response = await api.put(`/profiles/${id}`, profileData);
  return response.data;
};

export const deleteProfile = async (id) => {
  const response = await api.delete(`/profiles/${id}`);
  return response.data;
};

export default api;