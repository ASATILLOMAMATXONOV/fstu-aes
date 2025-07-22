// ================= BACKEND (Express Router) =================
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all entries
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM department_info ORDER BY language");
    res.json(result.rows);
  } catch (err) {
    console.error("\u274C Error fetching all department info:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET by language
router.get("/:lang", async (req, res) => {
  const { lang } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM department_info WHERE language = $1 LIMIT 1",
      [lang]
    );
    res.json(result.rows[0] || null);
  } catch (err) {
    console.error("\u274C Error fetching department info:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST create or update
router.post("/", async (req, res) => {
  const { language, title, body, link } = req.body;
  try {
    const existing = await pool.query("SELECT * FROM department_info WHERE language = $1", [language]);
    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE department_info SET title = $1, body = $2, link = $3 WHERE language = $4",
        [title, body, link, language]
      );
    } else {
      await pool.query(
        "INSERT INTO department_info (language, title, body, link) VALUES ($1, $2, $3, $4)",
        [language, title, body, link]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error("\u274C Error saving department info:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE by language
router.delete("/:lang", async (req, res) => {
  const { lang } = req.params;
  try {
    await pool.query("DELETE FROM department_info WHERE language = $1", [lang]);
    res.json({ success: true });
  } catch (err) {
    console.error("\u274C Error deleting department info:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;