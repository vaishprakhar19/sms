// server.js
const express = require('express');
const db = require("../core/db");
const { getTotalMarks, format, calculateSemester } = require("../utils")
const router = express.Router();
const { result_whatsapp } = require("../constants")
const twilio = require("../core/twilio");

// API endpoint to retrieve marks

router.get('/getResult/:resultId', (req, res) => {
  const resultId = req.params.resultId
  let student = []
  let semester = 1

  let sql = `select * from result_mapping rm WHERE id = '${resultId}';`
  db.query(sql, (err, results) => {
      if(err){
        console.error("Error fetching user data:", err);
        res.status(500).json({ error: "An error occurred while fetching user data" });
      } else{
        const { id, roll_no , internal } = results[0]
        sql = `select * from students where roll_no = '${roll_no}'`
        db.query(sql, (err, results) => {
          if (err) {
            console.error("Error fetching user data:", err);
            res.status(500).json({ error: "An error occurred while fetching user data" });
          } else {
            student = results[0]
            semester = calculateSemester(student.batch);
            sql = `select distinct s.name,s.code,im.marks from students s2,subjects s left join internal_marks_${internal} im on s.code = im.subject_code and im.roll_no = ${roll_no} where s.department=s2.department and s.semester = ${semester};`
            db.query(sql, (err, results) => {
              if (err) {
                console.error("Error fetching user data:", err);
                res.status(500).json({ error: "An error occurred while fetching user data" });
              } else {
                res.status(200).json({ "id" : id, "student" : student, "internal_exam" : internal, "marks" : results, "total_marks" : getTotalMarks(results) });
              }
            });
          }
        });
      }
  })
});

router.post('/send_whatsapp', async (req, res) => {
  const { internal } = req.body;
  let sql = `select s.roll_no,s.father_mobile,rm.id from students s ,result_mapping rm where s.roll_no = rm.roll_no and rm.internal = ${internal ?? 1};`
  db.query(sql, async (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).json({ error: "An error occurred while fetching user data" });
    } else {
      for(var i=0;i<results.length;i++){
        var body = format(result_whatsapp,1,`https://biasportal.vercel.app/result/${results[i].id}`)
        await twilio.sendWhatsApp(`+91${results[i].father_mobile}`, body).then(()=>{}).catch((error) => {
          console.error(error);
        });
      }
      res.status(200).json({"message":"Messages sent successfully."})

    }
  });
    
});
module.exports = router;