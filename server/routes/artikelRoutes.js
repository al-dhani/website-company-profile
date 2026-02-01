import express from "express";
import {
  getAllArtikel,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from "../controllers/artikelController.js";

const router = express.Router();

// READ
router.get("/", getAllArtikel);

// CREATE
router.post("/", createArtikel);

// UPDATE
router.put("/:id", updateArtikel);

// DELETE
router.delete("/:id", deleteArtikel);

export default router;
