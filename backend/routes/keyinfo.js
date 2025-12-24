
// yon panellar qo'shish

// routes/keyinfo.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET barcha sidepanels ma’lumotlar
router.get("/keyinfo", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM sidepanels ORDER BY id");
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "❌ Ma'lumotlarni olishda xatolik" });
    }
});

module.exports = router;
