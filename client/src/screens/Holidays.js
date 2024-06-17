import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Holidays.css";
import { Link } from "react-router-dom";
import { useAppState } from "../AppStateContext"; // Import the useAppState hook

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const { isAdmin } = useAppState(); // Destructure isAdmin from the app state
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get("/api/holidays");
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
      await axios.post("/api/update_holidays", holidays); // Adjust endpoint as per your backend
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating holidays:", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <Link to="/dashboard">
          <h2>Holiday List</h2>
        </Link>
        {isAdmin && (
          <button className="adminbtn" onClick={handleEdit}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        )}
        {isEditing && (
          <button className="adminbtn" onClick={handleSave}>Save</button>
        )}
      </div>
      <div className="page-layout">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>List of Festivals</th>
                <th>No. of Holidays</th>
                <th>Date</th>
                <th>Day</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
