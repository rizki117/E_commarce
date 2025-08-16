// === tokenService.js ===

import axios from "axios";

// Buat instance axios khusus, tanpa interceptor
const plainAxios = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// Refresh token pakai plainAxios, bukan api!
export const refreshToken = async () => {
  try {
    const response = await plainAxios.get("/token");
    return response.data;
  } catch (error) {
    throw error.response?.data?.msg || error.message;
  }
};