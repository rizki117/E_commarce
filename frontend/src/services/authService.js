
//authService.js

import api from "./api";
// === Fungsi Auth ===
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data.msg || error.message;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    throw error.response?.data.msg || error.message;
  }
};


export const logout = async () => {
  try {
    const response = await api.delete("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data.msg || error.message;
  }
};






