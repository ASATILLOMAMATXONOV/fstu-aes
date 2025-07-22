const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ CATEGORY bo‘yicha sahifalarni olish — ENG MUHIM ROUTE!
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM pages WHERE category = $1",
      [category]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Sahifalarni olishda xatolik:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// ✅ Kategoriya asosida menyular olish
const tableMap = {
  "THE DEPARTMENT": "menus_department",
  "RESEARCH": "menus_research",
  "TEACHING": "menus_teaching",
  "ACADEMIC INFOSTRUCTURE": "menus_academic"
};

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

// ✅ Sahifa qo‘shish
router.post("/", async (req, res) => {
  const {
    category,
    menu,
    title_uz,
    title_ru,
    title_en,
    content_uz,
    content_ru,
    content_en,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pages (
        category, menu, 
        title_uz, title_ru, title_en, 
        content_uz, content_ru, content_en
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [category, menu, title_uz, title_ru, title_en, content_uz, content_ru, content_en]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ INSERT xatolik (pages):", err);
    res.status(500).json({ error: "Ma'lumotni saqlab bo‘lmadi" });
  }
});




// =========button ========

// Sahifani URL bo‘yicha olish
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

// Sahifalarni menu nomi bo‘yicha olish
router.get("/menu/:menu", async (req, res) => {
  const { menu } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM pages WHERE LOWER(menu) = LOWER($1)",
      [menu]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Sahifalarni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});
// ---------   front    ----------------


// ✅ Sahifalarni menu qiymatiga qarab olish (masalan: about-us)
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
    console.error("❌ Sahifa olishda xatolik:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});


// ID bo‘yicha olish (doim oxirida bo‘lsin)
// [GET] Barcha sahifalarni olish (id orqali)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM pages WHERE id = $1`, [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Sahifa topilmadi" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server xatosi" });
  }
});


module.exports = router;
