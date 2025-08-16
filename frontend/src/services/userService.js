// services/userService.js
import api from "./api";

// =====================
// FUNGSI CRUD USER
// =====================

// Update user by ID
export const updateUser = async (id, userData) => {
  try {
    const response = await api.patch(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
   throw error; 
  }
};




// Create new user
export const createUser = async (userData) => {
  try {
    const response = await api.post("/user", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};




// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user by ID (uuid)
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Delete user by ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
