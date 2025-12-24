const express = require("express");
const router = express.Router();
const pool = require("../db");
<<<<<<< HEAD
const multer = require("multer");

// 📂 Multer sozlamasi (rasm yuklash)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Fayl yuklash
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "❌ Fayl yuklanmadi" });
  }
  res.json({ image_path: `uploads/${req.file.filename}` });
});

// ✅ CATEGORY bo‘yicha sahifalarni olish
=======

// ✅ CATEGORY bo‘yicha sahifalarni olish — ENG MUHIM ROUTE!
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM pages WHERE category = $1",
      [category]
    );
    res.json(result.rows);
  } catch (err) {
<<<<<<< HEAD
    console.error("❌ Sahifalarni olishda xato:", err);
=======
    console.error("❌ Sahifalarni olishda xatolik:", err);
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    res.status(500).json({ error: "Server xatosi" });
  }
});

<<<<<<< HEAD
// ✅ Menyularni jadvalga qarab olish
=======
// ✅ Kategoriya asosida menyular olish
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
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
<<<<<<< HEAD
  try {
    const {
      title_uz, title_ru, title_en,
      content_uz, content_ru, content_en,
      image_url, phone, email, scholar_link, position,
      category, menu
    } = req.body;

    // Agar "YANGI SAHIFA" yoki "FANLAR" bo‘lsa -> new_pages jadvaliga yozamiz
    const table = (
      category === "➕ YANGI SAHIFA" || category === "➕ FANLARGA MA'LUMOT QO‘SHISH"
    ) ? "new_pages" : "pages";

    const result = await pool.query(
      `INSERT INTO ${table} (
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
    console.error("❌ INSERT xatosi:", err.message);
=======
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
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    res.status(500).json({ error: "Ma'lumotni saqlab bo‘lmadi" });
  }
});

<<<<<<< HEAD
// ✅ Sahifani URL bo‘yicha olish (pages + new_pages)
router.get("/url/:url", async (req, res) => {
  const { url } = req.params;
  try {
    let result = await pool.query(
=======



// =========button ========

// Sahifani URL bo‘yicha olish
router.get("/url/:url", async (req, res) => {
  const { url } = req.params;
  try {
    const result = await pool.query(
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
      "SELECT * FROM pages WHERE LOWER(url) = LOWER($1)",
      [url]
    );
    if (result.rows.length === 0) {
<<<<<<< HEAD
      result = await pool.query(
        "SELECT * FROM new_pages WHERE LOWER(url) = LOWER($1)",
        [url]
      );
    }

    if (result.rows.length === 0) {
=======
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
      return res.status(404).json({ error: "Sahifa topilmadi" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Sahifa olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

<<<<<<< HEAD
// ✅ Sahifalarni menu bo‘yicha olish (tilni ham inobatga olamiz)
router.get("/menu/:menu", async (req, res) => {
  const { menu } = req.params;
  try {
    const decodedMenu = decodeURIComponent(menu).toLowerCase();

    // Har uch til + menu ustunini qidiramiz
    let result = await pool.query(
      `SELECT * FROM pages 
       WHERE LOWER(menu) = $1
          OR LOWER(title_uz) = $1
          OR LOWER(title_ru) = $1
          OR LOWER(title_en) = $1`,
      [decodedMenu]
    );

    if (result.rows.length === 0) {
      // Agar topilmasa new_pages dan ham qidiramiz
      result = await pool.query(
        `SELECT * FROM new_pages 
         WHERE LOWER(menu) = $1
            OR LOWER(title_uz) = $1
            OR LOWER(title_ru) = $1
            OR LOWER(title_en) = $1`,
        [decodedMenu]
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sahifa topilmadi" });
    }

=======
// Sahifalarni menu nomi bo‘yicha olish
router.get("/menu/:menu", async (req, res) => {
  const { menu } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM pages WHERE LOWER(menu) = LOWER($1)",
      [menu]
    );
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Sahifalarni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});
<<<<<<< HEAD



// ✅ ID bo‘yicha olish
router.get("/id/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let result = await pool.query("SELECT * FROM pages WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      result = await pool.query("SELECT * FROM new_pages WHERE id = $1", [id]);
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Sahifa topilmadi" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Sahifa olishda xato:", err);
=======
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
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    res.status(500).json({ error: "Server xatosi" });
  }
});

<<<<<<< HEAD
=======

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


>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
module.exports = router;
