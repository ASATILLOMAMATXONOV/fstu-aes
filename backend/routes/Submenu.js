// ✅ Submenu.js (BACKEND) - yangilangan va tahrirlangan
const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ GET: Ham `pages`, ham `newPages` jadvalidan ma'lumot olish
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, category, title_uz, 'pages' AS source FROM pages
      UNION ALL
      SELECT id, category, title_uz, 'newPages' AS source FROM newPages
      ORDER BY id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Submenu sahifalarni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// ✅ GET: id va source bo‘yicha sahifani olish
router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  const { source } = req.query;
  try {
    const result = await pool.query(`SELECT * FROM ${source === 'pages' ? 'pages' : 'newPages'} WHERE id = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Topilmadi" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Tafsilotlarni olishda xatolik:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// ✅ PUT: Tahrirlangan ma'lumotni faqat newPages ga saqlash
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { source } = req.query;
  const updateData = req.body;

  if (!source || !["pages", "newPages"].includes(source)) {
    return res.status(400).json({ error: "❌ Noto‘g‘ri yoki yo‘q source qiymati" });
  }

  try {
    const fields = Object.keys(updateData)
      .map((key, i) => `${key} = $${i + 1}`)
      .join(', ');
    const values = Object.values(updateData);

    const result = await pool.query(
      `UPDATE ${source} SET ${fields} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "❌ Sahifa topilmadi" });
    }

    res.json({ message: "✅ Muvaffaqiyatli tahrirlandi", updated: result.rows[0] });
  } catch (err) {
    console.error("❌ PUT xatosi:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});


// ✅ DELETE: source = pages | newPages bo‘yicha o‘chirish
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { source } = req.query;

  if (!source || !["pages", "newPages"].includes(source)) {
    return res.status(400).json({ error: "❌ Noto‘g‘ri manba (source) ko‘rsatilgan" });
  }

  try {
    const result = await pool.query(`DELETE FROM ${source} WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "❌ O‘chirish uchun sahifa topilmadi" });
    }

    res.json({ message: "✅ Muvaffaqiyatli o‘chirildi", deleted: result.rows[0] });
  } catch (err) {
    console.error("❌ DELETE xatolik:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});



module.exports = router;