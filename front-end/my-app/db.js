// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "192.168.10.118",
  database: "fstu_maktab",
  password: "123456",
  port: 5432,
});

module.exports = pool;