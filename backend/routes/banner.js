const express = require("express");
const multer = require("multer");
const path = require("path");
const { Pool } = require("pg");
const fs = require("fs");

const router = express.Router();

<<<<<<< HEAD
// 📂 Upload papka

const uploadDir = path.join(__dirname, "../uploads");


=======
// 🔧 Fayl saqlanadigan papka
const uploadDir = path.join(__dirname, "../uploads");
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

<<<<<<< HEAD
// Multer sozlamasi
=======
// 📦 Multer sozlamalari
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
<<<<<<< HEAD
  },
});
const upload = multer({ storage });

// Postgres ulanish
=======
  }
});

const upload = multer({ storage });

// 🟢 PostgreSQL ulanish
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
const pool = new Pool({
  user: "postgres",
  host: "192.168.10.118",
  database: "fstu_maktab",
<<<<<<< HEAD
  password: "19731973",
  port: 5432,
});

// ✅ Rasm yuklash
=======
  password: "123456",
  port: 5432,
});

// ✅ POST: Rasm yuklash
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.post("/", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Rasm tanlanmadi" });
  }

<<<<<<< HEAD
  const imageName = req.file.filename;
=======
  const imagePath = "/uploads/" + req.file.filename;
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b

  try {
    const result = await pool.query(
      "INSERT INTO banner (image_url) VALUES ($1) RETURNING *",
<<<<<<< HEAD
      [imageName]
=======
      [imagePath]
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Saqlash xatosi:", err);
    res.status(500).json({ error: "Saqlab bo‘lmadi" });
  }
});

<<<<<<< HEAD
// ✅ Barcha bannerlarni olish
=======
// ✅ GET: Barcha bannerlarni olish
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.get("/banners", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM banner ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Olishda xato:", err);
    res.status(500).json({ error: "Olishda xato" });
  }
});

<<<<<<< HEAD
// ✅ Banner o‘chirish
=======
// ✅ DELETE: Banner o‘chirish
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
router.delete("/banners/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const bannerRes = await pool.query("SELECT image_url FROM banner WHERE id = $1", [id]);
    if (bannerRes.rows.length === 0) return res.status(404).json({ error: "Topilmadi" });

<<<<<<< HEAD
    const fileName = bannerRes.rows[0].image_url;
    const imagePath = path.join(uploadDir, fileName);

=======
    const imagePath = path.join(__dirname, "..", bannerRes.rows[0].image_url);
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await pool.query("DELETE FROM banner WHERE id = $1", [id]);
    res.json({ message: "🗑 Banner o‘chirildi" });
  } catch (err) {
    console.error("❌ O‘chirishda xato:", err);
    res.status(500).json({ error: "O‘chirishda server xatosi" });
  }
});

module.exports = router;
