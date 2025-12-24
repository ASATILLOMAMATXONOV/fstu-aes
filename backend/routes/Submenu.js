const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ================= LIST ================= */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        category,
        menu,
        title_uz,
        title_ru,
        title_en,
        'pages' AS source
      FROM pages
      UNION ALL
      SELECT
        id,
        category,
        menu,
        title_uz,
        title_ru,
        title_en,
        'new_pages' AS source
      FROM new_pages
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("LIST xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

/* ================= DETAIL ================= */
router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  const { source } = req.query;

  // 🔒 XAVFSIZ TABLE MAP
  const tableMap = {
    pages: "pages",
    new_pages: "new_pages",
  };

  const tableName = tableMap[source];
  if (!tableName) {
    return res.status(400).json({ error: "Noto‘g‘ri source" });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        id,
        category,
        menu,
        COALESCE(title_uz, '') AS title_uz,
        COALESCE(title_ru, '') AS title_ru,
        COALESCE(title_en, '') AS title_en,
        COALESCE(content_uz, '') AS content_uz,
        COALESCE(content_ru, '') AS content_ru,
        COALESCE(content_en, '') AS content_en
      FROM ${tableName}
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Topilmadi" });
    }

    const row = result.rows[0];

    // 🔥 HTML NORMALIZE (mustahkam)
    const normalizeHtml = (val) => {
      if (!val) return "";

      const v = val.trim();

      // agar HTML bo‘lsa — o‘zgartirmaymiz
      if (v.startsWith("<")) return v;

      // oddiy TEXT bo‘lsa — <p> ga o‘raymiz
      return `<p>${v}</p>`;
    };

    res.json({
      ...row,
      content_uz: normalizeHtml(row.content_uz),
      content_ru: normalizeHtml(row.content_ru),
      content_en: normalizeHtml(row.content_en),
    });
  } catch (err) {
    console.error("DETAIL xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});





/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { source } = req.query;

  if (!["pages", "new_pages"].includes(source)) {
    return res.status(400).json({ error: "Noto‘g‘ri source" });
  }

  const allowedFields = [
    "category",
    "menu",
    "title_uz",
    "title_ru",
    "title_en",
    "content_uz",
    "content_ru",
    "content_en",
  ];

  const fields = [];
  const values = [];

  allowedFields.forEach((key) => {
    if (req.body[key] !== undefined) {
      values.push(req.body[key]);
      fields.push(`${key} = $${values.length}`);
    }
  });

  if (!fields.length) {
    return res.status(400).json({ error: "Yangilash uchun ma’lumot yo‘q" });
  }

  try {
    const result = await pool.query(
      `
      UPDATE ${source}
      SET ${fields.join(", ")}
      WHERE id = $${values.length + 1}
      RETURNING *
      `,
      [...values, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { source } = req.query;

  if (!["pages", "new_pages"].includes(source)) {
    return res.status(400).json({ error: "Noto‘g‘ri source" });
  }

  try {
    await pool.query(`DELETE FROM ${source} WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

module.exports = router;
