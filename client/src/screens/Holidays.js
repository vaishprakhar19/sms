import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Holidays.css";
import { Link } from "react-router-dom";
import { useAppState } from "../AppStateContext"; // Import the useAppState hook
import BackHandler from "../components/BackHandler";
import Navbar from "../components/Navbar";

const Holidays = () => {
  BackHandler()
  const [holidays, setHolidays] = useState([]);
  const { isAdmin } = useAppState(); // Destructure isAdmin from the app state
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // State for toggling add holiday form
  const [newHoliday, setNewHoliday] = useState({
    festival: '',
    no_of_holidays: '',
    date: '',
    day: ''
  });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get("https://biasportalback.vercel.app/holidays");
      // const response = await axios.get("http://localhost:5000/holidays");
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holiday data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await axios.post("https://biasportalback.vercel.app/update/holidays/", holidays); // Adjust endpoint as per your backend
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating holidays:", error);
    }
  };

  const handleAddHoliday = async () => {
    try {
      const response = await axios.post("https://biasportalback.vercel.app/holidays/add/", newHoliday); // Adjust endpoint as per your backend
      setHolidays([...holidays, { ...newHoliday, id: response.data.holidayId }]);
      setNewHoliday({ festival: '', no_of_holidays: '', date: '', day: '' });
      setIsAdding(false); // Hide form after adding holiday
    } catch (error) {
      console.error("Error adding holiday:", error);
    }
  };

  const handleDeleteHoliday = (holidayId) => {
    axios.delete(`https://biasportalback.vercel.app/holidays/${holidayId}`)
      .then(() => {
        setHolidays(holidays.filter(holiday => holiday.id !== holidayId));
        setIsDeleteMode(false);
      })
      .catch(error => {
        console.error("Error deleting holiday:", error);
      });
  };


  return (
    <div>
      <div className="page-header">
        <Link to="/dashboard">
          <h2>Holiday List</h2>
        </Link>
        {isAdmin && (
          <div className="add-holiday-btn">
            <button className="adminbtn" onClick={handleEdit}>
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button className="adminbtn" onClick={handleSave}>Save</button>
            )}
            <button className="adminbtn" onClick={() => setIsAdding(!isAdding)}>
              {isAdding ? "Cancel" : "Add"}
            </button>
            <button className="adminbtn" onClick={() => setIsDeleteMode(!isDeleteMode)}>
              {isDeleteMode ? "Cancel" : "Delete"}
            </button>
          </div>
        )}
      </div>
      <div className="page-layout">
        {isAdmin && isAdding && (
          <form className="add-holiday-form"

            onSubmit={(e) => {
              e.preventDefault();
              handleAddHoliday();
            }}
          >
            <input
              type="text"
              className="inputField"
              placeholder="Festival"
              value={newHoliday.festival}
              onChange={(e) =>
                setNewHoliday({ ...newHoliday, festival: e.target.value })
              }
            />
            <input
              className="inputField"
              placeholder="No. of Holidays"
              type="text"
              value={newHoliday.no_of_holidays}
              onChange={(e) =>
                setNewHoliday({ ...newHoliday, no_of_holidays: e.target.value })
              }
            />
            <input
              className="inputField"
              placeholder="Date"
              type="text"
              value={newHoliday.date}
              onChange={(e) =>
                setNewHoliday({ ...newHoliday, date: e.target.value })
              }
            />
            <input
              className="inputField"
              placeholder="Day"
              type="text"
              value={newHoliday.day}
              onChange={(e) =>
                setNewHoliday({ ...newHoliday, day: e.target.value })
              }
            />
            <button className="adminbtn" type="submit">Add Holiday</button>
          </form>
        )}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>List of Festivals</th>
                <th>No. of Holidays</th>
                <th>Date</th>
                <th>Day</th>
                {isDeleteMode && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      holidays[index].festival = e.target.innerText;
                    }}
                  >
                    {holiday.festival}
                  </td>
                  <td
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      holidays[index].no_of_holidays = e.target.innerText;
                    }}
                  >
                    {holiday.no_of_holidays}
                  </td>
                  <td
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      holidays[index].date = e.target.innerText;
                    }}
                  >
                    {holiday.date}
                  </td>
                  <td
                    contentEditable={isEditing}
                    onBlur={(e) => {
                      holidays[index].day = e.target.innerText;
                    }}
                  >
                    {holiday.day}
                  </td>
                  {isDeleteMode && <td className="delete-column">
                    {isDeleteMode && (
                      <button className="delete-holiday-btn adminbtn" onClick={() => handleDeleteHoliday(holiday.id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                      </button>
                    )}
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
};

export default Holidays;
