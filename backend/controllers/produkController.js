
import fs from "fs";
import path from "path";

import User from "../models/userModel.js"
import Produk from "../models/produkModel.js"
import { Op } from "sequelize";

//tampil semua produk
export const getAllProduk= async(req, res)=>{
 try{
let response;
if(req.user.role === "admin"){
response =await Produk.findAll({attributes:['uuid', 'name', 'price', 'harga', 'description', 'gambar'], include:[{model:User, attributes:['name', 'email', 'role']}]
    });
}else{
  response =await Produk.findAll({attributes:['uuid', 'name', 'price', 'harga', 'description', 'gambar'], where:{userId:req.user.userId}, include:[{model:User, attributes:['name', 'email', 'role']}]
  })
}  

res.status(200).json(response);

 }catch(error){
 console.error('gagal ambil data');
 res.status(500).json({msg: error.message})
 }
};



//buat produk atu create produk 
export const createProduk= async(req, res)=>{
console.log("full req.body: ", req.body)


 const{name, price, harga, description}= req.body;
 
//untuk upload gambar 
const gambar =req.file ? req.file.filename : null;
 
 try{
await Produk.create({name:name, price:price, userId:req.user.userId, harga:harga, description:description, gambar:gambar});

res.status(200).json({msg:"Produk Berhasil Dibuat"});     
 }catch(error){
  console.error('gagal membuat produk baru');  res.status(500).json({msg:error.message});
 }
}

//getProdukById 
export const getProdukById = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: { uuid: req.params.id }
    });
    if (!produk) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    let response;
    if (req.user.role === "admin") {
      response = await Produk.findOne({
        attributes: ['uuid', 'name', 'price', 'harga', 'description'],
        where: { id: produk.id },
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      });
    } else {
      response = await Produk.findOne({
        attributes: ['uuid', 'name', 'price', 'harga', 'description', 'gambar'],
        where: {
          [Op.and]: [
            { id: produk.id },
            { userId: req.user.userId }
          ]
        },
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      });
    }

   
    if (!response) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
    

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};


//update Produk 
export const updateProduk = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: { uuid: req.params.id }
    });
    if (!produk) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const user = await User.findOne({
      where: { id: produk.userId }
    });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Cek apakah yang mau update punya izin
    if (req.user.role === "user" && (produk.userId !== req.user.userId || user.role === "admin")) {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    const { name, price, harga, description } = req.body;
    
//tambahkan untuk update gambar
    let gambar = produk.gambar;

    // Jika ada gambar baru di-upload
    if (req.file) {
      // Hapus gambar lama dari folder
      const oldPath = path.join("public", "gambarproduk", produk.gambar);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      // Set gambar baru
      gambar = req.file.filename;
    }
//akhir tambahkan update gamabar

    await Produk.update(
      { name, price, harga, description, gambar},
      { where: { id: produk.id } }
    );

    res.status(200).json({ msg: "Produk berhasil diupdate" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};


// delete Produk
export const deleteProduk = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: { uuid: req.params.id }
    });
    if (!produk) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const user = await User.findOne({
      where: { id: produk.userId }
    });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Cek izin akses
    if (req.user.role === "user") {
      // User biasa tidak boleh hapus produk milik admin, atau produk yang bukan miliknya
      if (produk.userId !== req.user.userId || user.role === "admin") {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
    }
    
    //tambahan dari upload gamabar 
// Hapus gambar dari folder jika ada
    if (produk.gambar) {
      const filePath = path.join("public", "gambarproduk", produk.gambar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }    
    
//akhir tambahan dari upload gamabar

    await Produk.destroy({
      where: { id: produk.id }
    });

    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};
