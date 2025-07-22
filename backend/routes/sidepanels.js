// routes/sidepanels.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET barcha ma’lumotlar
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sidepanels ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Ma'lumotlarni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// POST yangi ma’lumot qo‘shish
router.post("/", async (req, res) => {
  const { content_uz, content_ru, content_en } = req.body;
  try {
    await pool.query(
      "INSERT INTO sidepanels (content_uz, content_ru, content_en) VALUES ($1, $2, $3)",
      [content_uz, content_ru, content_en]
    );
    res.status(201).json({ message: "✅ Ma'lumot saqlandi" });
  } catch (err) {
    console.error("❌ Saqlashda xato:", err);
    res.status(500).json({ error: "Saqlab bo‘lmadi" });
  }
});

// PUT yangilash
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content_uz, content_ru, content_en } = req.body;
  try {
    await pool.query(
      "UPDATE sidepanels SET content_uz = $1, content_ru = $2, content_en = $3 WHERE id = $4",
      [content_uz, content_ru, content_en, id]
    );
    res.json({ message: "♻️ Yangilandi" });
  } catch (err) {
    console.error("❌ Yangilashda xato:", err);
    res.status(500).json({ error: "Yangilab bo‘lmadi" });
  }
});

// DELETE o‘chirish
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM sidepanels WHERE id = $1", [id]);
    res.json({ message: "🗑️ O‘chirildi" });
  } catch (err) {
    console.error("❌ O‘chirishda xato:", err);
    res.status(500).json({ error: "O‘chirib bo‘lmadi" });
  }
});

module.exports = router;
