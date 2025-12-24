const express = require("express");
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");
const fs = require("fs");

const router = express.Router();

// 📂 Upload papka

const uploadDir = path.join(__dirname, "../uploads");


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer sozlamasi
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Postgres ulanish
const pool = new Pool({
  user: "postgres",
  host: "192.168.10.118",
  database: "fstu_maktab",
  password: "19731973",
  port: 5432,
});

// ✅ Rasm yuklash
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Rasm tanlanmadi" });
  }

  const imageName = req.file.filename;

  try {
    const result = await pool.query(
      "INSERT INTO banner (image_url) VALUES ($1) RETURNING *",
      [imageName]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Saqlash xatosi:", err);
    res.status(500).json({ error: "Saqlab bo‘lmadi" });
  }
});

// ✅ Barcha bannerlarni olish
router.get("/banners", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banner ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Olishda xato:", err);
    res.status(500).json({ error: "Olishda xato" });
  }
});

// ✅ Banner o‘chirish
router.delete("/banners/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const bannerRes = await pool.query("SELECT image_url FROM banner WHERE id = $1", [id]);
    if (bannerRes.rows.length === 0) return res.status(404).json({ error: "Topilmadi" });

    const fileName = bannerRes.rows[0].image_url;
    const imagePath = path.join(uploadDir, fileName);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await pool.query("DELETE FROM banner WHERE id = $1", [id]);
    res.json({ message: "🗑 Banner o‘chirildi" });
  } catch (err) {
    console.error("❌ O‘chirishda xato:", err);
    res.status(500).json({ error: "O‘chirishda server xatosi" });
  }
});

module.exports = router;
