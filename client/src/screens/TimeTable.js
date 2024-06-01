import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppState } from "../AppStateContext";
import "./Timetable.css"

const TimeTable = () => {
  const { user, isAdmin } = useAppState();
  const uid = user.uid;
  const [timetable, setTimetable] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDept, setSelectedDept] = useState("CSE");
  const [selectedYear, setSelectedYear] = useState("2");

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = isAdmin
          ? await axios.get('/admin/timetables')
          : await axios.get(`/timetable/${uid}`);
        const data = response.data;
        const groupedData = data.reduce((acc, curr) => {
          const timeSlot = `${curr.StartTime.slice(0, 5)} - ${curr.EndTime.slice(0, 5)}`;
          if (!acc[timeSlot]) {
            acc[timeSlot] = {
              time: timeSlot,
              days: {
                Monday: "-",
                Tuesday: "-",
                Wednesday: "-",
                Thursday: "-",
                Friday: "-",
                Saturday: "-",
              },
              tableName: curr.tableName
            };
          }
          acc[timeSlot].days[curr.DayOfWeek] = curr.SubjectName;
          return acc;
        }, {});
        setTimetable(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimetable();
  }, [uid, isAdmin, selectedDept, selectedYear]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const updates = timetable.flatMap(item => {
        return Object.entries(item.days).map(([day, subjectName]) => ({
          tableName: item.tableName,
          dayOfWeek: day,
          startTime: item.time.split(' - ')[0],
          endTime: item.time.split(' - ')[1],
          subjectName
        }));
      });
      console.log('Payload being sent to backend:', updates);
      await axios.post('/admin/update_timetables', updates);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating timetable:", error);
    }
  };
  const handleChange = (timeSlot, day, value) => {
    setTimetable(prevTimetable => {
      const newTimetable = [...prevTimetable];
      const index = newTimetable.findIndex(item => item.time === timeSlot);
      if (index !== -1) {
        newTimetable[index].days[day] = value;
      }
      return newTimetable;
    });
  };
  

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div>
      <div className="page-header">
        <h2>Time Table</h2>
        {isAdmin && (
          <>
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              {/* Add other departments as needed */}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              {/* Add other Years as needed */}
            </select>
            <button onClick={handleEdit}>{isEditing ? "Cancel" : "Edit"}</button>
            {isEditing && <button onClick={handleSave}>Save</button>}
          </>
        )}
      </div>
      <div className="page-layout">
        <table className="table">
          <thead>
            <tr>
              <th colSpan="8">Timetable</th>
            </tr>
            <tr>
              <th rowSpan="8">Hours</th>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                {days.map(day => (
                  <td
  key={`${day}-${index}`}
  contentEditable={isEditing}
  suppressContentEditableWarning={true}
  onBlur={(e) => handleChange(item.time, day, e.target.innerText)}
>
  {item.days[day]}
</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
