// Holidays.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Holidays.css";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);

  const fetchHolidays = () => {
    axios.get("/api/holidays")
      .then(response => {
        setHolidays(response.data);
      })
      .catch(error => {
        console.error("Error fetching holiday data:", error);
      });
  };
console.log(holidays);
  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h2>Holiday List</h2>
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
                  <td>{holiday.festival}</td>
                  <td>{holiday.no_of_holidays}</td>
                  <td>{new Date(holiday.date).toUTCString().slice(4,16)}</td>
                  <td>{holiday.day}</td>
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
