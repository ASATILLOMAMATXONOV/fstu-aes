const express = require("express");
const router = express.Router();
const pool = require("../db");

const categoryTables = {
  "THE DEPARTMENT": "menus_department",
  "RESEARCH": "menus_research",
  "TEACHING": "menus_teaching",
  "ACADEMIC INFOSTRUCTURE": "menus_academic"
};

// GET: menyularni olish
router.get("/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const isValid = Object.values(categoryTables).includes(tableName);
  if (!isValid) return res.status(400).json({ error: "❌ Noto‘g‘ri jadval nomi" });

  try {
    const result = await pool.query(`
      SELECT m.id, m.title_uz, t.link
      FROM ${tableName} m
      LEFT JOIN topmenu t ON t.menu_id = m.id AND t.table_name = $1
      ORDER BY m.id
    `, [tableName]);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Ma’lumot olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// PATCH: link qo‘shish yoki yangilash
router.patch("/:tableName/:id/link", async (req, res) => {
  const { tableName, id } = req.params;
  const { link } = req.body;
  const isValid = Object.values(categoryTables).includes(tableName);
  if (!isValid) return res.status(400).json({ error: "❌ Noto‘g‘ri jadval nomi" });

  try {
    await pool.query(`
      INSERT INTO topmenu (table_name, menu_id, link)
      VALUES ($1, $2, $3)
      ON CONFLICT (table_name, menu_id)
      DO UPDATE SET link = EXCLUDED.link
    `, [tableName, id, link]);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Linkni saqlashda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// PATCH: linkni o‘chirish (NULL qilish)
router.patch("/:tableName/:id/unlink", async (req, res) => {
  const { tableName, id } = req.params;
  const isValid = Object.values(categoryTables).includes(tableName);
  if (!isValid) return res.status(400).json({ error: "❌ Noto‘g‘ri jadval nomi" });

  try {
    await pool.query(`
      UPDATE topmenu SET link = NULL
      WHERE table_name = $1 AND menu_id = $2
    `, [tableName, id]);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Linkni o‘chirishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
