const express = require('express');
const router = express.Router();
const pool = require('../db');

const tables = ['menus_academic', 'menus_department', 'menus_research', 'menus_teaching'];

tables.forEach((table) => {
  router.get(`/${table}`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table}`);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

module.exports = router;
