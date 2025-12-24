// front-routes/frnt-banner.js
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "192.168.10.118",
<<<<<<< HEAD
  database: "fstu_maktab", // ✅ bazangiz nomi
  password: "19731973",
  port: 5432,
});

// ✅ GET /banner/banners
=======
  database: "fstu_maktab", // ✅ to‘g‘ri bazani kiriting
  password: "123456",
  port: 5432,
});

// ✅ GET /api/banners
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.get("/banners", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banner ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Banner route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
