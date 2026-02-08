import db from "../db/connection.js";

/* =====================
   GET ALL ARTIKEL
===================== */
export const getAllArtikel = (req, res) => {
  const sql = "SELECT * FROM articles ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal mengambil data artikel",
      });
    }
    res.json(results);
  });
};

/* =====================
   CREATE ARTIKEL
===================== */
export const createArtikel = (req, res) => {
  const { judul, slug, isi, penulis } = req.body;

  const thumbnail = req.file ? req.file.filename : null;

  // lalu simpen ke DB
  thumbnail: thumbnail

  if (!judul || !isi) {
    return res.status(400).json({
      message: "Judul dan isi wajib diisi",
    });
  }

  const sql = `
    INSERT INTO articles (judul, slug, isi, thumbnail, penulis)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [judul, slug, isi, thumbnail, penulis],
    (err, result) => {
      if (err) {
        console.error("ERROR DB:", err);
        return res.status(500).json({
          message: "Gagal menambah artikel",
        });
      }

      res.json({
        message: "Artikel berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

/* =====================
   UPDATE ARTIKEL
===================== */
export const updateArtikel = (req, res) => {
  const { id } = req.params;
  const { judul, penulis, isi } = req.body;

  // kalau upload gambar baru → pakai yang baru
  // kalau enggak → jangan sentuh thumbnail
  let thumbnailQuery = "";
  let params = [judul, penulis, isi];

  if (req.file) {
    thumbnailQuery = ", thumbnail = ?";
    params.push(req.file.filename);
  }

  params.push(id);

  const sql = `
    UPDATE artikel
    SET judul = ?, penulis = ?, isi = ?
    ${thumbnailQuery}
    WHERE id = ?
  `;

  db.query(sql, params, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update artikel" });
    }

    res.json({ message: "Artikel berhasil diupdate" });
  });
};

/* =====================
   DELETE ARTIKEL
===================== */
export const deleteArtikel = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM articles WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("ERROR DB:", err);
      return res.status(500).json({
        message: "Gagal menghapus artikel",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Artikel tidak ditemukan",
      });
    }

    res.json({ message: "Artikel berhasil dihapus" });
  });
};
