








//bagian middleware/upload.js
import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/gambarproduk'); // Folder tempat menyimpan
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // contoh: gambar-123123123.jpg
  },
});

// Filter hanya gambar jpg, jpeg, png
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar dengan format JPG, JPEG, atau PNG yang diperbolehkan'));
  }
};

// Konfigurasi multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimal 5MB per gambar
  }
});

export default upload;



