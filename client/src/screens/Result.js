import React, { useState, useCallback } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./Students.css";
import { Link } from "react-router-dom";
import BackHandler from "../components/BackHandler";
import Navbar from "../components/Navbar";

const Result = () => {
  BackHandler();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    semester: "",
    department: "",
    gender: "",
  });

  const fetchUsers = useCallback(() => {
    const params = {
      semester: filters.semester,
      department: filters.department,
      gender: filters.gender,
    };

    axios
      .get("https://biasportalback.vercel.app/api/users", { params })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearSelections = () => {
    setFilters({
      semester: "",
      department: "",
      gender: "",
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  const handleMarksChange = (e, userId) => {
    const { value } = e.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.uid === userId ? { ...user, marks: value } : user
      )
    );
  };

  const saveMarks = () => {
    // Logic to save marks to the backend
    // Example: axios.post("/api/save-marks", users);
  };

  return (
    <div>
      <div className="page-header">
        <Link to="/dashboard">
          <h2>Result</h2>
        </Link>
        <div className="add-holiday-btn">
          <button className="adminbtn" onClick={exportToExcel}>
            Export to Excel
          </button>
        </div>
      </div>
      <div className="page-layout">
        <div className="user-form">
          <input
            type="text"
            placeholder="Batch"
            className="inputField2 inputField"
            name="semester"
            value={filters.semester}
            onChange={handleFilterChange}
          />
          <div className="user-radios">
            {/* The same radio buttons for department and gender */}
            {/* ... */}
          </div>

          <button id="clear-button" className="adminbtn" onClick={clearSelections}>
            Clear Selection
          </button>

          <button id="button" onClick={fetchUsers}>
            Apply Filters
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>subject1</th>
                <th>subject1</th>
                <th>subject1</th>
                <th>subject1</th>
                <th>subject1</th>
                <th>subject1</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.rollNo}</td>
                  <td>{user.name}</td>

                  <td>
                    <input
                      type="number"
                      value={user.marks || ""}
                      onChange={(e) => handleMarksChange(e, user.uid)}
                      className="marks-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="adminbtn" onClick={saveMarks}>
          Save Marks
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default Result;
