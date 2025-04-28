const express = require("express");
const db = require("../core/db");

const router = express.Router();

router.post("/register", (req, res) => {
    const { uid, name, mobile, rollNo, batch, gender, department } = req.body;
    const sql =
      "INSERT INTO users (uid, name, mobile, roll_no, batch, gender, department) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [uid, name, mobile, rollNo, batch, gender, department];
  
    // Execute the SQL query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error saving user data:", err);
        res
          .status(500)
          .json({ error: "An error occurred while saving user data" });
      } else {
        console.log("User data saved successfully");
        res.status(200).json({ message: "User registered successfully" });
      }
    });
  });

  module.exports = router;