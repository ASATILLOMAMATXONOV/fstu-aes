const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET: Har bir tur bo‘yicha ma’lumot olish
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM staff WHERE category = $1 ORDER BY id DESC`,
      [category]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET xatosi:", err.message);
    res.status(500).json({ error: "Ma’lumot olishda xatolik" });
  }
});


// POST: Har bir tur bo‘yicha ma’lumot joylash
router.post("/", async (req, res) => {
  const { category, name_uz, title_uz, name_ru, title_ru, name_en, title_en, link } = req.body;

  // Kategoriya tekshiruvini staff jadvalidagi qiymatlar bo‘yicha qilamiz
  const allowedCategories = ["professors", "technical", "research", "visiting", "head"];
  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: "Noto‘g‘ri kategoriya" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO staff (name_uz, title_uz, name_ru, title_ru, name_en, title_en, link, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name_uz, title_uz, name_ru, title_ru, name_en, title_en, link, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST xatosi:", err.message);
    res.status(500).json({ error: "Ma’lumot saqlashda xatolik" });
  }
});


// DELETE

router.delete("/:category/:id", async (req, res) => {
  const { category, id } = req.params;

  const allowedCategories = ["professors", "technical", "research", "visiting", "head"];
  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ error: "Noto‘g‘ri kategoriya" });
  }

  try {
    await pool.query("DELETE FROM staff WHERE id = $1 AND category = $2", [id, category]);
    res.status(200).json({ message: "🗑️ Muvaffaqiyatli o‘chirildi" });
  } catch (err) {
    console.error("❌ DELETE xatosi:", err.message);
    res.status(500).json({ error: "O‘chirishda xatolik" });
  }
});






module.exports = router;
