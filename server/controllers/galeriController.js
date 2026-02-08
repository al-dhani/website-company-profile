import db from "../db/connection.js";

/* =====================
   GET ALL GALERI
===================== */
export const getAllGaleri = (req, res) => {
  const sql = "SELECT * FROM gallery ORDER BY id DESC"; // mirip partners

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data galeri",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE GALERI
===================== */
export const createGaleri = (req, res) => {
  const { judul, deskripsi } = req.body;
  const file_gambar = req.file ? req.file.filename : null; // ambil file upload

  if (!judul || !file_gambar) {
    return res.status(400).json({
      message: "Judul dan gambar wajib diisi",
    });
  }

  const sql = "INSERT INTO gallery (judul, deskripsi, file_gambar) VALUES (?, ?, ?)";

  db.query(sql, [judul, deskripsi, file_gambar], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menambah galeri",
      });
    }

    res.json({
      message: "Galeri berhasil ditambahkan",
      id: result.insertId,
    });
  });
};

/* =====================
   UPDATE GALERI
===================== */
export const updateGaleri = (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi } = req.body;
  const file_gambar = req.file ? req.file.filename : req.body.file_gambar; // pakai file baru jika ada, kalau tidak pakai yang lama

  const sql = "UPDATE gallery SET judul=?, deskripsi=?, file_gambar=? WHERE id=?";

  db.query(sql, [judul, deskripsi, file_gambar, id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal update galeri",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Galeri tidak ditemukan",
      });
    }

    res.json({ message: "Galeri berhasil diupdate" });
  });
};

/* =====================
   DELETE GALERI
===================== */
export const deleteGaleri = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM gallery WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus galeri",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Galeri tidak ditemukan",
      });
    }

    res.json({ message: "Galeri berhasil dihapus" });
  });
};