const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");

<<<<<<< HEAD
// 📂 Multer sozlamalari
=======
// Jadval nomlari xaritasi
const tableMap = {
  "THE DEPARTMENT": "menus_department",
  "RESEARCH": "menus_research",
  "TEACHING": "menus_teaching",
  "ACADEMIC INFOSTRUCTURE": "menus_academic"
};

// 📂 Multer bilan faylni yuklash sozlamalari
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

<<<<<<< HEAD
// [POST] Rasm yuklash
=======
// [POST] Rasm yuklash va yo‘lini qaytarish
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ image_path: `uploads/${req.file.filename}` });
});

<<<<<<< HEAD
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
=======
// [GET] Menyu nomlarini jadvalga qarab olish
router.get("/menus/:category", async (req, res) => {
  const { category } = req.params;
  const tableName = tableMap[category];

  if (!tableName) {
    return res.status(400).json({ error: "❌ Noto‘g‘ri kategoriya" });
  }

  try {
    const result = await pool.query(
      `SELECT id, title_uz, title_ru, title_en FROM ${tableName} ORDER BY id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Menyularni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [POST] Sahifani saqlash
router.post("/", async (req, res) => {
  try {
    const {
      title_uz, title_ru, title_en,
      content_uz, content_ru, content_en,
      image_url, phone, email, scholar_link, position,
      category, menu
    } = req.body;

    const result = await pool.query(
      `INSERT INTO newpages (
        title_uz, title_ru, title_en,
        content_uz, content_ru, content_en,
        image_url, phone, email, scholar_link, position,
        category, menu
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING id`,
      [
        title_uz || "",
        title_ru || "",
        title_en || "",
        content_uz || "",
        content_ru || "",
        content_en || "",
        image_url || "",
        phone || "",
        email || "",
        scholar_link || "",
        position || "",
        category || "",
        menu || ""
      ]
    );

    res.status(200).json({ message: "✅ Ma'lumot saqlandi", id: result.rows[0].id });
  } catch (err) {
    console.error("❌ INSERT xatosi:", err.message); // konsolda aniq xatoni ko‘rsatish
    res.status(500).json({ error: "Ma'lumotni saqlab bo‘lmadi" });
  }
});

// [GET] Sahifa URL bo‘yicha olish (pages dan)
router.get("/url/:url", async (req, res) => {
  const { url } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM pages WHERE LOWER(url) = LOWER($1)",
      [url]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sahifa topilmadi" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Sahifa olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [GET] Sahifalarni menu bo‘yicha olish (pages dan)
router.get("/menu/:menu", async (req, res) => {
  const { menu } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM pages WHERE LOWER(menu) = LOWER($1)",
      [menu.toLowerCase()]
    );
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "Sahifa topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [GET] ID bo‘yicha sahifa olish (pages va newPages bo‘yicha)
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Avval pages dan qidiramiz
    let result = await pool.query("SELECT * FROM pages WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      // Agar topilmasa, newPages dan qidiramiz
      result = await pool.query("SELECT * FROM newPages WHERE id = $1", [id]);
    }

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Sahifa topilmadi" });
    }
  } catch (err) {
    console.error("❌ Sahifa olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
