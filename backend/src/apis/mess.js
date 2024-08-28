const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.get("/timing", (req, res) => {
    const query = "SELECT * FROM mess_timing";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching mess timings:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      // console.table(results);
      res.json(results);
    });
  });
  
  //messmenu
  router.get("/menu", (req, res) => {
    const query = `SELECT * FROM mess_menu`;
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching mess menu:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    });
  });

  module.exports = router;