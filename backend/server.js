const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const authRoutes = require("./routes/auth");
const pagesRoutes = require("./routes/pages");
const submenuRoutes = require("./routes/Submenu");
const staffRoutes = require("./routes/staff");
const bannerRoutes = require("./routes/banner"); // banner admin  marshrutlar
const menuRoutes = require('./routes/menus'); // Menyu front-end marshrutlari
const buttonsRoutes = require("./routes/buttons");
const sidePanelRoutes = require("./routes/sidepanels");
const fanlarRoute = require("./routes/fanlar");
const departmentRoutes = require("./routes/department");
const newsRouter = require("./routes/news"); // ✅ to‘g‘ri import// ✅ News route fayli
// const bannerRoutes = require("./routes/banner");
// front end 
const frntBannerRoutes = require("./front-routes/frnt-banner");

const frontStaffRoutes = require("./front-routes/staff"); // Foydalanuvchi uchun
const newpagesRouter = require("./routes/newpages"); // yoki newpages.js
const keyinfoRoutes = require("./routes/keyinfo");
const topMenuRoutes = require("./routes/topmenu");



const app = express();
const PORT = 3001;

// ❗ JSON va URL-encoded hajm limitini oshiramiz (masalan, 50mb)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // static image path

// ✅ PostgreSQL ulanish
const pool = new Pool({
  user: 'postgres',
  host: '192.168.10.118',
  database: 'fstu_maktab',
  password: '123456',
  port: 5432,
});
app.set("db", pool); // Global ulanish (agar kerak bo‘lsa)

// ✅ API marshrutlar
// app.use("/api/banner", bannerRoutes); // ✅ MUHIM!
app.use("/api/auth", authRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/submenu", submenuRoutes); // GET /api/submenu, POST /api/submenu
app.use("/api/upload", bannerRoutes); // POST /api/upload
app.use("/api/banner", bannerRoutes); // GET /api/banner/banners, DELETE
app.use('/api/menus', menuRoutes); // Menyu front-end marshrutlari
app.use("/api/buttons", buttonsRoutes);
app.use("/api/sidepanels", sidePanelRoutes);
app.use("/api/fanlar", fanlarRoute); // GET /api/fanlar/:id
app.use("/api/department", departmentRoutes);
app.use("/api/news", newsRouter);
// front end 
app.use("/api/banner", frntBannerRoutes);  // GET /api/banner/front-banners, DELETE
app.use("/api/front/staff", frontStaffRoutes); // frontend uchun
app.use("/api/newpages", newpagesRouter); // ✔️ to‘g‘ri
app.use("/api", keyinfoRoutes);
app.use("/api/topmenu", topMenuRoutes);


// ----------------------------------------------
// 📌 MENU ROUTES (menus_*)
const allowedTables = {
  "THE DEPARTMENT": "menus_department",
  "RESEARCH": "menus_research",
  "TEACHING": "menus_teaching",
  "ACADEMIC INFOSTRUCTURE": "menus_academic"
};

// 🔵 POST — menyu qo‘shish
app.post("/api/menus", async (req, res) => {
  const { uz, ru, en, category } = req.body;
  const tableName = allowedTables[category];
  if (!tableName) return res.status(400).json({ error: "Noto‘g‘ri kategoriya tanlandi" });

  try {
    const result = await pool.query(
      `INSERT INTO ${tableName} (title_uz, title_ru, title_en) VALUES ($1, $2, $3) RETURNING *`,
      [uz, ru, en]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ INSERT xatosi:", err);
    res.status(500).json({ error: "Ma’lumotni saqlab bo‘lmadi" });
  }
});

// 🔵 GET — barcha menyularni olish
app.get("/api/menus", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title_uz, title_ru, title_en, created_at, 'THE DEPARTMENT' AS category FROM menus_department
      UNION ALL
      SELECT id, title_uz, title_ru, title_en, created_at, 'RESEARCH' AS category FROM menus_research
      UNION ALL
      SELECT id, title_uz, title_ru, title_en, created_at, 'TEACHING' AS category FROM menus_teaching
      UNION ALL
      SELECT id, title_uz, title_ru, title_en, created_at, 'ACADEMIC INFOSTRUCTURE' AS category FROM menus_academic
      ORDER BY category, id;
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Ma'lumotni olishda xato:", err);
    res.status(500).json({ error: "Ma'lumotni olishda xato" });
  }
});

// 🔵 PUT — menyu yangilash
app.put("/api/menus/:category/:id", async (req, res) => {
  const { category, id } = req.params;
  const { uz, ru, en } = req.body;
  const tableName = allowedTables[category];
  if (!tableName) return res.status(400).json({ error: "Noto‘g‘ri kategoriya tanlandi" });

  try {
    const result = await pool.query(
      `UPDATE ${tableName} SET title_uz = $1, title_ru = $2, title_en = $3 WHERE id = $4 RETURNING *`,
      [uz, ru, en, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ma'lumot topilmadi" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Yangilashda xato:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// 🔵 GET — bitta menyuni olish
app.get("/api/menus/:category/:id", async (req, res) => {
  const { category, id } = req.params;
  const decodedCategory = decodeURIComponent(category);
  const tableName = allowedTables[decodedCategory];
  if (!tableName) return res.status(400).json({ error: "Noto‘g‘ri kategoriya" });

  try {
    const result = await pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Ma'lumot topilmadi" });
    }
  } catch (err) {
    console.error("❌ SQL xatosi:", err);
    res.status(500).json({ error: "Server xatosi" });
  }
});

// 🔵 DELETE — menyuni o‘chirish
app.delete("/api/menus/:category/:id", async (req, res) => {
  const { category, id } = req.params;
  const tableName = allowedTables[category];
  if (!tableName) return res.status(400).json({ error: "Noto‘g‘ri kategoriya" });

  try {
    const result = await pool.query(
      `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Ma'lumot topilmadi" });
    }
    res.json({ message: "🗑️ Ma'lumot o‘chirildi", deleted: result.rows[0] });
  } catch (err) {
    console.error("❌ O‘chirishda xato:", err);
    res.status(500).json({ error: "O‘chirishda server xatosi" });
  }
});


app.use(cors({
  origin: "https://aes.fstu.uz", // 🔒 Faqat shu domen ruxsat etiladi
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// 🟢 SERVER START
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
  pool.connect()
    .then(() => console.log("✅ PostgreSQL bilan bog‘lanish muvaffaqiyatli"))
    .catch(err => console.error("❌ PostgreSQL ulanishda xato:", err));
});
