const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fstu_maktab",
  password: "123456", // <-- bu yerga real postgres parolingizni yozing
  port: 5432,
});

async function updatePassword() {
  const username = "admin_aes";
  const plainPassword = "aes2025";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    await pool.query(
      `UPDATE admin_users SET password = $1 WHERE username = $2`,
      [hashedPassword, username]
    );
    console.log("✅ Parol hashlandi va yangilandi!");
  } catch (err) {
    console.error("❌ Xatolik:", err);
  } finally {
    await pool.end();
  }
}

updatePassword();
