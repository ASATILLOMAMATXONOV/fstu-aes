<<<<<<< HEAD
=======
// ✅ Backend kodini yangilaymiz: yangi maydonlar qo‘shamiz

>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
const express = require("express");
const router = express.Router();
const pool = require("../db");

<<<<<<< HEAD
// ===============================
// [GET] Barcha fanlar + kategoriyalar + mavzular
// ===============================
=======
// [GET] Barcha fanlar, kategoriyalar, mavzular bilan
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.get("/", async (req, res) => {
  try {
    const fansRes = await pool.query("SELECT * FROM fanlar ORDER BY id");
    const fans = fansRes.rows;

    for (const fan of fans) {
      const catRes = await pool.query("SELECT * FROM kategoriyalar WHERE fan_id = $1", [fan.id]);
      fan.categories = catRes.rows;

      for (const cat of fan.categories) {
        const topicRes = await pool.query("SELECT * FROM mavzular WHERE kategoriya_id = $1", [cat.id]);
        cat.mavzular = topicRes.rows;
        cat.name = cat.nom_uz;
      }
    }

    res.json(fans);
  } catch (err) {
<<<<<<< HEAD
    console.error("❌ Xato:", err);
=======
    console.error("\u274C Xato:", err);
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    res.status(500).json({ error: "Server xatosi" });
  }
});

<<<<<<< HEAD
// ===============================
// [GET] Bitta fan + sahifa + kategoriyalar + mavzular + newpage
// ===============================
=======
// [POST] Fan qo‘shish (yangi maydonlar bilan)
router.post("/", async (req, res) => {
  const { nom_uz, nom_ru, nom_en, code, language, semester, credits, teachers } = req.body;
  const result = await pool.query(
    `INSERT INTO fanlar (nom_uz, nom_ru, nom_en, code, language, semester, credits, teachers)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [nom_uz, nom_ru, nom_en, code, language, semester, credits, teachers]
  );
  res.json({ ...result.rows[0], categories: [] });
});

// [PUT] Fan tahrirlash (faqat nomlar o‘zgaradi hozircha)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nom_uz, nom_ru, nom_en } = req.body;
  const result = await pool.query(
    "UPDATE fanlar SET nom_uz=$1, nom_ru=$2, nom_en=$3 WHERE id=$4 RETURNING *",
    [nom_uz, nom_ru, nom_en, id]
  );
  res.json(result.rows[0]);
});

// [DELETE] Fan o‘chirish
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM fanlar WHERE id=$1", [id]);
  res.json({ message: "Fan o‘chirildi" });
});

// [POST] Kategoriya qo‘shish
router.post("/:fanId/kategoriyalar", async (req, res) => {
  const { fanId } = req.params;
  const { nom_uz, nom_ru, nom_en } = req.body;
  const result = await pool.query(
    "INSERT INTO kategoriyalar (fan_id, nom_uz, nom_ru, nom_en) VALUES ($1, $2, $3, $4) RETURNING *",
    [fanId, nom_uz, nom_ru, nom_en]
  );
  res.json({ ...result.rows[0], name: result.rows[0].nom_uz, mavzular: [] });
});

// [DELETE] Kategoriya o‘chirish
router.delete("/kategoriyalar/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM kategoriyalar WHERE id=$1", [id]);
  res.json({ message: "Kategoriya o‘chirildi" });
});

// [POST] Mavzu qo‘shish
router.post("/kategoriyalar/:kategoriyaId/mavzular", async (req, res) => {
  const { kategoriyaId } = req.params;
  const { nom_uz, nom_ru, nom_en, link } = req.body;
  const result = await pool.query(
    "INSERT INTO mavzular (kategoriya_id, nom_uz, nom_ru, nom_en, link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [kategoriyaId, nom_uz, nom_ru, nom_en, link]
  );
  res.json(result.rows[0]);
});


// [GET] Bitta fan + sahifa + kategoriyalar + mavzular + newpage
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. FAN asosiy ma'lumot
    const fanResult = await pool.query("SELECT * FROM fanlar WHERE id = $1", [id]);
    if (fanResult.rows.length === 0) {
      return res.status(404).json({ message: "Fan topilmadi" });
    }
    const fan = fanResult.rows[0];

<<<<<<< HEAD
    // 🔑 Bog‘lash uchun fan nomini olamiz
    const fanName = fan.nom_uz?.trim();

    // 2. PAGES
    const pageResult = await pool.query(
      "SELECT * FROM pages WHERE menu = $1 OR category = $1 LIMIT 1",
      [fanName]
    );
    const page = pageResult.rows[0] || null;

    // 3. NEWPAGES
    const newPageResult = await pool.query(
      "SELECT * FROM new_pages WHERE menu = $1 OR category = $1 LIMIT 1",
      [fanName]
    );
=======
    // 2. PAGES (eski sahifa)
    const pageResult = await pool.query("SELECT * FROM pages WHERE menu = $1 LIMIT 1", [fan.nom_uz]);
    const page = pageResult.rows[0] || null;

    // 3. NEWPAGES (yangi sahifa)
    const newPageResult = await pool.query("SELECT * FROM newpages WHERE menu = $1 LIMIT 1", [fan.nom_uz]);
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    const newpage = newPageResult.rows[0] || null;

    // 4. KATEGORIYALAR + MAVZULAR
    const kategoriyaResult = await pool.query(
<<<<<<< HEAD
      "SELECT * FROM kategoriyalar WHERE fan_id = $1 ORDER BY id",
      [id]
=======
      "SELECT * FROM kategoriyalar WHERE fan_id = $1 ORDER BY id", [id]
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    );
    const kategoriyalar = kategoriyaResult.rows;

    for (let kategoriya of kategoriyalar) {
      const mavzularResult = await pool.query(
        "SELECT * FROM mavzular WHERE kategoriya_id = $1 ORDER BY id",
        [kategoriya.id]
      );
      kategoriya.mavzular = mavzularResult.rows;
<<<<<<< HEAD
    }

    // 5. To‘liq natija
=======
      kategoriya.name = kategoriya.nom_uz; // ✅ Qo‘shilishi kerak!
    }
    

    // 5. To‘liq javob
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    res.json({
      ...fan,
      page,
      newpage,
      kategoriyalar,
    });

  } catch (err) {
<<<<<<< HEAD
    console.error("❌ Fan haqida ma'lumot olishda xato:", err.message);
    res.status(500).json({ error: "Server xatosi", details: err.message });
=======
    console.error("❌ Fan haqida ma'lumot olishda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
  }
});


<<<<<<< HEAD
// ===============================
// [POST] Fan qo‘shish
// ===============================
router.post("/", async (req, res) => {
  const { nom_uz, nom_ru, nom_en, code, language, semester, credits, teachers } = req.body;
  const result = await pool.query(
    `INSERT INTO fanlar (nom_uz, nom_ru, nom_en, code, language, semester, credits, teachers)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [nom_uz, nom_ru, nom_en, code, language, semester, credits, teachers]
  );
  res.json({ ...result.rows[0], categories: [] });
});

// ===============================
// [PUT] Fan tahrirlash
// ===============================
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nom_uz, nom_ru, nom_en } = req.body;
  const result = await pool.query(
    "UPDATE fanlar SET nom_uz=$1, nom_ru=$2, nom_en=$3 WHERE id=$4 RETURNING *",
    [nom_uz, nom_ru, nom_en, id]
  );
  res.json(result.rows[0]);
});

// ===============================
// [DELETE] Fan o‘chirish
// ===============================
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM fanlar WHERE id=$1", [id]);
  res.json({ message: "Fan o‘chirildi" });
});

// ===============================
// [POST] Kategoriya qo‘shish
// ===============================
router.post("/:fanId/kategoriyalar", async (req, res) => {
  const { fanId } = req.params;
  const { nom_uz, nom_ru, nom_en } = req.body;
  const result = await pool.query(
    "INSERT INTO kategoriyalar (fan_id, nom_uz, nom_ru, nom_en) VALUES ($1, $2, $3, $4) RETURNING *",
    [fanId, nom_uz, nom_ru, nom_en]
  );
  res.json({ ...result.rows[0], name: result.rows[0].nom_uz, mavzular: [] });
});

// ===============================
// [DELETE] Kategoriya o‘chirish
// ===============================
router.delete("/kategoriyalar/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM kategoriyalar WHERE id=$1", [id]);
  res.json({ message: "Kategoriya o‘chirildi" });
});

// ===============================
// [POST] Mavzu qo‘shish
// ===============================
router.post("/kategoriyalar/:kategoriyaId/mavzular", async (req, res) => {
  const { kategoriyaId } = req.params;
  const { nom_uz, nom_ru, nom_en, link } = req.body;
  const result = await pool.query(
    "INSERT INTO mavzular (kategoriya_id, nom_uz, nom_ru, nom_en, link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [kategoriyaId, nom_uz, nom_ru, nom_en, link]
  );
  res.json(result.rows[0]);
});

module.exports = router;
=======



module.exports = router;
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
