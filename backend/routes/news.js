const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage });

// [POST] Qo‘shish
router.post("/:table", upload.single("image"), async (req, res) => {
  const { table } = req.params;
  const { content_uz, content_ru, content_en } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  const allowed = ["focus_news", "aes_news", "fstu_news"];
  if (!allowed.includes(table)) return res.status(400).json({ error: "Noto‘g‘ri jadval!" });

  try {
    await pool.query(
      `INSERT INTO ${table} (content_uz, content_ru, content_en, image_url) VALUES ($1, $2, $3, $4)`,
      [content_uz, content_ru, content_en, image_url]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Saqlashda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [GET] Barcha ma’lumotlarni ko‘rish
router.get("/:table", async (req, res) => {
  const { table } = req.params;
  const allowed = ["focus_news", "aes_news", "fstu_news"];
  if (!allowed.includes(table)) return res.status(400).json({ error: "Noto‘g‘ri jadval!" });

  try {
    const result = await pool.query(`SELECT * FROM ${table} ORDER BY id DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ O‘qishda xatolik:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [DELETE] O‘chirish
router.delete("/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  const allowed = ["focus_news", "aes_news", "fstu_news"];
  if (!allowed.includes(table)) return res.status(400).json({ error: "Noto‘g‘ri jadval!" });

  try {
    await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ O‘chirishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// Yangilash (edit)
router.put("/:table/:id", async (req, res) => {
    const { table, id } = req.params;
    const { content_uz, content_ru, content_en } = req.body;
    const allowed = ["focus_news", "aes_news", "fstu_news"];
    if (!allowed.includes(table)) return res.status(400).json({ error: "Noto‘g‘ri jadval!" });
  
    try {
      await pool.query(
        `UPDATE ${table} SET content_uz = $1, content_ru = $2, content_en = $3 WHERE id = $4`,
        [content_uz, content_ru, content_en, id]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("❌ Tahrirlashda xato:", err);
      res.status(500).json({ error: "Server xatosi" });
    }
  });
  

module.exports = router;
