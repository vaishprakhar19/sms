const db = require("./core/db");

function updateMenuDataInDatabase(updatedMenuData) {
    return new Promise((resolve, reject) => {
      const updateQueries = updatedMenuData.map(item => {
        return new Promise((resolve, reject) => {
          const query = `UPDATE mess_menu SET 
                         breakfast = ?,
                         lunch = ?,
                         evening_snacks = ?,
                         dinner = ?
                         WHERE menu_id = ?`;
          const values = [item.breakfast, item.lunch, item.evening_snacks, item.dinner, item.menu_id];
          db.query(query, values, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      });
  
      Promise.all(updateQueries)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function calculateSemester(batchYear) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
  
    // Calculate the years difference
    const yearsDifference = currentYear - batchYear;
  
    // Calculate the base semester assuming July as the start for odd semesters
    let semester = yearsDifference * 2 + 1;
  
    // Adjust semester based on current month
    if (currentMonth < 7) {
      // Before July, it's the first semester of the current academic year
      semester--;
    }
    return semester;
  }

  function getCurrentAcademicYear(batchYear) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month index from 0-11
  
    let academicYear;
  
    // Calculate the academic year
    if (currentMonth >= 1 && currentMonth < 7) { // January to June
      academicYear = currentYear - batchYear;
    } else { // July to December
      academicYear = currentYear - batchYear + 1;
    }
  
    // Ensure academic year is between 1 and 4
    if (academicYear < 1) {
      academicYear = 1;
    } else if (academicYear > 4) {
      academicYear = 4;
    }
  
    return academicYear;
  }

  //THIS IS A GENERIC FUNCTION TO GET SEMESTER AND STREAM FROM THE DATABASE
function getUserDetails(uid, callback) {
    const userQuery = "SELECT batch, department FROM users WHERE uid = ?";
    db.query(userQuery, [uid], (error, userResults) => {
      if (error) {
        console.error("Error retrieving user batch:", error);
        callback({ status: 500, error: "Internal server error" });
      } else if (userResults.length === 0) {
        callback({ status: 404, error: "User not found" });
      } else {
        const batchYear = userResults[0].batch;
        const stream = userResults[0].department;
        const currentYear = getCurrentAcademicYear(batchYear);
        const currentSemester = calculateSemester(batchYear);
        // console.log(`Calculated semester: ${currentSemester} for batch year: ${batchYear}`);
        callback(null, { batchYear, stream, currentSemester, currentYear });
      }
    });
  }

  function getTotalMarks(marks){
    total = 0
    for(i = 0;i<marks.length;i++){
      total+=marks[i].marks
    }
    return total
  }

  function format(str,...arr){

      str = str.split("{}")
      arr = [...arr,""]
      var newStr = ""
      for(i = 0; i<str.length; i++){
          newStr += str[i]+arr[i]
      }
      return newStr
  }

  module.exports = { updateMenuDataInDatabase, getUserDetails, getTotalMarks, format, calculateSemester };