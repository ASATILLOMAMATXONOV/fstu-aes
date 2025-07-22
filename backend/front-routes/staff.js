const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const categories = ["professors", "research", "technical", "visiting", "head"];
    const categorized = {};

    for (const category of categories) {
      const result = await pool.query(
        "SELECT * FROM staff WHERE category = $1 ORDER BY id DESC",
        [category]
      );
      categorized[category] = result.rows;
    }

    res.json(categorized);
  } catch (err) {
    console.error("❌ Staffni olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
