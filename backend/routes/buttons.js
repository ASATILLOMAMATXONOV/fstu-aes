const express = require("express");
const router = express.Router();
const pool = require("../db");

// [GET] Barcha tugmalar
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM buttons ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Tugmalarni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [GET] URL bo‘yicha tugmalar va til bo‘yicha filtr
router.get("/by-url/:url", async (req, res) => {
  const { url } = req.params;
  const lang = req.query.lang || "uz"; // ?lang=uz/ru/en

  try {
    const result = await pool.query(
      `SELECT id, label_uz, label_ru, label_en, display_url, link_url FROM buttons WHERE LOWER(display_url) = LOWER($1)`,
      [url.toLowerCase()]
    );

    if (result.rows.length === 0) {
      const fallback = await pool.query(
        `SELECT id, label_uz, label_ru, label_en, display_url, link_url FROM buttons WHERE LOWER(display_url) LIKE LOWER($1)`,
        [`%${url.toLowerCase()}%`]
      );
      return res.json(fallback.rows);
    }

    res.json(result.rows);
  } catch (err) {
    console.error("❌ URL bo‘yicha olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [POST] Yangi tugma qo‘shish
router.post("/", async (req, res) => {
  const { label_uz, label_ru, label_en, display_url, link_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO buttons (label_uz, label_ru, label_en, display_url, link_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [label_uz, label_ru, label_en, display_url, link_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Tugma qo‘shishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [PUT] Tugmani yangilash
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { label_uz, label_ru, label_en, display_url, link_url } = req.body;
  try {
    const result = await pool.query(
      "UPDATE buttons SET label_uz = $1, label_ru = $2, label_en = $3, display_url = $4, link_url = $5 WHERE id = $6 RETURNING *",
      [label_uz, label_ru, label_en, display_url, link_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Yangilashda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// [DELETE] Tugmani o‘chirish
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM buttons WHERE id = $1", [id]);
    res.json({ message: "Tugma o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
