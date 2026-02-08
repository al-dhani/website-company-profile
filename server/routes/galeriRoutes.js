import express from "express";
import {
  getAllGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri,
} from "../controllers/galeriController.js";
import upload from "../middlewares/upload.js"; // sama kayak partners

const router = express.Router();

// READ
router.get("/", getAllGaleri);

// CREATE
router.post("/", upload.single("file_gambar"), createGaleri); // 🔥 upload file

// UPDATE
router.put("/:id", upload.single("file_gambar"), updateGaleri); // 🔥 upload file

// DELETE
router.delete("/:id", deleteGaleri);

export default router;