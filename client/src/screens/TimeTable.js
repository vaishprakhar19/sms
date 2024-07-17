import React, { useEffect, useState } from "react";
import "./Timetable.css";
import axios from "axios";
import { useAppState } from "../AppStateContext";
import { Link } from "react-router-dom";
import BackHandler from "../components/BackHandler";
const TimeTable = () => {
  BackHandler();
  const { user, isAdmin } = useAppState();
  const uid = user.uid;
  const [, setTimetable] = useState([]);
  const [timetableYear, setTimetableYear] = useState(1);
  const [timetableStream, setTimetableStream] = useState("CSE");
  const [editableTimetable, setEditableTimetable] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        let response;
        if (isAdmin) {
          response = await axios.get(`/timetable`, {
            params: {
              stream: timetableStream,
              year: timetableYear,
              isAdmin: true
            }
          });
        } else {
          response = await axios.get(`/timetable`, {
            params: {
              uid: uid,
              isAdmin: false
            }
          });
        }
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
        const groupedArray = Object.values(groupedData);
        setTimetable(groupedArray);
        setEditableTimetable(groupedArray);
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimetable();
  }, [uid, timetableStream, timetableYear, isAdmin]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleStreamChange = (e) => {
    setTimetableStream(e.target.value);
    setTimetableYear(1);
  };

  const handleSemesterChange = (e) => {
    setTimetableYear(parseInt(e.target.value));
  };

  const handleContentChange = (e, timeSlot, day) => {
    const value = e.target.innerText;
    const updatedTimetable = editableTimetable.map((item) => {
      if (item.time === timeSlot) {
        return {
          ...item,
          days: {
            ...item.days,
            [day]: value,
          },
        };
      }
      return item;
    });
    setEditableTimetable(updatedTimetable);
  };

  const handleTimeSlotChange = (e, index) => {
    const value = e.target.innerText;
    const updatedTimetable = [...editableTimetable];
    updatedTimetable[index] = {
      ...updatedTimetable[index],
      time: value,
    };
    setEditableTimetable(updatedTimetable);
  };

  const handleSaveChanges = () => {
    axios
      .post("/update-timetable", {
        timetable: editableTimetable,
        stream: timetableStream,
        year: timetableYear,
      })
      .then((response) => {
        console.log("Timetable updated successfully");
        setTimetable(editableTimetable);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating timetable:", error);
      });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const tableName = isAdmin ? `Timetable ${timetableStream}${timetableYear}` : 'Timetable';
  return (
    <div>
      <div className="page-header">
        <Link to="/dashboard">
          <h2>Time Table</h2>
        </Link>
        {isAdmin && (
          <div className="add-holiday-btn">
            <button className="adminbtn" onClick={handleEditClick}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>

            {isEditing && (
              <button className="adminbtn" onClick={handleSaveChanges}>Save</button>
            )}
          </div>
        )}
      </div>
      <div className="page-layout">
        {isAdmin &&
          <div className="timetable-form">
            <div className="radio-inputs">
              <label className="radio">
                <input
                  type="radio"
                  name="department"
                  value="CSE"
                  checked={timetableStream === "CSE"}
                  onChange={handleStreamChange}
                />
                <span className="name">CSE</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="department"
                  value="ECE"
                  checked={timetableStream === "ECE"}
                  onChange={handleStreamChange}
                />
                <span className="name">ECE</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="department"
                  value="MCA"
                  checked={timetableStream === "MCA"}
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
                  checked={timetableYear === 1}
                  onChange={handleSemesterChange}
                />
                <span className="name">1</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="year"
                  value={2}
                  checked={timetableYear === 2}
                  onChange={handleSemesterChange}
                />
                <span className="name">2</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="year"
                  value={3}
                  checked={timetableYear === 3}
                  onChange={handleSemesterChange}
                  disabled={timetableStream === "MCA"}
                />
                <span className="name">3</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="year"
                  value={4}
                  checked={timetableYear === 4}
                  onChange={handleSemesterChange}
                  disabled={timetableStream === "MCA"}
                />
                <span className="name">4</span>
              </label>
            </div>
          </div>
        }

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th colSpan="7">{tableName}</th>
              </tr>
              <tr>
                <th>Hours</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {editableTimetable.map((item, index) => (
                <tr key={index}>
                  <td className="time-slot-cell"
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleTimeSlotChange(e, index)}
                  >
                    {item.time}
                  </td>
                  {days.map((day) => (
                    <td
                      key={`${day}-${index}`}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleContentChange(e, item.time, day)}
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
    </div>
  );
};

export default TimeTable;
