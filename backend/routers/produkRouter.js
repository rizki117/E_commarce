








import express from "express"

import upload from "../middleware/upload.js";
import {getAllProduk, createProduk, getProdukById, updateProduk, deleteProduk} from "../controllers/produkController.js"

import {verifyToken} from "../middleware/AuthMiddleware.js"

const router= express.Router();

router.get('/produk', verifyToken ,getAllProduk);

router.post('/produk', verifyToken, upload.single('gambar'), createProduk);

router.patch('/produk/:id', verifyToken, upload.single('gambar'), updateProduk);


router.get('/produk/:id', verifyToken, getProdukById);
router.delete('/produk/:id', verifyToken, deleteProduk);

export default router;
