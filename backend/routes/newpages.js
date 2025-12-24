const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");

// 📂 Multer sozlamalari
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// [POST] Rasm yuklash
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ image_path: `uploads/${req.file.filename}` });
});

// [POST] Sahifa qo‘shish
router.post("/", async (req, res) => {
  try {
    const {
      title_uz,
      title_ru,
      title_en,
      content_uz,
      content_ru,
      content_en,
      image_url,
      phone,
      email,
      scholar_link,
      position,
      category,
      menu,
      url,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO new_pages (
        title_uz, title_ru, title_en,
        content_uz, content_ru, content_en,
        image_url, phone, email, scholar_link, position,
        category, menu, url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING id`,
      [
        title_uz || null,
        title_ru || null,
        title_en || null,
        content_uz || null,
        content_ru || null,
        content_en || null,
        image_url || null,
        phone || null,
        email || null,
        scholar_link || null,
        position || null,
        category || "YANGI SAHIFA",
        menu || null,
        url || `/newpages/${Date.now()}`
      ]
    );

    res.json({ message: "✅ Ma'lumot saqlandi", id: result.rows[0].id });
  } catch (err) {
    console.error("❌ INSERT xatosi:", err.message);
    res.status(500).json({ error: "Ma'lumotni saqlab bo‘lmadi", details: err.message });
  }
});


// [GET] ID bo‘yicha olish
router.get("/id/:id", async (req, res) => {
  try {
    console.log("🔍 ID keldi:", req.params.id);

    const result = await pool.query("SELECT * FROM new_pages WHERE id = $1", [
      req.params.id,
    ]);

    console.log("✅ Query natija:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "❌ Sahifa topilmadi" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Sahifa olishda xato:", err.stack);
    res.status(500).json({
      error: "Server xatosi",
      details: err.message,
    });
  }
});



module.exports = router;
