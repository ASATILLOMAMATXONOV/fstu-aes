const bcrypt = require("bcryptjs");
const pool = require("../db"); 

async function addAdmin() {
  const username = "admin_aes";
  const plainPassword = "aes2025";
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // HASH

  try {
    await pool.query(
      `INSERT INTO admin_users (username, password)
       VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password`,
      [username, hashedPassword]
    );
    console.log("✅ Admin paroli hashlanib qo‘shildi");
  } catch (err) {
    console.error("❌ Xatolik:", err);
  } finally {
    await pool.end();
  }
}

addAdmin();
