// services/produkService.js
import api from "./api";

// ==========================
// FUNGSI CRUD PRODUK
// ==========================

// Ambil semua produk
export const getAllProduk = async () => {
  try {
    const response = await api.get("/produk");
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Buat produk baru
export const createProduk = async (data) => {
  try {
    const response = await api.post("/produk", data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Ambil produk berdasarkan ID
export const getProdukById = async (id) => {
  try {
    const response = await api.get(`/produk/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Update produk
export const updateProduk = async (id, data) => {
  const isFormData = data instanceof FormData;

  try {
    const response = await api.patch(`/produk/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Hapus produk
export const deleteProduk = async (id) => {
  try {
    const response = await api.delete(`/produk/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
