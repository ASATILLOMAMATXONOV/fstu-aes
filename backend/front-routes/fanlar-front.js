const express = require("express");
const router = express.Router();
const pool = require("../db");

// [GET] Bitta fan: sahifa, kategoriyalar, mavzular, newpage bilan
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. FAN asosiy ma'lumot
    const fanResult = await pool.query("SELECT * FROM fanlar WHERE id = $1", [id]);
    if (fanResult.rows.length === 0) {
      return res.status(404).json({ message: "Fan topilmadi" });
    }
    const fan = fanResult.rows[0];

    // 2. PAGES - eski sahifa ma’lumoti
    const pageResult = await pool.query("SELECT * FROM pages WHERE menu = $1 LIMIT 1", [fan.nom_uz]);
    const page = pageResult.rows[0] || null;

    // 3. NEWPAGES - yangi sahifa ma’lumoti
    const newPageResult = await pool.query("SELECT * FROM newpages WHERE menu = $1 LIMIT 1", [fan.nom_uz]);
    const newpage = newPageResult.rows[0] || null;

    // 4. KATEGORIYALAR + MAVZULAR
    const kategoriyaResult = await pool.query("SELECT * FROM kategoriyalar WHERE fan_id = $1 ORDER BY id", [id]);
    const kategoriyalar = kategoriyaResult.rows;

    for (let kategoriya of kategoriyalar) {
      const mavzularResult = await pool.query(
        "SELECT * FROM mavzular WHERE kategoriya_id = $1 ORDER BY id",
        [kategoriya.id]
      );
      kategoriya.mavzular = mavzularResult.rows;
    }

    // 5. To‘liq javob
    res.json({
      ...fan,
      page,
      newpage,
      kategoriyalar,
    });

  } catch (err) {
    console.error("❌ Fan haqida ma'lumot olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
