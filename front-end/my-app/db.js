// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "192.168.10.118",
  database: "fstu_maktab",
<<<<<<< HEAD
  password: 19731973,
=======
  password: "123456",
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
  port: 5432,
});

module.exports = pool;