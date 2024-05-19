import React, { useEffect, useState } from "react";
import "./Timetable.css";
import axios from "axios";
import { useAppState } from "../AppStateContext";

const TimeTable = () => {
  const { user } = useAppState();
  const uid = user.uid;
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    axios
      .get(`/timetable/${uid}`)
      .then((response) => {
        const data = response.data;
        const groupedData = data.reduce((acc, curr) => {
          const timeSlot =
            curr.StartTime.toString().slice(0, 5) +
            " - " +
            curr.EndTime.toString().slice(0, 5);
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
            };
          }
          acc[timeSlot].days[curr.DayOfWeek] = curr.SubjectName;
          return acc;
        }, {});
        setTimetable(Object.values(groupedData));
      })
      .catch((error) => {
        console.error("Error fetching timetable:", error);
      });
  }, [uid]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <div className="page-header">
        <h2>Time Table</h2>
      </div>
      <div className="page-layout">
        <table className="table">
          <thead>
            <tr>
              <th colSpan="8">Timetable</th>
            </tr>
            <tr>
              <th rowSpan="8">Hours</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
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
