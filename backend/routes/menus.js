const express = require("express");
const router = express.Router();
const pool = require("../db");

// Jadval mapping (faqat shu to‘rtta jadval)
const tableMap = {
  "ACADEMIC INFRASTRUCTURE": "menus_academic",
  "THE DEPARTMENT": "menus_department",
  "RESEARCH": "menus_research",
  "TEACHING": "menus_teaching",
};


// [GET] — bitta menyuni olish (EDIT uchun)
router.get("/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;

    const tableName = tableMap[category?.toUpperCase()?.trim()];
    if (!tableName) {
      return res.status(400).json({ error: "❌ Noto‘g‘ri kategoriya" });
    }

    const result = await pool.query(
      `SELECT id, title_uz, title_ru, title_en FROM ${tableName} WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "❌ Ma'lumot topilmadi" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Menyuni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [PUT] — menyuni yangilash
router.put("/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const { uz, ru, en } = req.body;

    const tableName = tableMap[category?.toUpperCase()?.trim()];
    if (!tableName) {
      return res.status(400).json({ error: "❌ Noto‘g‘ri kategoriya" });
    }

    await pool.query(
      `UPDATE ${tableName}
       SET title_uz=$1, title_ru=$2, title_en=$3
       WHERE id=$4`,
      [uz || null, ru || null, en || null, id]
    );

    res.json({ message: "✅ Ma'lumot yangilandi" });
  } catch (err) {
    console.error("❌ Yangilashda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});


// [GET] — jadvalni olish + qidiruv ishlaydi
router.get("/", async (req, res) => {
  try {
    const categoryRaw = req.query.category;
    const search = req.query.q?.toLowerCase() || "";

    if (!categoryRaw) return res.json([]);

    const category = categoryRaw.toUpperCase().trim();
    const tableName = tableMap[category];
    if (!tableName) {
      return res.status(400).json({ error: "❌ Noto‘g‘ri kategoriya" });
    }

    let query = `SELECT id, title_uz, title_ru, title_en FROM ${tableName}`;
    let params = [];

    if (search) {
      query += ` WHERE LOWER(title_uz) LIKE $1 OR LOWER(title_ru) LIKE $1 OR LOWER(title_en) LIKE $1`;
      params.push(`%${search}%`);
    }

    query += " ORDER BY id DESC";
    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Menyularni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi", details: err.message });
  }
});

// [POST] — yangi menyu
router.post("/", async (req, res) => {
  try {
    const { uz, ru, en, category } = req.body;

    const tableName = tableMap[category?.toUpperCase()?.trim()];
    if (!tableName) {
      return res.status(400).json({ error: "❌ Noto‘g‘ri bo‘lim tanlandi." });
    }

    const result = await pool.query(
      `INSERT INTO ${tableName} (title_uz, title_ru, title_en)
       VALUES ($1, $2, $3) RETURNING id`,
      [uz || null, ru || null, en || null]
    );

    res.status(201).json({
      message: `✅ Yangi menyu '${category}' bo‘limiga qo‘shildi`,
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("❌ Menyu qo‘shishda xato:", err);
    res.status(500).json({ error: "Server xatosi", details: err.message });
  }
});

// [DELETE] — menyuni o‘chirish
router.delete("/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;

    const tableName = tableMap[category?.toUpperCase()?.trim()];
    if (!tableName) {
      return res.status(400).json({ error: "❌ Noto‘g‘ri kategoriya" });
    }

    await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);

    res.json({ message: "🗑️ Menyu muvaffaqiyatli o‘chirildi" });
  } catch (err) {
    console.error("❌ O‘chirishda xato:", err);
    res.status(500).json({ error: "Server xatosi", details: err.message });
  }
});

module.exports = router;
