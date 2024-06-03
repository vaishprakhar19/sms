import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppState } from "../AppStateContext";
import "./Timetable.css"
import { stream } from "xlsx";


const TimeTable = () => {
  const { user, isAdmin } = useAppState();
  const uid = user.uid;
  const [timetable, setTimetable] = useState([]);


  const [timetableYear, setTimetableYear] = useState(1);
  const [timetableStream, setTimetableStream] = useState("CSE");
  useEffect(() => {
    axios
      .get(`/timetable/${timetableStream}/${timetableYear}`)
      .then((response) => {
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
  }, [uid, timetableStream, timetableYear]);


  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleStreamChange = (e) => {
    setTimetableStream(e.target.value)
    console.log(timetableStream)
  }

  const handleSemesterChange = (e) => {
    setTimetableYear(e.target.value)
  }

  return (
    <div>
      <div className="page-header">
        <h2>Time Table</h2>


        {isAdmin && (<>
          <div className="radio-inputs">
            <label className="radio">
              <input
                type="radio"
                name="department"
                value="CSE"
                defaultChecked
                onChange={handleStreamChange}
              />
              <span className="name">CSE</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="department"
                value="ECE"
                onChange={handleStreamChange}
              />
              <span className="name">ECE</span>
            </label>

            <label className="radio">
              <input
                type="radio"
                name="department"
                value="MCA"
                onChange={handleStreamChange}
              />
              <span className="name">MCA</span>
            </label>
          </div>

          <div className="radio-inputs">
            <label className="radio">
              <input
                type="radio"
                name="year"
                value={1}
                defaultChecked
                onChange={handleSemesterChange}
              />
              <span className="name">1</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="year"
                value={2}
                onChange={handleSemesterChange}
              />
              <span className="name">2</span>
            </label>

            <label className="radio">
              <input
                type="radio"
                name="year"
                value={3}
                onChange={handleSemesterChange}
              />
              <span className="name">3</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="year"
                value={4}
                onChange={handleSemesterChange}
              />
              <span className="name">4</span>
            </label>
          </div>
        </>)}


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

                <td >{item.time}</td>
                {days.map((day) => {
                  return <td key={`${day}-${index}`}>{item.days[day]}</td>;
                })}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
