const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const authRoutes = require("./routes/auth");
const pagesRoutes = require("./routes/pages");
const submenuRoutes = require("./routes/Submenu");
const staffRoutes = require("./routes/staff");
const bannerRoutes = require("./routes/banner");
const menuRoutes = require("./routes/menus");
const buttonsRoutes = require("./routes/buttons");
const sidePanelRoutes = require("./routes/sidepanels");
const fanlarRoute = require("./routes/fanlar");
const departmentRoutes = require("./routes/department");
const newsRouter = require("./routes/news");
const frntBannerRoutes = require("./front-routes/frnt-banner");
const frontStaffRoutes = require("./front-routes/staff");
const newpagesRouter = require("./routes/newpages");
const keyinfoRoutes = require("./routes/keyinfo");
const topMenuRoutes = require("./routes/topmenu");

const app = express();
const PORT = 3001;

app.use(express.json({ limit: "5000mb" }));
app.use(express.urlencoded({ limit: "5000mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




// PostgreSQL ulanish
const pool = new Pool({
  user: "postgres",
  host: "192.168.10.118",   // yoki 192.168.10.118
  database: "fstu_maktab",
  password: "19731973",
  port: 5432,
});
app.set("db", pool);

// API marshrutlar
app.use("/api/auth", authRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/submenu", submenuRoutes);
app.use("/api/banner", bannerRoutes); // ✅ faqat shu kerak!
app.use("/api/menus", menuRoutes);
app.use("/api/buttons", buttonsRoutes);
app.use("/api/sidepanels", sidePanelRoutes);
app.use("/api/fanlar", fanlarRoute);
app.use("/api/department", departmentRoutes);
app.use("/api/news", newsRouter);
app.use("/api/front/banner", frntBannerRoutes);
app.use("/api/front/staff", frontStaffRoutes);

app.use("/api/newpages", newpagesRouter);

app.use("/api", keyinfoRoutes);
app.use("/api/topmenu", topMenuRoutes);

// 🟢 SERVER START
app.listen(PORT, () => {
  console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
  pool
    .connect()
    .then(() =>
      console.log(
        `✅ PostgreSQL ulanish: host=${pool.options.host}, port=${pool.options.port}, db=${pool.options.database}`
      )
    )
    .catch((err) => console.error("❌ PostgreSQL ulanishda xato:", err));
});
