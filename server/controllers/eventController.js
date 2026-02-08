import db from "../db/connection.js";

/* =====================
   GET ALL EVENT
===================== */
export const getAllEvent = (req, res) => {
  const sql = "SELECT * FROM events ORDER BY tanggal DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data event",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE EVENT
===================== */
export const createEvent = (req, res) => {
  const { judul, tanggal, lokasi, deskripsi, link } = req.body;
  const gambar = req.file ? req.file.filename : null;

  if (!judul || !tanggal || !lokasi) {
    return res.status(400).json({
      message: "Data event tidak lengkap",
    });
  }

  const sql = `
    INSERT INTO events (judul, tanggal, lokasi, gambar, deskripsi, link)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [judul, tanggal, lokasi, gambar, deskripsi, link],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal menambah event",
        });
      }

      res.json({
        message: "Event berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

/* =====================
   UPDATE EVENT
===================== */
export const updateEvent = (req, res) => {
  const { id } = req.params;
  const { judul, tanggal, lokasi, deskripsi, link } = req.body;

  const gambarBaru = req.file ? req.file.filename : null;

  const sql = gambarBaru
    ? `
      UPDATE events
      SET judul=?, tanggal=?, lokasi=?, gambar=?, deskripsi=?, link=?
      WHERE id=?
    `
    : `
      UPDATE events
      SET judul=?, tanggal=?, lokasi=?, deskripsi=?, link=?
      WHERE id=?
    `;

  const values = gambarBaru
    ? [judul, tanggal, lokasi, gambarBaru, deskripsi, link, id]
    : [judul, tanggal, lokasi, deskripsi, link, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal update event",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json({ message: "Event berhasil diupdate" });
  });
};

/* =====================
   DELETE EVENT
===================== */
export const deleteEvent = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM events WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus event",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json({ message: "Event berhasil dihapus" });
  });
};