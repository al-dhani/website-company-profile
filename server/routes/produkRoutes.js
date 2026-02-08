import express from "express";
import {
  getAllProduk,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/produkController.js";
import upload from "../middlewares/upload.js"; // 🔥 multer

const router = express.Router();

// READ
router.get("/", getAllProduk);

// CREATE (pakai upload.single)
router.post("/", upload.single("image"), createProduk);

// UPDATE (pakai upload.single)
router.put("/:id", upload.single("image"), updateProduk);

// DELETE
router.delete("/:id", deleteProduk);

export default router;